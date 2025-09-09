---
date: 2023-09-01
title: Ubuntu APT国内镜像配置指南（20.04 LTS版）
author: [SecCMD]
description: >
  介绍Ubuntu系统中APT工具使用国内镜像的方法，主要针对20.04 LTS版本。通过备份并替换系统自带的软件源配置文件 `/etc/apt/sources.list`，使用TUNA软件源镜像，帮助用户提升软件更新和安装速度，为Ubuntu系统的软件管理提供便利。
categories: 基础工具
tags:
  - Ubuntu
  - APT镜像
---

# Ubuntu APT 国内镜像 

- Ubuntu 的软件源配置文件是 /etc/apt/sources.list。将系统自带的该文件做个备份，将该文件替换为下面内容，即可使用 TUNA 的软件源镜像。 
- https://mirror.tuna.tsinghua.edu.cn/help/ubuntu/

### 选择你的ubuntu版本:  20.04 LTS

    # 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释 
    deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse 
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse 
    deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse 
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse 
    deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse 
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse 
    deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse 
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse 
    # 预发布软件源，不建议启用 
    # deb http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse 
    # deb-src http://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse 
