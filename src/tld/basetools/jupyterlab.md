---
date: 2022-09-02
title: Jupyter Lab 作为 systemd 服务运行
author: [SecCMD]
description: >
  如何将 Jupyter Lab 作为 systemd 服务运行
categories: 基础工具
tags:
  - jupyter
  - Jupyter Lab
---

如果要在任何 Linux 发行版上将 Jupyter Lab 作为网络服务运行，可以安装运行 Jupyter 的服务。首先，您需要使用`systemd jupyter lab`

```shell
sudo pip3 install jupyterlab
```

如果您的没有 `pip3` 执行 `sudo apt -y install python3-pip`

**请注意，此脚本将在没有令牌身份验证和密码的情况下运行 Jupyter，并且默认情况下它将侦听任何 IP （）** **。更改命令行标志或注意安全隐患！**`--ip=0.0.0.0`

```shell
#!/bin/bash
# This script installs and enables/starts a systemd service
export NAME=Jupyter

# Create service file
cat >/etc/systemd/system/${NAME}.service <<EOF
[Unit]
Description=${NAME}

[Service]
Type=simple
ExecStart=/usr/bin/env jupyter lab --ip=0.0.0.0 --port 17256 --LabApp.token=''

WorkingDirectory=/home/uli/jupyter
User=uli
Group=uli

Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
EOF

# Enable and start service
systemctl enable --now ${NAME}
```

**您需要更改脚本中的以下条目，以使其为您工作：**

```shell
WorkingDirectory=/home/uli/jupyter
User=uli
Group=uli
```

将 设置为 您希望 Jupyter 运行的任何目录。请注意，任何能够访问 Web 界面的人基本上都拥有对该目录的完全访问权限！ `WorkingDirectory`

set 和 设置为应运行的用户。**请注意，不允许以 root 身份运行 Jupyter。如果您仍想这样做，请将标志添加到** **命令行选项中。** `User` `Group` `--allow-root`

现在运行脚本以安装服务：`root`

```shell
sudo ./install-jupyter-service.sh
```

现在，您可以在 访问 Jupyter。`http://[ip of the computer]:17256`

### 更改配置

为了更改配置，我建议直接编辑（或者如果您更改了）。之后，运行 `/etc/systemd/systemd/Jupyter.service` `/etc/systemd/systemd/${NAME}.service` `export NAME=Jupyter`

```shell
sudo systemctl daemon-reload
sudo systemctl restart Jupyter
```

您也可以更改安装脚本并重新运行它，但您仍然需要运行 和 .`daemon-reload``restart`

### 运行多个 Jupyter 实例

为了运行多个实例，只需运行具有不同名称的安装脚本的多个副本。例如，使用

```shell
export NAME=Jupyter-DeepLearning
```

### 调试 Jupyter Lab 输出

如果您在启动 Juypter Lab 时遇到问题，请使用

```shell
sudo systemctl status Jupyter
```

要查看状态和

```shell
sudo journalctl -xfu Jupyter
```

以查看所有日志。

状态输出示例：

```
● Jupyter.service - Jupyter
     Loaded: loaded (/etc/systemd/system/Jupyter.service; enabled; vendor preset: enabled)
     Active: active (running) since Fri 2021-06-11 03:44:28 CEST; 4s ago
   Main PID: 48753 (jupyter-lab)
      Tasks: 1 (limit: 14226)
     Memory: 51.7M
     CGroup: /system.slice/Jupyter.service
             └─48753 /usr/bin/python3 /usr/local/bin/jupyter-lab --ip=0.0.0.0 --port 17256 --LabApp.token=

Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.215 ServerApp] nbclassic | extension was successfully loaded.
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.216 LabApp] JupyterLab extension loaded from /usr/local/lib/python3.8/dist-packages/jupyterlab
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.216 LabApp] JupyterLab application directory is /usr/local/share/jupyter/lab
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.219 ServerApp] jupyterlab | extension was successfully loaded.
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.220 ServerApp] Serving notebooks from local directory: /dev/shm
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.220 ServerApp] Jupyter Server 1.8.0 is running at:
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.220 ServerApp] http://uli-desktop:17256/lab
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.220 ServerApp]     http://127.0.0.1:17256/lab
Jun 11 03:44:29 uli-desktop env[48753]: [I 2021-06-11 03:44:29.220 ServerApp] Use Control-C to stop this server and shut down all kernels (twice to skip confirmation).
Jun 11 03:44:29 uli-desktop env[48753]: [W 2021-06-11 03:44:29.224 ServerApp] No web browser found: could not locate runnable browser.
```

### 卸载 Jupyter Lab 服务

为了仅停止和禁用自动启动（但不卸载）Jupyter Lab 服务，请使用

```shell
sudo systemctl disable --now Jupyter
```

之后，您只需删除服务文件即可永久卸载该服务：

```shell
sudo rm /etc/systemd/system/Jupyter.service
```

您始终可以使用我们的安装脚本重新安装。

请注意，如果您更改了行，则需要替换为`export NAME=...``Jupyter``Name`
