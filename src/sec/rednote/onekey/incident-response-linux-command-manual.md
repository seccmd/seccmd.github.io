---
date: 2023-07-09
title: 【推荐收藏】Linux 50+ 应急响应命令大全
author: [SecCMD]
description: >
  亲测收集整理！在安全应急响应中常用的操作命令。能够帮助工程师快速响应进行应急操作处置，帮助企业公司减少安全损失。在安全应急响应过程中需要使用系统命令进行止损和溯源网络攻击源头，但是命令太多容易忘记，上网现查又慢又累，不能快速阻止攻击，可能导致个人和企业的严重损失。
categories: 网络攻防
tags:
  - HackTool
---

亲测收集整理！在安全应急响应中常用的操作命令。能够帮助工程师快速响应进行应急操作处置，帮助企业公司减少安全损失。在安全应急响应过程中需要使用系统命令进行止损和溯源网络攻击源头，但是命令太多容易忘记，上网现查又慢又累，不能快速阻止攻击，可能导致个人和企业的严重损失。

## Linux 开机启动

在操作系统中，分析查看开机启动信息。

典型场景：在应急响应过程中，排查可疑系统启动项，应即时禁用或者删除恶意系统启动项。

注意事项：需要联系系统管理员确认启动项是否合法，防止错误禁用和删除了正常的合法启动项。

```bash Shell 命令行
# 查看开机启动项 :
cat /etc/rc.local

# 查看开机启动项文件 :
ls /etc/profile.d/

# SysV启动位置有：
/etc/init
/etc/init.d
/etc/rc.d
/etc/rc[0-6].d
/etc/rc.local
/etc/inittab

# Systemd启动位置有：
/etc/systemd
~/.config/systemd/user

# Xserver启动位置有：
/etc/xdg/autostart
~/.config/autostart
```

## Linux 防火墙

在操作系统中，新建/删除主机防火墙规则，禁用/启用主机防火墙服务。

典型场景：在应急响应过程中，排查发现非法网络连接，通过防火墙快速阻断该地址和端口的通信，防止被持续控制。

注意事项：慎重操作防火墙拦截规则，防止错误防火墙规则导致网络完全中断。

```bash IPTABLES 命令行
# 封堵远程地址 :
iptables -I INPUT -s 10.10.10.0/24 -j DROP

# 删除防火墙规则 :
iptables -D INPUT -s 10.10.10.0/24 -j DROP

# 封堵本地端口 :
iptables -I INPUT -p tcp --dport 8080 -j DROP

# 删除防火墙规则 :
iptables -D INPUT -p tcp --dport 8080 -j DROP

# 查看防火墙规则 :
iptables -L

# 清空防火墙规则 :
iptables -F

# Firewalld 防火墙 :
service firewalld status
service firewalld start
service firewalld stop

# ufw 防火墙 :
sudo ufw status
sudo ufw enable
sudo ufw disable
```

## Linux 系统日志

在操作系统中，分析查看系统运行日志信息。

典型场景：在应急响应过程中，通过分析多个维度系统日志，溯源入侵攻击行为。

注意事项：确认日志时间是否正常，确认日志是否被删除或伪造。

```bash Shell 命令行
# 系统安全日志 :
/var/log/secure

# 系统启动日志 :
/var/log/boot.log

# 用户登录日志 :
/var/log/lastlog

# 计划任务日志 :
/var/log/cron

# 程序执行、系统错误、启动信息等系统日志 :
/var/log/messages
```

## Linux 网络连接

在操作系统中，分析查看网络连接信息。

典型场景：在应急响应过程中，排查发现可疑网络连接，能够快速定位恶意进程。

注意事项：在大流量并发的服务器上，排查网络连接可能对性能会造成较严重影响。

```bash Shell 命令行
# 查找不常用的监听端口 :
netstat -anp
iftop

# 运行的进程监听了端口 :
lsof -i
lsof -nPi tcp:443

# 使用ss命令查看TCP协议：
ss -anpt

# 使用ss命令查看UDP协议：
ss -anpu

# 使用 tcpdump 分析：
tcpdump -i {网卡名} host {本地IP} and udp port {本地端口号}

# ARP表 :
arp -a

# 查找监听模式的网卡 :
ip link | grep PROMISC

# 提取所有活跃的连接 tcp ip
$ netstat -ant |& grep -Po '(\d{1,3}\.){3}\d{1,3}' | sort | grep -v 10.187.0 | uniq -c
```

## Linux 进程管理

在操作系统中，关闭/查看系统进程，删除/新建系统服务。

典型场景：在应急响应过程中，排查发现可疑系统进程服务，应即时关闭恶意进程或者删除恶意服务，防止被持续控制。

注意事项：需要联系管理员确认进程服务是否为重要业务，防止错误关闭和删除了重要业务的进程服务。

```bash Shell 命令行
# 查看全部进程 :
ps -aux || ps -ef

# 定位高CPU占用的进程
ps -eo cmd,pcpu,pid,user --sort -pcpu | head

# 查看进程树
pstree -sp <PID>

# 关闭进程 :
kill -9 <PID>

# 给它 STOP 信号不让 cpu 切换到它，不直接 kill 掉它
$ kill -STOP <PID>

# 查看进程信息 :
ls -al /proc/<PID>/fd
ls -al /proc/<PID>/exe
cat /proc/<PID>/cmdline

# 查看进程文件描述符 :
lsof -p <PID>

# 查看所有进程PID及运行命令
perf top -s comm,pid

# 跟踪进程执行时的系统调用和所接收的信号
strace ls

# 系统启动命令行也可能引入外部启动参数：
cat /proc/cmdline

# Nvidia显卡官方驱动自带命令看GPU占用情况：
nvidia-smi -q -d utilization -l
```

## Linux 服务管理

在操作系统中，关闭/查看系统进程，删除/新建系统服务。

典型场景：在应急响应过程中，排查发现可疑系统进程服务，应即时关闭恶意进程或者删除恶意服务，防止被持续控制。

注意事项：需要联系管理员确认进程服务是否为重要业务，防止错误关闭和删除了重要业务的进程服务。

```bash Shell 命令行
# 查看全部服务 :
systemctl

# 查看服务运行状态 :
systemctl status <SERVICE_NAME>

# 关闭服务 :
systemctl stop <SERVICE_NAME>

# 启动服务 :
systemctl start <SERVICE_NAME>

# 环境变量
systemctl set-environment testu=testm
systemctl show-environment

# 查看全部服务的启动命令 :
grep -R ExecStart /etc/systemd/system/*

# 创建服务
vi /etc/systemd/system/multi-user.target.wants/connection.service

[Unit]
Description = making network connection up
After = network.target

[Service]
ExecStart = /root/scripts/conup.sh

[Install]
WantedBy = multi-user.target


systemctl enable connection.service
systemctl start connection.service
```

## Linux 计划任务

在操作系统中，分析查看计划任务信息。

典型场景：在应急响应过程中，发现入侵者创建的异常计划任务，应即时禁用或者删除异常计划任务，防止被持续控制。

注意事项：需要联系系统管理员确认计划任务是否合法，防止错误禁用和删除了正常的计划任务。

```bash Shell 命令行
# Root用户定时任务 :
crontab -u root -l

# 系统定时任务 :
cat /etc/crontab
cat /etc/anacrontab

# 查看计划任务文件 :
ls -la /var/spool/cron/
ls -la /var/spool/anacron/
ls -la /var/spool/at/spool/

# 系统定时任务文件 :
$ find /etc/cron* -type f
/etc/cron.d/sysstat
/etc/cron.d/0hourly
/etc/cron.daily/logrotate
/etc/cron.daily/man-db.cron
/etc/cron.deny
/etc/cron.hourly/0anacron

# atd 调度命令列表：
at -l

# systemd-timers 的位置在/etc/systemd子目录下：
systemctl list-timers
systemctl list-unit-files | grep timer

# 查看定时器
systemctl list-timers
systemctl --user list-timers

find / -name apt-daily.timer
/etc/systemd/system/timers.target.wants/apt-daily.timer
/lib/systemd/system/apt-daily.timer

# 创建定时器
# Created a file at /etc/systemd/system/syncthing-monitoring.service
[Unit]
Description=Syncthing monitoring

[Service]
User=...
Group=...
Environment="TOKEN=..."
Environment="CHAT_ID=..."
Type=oneshot
ExecStart=/usr/bin/touch /tmp/foo

# Created timer file at /etc/systemd/system/syncthing-monitoring.timer
[Unit]
Description=Syncthing monitoring

[Timer]
OnBootSec=5m
OnUnitActiveSec=1h

[Install]
WantedBy=timers.target

# The commands to enable/start the timer:
sudo systemctl enable syncthing-monitoring.timer
sudo systemctl start syncthing-monitoring.timer

# 创建临时定时器：
systemd-run --on-active=1 /bin/touch /tmp/foo

# 临时定时器保存目录，重启后清空 
/run/systemd/transient
Ref: https://wiki.archlinuxcn.org/wiki/Systemd/%E5%AE%9A%E6%97%B6%E5%99%A8
```


## Linux 用户账号

在操作系统中，禁用/启用/删除/新建一个账号。

典型场景：在应急响应过程中，发现入侵者创建的异常账号，快速禁用或者删除该账号，防止被再次利用。

注意事项：需要联系系统管理员确认账号是否合法，防止错误禁用和删除了正常的合法账号。

```bash Shell 命令行
# 显示当前用户登录信息及执行的命令 :
w

# 查看当前登录用户（tty本地登陆 pts远程登录） :
who

# 列出所有用户登陆信息 :
last

# 列出所有用户登陆失败的信息 :
lastb

# 列出所有用户最近一次登录信息 :
lastlog

# 查看账户列表 :
cat /etc/shadow

# 修改账户密码 :
passwd <USERNAME>

# 禁用账户 :
passwd -l <USERNAME>

# 启用账户 :
passwd -u <USERNAME>

# 删除账户 :
userdel <USERNAME>

# 新建账户 :
useradd <USERNAME>

默认用户密钥位文件是否被篡改：
cat ~/.ssh/authorized_keys

攻击者增加其他密钥信任文件：
grep AuthorizedKeysFile /etc/ssh/sshd_config

# 查询 UID 为 0 的账号:
egrep ':0+:' /etc/passwd
```

## 搜索被篡改或增加的系统文件

```sh
# Centos 系统：
rpm -Va

# Debian/Ubuntu 系统：
apt install debsums
dpkg -l | awk '/^ii/ { print $2 }' | xargs debsums | grep -vE 'OK$'

# Usage: rpm [OPTION...]

Query options (with -q or --query):
Verify options (with -V or --verify):
Query/Verify package selection options:
  -a, --all                        query/verify all packages
  -f, --file                       query/verify package(s) owning file
  -p, --package                    query/verify a package file
  -l, --list                       list files in package

# 显示全部安装包
$ rpm -qa

# 验证全部安装包，显示丢失或被修改的文件
$ rpm -qaV
S – File size differs
M – Mode differs (permissions)
5 – MD5 sum differs
D – Device number mismatch
L – readLink path mismatch
U – user ownership differs
G – group ownership differs
T – modification time differs

# 验证安装包，哪些文件丢失或被修改
$ rpm -V  PACKAGE_NAME

# 列出安装包包含的文件
$ rpm -ql PACKAGE_NAME

# 查询文件归属哪个安装包
$ rpm -qf /path/to/file
```

## 环境变量
```
# 查看可疑动态加载的库文件
cat /etc/ld.so.preload
ls -alh /etc/ld.so.conf.d/ 

# 查看可疑环境变量：PATH/LD_LIBRARY_PATH/LD_PRELOAD/LD_AUDIT 
export |grep *.so
env | grep PATH
env | grep LD_

# alias 命令查看当前所有命令别名：
alias

set    # 显示当前终端变量
env    # 显示用户环境变量
export # 显示和设置用户环境变量
```

## 用户会话配置文件
```sh
# 系统配置文件位置有：
/etc/profile
/etc/profile.d
/etc/environment
/etc/bashrc

# 用户目录配置文件有：
~/.profile
~/.bashrc
~/.bash_profile
~/.bash_logout
~/.zshrc

# X Window服务，配置文件：
~/.xprofile
~/.xinitrc

# source 命令
- source 命令用于在当前 shell 环境中执行指定脚本文件，并将其中的变量和函数导入到当前环境中。它通常用于加载脚本文件中的环境变量、别名和函数定义，以便在当前会话中可以直接使用它们。
- 使用方法如下：source <脚本文件路径>
- 或者可以使用其简写形式：. <脚本文件路径>
- 注意，source 命令是在当前进程中执行脚本，而不是启动一个新的子进程。这意味着脚本文件中的变量和函数都会影响到当前的 shell 环境。
- source 命令通常用于加载 shell 配置文件（如 ~/.bashrc 或 ~/.profile），以便立即生效，而不需要重新登录或启动新的终端会话。此外，它还可以用于加载其他自定义脚本文件，以便在当前会话中使用特定的环境设置或功能。
```

## 其他命令
```
# 查询过去 3 天内 /etc 被读取的文件
find /etc -atime -3

lsattr test.txt
----ia---------- test.txt
chattr -ia test.txt

find / -nouser -print

Look for unusual SUID root files:
# find / -uid 0 –perm -4000 –print

This requires knowledge of normal SUID files.
Look for unusual large files (greater than 10
MegaBytes):
# find / -size +10000k –print

This requires knowledge of normal large files.
Look for files named with dots and spaces ("...", ".. ",
". ", and " ") used to camouflage files:
# find / -name " " –print
# find / -name ".. " –print
# find / -name ". " –print
# find / -name " " –print

/etc/modprobe*
/etc/modules*
/etc/initcpio
/etc/initramfs
/etc/yum
/etc/apt
/etc/hosts
```

## Linux 应急工具

在应急响应过程中，使用功能强大的应急工具箱。应急工具箱能够帮助我们，进行更深入全面的检测，发现可疑项。

|       |  |
| ----------- | ----------- |
| Chkrootkit  | http://www.chkrootkit.org/       |
| Tripwire    | http://www.tripwire.org/         |
| AIDE        | http://www.cs.tut.fi/~rammer/aide.html |
| CIS         | http://www.cisecurity.org/ |
| Bastille    | http://www.bastille-linux.org/ |
