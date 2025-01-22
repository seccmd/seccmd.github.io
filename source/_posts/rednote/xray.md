---
date: 2021-01-03
title: xray 代理模式进行漏洞扫描
authors: [SecAdmin]
description: >
  xray 代理模式进行漏洞扫描
categories: 安全工具
tags:
  - 漏洞扫描
  - xray
---

# xray

# xray 代理模式进行漏洞扫描

- https://www.cnblogs.com/zzjdbk/p/13196657.html

## 下载 xray

- https://github.com/chaitin/xray/releases

## 生成 ca 证书

> 运行 .\xray_windows_amd64.exe genca

## 浏览器 安装 ca 证书

参考文章截图

## 启动代理

> .\xray_windows_amd64.exe webscan --listen 127.0.0.1:7777 --html-output xray-testphp.html

## 浏览器 配置代理

参考文章截图

## 限制扫描范围

参考文章截图

> mitm 中 restriction 中 includes 由 * 改为 testphp.vulnweb.com
