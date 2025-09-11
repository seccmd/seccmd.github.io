---
date: 2024-04-01
title: Frp
author: [SecCMD]
description: >
  本页面聚焦frp相关配置与使用技巧，介绍frp官方文档链接，涵盖frp服务端仪表盘配置，如端口、用户名和密码设置，以及如何利用Systemd实现frp客户端的后台服务管理，包括服务启动、配置文件复制与Systemd服务单元文件编写等，助力用户高效运用frp进行网络穿透与服务代理。
categories: 网络工具
tags:
  - frp配置
  - 网络穿透
---

https://github.com/fatedier/frp

## Frp config demo
```bash
# frp server dashborad
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

## Frp docker

```bash
# host config - /etc/frp/frpc.toml
serverAddr = "xl6455c.glddns.com"
serverPort = 1433
loginFailExit = false   # 登陆连接失败，继续尝试连接
auth.method = "token"
auth.token = ""

[[proxies]]
name = "sockes5"
type = "tcp"
remotePort = 1081
[proxies.plugin]
type = "socks5"
```

```yaml
# docker-compose
services:
  frpc:
    image: snowdreamtech/frpc
    container_name: frpc
    restart: always
    network_mode: host
    volumes:
      - /etc/frp/frpc.toml:/etc/frp/frpc.toml
```
## Frp good host


高速主机：[https://my.vultr.com/](https://my.vultr.com/) - github account

高速区域：都在西海岸
- Seattle 西雅图
- Silicon Valley 硅谷
- Los Angeles 洛杉矶


## Frp 设置开机启动

```bash
# 创建服务文件
sudo vi /etc/systemd/system/frpc.service

# 填入如下信息，ExecStart请自行替换
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