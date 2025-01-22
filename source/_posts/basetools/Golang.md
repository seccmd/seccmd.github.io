---
date: 2023-02-01
title: Golang安装指南
authors: [SecAdmin]
description: >
  本页面聚焦Golang安装相关技巧，提供Golang下载地址，详细介绍在Linux系统上的安装步骤，包括解压安装包到指定目录，以及正确配置GOROOT、GOPATH环境变量和将Go二进制文件路径添加到系统PATH的方法，助力用户顺利搭建Golang开发环境。
categories: 基础工具
tags:
  - Golang安装
  - 环境变量配置
  - 编程语言环境搭建
---

# Golang安装指南 

- https://golang.google.cn/dl/

### Install

```
tar -xvf go1.16.linux-amd64.tar.gz -C /usr/local/
export GOROOT=/usr/local/go #GOROOT是系统上安装Go软件包的位置。
export GOPATH=/root/go #GOPATH是工作目录的位置。
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```
