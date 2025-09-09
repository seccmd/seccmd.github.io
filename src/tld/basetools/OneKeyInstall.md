---
date: 2024-01-01
title: 编程环境一键安装指南 | Windows与Linux全平台覆盖
author: [SecCMD]
description: >
  本页面专注于编程环境的自动化安装，提供Windows和Linux系统下Java、Python、Golang、NodeJS等多种编程语言环境的一键安装CMD及BASH命令，同时介绍了Windows下SSH和Chocolatey的安装方法，以及nodejs打包成exe的方案，还包含各编程语言使用国内镜像源安装第三方包的设置方法，为开发者快速搭建编程环境提供全面且实用的指引。
categories: 基础工具
tags:
  - 编程环境安装
  - 自动化脚本
  - 镜像源设置
---

# 自动化一键安装编程环境

## Windows  Java 一键安装 CMD 命令

```powershell
## 自动化安装脚本 JDK 18
curl -o jdk-18_windows-x64_bin.exe  https://d6.injdk.cn/oraclejdk/18/jdk-18_windows-x64_bin.exe
jdk-18_windows-x64_bin.exe /s # 静默安装完成
java -version                 # 需要重新打开一个 CMD 窗口
```

## Windows  Python 一键安装 CMD 命令

```powershell
## 自动化安装脚本 Python 3.9
curl https://mirrors.huaweicloud.com/python/3.9.10/python-3.9.10-amd64.exe -o python-3.9.10-amd64.exe
.\python-3.9.10-amd64.exe /quiet InstallAllUsers=0 PrependPath=1 Include_test=0  # 静默安装完成
python -V  # 需要重新打开一个 CMD 窗口。

## 国内镜像源安装第三方包,永久修改
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config list
```

## Windows  Golang 一键安装 CMD 命令

```powershell
## 自动化安装脚本 Golang 1.20
curl https://studygolang.com/dl/golang/go1.20.6.windows-amd64.msi -o go1.20.6.windows-amd64.msi
msiexec /quiet /i go1.20.6.windows-amd64.msi # 注意：文件名不能写路径，写相对路径会报错，参数顺序也要小心

## 国内镜像源安装第三方包,永久修改
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn
```

## Windows  NodeJS 一键安装 CMD 命令

```powershell
## 自动化安装脚本 Nodejs 18.17
curl https://nodejs.org/dist/v18.17.0/node-v18.17.0-x64.msi -o node-v18.17.0-x64.msi
## 管理员权限？
msiexec /quiet /i node-v18.17.0-x64.msi # 注意：文件名不能写路径，写相对路径会报错，参数顺序也要小心

## 国内镜像源安装第三方包,永久修改
npm version 
npm config set registry https://registry.npm.taobao.org
```

## nodejs 想要打包成exe

```
## 方案一：nodejs 想要打包成exe需要安装插件
编译后，文件有35MB
npm install -g pkg
pkg -t win 启动页.js


## 方案二：nexe
https://github.com/nexe/nexe
npm i nexe -g

```

## Windows SSH  一键安装 CMD 命令

```powershell
# Search the OpenSSH
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
# Install the OpenSSH Client
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
# Install the OpenSSH Server
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
# Start the sshd service
Start-Service sshd
# OPTIONAL but recommended:
Set-Service -Name sshd -StartupType 'Automatic'
```

## Windows Chocolatey 安装

[chocolatey](https://chocolatey.org/install) | [chocolatey-install-app](https://www.digitalocean.com/community/tutorials/how-to-install-go-and-set-up-a-local-programming-environment-on-windows-10)

```powershell
# Step 1 — Opening and Configuring PowerShell (Run as Administrator.)
# Use the RemoteSigned execution policy to set the permissions for the current user.
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
Get-ExecutionPolicy -List

# Step 2 — Installing the Package Manager Chocolatey
$script = New-Object Net.WebClient
$script | Get-Member
# DownloadString method used to display the script and signature in the PowerShell window. Use this method to inspect the script:
$script.DownloadString("https://chocolatey.org/install.ps1")
# After inspecting the script, install Chocolatey by typing the following into PowerShell:
iwr https://chocolatey.org/install.ps1 -UseBasicParsing | iex
choco upgrade chocolatey

# Step 3 — Installing App
choco install -y nano
choco install -y golang
go version
```



## Linux  Golang 一键安装 BASH 命令

```bash
mkdir -p ~/deploy/ && cd ~/deploy/
wget -q https://studygolang.com/dl/golang/go1.20.6.linux-amd64.tar.gz
rm -rf ~/deploy/go && tar -C ~/deploy/ -xzf go1.20.6.linux-amd64.tar.gz
echo 'export PATH=~/deploy/go/bin:$PATH' >> ~/.profile && source ~/.profile
go version

## 国内镜像源安装第三方包,永久修改
go env -w GO111MODULE=on
go env -w GOPROXY=https://goproxy.cn
```

## Linux  NodeJS 一键安装 BASH 命令

```bash
wget https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.xz
tar -xJvf node-v16.15.0-linux-x64.tar.xz -C /usr/local/lib/nodejs 
echo 'export PATH=/usr/local/lib/nodejs/node-v16.15.0-linux-x64/bin:$PATH' >> ~/.profile 
source ~/.profile
node -v 

# 国内镜像源 https://npmmirror.com/
npm version 
npm config set registry https://registry.npm.taobao.org
```



