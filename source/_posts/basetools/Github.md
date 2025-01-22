---
date: 2024-05-01
title: Github使用全攻略：快速安装、认证方案与仓库操作指南
authors: [SecAdmin]
description: >
  本页面聚焦Github的使用技巧，涵盖快速安装流程，包括申请API Token、下载代码仓库及执行脚本、上传数据等操作。同时详细介绍SSH-Key和Token两种认证方案，以及创建仓库、下载仓库和提交修改的具体步骤，助力用户高效使用Github进行项目管理与协作。
categories: 基础工具
tags:
  - Github操作
  - 认证方案
  - 代码仓库管理
---

# Github使用全攻略：快速安装、认证方案与仓库操作指南

### 快速安装

```
1.申请API Token:
User_xxx Token_yyy

2.下载代码仓库，执行脚本
cd /opt/apps/falcon/
git clone https://www.github.com/test/Spring3.git
cd Spring3 && sh test.sh

3.执行命令，上传数据
cd /opt/apps/falcon/Spring3/
ifconfig > if.txt
git add --all && git commit -m a && git push https://user:pass@github.com/test/Spring3.git --all
```

########################################################

# SSH-Key认证方案 注：一个pubkey不能在多个项目中使用会报错
1. ssh-keygen.exe
2. cat ~/.ssh/id_rsa.pub
3. Add a new public key: https://github.com/settings/ssh/new

## 创建仓库 001
- Link: https://github.com/test/ATM

## 下载仓库 001
    $ git clone git@github.com:test/ATM.git
    $ git config --global user.email "you@example.com"
    $ git config --global user.name "Your Name"

## 提交修改 001
    1. Open Git-Bash
    2. cd ~/Desktop/github/Atom
    3. git add --all; git commit -m 'test it'; git push

########################################################

# Token认证方案
1.申请API Token: https://github.com/settings/tokens
> Token_xxx


## 创建仓库 002

- https://github.com/test/webapi

## 下载仓库 002

    $ git clone https://github.com/test/webapi.git
    $ git config --global user.email "admin@outlook.com"
    $ git config --global user.name "admin"

## 提交修改 002

    1. Open Git-Bash
    2. cd ~/Desktop/github/webapi
    3. git add --all && git commit -m a && git push https://admin:pass@github.com/test/webapi.git

