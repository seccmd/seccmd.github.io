---
date: 2024-03-01
title: Docker国内安装全攻略及镜像加速指南
author: [SecCMD]
description: >
  本页面聚焦Docker在Windows、Linux等多平台的国内安装解决方案，提供便捷的一键安装命令及备用安装链接，以应对不同网络环境。同时详细介绍Docker镜像加速配置方法，涵盖临时使用与长久有效的配置方式，以及Docker Desktop国内镜像源设置和Docker-CE国内镜像安装步骤，还推荐了Docker学习项目，助力用户高效掌握Docker安装与使用技巧。
categories: 基础工具
tags:
  - Docker安装
  - 镜像加速
---

# Docker 国内安装解决方案

- 支持Linux、Win、Mac
- https://github.com/tech-shrimp/docker_installer/releases

## Windows

- 任务栏搜索功能，启用"适用于Linux的Windows子系统" + "虚拟机平台"
- 管理员权限打开命令提示符，安装wsl2
wsl --set-default-version 2
wsl --update --web-download
- 下载Windows版本安装包，进入此项目的Release
https://github.com/tech-shrimp/docker_installer/releases

## Linux 

```
# 一键安装命令（每天自动从官网定时同步）
sudo curl -fsSL https://github.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun

# 备用（如果Github访问不了，可以使用Gitee的链接）
sudo curl -fsSL https://gitee.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun

# 启动docker
sudo service docker start
```
## Docker 好的学习项目（多个一键安装项目、工具、学习游戏）

- https://github.com/y0ngb1n/dockerized

## Docker 国内可用镜像加速列表

- https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea

```
# 配置方式1：临时使用
# 直接使用，直接拿镜像域名拼接上官方镜像名，例如要拉去镜像yidadaa/chatgpt-next-web，可以用下面写法

docker pull dockerpull.com/yidadaa/chatgpt-next-web


# 配置方式2：长久有效 Ubuntu 16.04+、Debian 8+、CentOS 7+
# 修改文件 /etc/docker/daemon.json（如果不存在则需要创建创建，注意不要写入中文），并重启服务。

sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
    	"https://dockerpull.com",
        "https://docker.anyhub.us.kg",
        "https://dockerhub.jobcher.com",
        "https://dockerhub.icu",
        "https://docker.awsl9527.cn"
    ]
}
EOF

sudo systemctl daemon-reload && sudo systemctl restart docker

# 可直接使用docker pull拉去镜像进行测试，或用以下命令检查是否生效：

docker info
```

## Docker Desktop国内镜像源

- https://www.cnblogs.com/Flat-White/p/17107494.html

- 打开Docker Desktop设置 > Docker Engine

```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ]
}
```

### Docker-CE 国内镜像

```
Docker-CE 国内镜像
https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/

# 如果你过去安装过 docker，先删掉:
sudo apt-get remove docker docker-engine docker.io

# 首先安装依赖:
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common

# 根据你的发行版，下面的内容有所不同。你使用的发行版： 
# 信任 Docker 的 GPG 公钥:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 对于 amd64 架构的计算机，添加软件仓库:
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 如果你是树莓派或其它 ARM 架构计算机，请运行:
echo "deb [arch=armhf] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
     $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list

# 最后安装
sudo apt-get update
sudo apt-get install docker-ce
```

### Docker-Compose 国外

### Install Docker
Follow this guide https://docs.docker.com/linux/step_one/ to get Docker installed

### Install Docker-Compose version 1.24.0 (64 bit) via cURL
1. sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose

### Set the executable permissions:
1. sudo chmod +x /usr/local/bin/docker-compose
2. sudo docker-compose --version
3. sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compos

