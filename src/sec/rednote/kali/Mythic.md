---
date: 2024-01-01
title: Mythic部署全流程
author: [SecCMD]
description: >
  本页面详细介绍Mythic的部署过程，包括下载源码、安装Docker和Docker-compose环境，以及使用自动安装部署脚本启动服务，同时指出部署过程中可能遇到的下载速度慢和内存需求大等问题。还介绍了在Mythic中安装Tetanus这一Windows和Linux C2代理的方法，以及Tetanus所支持的http C2配置文件的安装与启动方式，为用户提供全面的Mythic部署及相关工具使用指引。
categories: 攻防兼备
tags:
  - 渗透测试工具
  - C2框架部署
  - Mythic
---

# Mythic 部署

```
## 1. Mythic 下载源码 
git clone https://github.com/its-a-feature/Mythic 
  
## 2. Docker 环境安装 
  
// 国外资源比较慢 
./install_docker_ubuntu.sh script to install it for you. 
// 替代方案：清华资源 
https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/ 
  
## 3. Docker-compose 环境安装 
curl -L "https://github.com/docker/compose/releases/download/1.25.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
chmod +x /usr/local/bin/docker-compose 
  
## 4. 自动安装部署 
Mythic/.env // 配置文件 
sudo ./mythic-cli start  // 建议翻墙环境安装，国内很慢 
  
## 5. 启动服务 
sudo ./mythic-cli mythic start 
  
  
## 问题 
1.下载比较慢，使用evpn网速1MB，还是需要1个小时 
2.启动服务较多，最少需要4G内存 
```

```
Tetanus is a Windows and Linux C2 agent written in rust.
In the Mythic root directory, use mythic-cli to install the agent.
sudo ./mythic-cli install github https://github.com/MythicAgents/tetanus
sudo ./mythic-cli payload start tetanus

Tetanus supports the http C2 profile:
sudo ./mythic-cli install github https://github.com/MythicC2Profiles/http
sudo ./mythic-cli c2 start http

来自 <https://github.com/MythicAgents/tetanus> 
```