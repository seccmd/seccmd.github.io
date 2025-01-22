---
date: 2022-09-11
title: 永久修改 DNS 配置
authors: [SecAdmin]
description: >
  永久修改 DNS 配置
categories: 基础工具
tags:
  - 基础工具
  - DNS
---

# 永久修改 DNS 配置
```
sudo apt-get install resolvconf
echo 'nameserver 8.8.8.8' >> /etc/resolvconf/resolv.conf.d/head
echo 'nameserver 1.1.1.1' >> /etc/resolvconf/resolv.conf.d/head
sudo systemctl enable --now resolvconf.service
```
