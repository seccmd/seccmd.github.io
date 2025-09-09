---
date: 2022-01-01
title: Systemd服务配置指南
authors: [SecAdmin]
description: >
  本页面聚焦于Systemd服务配置相关知识，通过frp开机自启设置的实例，详细介绍了如何创建服务文件、填写关键配置信息，如服务描述、启动依赖、用户与组设置、重启策略以及具体执行命令等。同时还涵盖了刷新服务列表、设置与关闭开机自启、启动与停止服务以及查看服务状态等一系列操作，为用户利用Systemd进行服务管理提供全面且实用的指引，后续还将补充一键脚本相关内容。
categories: 基础工具
tags:
  - Systemd
  - 开机自启
---

# Systemd Demo

### 设置frp开机自启: https://www.cnblogs.com/srczhang/p/12698685.html
```
创建服务文件
sudo vi /etc/systemd/system/frpc.service
填入如下信息，ExecStart请自行替换
[Unit]
Description=Frp Client
After=network.target
Wants=network.target
[Service]
User=frp
Group=frp
Restart=on-failure
RestartSec=5
ExecStart=/home/frp/frps/frps -c /home/frp/frps/frps.ini
[Install]
WantedBy=multi-user.target
#刷新服务列表：
systemctl daemon-reload
#设置开机自启
systemctl enable frpc
#关闭开机自启
systemctl disable frpc
#启动服务
systemctl start frpc
#停止服务
systemctl stop frpc
#服务状态
systemctl status frpc
```

### 一键脚本: 待补充
