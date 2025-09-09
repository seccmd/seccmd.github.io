---
date: 2022-09-03
title: Minio快速安装记录
author: [SecCMD]
description: >
  快速安装 Minio
categories: 基础工具
tags:
  - 网络存储
---

# Minio

安装过程：

```
wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20241002175041.0.0_amd64.deb -O minio.deb
dpkg -i minio.deb

# 手动调试
export MINIO_ROOT_USER=user; export MINIO_ROOT_PASSWORD=passwrod; minio server ~/minio_dir --console-address 0.0.0.0:9001

# 服务配置
systemctl start minio
systemctl enable minio

# Minio 配置文件

vi /etc/default/minio
MINIO_ROOT_USER=root
MINIO_ROOT_PASSWORD=rootpassword
MINIO_VOLUMES=/home/admin/minio
MINIO_OPTS="--console-address 0.0.0.0:9001"

# Minio 服务配置 注意修改运行权限
vi /lib/systemd/system/minio.service
User=admin
Group=admin
```

这个配置文件很清晰，值得学习敷用
- cat /lib/systemd/system/minio.service

```
[Unit]
Description=MinIO
Documentation=https://docs.min.io
Wants=network-online.target
After=network-online.target
AssertFileIsExecutable=/usr/local/bin/minio

[Service]
Type=notify

WorkingDirectory=/usr/local

User=admin
Group=admin
ProtectProc=invisible

EnvironmentFile=-/etc/default/minio
ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES

# Let systemd restart this service always
Restart=always

# Specifies the maximum file descriptor number that can be opened by this process
LimitNOFILE=1048576

# Turn-off memory accounting by systemd, which is buggy.
MemoryAccounting=no

# Specifies the maximum number of threads this process can create
TasksMax=infinity

# Disable timeout logic and wait until process is stopped
TimeoutSec=infinity

SendSIGKILL=no

[Install]
WantedBy=multi-user.target

# Built for ${project.name}-${project.version} (${project.name})
```
