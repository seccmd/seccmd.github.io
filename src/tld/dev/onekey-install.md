---
date: 2023-08-18
title: 编程环境一键安装
author: [SecCMD]
description: >
  发现了一个突破搜索引擎的信息茧房方法。搜索半天很难找到一篇高质量的内容，于是想到这些都是商业目的构建的信息茧房，把搜索结果圈起来赚流量的钱，并不是找到高质量结果为目的，所以一切就明了了。想要高质量就自己想办法吧。
categories: 程序编程
tags:
  - 编程环境
  - 代码编程
  - 自动化安装脚本
  - 一键安装
---


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



## Golang安装指南 

- https://golang.google.cn/dl/

### Install

```bash
tar -xvf go1.16.linux-amd64.tar.gz -C /usr/local/
export GOROOT=/usr/local/go #GOROOT是系统上安装Go软件包的位置。
export GOPATH=/root/go #GOPATH是工作目录的位置。
export PATH=$GOPATH/bin:$GOROOT/bin:$PATH
```


## Java 安装指南

### 1.自动化安装脚本

```bash
curl -o jdk-18_windows-x64_bin.exe  https://d6.injdk.cn/oraclejdk/18/jdk-18_windows-x64_bin.exe
jdk-18_windows-x64_bin.exe /s
# 静默安装完成，需要重新打开一个 CMD 窗口。
java -version 
echo %PATH%
echo %JAVA_HOME%
# 参考 Java 18 Silent Install https://silentinstallhq.com/java-18-silent-install-how-to-guide/
```

### 2.Windows 手动安装 JDK（主要提升Win安装效率）

```bash
###  Java 下载地址
（0）http://www.codebaoku.com/jdk/jdk-index.html
（1）TUNA镜像 https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/
（2）HUAWEI镜像 https://repo.huaweicloud.com/java/jdk/
（3）injdk https://www.injdk.cn/

1. 下载完成后双击jdk-8u271-windows-x64.exe文件。
2. 环境变量的配置 JAVA_HOME CLASSPATH PATH

### Oracle 共享账号 用于JDK下载
http://www.codebaoku.com/jdk/jdk-oracle-account.html
bnptrhinldfoguijh@mytrashmailer.com	#&qRfvE7rg37GhjEfDJy
sosen65433@kahase.com	SuckMyDick123!@#
erfede@yopmail.com	Bellapete!1
mqkpexeozyceyccghg@nthrl.com	weLgKcEdnc8PGua/
ttauern@trash-mail.com	nhXpiFpk3KztJ43
```

### 3.Linux 安装JDK （首先使用 apt yum方式）

```bash
http://www.codebaoku.com/jdk/jdk-install-linux.html
mkdir /usr/java/
tar -zxvf jdk-8u171-Linux-x64.tar.gz -C /usr/java/
#//环境变量在将会在 /etc/profile 文件中配置，为了防止配置错误，建议先将改文件负责进行备份。
#//备份 /etc/profile 文件
cp /etc/profile /etc/profile.bak
#//编辑 profile 文件，输入 vi /etc/prifle ，然后定位到这个文件的最后面。再按住字母 o ，开启编辑模式。
#//复制下面的内容粘贴到vi编辑器（注意 JAVA_HOME 这个路径，应该写成你刚刚解压的目录）。
export JAVA_HOME=/usr/local/java/jdk1.8.0_171
export JRE_HOME=${JAVA_HOME}/jre
export CLASSPATH=.:${JAVA_HOME}/lib:${JRE_HOME}/lib
export PATH=${JAVA_HOME}/bin:$PATH
#//让 /etc/profile 文件生效，
source /etc/profile    
#//检查是否配置成功，如果现实了版本信息，那么则证明配置成功。
javac -version
```


## Python 环境安装、虚拟环境创建及打包工具指南 | 含国内镜像源

- https://fullstackpython.com/

### 国内可用的一些第三方镜像源地址：
- 阿里云 http://mirrors.aliyun.com/pypi/simple/ 
- 中国科技大学 https://pypi.mirrors.ustc.edu.cn/simple/ 
- 豆瓣(douban) http://pypi.douban.com/simple/ 
- 清华大学 https://pypi.tuna.tsinghua.edu.cn/simple/ 
- 中国科学技术大学 http://pypi.mirrors.ustc.edu.cn/simple/

### Python 环境安装

```
## 自动化脚本（下载 & 静默安装）
cd %USERPROFILE%\Downloads\
curl https://mirrors.huaweicloud.com/python/3.9.10/python-3.9.10-amd64.exe -o python-3.9.10-amd64.exe
python-3.9.10-amd64.exe /quiet InstallAllUsers=0 PrependPath=1 Include_test=0
python -V # 静默安装完成，需要重新打开一个 CMD 窗口。
```

```
## 国内镜像源安装第三方包,永久修改
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config list
pip install html2text # 能看到使用了新的下载源
```

```
## 安装包下载地址：
- python官方各版本下载地址：https://www.python.org/ftp/python/
- python 国内华为镜像：https://mirrors.huaweicloud.com/python/

**测试**
python -V
CMD> echo %PATH%
Psh> echo $env:Path

**参考**
https://docs.python.org/3.9/using/windows.html#installing-without-ui
```


### 创建python3虚拟环境

```
首先强烈推荐大家使用python3提供的虚拟环境进行依赖管理，这样的话，每个项目都有自己独立的依赖环境。避免了不同项目使用同一个依赖的不同版本而导致的冲突。

# 创建项目根目录
mkdir myscrapy  

# 切换到项目目录
cd myscrapy

# 创建虚拟环境，第一个venv是python的模块venv，不能修改
# 第二个venv是自定义的虚拟目录名称，可以修改，不过一般建议还是使用venv作为目录
python3 -m venv venv

# 此时在myscrapy目录中多了一个venv文件夹
# 开启虚拟环境
source venv/bin/activate 

# 此时命令行变成了如下的样子
(venv) [root@itxxq myscrapy]#

# 开发阶段就一直保持在虚拟环境中进行各种操作，比如安装依赖，运行项目
(venv) [root@itxxq myscrapy]# pip3 install feedparser html2text scrapy

# 通过国内镜像源安装第三方包的方法（安装速度更快）

$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple feedparser html2text scrapy

# 退出虚拟环境
deactivate

# 生成 requirements.txt 文件，本地所有依赖都自动添加到文件里
pip3 freeze > ./requirements.txt

# 迁移环境的时候，注意打包该文件，然后使用如下命令部署
pip3 install -r requirements.txt
```

### 打包工具

```
这次也是由于项目需要，要将python的代码转成exe的程序，在找了许久后，发现了2个都能对python项目打包的工具——pyintaller和nuitka。

这2个工具同时都能满足项目的需要：

隐藏源码。这里的pyinstaller是通过设置key来对源码进行加密的；而nuitka则是将python源码转成C++（这里得到的是二进制的pyd文件，防止了反编译），然后再编译成可执行文件。
方便移植。用户使用方便，不用再安装什么python啊，第三方包之类的。

2个工具使用后的最大的感受就是：

pyinstaller体验很差！
一个深度学习的项目最后转成的exe竟然有近3个G的大小（pyinstaller是将整个运行环境进行打包），对，你没听错，一个EXE有3个G！
打包超级慢，启动超级慢。

nuitka真香！
同一个项目，生成的exe只有7M！
打包超级快（1min以内），启动超级快。

https://www.lixiaofei2yy.website/python%E7%9A%84%E6%89%93%E5%8C%85%E7%A5%9E%E5%99%A8nuitka
```
