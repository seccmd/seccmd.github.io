---
date: 2024-01-01
title: Supervisor安装、配置与使用指南
author: [SecCMD]
description: >
  本页面聚焦于Supervisor相关知识，涵盖Supervisor的安装方法，以及如何通过`systemctl status supervisord`命令查看其状态。详细介绍了配置文件所在位置，以及`supervisorctl`常用命令的使用，包括启动、停止、重启进程，重新加载配置以及停止全部进程等操作。同时通过创建`hwapp.conf`进程配置文件的实例，展示了如何对特定程序进行自动化管理，为系统进程管理提供全面且实用的指引。
categories: 基础工具
tags:
  - Supervisor
---

# Supervisor

### 安装

    apt-get install supervisor
    systemctl status supervisord

### 配置文件

    /etc/supervisor/supervisord.conf
    /etc/supervisor/conf.d

### supervisorctl 常用命令

    supervisorctl start/stop/restart program_name
    supervisorctl reload/upload
    supervisorctl stop all	停止全部进程

### 创建一个hwapp.conf进程配置文件：

    [program:hwapp]
    directory=/root/wwwroot/hwapp/publish
    command=dotnet hwapp.dll
    autostart=true
    autorestart=true
    startretries=10
    redirect_stderr=true
    stdout_logfile=/root/wwwroot/hwapp/hwapp.log
    environment=ASPNETCORE_ENVIRONMENT="Development"
