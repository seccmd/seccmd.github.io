---
date: 2024-01-01
title: Splunk下载指南
author: [SecCMD]
description: >
  本页面提供Splunk的下载方法，给出Windows系统下使用wget下载Splunk 9.3.1版本安装包的具体命令。同时明确后续学习方向，包括借助Sysmon、AutoRuns等工具与Splunk结合进行威胁检测，学习接入AD日志、Linux日志等更多种类日志，以及深入学习转发组件相关知识，助力用户全面掌握Splunk应用及日志管理。
categories: 基础工具
tags:
  - 日志管理
---

## Splunk

Splunk Download

```
wget -O splunk-9.3.1-0b8d769cb912-x64-release.msi "https://download.splunk.com/products/splunk/releases/9.3.1/windows/splunk-9.3.1-0b8d769cb912-x64-release.msi"
```

### todo
Hunting evil with 
- Sysmon, AutoRuns, and other free tools
https://cybersecthreat.com/zh/2020/07/08/import-windows-event-log-to-splunk/

- 学习接入更多种类日志， AD 日志、Linux日志

- 学习转发组件
