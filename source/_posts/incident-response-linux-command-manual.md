---
date: 2023-07-09
title: 【推荐收藏】Linux 50+ 应急响应命令大全
authors: [SecAdmin]
description: >
  亲测收集整理！在安全应急响应中常用的操作命令。能够帮助工程师快速响应进行应急操作处置，帮助企业公司减少安全损失。在安全应急响应过程中需要使用系统命令进行止损和溯源网络攻击源头，但是命令太多容易忘记，上网现查又慢又累，不能快速阻止攻击，可能导致个人和企业的严重损失。
categories: 网络攻防
tags:
  - HackTool
---

{% ablock 我是数字安全极客，持续分享安全干货，点点关注不迷路！ color:warning %}
欢迎安全爱好者，加好友交流 微信：SecCMD | [Twiter](https://twitter.com/sec_cmd) | [知乎](https://www.zhihu.com/people/mlsec) | [GitHub](https://github.com/seccmd/)  
{% endablock %}

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

# 查看开机启动项文件 :
ls /etc/init.d/

# 查看开机启动项文件 :
ls /etc/rc.d/init.d/
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

# 防火墙运行状态 :
service firewalld status

# 开启防火墙 :
service firewalld start

# 关闭防火墙 :
service firewalld stop
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
# 查找监听模式的网卡 :
ip link | grep PROMISC

# 查找不常用的监听端口 :
netstat -anp

# 运行的进程监听了端口 :
lsof -i

# ARP表 :
arp -a
```

## Linux 进程管理

在操作系统中，关闭/查看系统进程，删除/新建系统服务。

典型场景：在应急响应过程中，排查发现可疑系统进程服务，应即时关闭恶意进程或者删除恶意服务，防止被持续控制。

注意事项：需要联系管理员确认进程服务是否为重要业务，防止错误关闭和删除了重要业务的进程服务。

```bash Shell 命令行
# 查看全部进程 :
ps -aux || ps -ef || pstree

# 关闭进程 :
kill -9 <PID>

# 查看进程文件描述符 :
ls -al /proc/<PID>/fd

# 查看进程文件描述符 :
lsof -p <PID>
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

# 系统定时任务 :
cat /etc/anacrontab

# 系统定时任务文件 :
ls /etc/cron.*

# 查看计划任务文件 :
ls -la /var/spool/cron/

# 查看计划任务文件 :
ls -la /var/spool/anacron/
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
