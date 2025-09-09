---
date: 2024-02-01
title: Curl命令使用指南：参数详解与实用示例 | 高效网络请求技巧
author: [SecCMD]
description: >
  本页面聚焦curl命令的使用，详细介绍了curl命令的常用参数及其功能，如`--compressed`请求服务器发送压缩响应并自动解压缩，`--max-time`设置请求最大时长等。通过多个实用示例，包括获取压缩数据、设置请求时间及检查HTTP状态码等，帮助读者全面掌握curl命令在网络请求中的高效运用，提升网络操作技能。
categories: 基础工具
tags:
  - curl命令
---

# curl

```
curl --compressed https://www.example.com/large-data
--compressed：请求服务器发送压缩过的响应，并在接收到数据后自动解压缩。

curl --max-time 10 -s -w "\nHTTP_CODE: %{http_code}" ${url} 2>&1

for i in {1..200}; do curl -sILk -w "%{http_code}\n" -o /dev/null http://test.com/ ;done
```
