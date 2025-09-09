---
date: 2023-07-09
title: 【推荐收藏】Windows 60+ 应急响应命令大全
author: [SecCMD]
description: >
  亲测收集整理！在安全应急响应中常用的操作命令。能够帮助工程师快速响应进行应急操作处置，帮助企业公司减少安全损失。在安全应急响应过程中需要使用系统命令进行止损和溯源网络攻击源头，但是命令太多容易忘记，上网现查又慢又累，不能快速阻止攻击，可能导致个人和企业的严重损失。
categories: 网络攻防
tags:
  - HackTool
---


亲测收集整理！在安全应急响应中常用的操作命令。能够帮助工程师快速响应进行应急操作处置，帮助企业公司减少安全损失。在安全应急响应过程中需要使用系统命令进行止损和溯源网络攻击源头，但是命令太多容易忘记，上网现查又慢又累，不能快速阻止攻击，可能导致个人和企业的严重损失。

## Windows 开机启动

在操作系统中，分析查看开机启动信息。

典型场景：在应急响应过程中，排查可疑系统启动项，应即时禁用或者删除恶意系统启动项。

注意事项：需要联系系统管理员确认启动项是否合法，防止错误禁用和删除了正常的合法启动项。



<!-- tab Powershell 命令行 -->

```powershell
# 查看开机启动项 :
Get-CimInstance Win32_StartupCommand | Select-Object Name, command, Location, User | Format-List

# 查看开机启动项 :
Get-psdrive
cd HKLM:\
Set-location -path HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion
Get-childitem -ErrorAction SilentlyContinue | Where-Object {$_.Name -like "*Run*"}
Set-location -path HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\
Get-childitem -ErrorAction SilentlyContinue | Where-Object {$_.Name -like "*Run*"}
```

<!-- tab CMD 命令行 -->

```sh
# 查看开机启动项 :
reg query HKLM\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

# 查看开机启动项 :
reg query HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Run

# WMIC 查看开机启动项 :
wmic startup get caption,command
```


## Windows 防火墙

在操作系统中，新建/删除主机防火墙规则，禁用/启用主机防火墙服务。

典型场景：在应急响应过程中，排查发现非法网络连接，快速通过防火墙阻断该地址和端口的通信，防止被持续控制。

注意事项：慎重操作防火墙拦截规则，防止错误防火墙规则导致网络完全中断。


<!-- tab Powershell 命令行 -->

``` powershell
# 封堵远程地址 :
New-NetFirewallRule -DisplayName HuoZhu100 -Direction Inbound -Action Block -RemoteAddress 10.10.10.0/24

# 封堵本地端口 :
New-NetFirewallRule -DisplayName HuoZhu100 -Direction Inbound -Action Block -Protocol TCP -LocalPort 8080

# 查看防火墙规则 :
Get-NetFirewallRule -DisplayName HuoZhu100 

# 查看防火墙规则 :
Get-NetFirewallRule -DisplayName HuoZhu100 | Get-NetFirewallAddressFilter 

# 删除防火墙规则 :
Remove-NetFirewallRule -DisplayName HuoZhu100 

# 防火墙运行状态 :
Get-NetFirewallProfile | Select-Object Name,Enabled

# 开启防火墙 :
Set-NetFirewallProfile -Enabled True

# 关闭防火墙 :
Set-NetFirewallProfile -Enabled False
```

<!-- tab CMD 命令行 -->

``` sh
# 封堵远程地址 :
netpowershell advfirewall firewall add rule name="HuoZhu100" dir=in action=block remoteip=10.10.10.0/24

# 封堵本地端口 :
netpowershell advfirewall firewall add rule name="HuoZhu100" dir=in action=block protocol=TCP localport=8080

# 查看防火墙规则 :
netpowershell advfirewall firewall powershellow rule name="HuoZhu100" 

# 删除防火墙规则 :
netpowershell advfirewall firewall delete rule name="HuoZhu100" 

# 防火墙运行状态 :
netpowershell advfirewall powershellow currentprofile

# 开启防火墙 :
netpowershell advfirewall set allprofiles state on

# 关闭防火墙 :
netpowershell advfirewall set allprofiles state off
```



## Windows 系统日志

在操作系统中，分析查看系统运行日志信息。

典型场景：在应急响应过程中，通过分析多个维度系统日志，溯源入侵攻击行为。

注意事项：确认日志时间是否正常，确认日志是否被删除或伪造。




<!-- tab Powershell 命令行 -->

``` powershell
# 查看日志清单 :
Get-EventLog -List

# 最近两个小时的安全日志 :
Get-EventLog Security -After (Get-Date).AddHours(-2) | Format-Table -AutoSize

# 最近两个小时登录成功的日志 :
Get-EventLog Security -After (Get-Date).AddHours(-2) | Where-Object {$_.InstanceID -like "4624"}

# 最近两个小时登录成功的详情 :
Get-EventLog Security -After (Get-Date).AddHours(-2) | Where-Object {$_.InstanceID -like "4624"} | Format-List

# 搜索指定系统日志 :
Get-EventLog System -After (Get-Date).AddHours(-2) | Where-Object {$_.Message -like "*Server*"}

# 最近两个小时的应用日志 :
Get-EventLog Application -After (Get-Date).AddHours(-2) | Format-Table -AutoSize
```
<!-- tab CMD 命令行 -->

```
# GUI 日志查看器 :
eventvwr.msc
```



## Windows 网络连接

在操作系统中，分析查看网络连接信息。

典型场景：在应急响应过程中，排查发现可疑网络连接，能够快速定位恶意进程。

注意事项：在大流量并发的服务器上，排查网络连接可能对性能会造成较严重影响。


<!-- tab Powershell 命令行 -->

``` powershell
# 查看网络连接 :
Get-NetTCPConnection -LocalAddress 192.168.0.100 | Sort-Object LocalPort

# 查看网络连接 :
Get-NetTCPConnection -LocalAddress 192.168.0.100 `
| Select local*,remote*,state,@{Name="Process";Expression={(Get-Process -Id $_.OwningProcess).ProcessName}} `
| Format-Table -AutoSize
```

<!-- tab CMD 命令行 -->

```sh
# 查看网络连接 :
netstat -ano
```






## Windows 进程管理

在操作系统中，关闭/查看系统进程，删除/新建系统服务。

典型场景：在应急响应过程中，排查发现可疑系统进程服务，应即时关闭恶意进程或者删除恶意服务，防止被持续控制。

注意事项：需要联系管理员确认进程服务是否为重要业务，防止错误关闭和删除了重要业务的进程服务。




<!-- tab Powershell 命令行 -->

``` powershell
# 查看全部进程 :
Get-Process

# 关闭进程 :
Stop-Process -Force -ID <PID>
```

<!-- tab CMD 命令行 -->
```sh
# 查看全部进程 :
taskmgr.exe | tasklist.exe

# 关闭进程 :
taskkill.exe /f /pid <PID>

# WMIC 查看全部进程 :
wmic process get name,parentprocessid,processid
```	





## Windows 服务管理

在操作系统中，关闭/查看系统进程，删除/新建系统服务。

典型场景：在应急响应过程中，排查发现可疑系统进程服务，应即时关闭恶意进程或者删除恶意服务，防止被持续控制。

注意事项：需要联系管理员确认进程服务是否为重要业务，防止错误关闭和删除了重要业务的进程服务。

<!-- tab Powershell 命令行 -->
``` PowerShell
# 查看全部服务 :
Get-Service

# 关闭服务 :
Stop-Service -Name <SERVICE_NAME>

# 启动服务 :
Start-Service -Name <SERVICE_NAME>
```
<!-- tab CMD 命令行 -->
```sh
# 查看全部服务 :
services.msc | sc query | tasklist /svc

# 关闭服务 :
net stop <SERVICE_NAME>

# 启动服务 :
net start <SERVICE_NAME>
```





## Windows 计划任务

在操作系统中，分析查看计划任务信息。

典型场景：在应急响应过程中，发现入侵者创建的异常计划任务，应即时禁用或者删除异常计划任务，防止被持续控制。

注意事项：需要联系系统管理员确认计划任务是否合法，防止错误禁用和删除了正常的计划任务。

<!-- tab Powershell 命令行 -->
``` PowerShell
# 查看计划任务 :
Get-ScheduledTask | Format-Table -AutoSize

# 查看指定计划任务 :
Get-ScheduledTask -TaskName Office* | Format-Table -AutoSize

# 禁用计划任务 :
Disable-ScheduledTask -taskname "Adobe Flash Player Updater"

# 启用计划任务 :
Enable-ScheduledTask -taskname "Adobe Flash Player Updater"
```
<!-- tab CMD 命令行 -->
```sh
# 显示所有计划任务 :
taskschd.msc | schtasks.exe /Query 

# 中止当前正在运行的计划任务 :
schtasks.exe /End /TN \Microsoft\Windows\NlaSvc\WiFiTask

# 删除计划任务 :
schtasks.exe /Delete /F /TN \Microsoft\Windows\NlaSvc\WiFiTask
```







## Windows 用户账号

在操作系统中，禁用/启用/删除/新建一个账号。

典型场景：在应急响应过程中，发现入侵者创建的异常账号，快速禁用或者删除该账号，防止被再次利用。

注意事项：需要联系系统管理员确认账号是否合法，防止错误禁用和删除了正常的合法账号。


<!-- tab Powershell 命令行 -->
``` PowerShell
# 查看账户列表 :
Get-LocalUser

# 禁用账户 :
Disable-LocalUser <USERNAME>

# 启用账户 :
Enable-LocalUser <USERNAME>

# 删除账户 :
Remove-LocalUser -Name <USERNAME>

# 新建账户 :
New-LocalUser -Name <USERNAME> -NoPassword
```
<!-- tab CMD 命令行 -->
```sh
# CMD 查看账户列表 :
net user

# CMD 禁用账户 :
net user <USERNAME> /active:no

# CMD 启用账户 :
net user <USERNAME> /active:yes

# CMD 删除账户 :
net user <USERNAME> /del

# CMD 新建账户 :
net user <USERNAME> <PASSWORD> /add

# CMD 修改账户密码 :
net user <USERNAME> <PASSWORD>
```


## Windows 应急工具

在应急响应过程中，使用功能强大的应急工具箱。

应急工具箱能够帮助我们，进行更深入全面的检测，发现可疑项。

|       |  |
| ----------- | ----------- |
| Sysinternals (Psexec ProcessMonitor Sysmon)  | https://docs.microsoft.com/en-us/sysinternals/downloads/ |
| Process Hacker | http://processhacker.sourceforge.net  |
| AutoRuns 是一款项目管理工具，查看资源管理器、IE浏览器、计划任务、驱动等信息 | https://filehippo.com/zh/download_autoruns |
| PC Hunter 是一个Windows系统信息查看软件，同时也是一个手工杀毒辅助软件 | http://www.xuetr.com/ |
| PowerTool 是一款手工杀毒辅助，进程管理辅助工具 | https://www.portablesoft.org/ |
| Process Lasso也是一款优秀的进程管理辅助工具，它同时可以监视进程动作 | http://www.processlassopro.com/ |
| 火绒剑 是一款优秀的进程管理分析工具 | http://down4.huorong.cn/hrsword.exe |
| Windows系统安全登录日志分析工具 | https://github.com/TheKingOfDuck/logonTracer |


## Windows 命令探索

``` PowerShell
dsquery server   # 查看所有域控制器 
dsquery subnet   # 查看域内内子网 
dsquery group    # 查看域内工作组 
dsquery site     # 查看域内站点 
net time /domain # 查看域名、时间
net view /domain # 查看域内所有共享

# 快速查找未打的安全补丁 
systeminfo>bzhack.txt&
(for %i in ( KB977165 KB2160329 KB2503665 KB2592799 KB2707511 KB2829361 KB2850851 KB3000061 KB3045171 KB3077657 KB3079904 KB3134228 KB3143141 KB3141780 ) do @type bzhack.txt|@find /i "%i"|| @echo %i you can exp)&
del /f /q /a bzhack.txt

# PowerShell 快速上传SSH密钥
type $env:USERPROFILE\.ssh\id_rsa.pub | ssh root@1.1.1.1 "cat >> .ssh/authorized_keys"
```

