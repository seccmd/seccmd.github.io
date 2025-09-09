---
date: 2023-08-01
title: Python 快速安装、虚拟环境创建及打包工具 | 含国内镜像源
authors: [SecAdmin]
description: >
  本页面聚焦 Python 开发实用技巧，涵盖环境安装、虚拟环境管理及打包工具选择。提供自动化脚本实现 Python 静默安装，罗列国内可用第三方镜像源，助您加速包下载。详细阐述创建 Python3 虚拟环境步骤，有效避免项目依赖冲突。同时对比 pyinstaller 与 nuitka 两款打包工具，突出 nuitka 在隐藏源码、文件体积、打包及启动速度上的优势，为您的 Python 开发之路提供全面且实用的指引。
categories: 基础工具
tags:
  - 基础工具
  - Python
---

# Python 环境安装、虚拟环境创建及打包工具指南 | 含国内镜像源

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
