---
date: 2024-01-01
title: Proxychains安装与代理使用指南
author: [SecCMD]
description: >
  本页面专注于Proxychains相关知识，详细介绍了Proxychains的安装步骤，包括打开ssh代理以及使用apt-get命令安装，同时说明了如何配置/etc/proxychains.conf文件以适配代理设置。此外，还深入解析了两种代理方式，涵盖通过设置环境变量实现代理以及利用proxychains4命令实现代理，为用户在网络代理配置方面提供全面且实用的指引。
categories: 网络工具
tags:
  - 网络代理
  - Proxychains
---

# Proxychains

### 安装 proxychains

```
打开一个ssh 1080代理
ssh -D 1080  root@x.com

### 安装proxychains
sudo apt-get install proxychains

2.配置 /etc/proxychains.conf
修改 >socks4 127.0.0.1 9095为
socks5 127.0.0.1 1080
另外修改DNS：
proxy_dns 8.8.8.8

3. 执行
然后对于任何程序，只要在其前面加上proxychains命令就可以，例如：
proxychains xxx
xxx的所有连接就可以走proxychains了
```

### 代理方式一：
    ssh -D 1080 root@x.com
    curl --socks5 127.0.0.1:1080 cip.cc
    export http_proxy='socks5://127.0.0.1:1080'    
    export https_proxy='socks5://127.0.0.1:1080'
    export ALL_PROXY=socks5://127.0.0.1:1080

### 代理方式二：
    ssh -D 1080 root@x.com
    apt install proxychains4
    vi /etc/proxychains4.conf
    proxychains4 curl cip.cc
