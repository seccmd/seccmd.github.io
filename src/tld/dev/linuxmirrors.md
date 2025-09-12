---
title: 1.Linux 国内镜像源
author: [SecCMD]
description: >
  使用国内镜像的方法。
categories: 基础工具
tags:
  - 镜像
---

非常高频遇到的问题，找到成熟的自动化脚本，一键执行即可。

优雅很多，不用浪费时间去手动配置。

- https://linuxmirrors.cn/

## 一键执行配置国内镜像源

```bash
bash <(curl -sSL https://linuxmirrors.cn/main.sh)
```

## Docker 安装与换源脚本

```bash
bash <(curl -sSL https://linuxmirrors.cn/docker.sh)
```
