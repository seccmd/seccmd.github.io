---
date: 2024-04-01
title: frp配置与使用指南
authors: [SecAdmin]
description: >
  本页面聚焦frp相关配置与使用技巧，介绍frp官方文档链接，涵盖frp服务端仪表盘配置，如端口、用户名和密码设置，以及如何利用Systemd实现frp客户端的后台服务管理，包括服务启动、配置文件复制与Systemd服务单元文件编写等，助力用户高效运用frp进行网络穿透与服务代理。
categories: 网络工具
tags:
  - frp配置
  - 网络穿透
---

# frp配置与使用指南

### 文档 | frp (gofrp.org)
- https://gofrp.org/docs/

```
# ftp server dashborad
http://x.com:58080/static/#/

dashboard_port = 58080
dashboard_user = admin@qq.com
dashboard_pwd = passwd@qq.com

# 后台服务Systemd
systemctl start frpc
sudo cp frpc.service /etc/systemd/system/
[Unit]
Description=Frp Client Service
After=network.target
[Service]
Type=simple
User=nobody
Restart=on-failure
RestartSec=5s
ExecStart=/usr/bin/frpc -c /etc/frp/frpc.ini
ExecReload=/usr/bin/frpc reload -c /etc/frp/frpc.ini
LimitNOFILE=1048576
[Install]
WantedBy=multi-user.target
```
