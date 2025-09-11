---
date: 2024-01-01
title: VPN OpenConnect
author: [SecCMD]
description: >
  本页面专注于网络相关知识，涵盖OpenConnect VPN Server的安装与配置，包括系统网络转发配置、服务端配置和高级路由配置；Clash透明代理技术在本机安装、Tun模式及DNS分流的详细设置，以及DNS精准分流的高级配置；Anyconnect客户端的使用，包括命令行连接与自动登录脚本；网络调试方面，介绍了Network Tools、Tcpdump、Route、Iptables等工具的基础操作与原理，如Iptables透明代理技术和端口复用技术，为用户全面掌握网络配置与调试提供丰富且实用的信息。
categories: 网络工具
tags:
  - VPN配置
  - 透明代理
  - 网络调试工具
---

# VPN OpenConnect

## 参考

https://www.linuxbabe.com/ubuntu/openconnect-vpn-server-ocserv-ubuntu-20-04-lets-encrypt
https://www.vultr.com/docs/setup-openconnect-vpn-server-for-cisco-anyconnect-on-ubuntu-14-04-x64/

踩了一个坑 ubuntu22 客户端连接服务端 报错， 用 ubuntu 20 正常。

## 安装 OpenConnect VPN Server
``` bash
## 很全面的文章，安装客户端、服务端和免费证书 - https://www.linuxbabe.com/ubuntu/openconnect-vpn-server-ocserv-ubuntu-20-04-lets-encrypt
sudo apt update
sudo apt install ocserv
sudo systemctl status ocserv
sudo systemctl start ocserv
```

## 系统网络转发配置
``` bash
#!/bin/sh
iptables -t nat -A POSTROUTING -j MASQUERADE     ## Enable NAT.
echo "net.ipv4.ip_forward=1" >> /etc/sysctl.conf ## Enable IPv4 forwarding. Edit the file /etc/sysctl.conf.
sysctl -p /etc/sysctl.conf                       ## Apply this modification.
echo 'nameserver 8.8.8.8' > /etc/resolv.conf     ## 临时修改 DNS 配置
## 永久修改 DNS 配置
sudo apt-get install resolvconf
echo 'nameserver 8.8.8.8' >> /etc/resolvconf/resolv.conf.d/head
echo 'nameserver 1.1.1.1' >> /etc/resolvconf/resolv.conf.d/head
sudo systemctl enable --now resolvconf.service
````

## 配置 服务端
``` bash
vi /etc/ocserv/ocserv.conf

## 监听端口
tcp-port = 1443
udp-port = 1443

## DNS 配置
tunnel-all-dns = true
dns = 8.8.8.8

## VPN 账号
auth = "pam[gid-min=1000]"  # 直接使用 Linux 系统账号

## ocserv 重启服务
sudo systemctl restart ocserv
sudo systemctl restart ocserv.socket

## ！监听端口故障，修改 ocserv.conf 监听断开配置无效，同时需要修改系统服务配置 ocserv.socket
## ocserv 系统服务文件
cat /lib/systemd/system/ocserv.socket
[Unit]
Description=OpenConnect SSL VPN server Socket
[Socket]
ListenStream=443
ListenDatagram=443
BindIPv6Only=default
Accept=false
ReusePort=true
[Install]
WantedBy=sockets.target
```



## 配置 高级路由

```bash
## 高级配置
- https://www.linuxbabe.com/linux-server/ocserv-openconnect-vpn-advanced

## 给特定用户和用户组，配置定制的路由策略
### 新建用户 vpnuser
useradd vpnuser
passwd vpnuser

### /etc/ocserv/ocserv.conf 主配置文件添加，独立配置目录 
config-per-user = /etc/ocserv/config-per-user/
config-per-group = /etc/ocserv/config-per-group/

### 给特定用户或用户组，创建独立配置文件
sudo mkdir /etc/ocserv/config-per-user/
sudo mkdir /etc/ocserv/config-per-group/
sudo vi /etc/ocserv/config-per-user/user1
sudo vi /etc/ocserv/config-per-group/group1
# 例如：我刚才创建的用户名为：vpnuser
sudo vi /etc/ocserv/config-per-user/vpnuser

## 配置内网的路由地址池 Secured Routes (IPv4)
route = 10.16.0.0/13

## 流量分割（国内网段不走路由）
只配置 route = xx 说明哪些地址走VPN，其余不走VPN。例如：只有国外地址才走VPN（route=），其余都不走VPN。
只配置 no-route = xx 说明哪些地址不走VPN，其余全走VPN。例如：只有国内不走VPN（no-reoute=），其余都走VPN。

## 最小化的国内路由段
## ocserv下发的路由表最多支持下发**200**条路由表。为了尽可能的在200条路由表内塞下route或者no-route，大家发挥聪明才智通过合并cidr或者扩大cn的路由表范围等方式，有了很多优秀的no-route表，例如：https://github.com/CNMan/ocserv-cn-no-route
```



## 🍎====透明代理====



## Clash 透明代理技术 - 本机安装

```bash
# 目的：OpenConnect 的流量分割配置，由于国家IP网段数量庞大，会在个人电脑插入大量的静态路由，性能不好说，很不科技。
## 另外，购买的收费服务，实现了很好的分割，我模仿它一直没做到，最后发现它使用的不是 默认的流量分割技术，所以开始进一步探索。
## 花了很长时间，最后定位到：透明代理技术 fake-ip: 伪造IP模式。clash的fake-ip技术 / v2ray的fake DNS技术
## - https://vlike.work/tech/trans_proxy.html
## - https://bulianglin.com/archives/dnsproxy.html
## - https://blog.lv5.moe/p/use-dns-to-create-split-routing-for-different-domain-or-ip-ranges
## - https://gist.github.com/cld4h/9a03ec2f826a25be5ab974fdbc540de4
## - https://www.sobyte.net/post/2022-02/clash-tproxy/
## - https://xtls.github.io/document/level-2/tproxy.html

## 首先你需要部署好 Clash
- https://dreamacro.github.io/clash/
wget https://github.com/Dreamacro/clash/releases/download/v1.17.0/clash-linux-amd64-v1.17.0.gz 
gunzip clash-linux-amd64-v1.17.0.gz && chmod +x clash-linux-amd64-v1.17.0

## Clash as a Service
mv clash-linux-amd64-v1.17.0 /usr/local/bin
mkdir /etc/clash
touch /etc/clash/config.yaml
touch  /etc/clash/Country.mmdb

vi /etc/systemd/system/clash.service
[Unit]
Description=Clash daemon, A rule-based proxy in Go.
After=network-online.target
[Service]
User=clash
Type=simple
Restart=always
ExecStart=/usr/local/bin/clash -d /etc/clash
[Install]
WantedBy=multi-user.target

systemctl daemon-reload
systemctl enable clash
systemctl start clash
systemctl status clash
journalctl -xe | grep clash

## 配置模板：https://raw.githubusercontent.com/XinSSS/Conf-for-Surge-Shadowrocket/master/clash_base.yaml
clash -f /etc/clash/config.yaml
# TProxy 的透明代理端口
tproxy-port: 7893
# mixed-port 端口将同时支持 SOCKS5/HTTP
mixed-port: 7890
# 允许来自局域网的连接
allow-lan: true
# 绑定到所有接口
bind-address: '127.0.0.1'
## 使用 fake-ip 模式的 Clash 既作为透明代理又作为 DNS Server
dns:
  enable: true
  // 开启 fake-ip 模式
  enhanced-mode: fake-ip
  // 选择保留 ip 段，一般保持默认即可
  fake-ip-range: 198.18.0.1/16
  // 指定 Clash DNS 监听地址
  listen: 0.0.0.0:53
  // 指定上游公共 DNS
  nameserver:
  - 223.5.5.5:53
  // 添加需要直连的国内域名
  fake-ip-filter:
  - baidu.com
  - ...
```



## Clash 透明代理技术 - Tun 模式

```yaml
# cat /etc/clash/config.yaml
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.16.0.1/16
  listen: 0.0.0.0:1053
  nameserver:
    - 8.8.8.8:53
  fake-ip-filter:
    - baidu.com
tun:  // 需要 root 权限
  enable: true
  stack: system
  // 自动为 fake-ip-range 中的 ip 段添加路由
  auto-route: true  # 使用 OpenConnect ocserv 时，开启这个配置，就会路由失败，不写这行运行正常。（原因未知）

# 转发从局域网收到的所有 DNS 查询流量到 1053 端口
iptables -t nat -I PREROUTING -p udp --dport 53 -j REDIRECT --to 1053

# 只劫持指定地址的 DNS 流量，只劫持vpnuser的dns 10.10.10.1，不劫持admin的dns 8.8.8.8
# admin 全流量完全代理，vpnuser流量分流代理
iptables -t nat -I PREROUTING -p udp --dport 53 -d 10.10.10.1/32 -j REDIRECT --to 1053

```

## Clash 透明代理技术 - DNS 分流

最关键的是需要将常见国内域名加入到 fake-ip-filter 中，这里推荐一个每日更新国内域名的项目：[felixonmars/dnsmasq-china-list](https://github.com/felixonmars/dnsmasq-china-list)

```bash
# 极简配置: 使用 fake-ip 模式的 Clash 既作为透明代理又作为 DNS Server，这种方式配置非常简单，只需要一个能运行 Clash 的设备即可
dns:
  enable: true
  // 开启 fake-ip 模式
  enhanced-mode: fake-ip
  // 选择保留 ip 段，一般保持默认即可
  fake-ip-range: 198.18.0.1/16
  // 指定 Clash DNS 监听地址
  listen: 0.0.0.0:53
  // 指定上游公共 DNS
  nameserver:
  - 223.5.5.5:53
  // 添加需要直连的国内域名
  fake-ip-filter:
  - baidu.com
  - ...

# 获取国内域名的脚本，自动生成 fake-ip-filter 清单。
rm -f accelerated-domains.china.conf
wget https://raw.githubusercontent.com/felixonmars/dnsmasq-china-list/master/accelerated-domains.china.conf -O ./accelerated-domains.china.conf # 中国的域名清单 https://github.com/felixonmars/dnsmasq-china-list
echo '
#LAN
*.lan
*.localdomain
*.example
*.invalid
*.localhost
*.test
*.local
*.home.arpa
#放行NTP服务
time.*.com
time.*.gov
time.*.edu.cn
time.*.apple.com
ntp.*.com
*.time.edu.cn
*.ntp.org.cn
+.pool.ntp.org
time1.cloud.tencent.com
*.cn
' > ./openclash_custom_fake_filter.list
awk -F / '{print "+."$2}' ./accelerated-domains.china.conf >> ./openclash_custom_fake_filter.list
echo '  fake-ip-filter:' > ./openclash_fake_filter.list
awk '{print "    - '\''"$1"'\''"}' ./openclash_custom_fake_filter.list >> ./openclash_fake_filter.list
```



## DNS 精准分流 - 高级配置

- https://blog.lv5.moe/p/use-dns-to-create-split-routing-for-different-domain-or-ip-ranges

使用 Clash DNS 的方案虽然配置非常简单，但是毕竟不可能将所有国内域名都统计出来，还需要根据 ip 进行更精准的分流

[IrineSistiana/mosdns-cn](https://github.com/IrineSistiana/mosdns-cn) 作为分流 DNS，这里引用 mosdns-cn 官方文档上介绍的分流规则

自己前面套个 mosdns v4 （v5砍掉了geosite/geoip资源文件支持, 用起来更麻烦点）

TODO: 有待进一步研究





## Anyconnect  客户端

客户端下载：anyconnect
https://devops-100tal.oss-cn-beijing.aliyuncs.com/vpnuserguide/vpnuserguide.htm



## Anyconnect  命令行使用

**使用脚本自动登录VPN **

```powershell
# 使用脚本自动登录VPN > To connect VPN via CMD

## 一句话执行：c2v.bat
REM 第一步：关闭 AnyConnect 图形界面
taskkill /F /IM vpnui.exe /T

REM 第二步：关闭已有的 AnyConnect 连接
"C:\Program Files (x86)\Cisco\Cisco AnyConnect Secure Mobility Client"\vpncli.exe disconnect

REM 第三步：读取配置文件自动连接
"C:\Program Files (x86)\Cisco\Cisco AnyConnect Secure Mobility Client"\vpncli.exe -s < %USERPROFILE%\Videos\CWork\Topic\vpnfile.txt

## 配置文件格式
.\vpncli.exe -s < response.txt
> Template File
> connect <host>                    # 例如：connect connect2vinoth.com
> [Optional: drop down selection]   # 这里选择验证方式，选第一种方式输入：0，没有的话删除本行
> <username>                        # 例如：myuser
> <password>                        # 例如：mypass
```



**To connect VPN via CMD**

```powershell
cd "C:\Program Files (x86)\Cisco\Cisco AnyConnect Secure Mobility Client"
.\vpncli.exe -h
    Usage: vpncli.exe [options] | [cmd] [host]
       commands: [connect|disconnect|hosts|state|stats]
       options:
            -h         Print this usage statement.
            -v         Print version.
            -s         Read commands from response file to work non-interactively.
                       Example: vpncli.exe -s < response.txt
.\vpncli.exe disconnect  # 断开连接

.\vpncli.exe connect xytth.com:1443  # 如果打开了图形界面会报错 error: Connect not available. Another AnyConnect application is running

 .\vpncli.exe state   # 查看连接状态
  >> state: Connected
  >> state: Connected
  >> state: Connected
  >> registered with local VPN subsystem.

.\vpncli.exe stats   # 查看连接详情

REF: 

- [Connecting to AnyConnect via Command Line on Windows](https://it.umn.edu/services-technologies/how-tos/virtual-private-network-vpn-advanced-0)
- [Connecting CiscoAnyConnectVPN via bash script in Windows](https://medium.com/@vinothkumarsubbu/connecting-ciscoanyconnectvpn-via-bash-script-in-windows-f749e706d115)
```




## 🍎====网络调试====



## Network Tools

```bash
# https://www.redhat.com/sysadmin/beginners-guide-network-troubleshooting-linux

# Layer 1: The physical layer
ip link show
ip link set eth0 up
ip -br link show
ip -s link show eth0
ethtool eth0

# Layer 2: The data link layer
ip neighbor show

# Layer 3: The network/internet layer
ip -br address show
ping www.google.com
traceroute www.google.com
ip route show
nslookup www.google.com

# Layer 4: The transport layer
telnet database.example.com 3306
nc 192.168.122.1 -u 80
ss -tunlp4
Let’s break down these flags:
-t - Show TCP ports.
-u - Show UDP ports.
-n - Do not try to resolve hostnames.
-l - Show only listening ports.
-p - Show the processes that are using a particular socket.
-4 - Show only IPv4 sockets.
```



## Tcpdump 基本使用

```bash
# 抓取所有的包 tcpdump
tcpdump -i eth0  # 监听特定的网卡
tcpdump host hostname      # 源和目的为该ip的都监听
tcpdump src host hostname  # 来源是指定主机
tcpdump dst host hostname  # 目标是指定主机
tcpdump port 80            # 监听特定的端口
tcpdump src port 443       # 来源是指定端口
tcpdump dst port 443       # 目标是指定端口
tcpdump src portrange 4000-5000    # 设置监听的端口范围
tcpdump src net 192.168.50.0/24    # 指定网段抓包
tcpdump ip|ip6|tcp|udp|icmp        # 抓取指定协议的数据包

tcpdump ip host 210.27.48.1 and ! 210.27.48.2
tcpdump tcp port 23 and host 210.27.48.1

# Flags [ ]：Flags代表了这个数据包的用途
[S]	    SYN同步标识
[.]	    .表示ACK确认标识
[S.]	SYN同步标识，以及确认[S]的ACK
[P.]	PSH，push推送，数据传输
[R.]	RST，连接重置
[F.]	FIN结束连接
```

## Route 基础操作

```bash
ip route add 198.16.0.0/16 via 172.17.63.253

ip route add network command examples
The syntax is pretty simple:
ip route add {NETWORK/MASK} via {GATEWAYIP}
ip route add {NETWORK/MASK} dev {DEVICE}
ip route add default {NETWORK/MASK} dev {DEVICE}
ip route add default {NETWORK/MASK} via {GATEWAYIP}

Add a static route on Linux
You must login as root user with the help of su command or sudo command:
$ su -
OR use the sudo as follows:
$ sudo -i
Once become a root user, setup a temporary route using the ip command:
# ip route add 172.10.1.0/24 via 10.0.0.100 dev eth0
Verify new routing table, enter:
# ip r
Here is another example where I am setting up route for my VPN gateway:
# ip link set dev tun0 up mtu 1500
# ip addr add dev tun0 10.8.0.2/24 broadcast 10.8.0.255
# ip route add 139.59.2.125/32 via 192.168.2.254
# ip route add 0.0.0.0/1 via 10.8.0.1
# ip route add 128.0.0.0/1 via 10.8.0.1
Again view route with the ip command:
# ip r
```



## Iptables 示意图

```txt
┌─────────┐                                                                                      ┌─────────┐
│         │             PREROUTING                                                INPUT          │         │
│         │                                                                                      │         │
│         │  ┌─────────────────────────────────────┐                      ┌────────────────────┐ │         │
│         │  │                                     │         /───\        │                    │ │         │
│         │  │ ┌───┐  ┌─────────┐  ┌──────┐  ┌───┐ │        /     \       │ ┌──────┐  ┌──────┐ │ │         │
│         ├──┤►│raw├─►│conntrack├─►│mangle├─►│nat├─┼──────►<routing>──────┤►│mangle├─►│filter├─┤►│         │
│         │  │ └───┘  └─────────┘  └──────┘  └───┘ │        \     /       │ └──────┘  └──────┘ │ │         │
│         │  │                                     │         \─┬─/        │                    │ │         │
│         │  └─────────────────────────────────────┘           │          └────────────────────┘ │         │
│         │                                                    │                                 │         │
│         │                               ┌──────────┐         │                                 │         │
│         │                               │          │         │                                 │         │
│         │                               │ ┌──────┐ │         │                                 │         │
│         │                               │ │mangle◄─┼─────────┘                                 │         │
│ Network │                               │ └──┬───┘ │                                           │  Local  │
│Interface│                               │    │     │ FORWARD                                   │ Process │
│         │                               │ ┌──▼───┐ │                                  /───\    │         │
│         │               ┌───────────────┼─┤filter│ │                                 /     \   │         │
│         │               │               │ └──────┘ │                                <routing>◄─┤         │
│         │               │               │          │                                 \     /   │         │
│         │               │               └──────────┘                                  \─┬─/    │         │
│         │               │                                                               │      │         │
│         │  ┌────────────┼────┐               ┌──────────────────────────────────────────┼────┐ │         │
│         │  │            │    │     ─────     │                                          │    │ │         │
│         │  │ ┌───┐  ┌───▼──┐ │    /     \    │ ┌──────┐  ┌───┐  ┌──────┐  ┌─────────┐  ┌▼──┐ │ │         │
│         │◄─┼─┤nat│◄─┤mangle│◄├───<reroute>───┼─┤filter│◄─┤nat│◄─┤mangle│◄─┤conntrack│◄─┤raw│ │ │         │
│         │  │ └───┘  └──────┘ │    \check/    │ └──────┘  └───┘  └──────┘  └─────────┘  └───┘ │ │         │
│         │  │                 │     ─────     │                                               │ │         │
│         │  └─────────────────┘               └───────────────────────────────────────────────┘ │         │
│         │     POSTROUTING                                        OUTPUT                        │         │
│         │                                                                                      │         │
└─────────┘                                                                                      └─────────┘
```

## Iptables Debug

```bash
# https://www.fosslinux.com/100268/iptables-and-logging-how-to-monitor-network-traffic.htm
# 打开 iptables 日志
sudo iptables -A INPUT -j LOG --log-prefix "iptables_input: " --log-level 4
sudo iptables -A OUTPUT -j LOG --log-prefix "iptables_output: " --log-level 4
sudo iptables -A FORWARD -j LOG --log-prefix "iptables_forward: " --log-level 4

# 关闭 iptables 日志
sudo iptables -D INPUT -j LOG --log-prefix "iptables_input: " --log-level 4
sudo iptables -D OUTPUT -j LOG --log-prefix "iptables_output: " --log-level 4
sudo iptables -D FORWARD -j LOG --log-prefix "iptables_forward: " --log-level 4

# 查看 iptables 日志
journalctl -xe -f | grep iptables
```



## Iptables tproxy 透明代理技术原理 

```bash
# https://www.bilibili.com/read/cv14088928/

# 从本机出去的数据包会经过 OUTPUT 链 和 POSTROUTING 链。
# 从外部发往本机的数据包会经过 PREROUTING 链 和 INPUT 链。
# Linux 内核提供的 tproxy（Transparent proxy）透明代理能力，tproxy 只能工作在 PREROUTING 链。

# 参数功能：
# -t/--table [table]：表示这条规则作用在哪个表上
# -A/--append [chain]：表示给这个链添加一条规则
# -p/--protocol [protocol]：表示处理哪个协议
# -j/--jump [target]：表示跳转到哪个目标
# -d/--destination [address] 表示匹配对应的 ip（范围） 
# -N/--new-chain [chain] 表示创建一个新的链
# -D/--delete：从一个链上删除指定的规则
# -F/--flush [chain]：清空一个链上所有规则
# -X/--delete-chain [chain]：删除一个链
# -I/--insert [chain] [rule index] 表示插入一条规则到指定位置，默认为 1，表示插入到规则的第一条。

# 在 OUTPUT 链中，目标 IP 为外网时，应当经过 tproxy。 由于 tproxy 只能工作在 PREROUTING 链，从本机发出去的数据包会直接通过 OUTPUT 链出去了，本机数据包没有机会走 PREROUTING 链。为了让本机数据经过 PREROUTING，我们可以用的路由表解决。
ip rule add fwmark 666 table 999                # 表示被标记为 666 的数据包的走向要查表 999
ip route add local 0.0.0.0/0 dev lo table 999   # 大致是说对于 999 表的流量，都要发到本机的 PREROUTING 

# 当我们给 OUTPUT 链的数据包进行标记时，这个数据包会重新查一次表，如果我们标记的刚好是 666，那这个数据包就会根据上面的规则进入本机的 PREROUTING。这样一来，我们就可以将本机的数据包发送的 tproxy。 
# iptables 中有三个常用的表，filter、nat 和 mangle，三个表有各自的用途，能链的作用范围也不一样，mangle 表支持在 OUTPUT 链上打标记。
# 在 OUTPUT 链上的 tcp/udp 协议都跳转到 MARK 并标记个 666。 此时被标记为 666 的数据包会重新走到 PROROUTING 链上。 
# tproxy 仅能处理 tcp 和 udp，所以这里只标记这两个协议。 
# 在 OUTPUT 链上打标记命令如下：
iptables -t mangle -A OUTPUT -p tcp -j MARK --set-mark 666
iptables -t mangle -A OUTPUT -p udp -j MARK --set-mark 666

# 上面的规则虽然完成了重回 PREROUTING 的能力，但有些数据包应当直接从 OUTPUT 链出去，比如访问网关管理页面（192.168.22.1），或者是 NAS 的 192.168.22.2。所以我们需要跳过一部分的数据包避免标记上 666。
# 在 OUTPUT 链上，如果是发往 192.168.0.0/16 的数据包，则直接返回。这一条命令要在前面的 -j MARK 命令之前执行，匹配规则会根据创建的规则顺序按顺序执行。 
iptables -t mangle -A OUTPUT -d 192.168.0.0/16 -j RETURN


# 表示去往 非 192.168.0.0/16 的 tcp/udp 数据包标记 666
iptables -t mangle -A OUTPUT -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A OUTPUT -p tcp -j MARK --set-mark 666
iptables -t mangle -A OUTPUT -p udp -j MARK --set-mark 666

# 创建了一个自定义链 LOCAL_DIVERT
iptables -t mangle -N LOCAL_DIVERT
iptables -t mangle -A LOCAL_DIVERT -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -p tcp -j MARK --set-mark 666
iptables -t mangle -A LOCAL_DIVERT -p udp -j MARK --set-mark 666
# 接下来需要跳转到这个链
iptables -t mangle -A OUTPUT -j LOCAL_DIVERT

# 当不需要 LOCAL_DIVERT 时，我们可以通过以下命令删除（要小心翼翼）
iptables -t mangle -D OUTPUT -j LOCAL_DIVERT  # 首先删除跳转（调用）的引用
iptables -t mangle -F LOCAL_DIVERT            # 然后删除 LOCAL_DIVERT 中的全部规则
iptables -t mangle -X LOCAL_DIVERT            # 然后删除 LOCAL_DIVERT 这个链

# 可以将数据包通过 tproxy 发给 clash
iptables -t mangle -A PREROUTING -p tcp -j TPROXY --on-port 7893
iptables -t mangle -A PREROUTING -p udp -j TPROXY --on-port 7893

# 当前完整的 iptables 命令如下：
iptables -t mangle -N DIVERT
iptables -t mangle -A DIVERT -d 192.168.0.0/16 -j RETURN       # 本地网络直接放行，从外到内的流量不走 tproxy
iptables -t mangle -A DIVERT -p tcp -j TPROXY --on-port 7893
iptables -t mangle -A DIVERT -p udp -j TPROXY --on-port 7893
iptables -t mangle -A PREROUTING -j DIVERT

iptables -t mangle -N LOCAL_DIVERT
iptables -t mangle -A LOCAL_DIVERT -d 192.168.0.0/16 -j RETURN  # 本地网络直接放行，从内到外的流量不走 tproxy
iptables -t mangle -A LOCAL_DIVERT -p tcp -j MARK --set-mark 666
iptables -t mangle -A LOCAL_DIVERT -p udp -j MARK --set-mark 666
iptables -t mangle -A OUTPUT -j LOCAL_DIVERT

# 上面产生了一个回环，我们需要解决掉，即让本机 clash 发出来的数据包直接从 OUTPUT 链出去
# 通过 gid/uid 绕过回环。 

grep -qw clash /etc/passwd || echo "clash:x:0:23333:::" >> /etc/passwd  # 创建一个名为 clash，uid 为 0，gid 为 23333 的用户
sudo -u clash id   # 可以验证创建的用户是否正常：
sudo -u clash /usr/local/bin/clash -d /etc/clash  # 接下来我们使用这个用户启动 clash

# iptables 执行在 OUTPUT 链改为如下命令：
# -m/-match 表示匹配对应的策略，上面的命令则是在 OUTPUT 链 gid 非 23333 的数据包跳转到 LOCAL_DIVERT。
iptables -t mangle -A OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DIVERT

# 使用 clash 的 tproxy 能力时，需要让 clash 接管 DNS 流量
# 1.停掉本地的 DNS 服务，将 clash 的 DNS 服务端口改为 53 2.将 DNS 查询数据包转发到 clash
iptables -t nat -N LOCAL_DNS_DIVERT
iptables -t nat -A LOCAL_DNS_DIVERT -p udp --dport 53 -j REDIRECT --to-ports 1053  # 1053 是在 clash 上设置的 DNS 服务端口
iptables -t nat -I OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DNS_DIVERT

# 绕过更多内网 IP 段。发往 127.0.0.1:1053 的 DNS 查询数据包会通过 OUTPUT 链回到 PREROUTING 最后进入到 tproxy。 我们可以在 OUTPUT 链跳过去
iptables -t mangle -A LOCAL_DIVERT -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A DIVERT -d 127.0.0.0/8 -j RETURN # 回来数据包仍然经过 PREROUTING，同样需要跳过

# 我们还有更多的内网/特殊 IP 段需要直接 RETURN，完整列表如下：
100.64.0.0/10
127.0.0.0/8
169.254.0.0/16
192.0.0.0/24
224.0.0.0/4
240.0.0.0/4
255.255.255.255/32
192.168.0.0/16
172.16.0.0/12
10.0.0.0/8
```

**完整配置记录**

```bash
# https://gist.github.com/DianQK/25cf82bff5136068b98575adef598f82#file-iptables_1-sh

# Clash 配置
grep -qw clash /etc/passwd || echo "clash:x:0:23333:::" >> /etc/passwd  # 创建一个名为 clash，uid 为 0，gid 为 23333 的用户
sudo -u clash id   # 可以验证创建的用户是否正常：
sudo -u clash /usr/local/bin/clash -d /etc/clash  # 接下来我们使用这个用户启动 clash

cat << EOF > config.yaml
tproxy-port: 7893
dns:
  enable: true
  enhanced-mode: fake-ip
  fake-ip-range: 198.16.0.1/16
  listen: 0.0.0.0:1053
  nameserver:
    - 8.8.8.8:53
  fake-ip-filter:
    - 163.com
EOF

# 跳过来自服务端口的流量
# https web server
iptables -t mangle -I OUTPUT -p tcp --sport 80 -j RETURN
iptables -t mangle -I OUTPUT -p tcp --sport 443 -j RETURN
iptables -t mangle -I OUTPUT -p tcp --sport 22 -j RETURN
iptables -t mangle -I OUTPUT -p tcp --sport 1443 -j RETURN
iptables -t mangle -I OUTPUT -p udp --sport 1443 -j RETURN

# 创建入站规则
iptables -t mangle -N DIVERT
iptables -t mangle -A DIVERT -d 8.219.56.209/32 -j RETURN
iptables -t mangle -A DIVERT -d 100.64.0.0/10 -j RETURN
iptables -t mangle -A DIVERT -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A DIVERT -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A DIVERT -d 192.0.0.0/24 -j RETURN
iptables -t mangle -A DIVERT -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A DIVERT -d 240.0.0.0/4 -j RETURN
iptables -t mangle -A DIVERT -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A DIVERT -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A DIVERT -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A DIVERT -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A DIVERT -p tcp -j TPROXY --on-port 7893
iptables -t mangle -A DIVERT -p udp -j TPROXY --on-port 7893
iptables -t mangle -A PREROUTING -j DIVERT

# 创建出站规则
ip rule add fwmark 666 table 999
ip route add local 0.0.0.0/0 dev lo table 999
iptables -t mangle -N LOCAL_DIVERT
iptables -t mangle -A LOCAL_DIVERT -d 8.219.56.209/32 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 100.64.0.0/10 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 127.0.0.0/8 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 169.254.0.0/16 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 192.0.0.0/24 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 224.0.0.0/4 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 240.0.0.0/4 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 255.255.255.255/32 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 192.168.0.0/16 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 172.16.0.0/12 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -d 10.0.0.0/8 -j RETURN
iptables -t mangle -A LOCAL_DIVERT -p tcp -j MARK --set-mark 666
iptables -t mangle -A LOCAL_DIVERT -p udp -j MARK --set-mark 666
iptables -t mangle -A OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DIVERT

# 创建 DNS 规则
iptables -t nat -N LOCAL_DNS_DIVERT
iptables -t nat -A LOCAL_DNS_DIVERT -p udp --dport 53 -j REDIRECT --to-ports 1053  # 1053 是在 clash 上设置的 DNS 服务端口
iptables -t nat -I OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DNS_DIVERT

# 关闭 出站 规则
iptables -t mangle -D OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DIVERT
iptables -t mangle -F LOCAL_DIVERT
iptables -t mangle -X LOCAL_DIVERT
# 关闭清空 入站 规则
iptables -t mangle -D PREROUTING -j DIVERT
iptables -t mangle -F DIVERT
iptables -t mangle -X DIVERT
# 关闭清空 DNS 规则
iptables -t nat -D OUTPUT -m owner ! --gid-owner 23333 -j LOCAL_DNS_DIVERT
iptables -t nat -F LOCAL_DNS_DIVERT
iptables -t nat -X LOCAL_DNS_DIVERT

# 补充：转发从局域网收到的所有 DNS 查询流量到 1053 端口
iptables -t nat -I PREROUTING -p udp --dport 53 -j REDIRECT --to 1053

# 删除
iptables -t nat -D PREROUTING -p udp --dport 53 -j REDIRECT --to 1053
```

### 端口复用


- https://www.freebuf.com/articles/web/261429.html
- https://saucer-man.com/operation_and_maintenance/586.html
- https://idiotc4t.com/defense-evasion/shadowmove-emersion-and-think
- https://www.usenix.org/system/files/sec20summer_niakanlahiji_prepub.pdf
- https://blog.vackbot.com/archives/%E4%BB%A3%E7%90%86%E7%AB%AF%E5%8F%A3%E5%A4%8D%E7%94%A8%E5%9C%A8%E5%90%8E%E6%B8%97%E9%80%8F%E5%9C%BA%E6%99%AF%E4%B8%AD%E7%9A%84%E5%BA%94%E7%94%A8%E6%8E%A2%E7%A9%B6

```
在后渗透场景中，代理几乎是不可或缺的一部分，对于多层网络架构的复杂内网环境而言，多级代理、多协议代理、端口复用等代理功能便尤为重要，本文将分以下几个部分逐步介绍：

常见代理的方式
代理端口复用研究
基于已有服务的端口复用方式
常见代理方式
反向代理
反向代理（Reverse Proxy）指的是由目标服务器主动像客户端发起连接请求的代理模式，这种代理模式通常是攻防实战中完成边界突破后的代理方式的优选项，稳定性相对更佳。缺点是服务器需要具备出网能力，在流量侧会有主动外连的痕迹，如果使用的代理工具存在流量侧特征容易被态势感知等设备发现。列举几个反代工具：
1、frp
https://github.com/fatedier/frp.git

2、earthworm
https://github.com/idlefire/ew.git

3、ngrok
https://github.com/inconshreveable/ngrok.git

4、nps
https://github.com/ehang-io/nps

5、erfrp
https://github.com/Goqi/Erfrp

正向代理
正向代理（Forward Proxy）是指由客户端向代理服务器发起请求，并由代理服务器向目标转发的代理方式，这种代理模式是科学上网常用的代理方式。在攻防实战中，由于目标主机服务器通常在内网环境，服务由例如nginx等服务将服务端口代理映射出去，因此在服务上主动创建的代理监听服务很难通过公网访问到。通常做法是复用web服务，通过对应的开发语言写代理的服务，再通过正向代理实现连接，这种方式通常稳定性和速度相对较差，通常在服务器无法出网的情况下选择。列举两个webProxy：

1、reGeorg
https://github.com/sensepost/reGeorg.git

2、Neo-reGeorg
https://github.com/L-codes/Neo-reGeorg

```

```

端口复用
端口复用，也被称为端口共享，是指在同一台主机上，允许多个网络应用程序使用同一个网络端口的技术。这种技术可以有效地提高网络资源的利用率，避免端口资源的浪费。在网络安全场景下的端口复用主要目的是为了隐藏攻击痕迹和进行防火墙bypass。

重定向方式实现
使用场景通常为防火墙限制了访问端口。通过系统的流量转发功能实现，Linux下通过iptables实现流量转发。假设原本服务器开放了80端口，我们要将eth0网卡的80端口流量全部转发到本地代理监听端口8080。

iptables -t nat -A PREROUTING -i eth0 -p tcp --dport 80 -j REDIRECT --to-port 8080
再由监听的代理服务做流量分流处理，将带有代理特征的流量保留下来，目标流量发送回对应服务，保证原本服务正常进行。比如如果我们劫持转发的服务为web服务，而我们的代理协议使用的是socks5协议，我们可以通过协议头进行判断和过滤。

对于windows而言，非系统服务，比如重定向 Windows 上的 Apache 的 8080 端口到 1080 端口，我们可以使用 IpNat 进行转发。

# 转发命令 
netsh interface portproxy add v4tov4 listenport=源端口 listenaddress=源IP connectport=目标端口 connectaddress=目标IP

# 查看转发规则
netsh interface portproxy show all

# 删除规则
netsh interface portproxy delete v4tov4 listenport=源端口 listenaddress=源IP

```
