---
date: 2022-09-01
title: 一键安装Dante建立socks5代理
author: [SecCMD]
description: >
  一键安装Dante建立socks5代理
categories: 基础工具
tags:
  - 网络代理
---

下载一键安装脚本

```
$ curl -o socks5.sh https://raw.githubusercontent.com/Lozy/danted/refs/heads/master/install.sh
```

安装 Dante

```
$ sudo chmod +x socks5.sh
$ ./socks5.sh --port=端口 --user=用户名 --passwd=密码
```

启动 Dante socks5 代理服务器并加入开机启动

```
$ sudo service sockd start
$ sudo systemctl enable sockd
```

代理测试

```
curl -v --socks5 1.2.3.4:80 --proxy-user name:pass http://abc.com
curl -x socks5://username:password@proxy_server_ip:1080 https://ifconfig.me
curl -x socks5://username:password@proxy_server_ip:1080 https://ipinfo.io
```
