---
date: 2023-01-01
title: ulimit配置指南
author: [SecCMD]
description: >
  本页面聚焦于ulimit相关知识，介绍了通过`ulimit -a`命令查看系统资源限制的方法。同时，详细阐述了在`/etc/security/limits.conf`文件中进行系统设置的具体内容，包括对核心文件大小、进程数、文件描述符数量、内存锁定、消息队列等资源限制的配置，帮助用户合理调整系统资源，确保系统稳定高效运行，为系统管理与优化提供全面且实用的指引。
categories: 基础工具
tags:
  - ulimit
  - 系统资源限制
---

# ulimit

  ulimit -a

### 系统设置

```
# cat /etc/security/limits.conf
root soft core unlimited
root hard core unlimited
root soft nproc 1000000
root hard nproc 1000000
root soft nofile 100000
root hard nofile 100000
root soft memlock 32000
root hard memlock 32000
root soft msgqueue 8192000
root hard msgqueue 8192000
soft core unlimited
hard core unlimited
soft nproc 1000000
hard nproc 1000000
soft nofile 100000
hard nofile 100000
soft memlock 32000
hard memlock 32000
soft msgqueue 8192000
hard msgqueue 8192000
```
