---
date: 2024-01-01
title: SSH全攻略：安装、配置、代理
authors: [SecAdmin]
description: >
  本页面全方位介绍SSH相关知识，涵盖Win系统安装ssh服务的步骤，autossh的使用方法，SSH命令三种代理功能（-L/-R/-D）的详细解析与命令示例，SSH客户端参数说明，配置ssh免密登录、远程端口转发（内网穿透）的操作流程，以及使用systemctl实现断线重连和开机自动运行、心跳检测的配置方法，还有autossh模式、supervisor模式和OpenWRT配置ssh的内容，同时包含SSH配置中限制用户和IP登录的方法。
categories: 基础工具
tags:
  - 远程连接
  - 服务器管理
---

# SSH

### Win 安装 ssh 服务
```
- https://www.jianshu.com/p/d682b645615f
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
# Start the sshd service
Start-Service sshd
# OPTIONAL but recommended:
Set-Service -Name sshd -StartupType 'Automatic'
```

### autossh

 autossh -M 8888 -NCfR 2222:localhost:22 -o ServerAliveInterval=30 root@ssh.test.cn
 1. ssh-keygen
 2. cat ~/.ssh/id_rsa.pub


## SSH 命令的三种代理功能（-L/-R/-D） 

- https://www.cnblogs.com/cangqinglang/p/12732661.html

```
- 正向代理（-L）：相当于 iptable 的 port forwarding
- 反向代理（-R）：相当于 frp 或者 ngrok
- socks5 代理（-D）：相当于 ss/ssr
```

## 命令示例

ssh -qTnN -o "ServerAliveInterval 10" -o "TCPKeepAlive yes" -R 0.0.0.0:3389:192.168.137.10:3389 root@www.glddns.com

```
ssh -NT -R 1122:127.0.0.1:22 用户名@服务器IP
ssh -R 9966:127.0.0.1:8080 user@<云服务器 IP> -i wang.pem
HostB$ ssh -L 0.0.0.0:PortB:HostC:PortC user@HostC
HostA$ ssh -L 0.0.0.0:PortA:HostC:PortC  user@HostB
HostA$ ssh -R HostC:PortC:HostB:PortB  user@HostC
HostA$ ssh -D localhost:1080  HostB

ssh -o "ServerAliveInterval 10" -o "TCPKeepAlive yes"

# ssh 客户端参数
su -c \
"ssh -N -C \
-L 0.0.0.0:$PORT:$TARGET_PORT remote_user@$TUNNEL_GATEWAY \
-o \"ServerAliveInterval 30\" -o \"TCPKeepAlive yes\"" \
local_user
```

## SSH 客户端参数

- ssh -CqTnN
* -C 为压缩数据
* -q 安静模式
* -T 禁止远程分配终端
* -n 关闭标准输入
* -N 不执行远程命令
* -f 后台运行
* -o KexAlgorithms=+ssh-rsa 是SSH的选项，用于指定密钥交换算法（Key Exchange Algorithms）。+ssh-rsa 表示仅使用RSA算法。
* -i wang.pem

## 配置ssh免密登录

```
# 输入密码之后即完成免密登录配置，之后再执行ssh命令连接到服务器就不用再输入密码了。
$ ssh-keygen
$ ssh-copy-id 用户名@服务器IP
```

## 远程端口转发 (内网穿透)配置

- GatewayPorts 用于指定是否允许远程主机连接到为客户端转发的端口。
- 当设置为 yes 时，sshd 将允许远程端口转发绑定到 (0.0.0.0)，从而允许其他主机连接。

```
sudo vim /etc/ssh/sshd_config
GatewayPorts yes
sudo systemctl restart sshd
```

## 使用systemctl来实现断线重连和开机自动运行

```
# 在客户端创建一个systemctl服务配置文件
sudo vi /usr/lib/systemd/system/ssh-link.service

# 写入以下内容：
[Unit]
Description=ssh port forwarding service.
[Service]
Type=simple
ExecStart= /bin/sh -c 'ssh -NT -R 1122:127.0.0.1:22 用户名@服务器IP'
Restart=always
RestartSec=10
User=pi
Group=pi
[Install] 
WantedBy=multi-user.target

# User和Group为执行ssh-keygen命令的用户和用户组。
# Restart=always表示ssh命令退出后，等待RestartSec=10秒，然后重新执行。

# 保存后运行一下：
sudo systemctl start ssh-link

# 查看运行状态，正常情况如下：
sudo systemctl status ssh-link

# 配置开机启动
sudo systemctl enable ssh-link
```

## 心跳检测

- https://segmentfault.com/a/1190000038153088
- 一个稳定的ssh端口转发连接就建立起来了（已经经过数月的实际测试，断线后会自动重连）

服务端配置

```
# ssh命令退出后，systemctl会重新执行ssh命令以建立连接。但有些特殊情况下，连接实际上断开了，但ssh命令没有结束。
# 例如服务器突然断电/网线被拔掉，服务器没有发送TCP reset包，所以客户端不知道连接断开，也就不会退出ssh命令。
# 同理，客户端突然断电，服务器也不知道客户端“挂了”。如果客户端随后重新联网并创建ssh端口转发，可能会提示服务器端口已被占用（因为服务器上之前的ssh会话还保持着）。
# 实际上，TCP连接是有心跳检测机制的，即TCP KeepAlive，不过它默认2小时发送一次心跳包，这实在是太长了。

# 在服务器上编辑sshd配置文件/etc/ssh/sshd_config, 配置以下参数：
# ClientAliveInterval：参数表示如果服务器连续N秒没有收到来自客户端的数据包，则服务器会向客户端发送一条消息。
# ClientAliveCountMax：表示如果服务器发送了N次数据到客户端都没有收到回应时，就会认为连接已经断开，服务器会结束会话、关闭监听的端口。
ClientAliveInterval 10
ClientAliveCountMax 3

# 上述配置表示，如果服务器连续10秒没有收到客户端的数据，就会主动发送数据给客户端。
# 连续发送了3次数据到客户端，都没有收到回复就断开连接。这意味着，网络断开后的最长30秒内，服务器就会关闭ssh会话。

# 保存之后需要重新sshd服务：
sudo systemctl restart sshd


# todo?
TCPKeepAlive yes
```

客户端配置

```
# 通过上述配置，服务器就可以检测客户端是否存活。
# 同理，也需要修改客户端的配置，让客户端可以检测服务端是否存活。
# 在客户端编辑配置文件/etc/ssh/ssh_config，配置以下参数：
ServerAliveInterval 10
ServerAliveCountMax 3

# 保存之后在客户端重启ssh：
sudo systemctl restart ssh

```

## autossh 模式

- https://zhuanlan.zhihu.com/p/680289253
- 编译安装 Autossh
- apt 安装 autossh

## supervisor 模式

- https://www.codewoody.com/posts/52376/

## OpenWRT 配置 ssh

```
* dropbear 和标准sshd服务差异较大
- https://openwrt.org/docs/guide-user/base-system/dropbear
- SSHKeepAlive	integer	no	300


# openwrt ssh免密登录
- https://www.cnblogs.com/xiaohuamao/p/12095358.html

* 重点：1.生成特定密钥，2.存放到指定路径

- 免密登录，特定配置密钥，可能是性能原因
- ssh-keygen -b 1024 -t -rsa

1 生成相关秘钥
dropbearkey -t rsa -f id_rsa
dropbearkey -y -f id_rsa | grep "^ssh-rsa" >> authorized_keys
 

2 存放到指定路径
/etc/dropbear/authorized_keys (服务端)
/etc/dropbear/id_rsa  (客户端)
```

### 配置

```
其他:
限制用户 SSH 登录
# 1.只允许指定用户进行登录（白名单）：
# 在 /etc/ssh/sshd_config 配置文件中设置 AllowUsers 选项，（配置完成需要重启 SSHD 服务）格式如下：
> AllowUsers    aliyun test@192.168.1.1   # 允许 aliyun 和从 192.168.1.1 登录的 test 帐户通过 SSH 登录系统。
# 2.只拒绝指定用户进行登录（黑名单）：
# 在/etc/ssh/sshd_config配置文件中设置DenyUsers选项，（配置完成需要重启SSHD服务）格式如下：   
> DenyUsers    zhangsan aliyun  # 拒绝 zhangsan、aliyun 帐户通过 SSH 登录系统
限制 IP SSH 登录
# 通过hosts.allow许可大于hosts.deny限制或者允许某个或者某段IP地址远程 SSH 登录服务器，具体如下：
# hosts.allow 文件中的规则优先级高，按照此方法设置后服务器只允许 192.168.0.1 这个 IP 地址的 ssh 登录，其它的 IP 都会拒绝。
> vim /etc/hosts.allow， 添加
> sshd:192.168.0.1:allow  #允许 192.168.0.1 这个 IP 地址 ssh 登录
> sshd:192.168.0.1/24:allow #允许 192.168.0.1/24 这段 IP 地址的用户登录
> vim /etc/hosts.allow，添加
> sshd:ALL # 允许全部的 ssh 登录 
```
