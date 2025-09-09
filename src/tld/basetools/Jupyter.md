---
date: 2024-10-28
title: Jupyter Notebook环境搭建与使用全攻略
author: [SecCMD]
description: >
 本教程围绕Jupyter Notebook展开，从环境初始化开始，详细介绍在Kali或Linux虚拟机上配置Python国内镜像源、安装并运行Jupyter Notebook的步骤，包含远程访问与密码设置等要点。还深入讲解Jupyter Notebook的多种使用技巧，如运行Bash脚本、读取文件、与Shell交互、变量存储、保存会话、列出变量、执行脚本等，以及安装和使用Jupyter Notebook的常规指令，为数据分析与开发人员提供全面的指导。
categories: 编程开发, 基础工具
tags:
  - Jupyter Notebook
  - Python
---

# Jupyter

## 环境初始化

目的：基于Kali的notebook，快速部署开发或工具的环境

```bash
# 第一步：打开一个 kali 或 Linux虚拟机
python -V     # Linux 默认安装的 python 版本
python3 -V    # 新的系统只安装了Pthon3    

# 第二步：（主机位置，国外国内）Python 设置国内镜像源安装第三方包,永久修改
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
pip config list

# 第三步，安装运行 notebook
pip install jupyter --upgrade  # 自动升级，才能正常运行。
jupyter notebook --port 8888 --ip=0.0.0.0 --allow-root # root 权限运行，避免安装部署很多麻烦


# 第四步，扫描方案，导入剧本
- 浏览器打开：http://127.0.0.1:8888/tree
- 远程访问需要密码登录：http://kali:8888/tree?token=xxx
- 选择浏览器桌面文件，导入剧本

# 第五步，剧本部署完成后，开始扫描


# === FAQ ===

# 查看登陆授权码 Token authentication 远程访问时需要密码登录
jupyter notebook list  

# 报错：jupyter 命令的路径
export PATH=$PATH:~/.local/bin/  

```

## HELP

```python
For more magic and help
%lsmagic

list all the other cool cell magic commands.
%COMMAND-NAME?

for help on how to use a certain command. i.e. %run?
```


## ENV

```python
%env PATH
%env MY_VAR=MY_VALUE or %env MY_VAR MY_VALUE

In [6]: alias show echo

In [7]: PATH='A Python string'
In [8]: show $PATH
A Python string

In [9]: show $$PATH  ## 注意两个$$才是系统变量
/usr/local/lf9560/bin:/usr/local/intel/compiler70/ia32/bin:...

To write/save
%%writefile myfile.py

write/save cell contents into myfile.py (use -a to append). Another alias: %%file myfile.py
To run
%run myfile.py

run myfile.py and output results in the current cell
To load/import
%load myfile.py

load "import" myfile.py into the current cell
```

## 运行 Bash 脚本

```bash
%%bash
echo 123
ls /tmp
```


## 读取文件

```bash
myfile = !cat /tmp/deploy_env.sh
for i in myfile:
    print(i)
```


## IPython 运行 Shell 命令

```python
In [1]: !ls
myproject.txt

In [2]: !pwd
/home/jake/projects/myproject

In [3]: !echo "printing from the shell"
printing from the shell
```


## IPython 与 Shell 之间传递参数

```python
In [4]: contents = !ls

In [5]: print(contents)
['myproject.txt']

In [6]: directory = !pwd

In [7]: print(directory)
['/Users/jakevdp/notebooks/tmp/myproject']

In [8]: type(directory)
IPython.utils.text.SList

In [9]: message = "hello from Python"

In [10]: !echo {message}
hello from Python
```

## IPython 内置 Shell  魔法命令

```python
Besides %cd, other available shell-like magic functions are %cat, %cp, %env, %ls, %man, %mkdir, %more, %mv, %pwd, %rm, and %rmdir

In [11]: !pwd
/home/jake/projects/myproject

In [12]: !cd ..

In [13]: !pwd
/home/jake/projects/myproject

In [16]: mkdir tmp

In [17]: ls
myproject.txt  tmp/

In [18]: cp myproject.txt tmp/

In [19]: ls tmp
myproject.txt

In [20]: rm -r tmp
```



## Store variables to a file

```python
# https://ipython.readthedocs.io/en/stable/config/extensions/storemagic.html
# %store magic for lightweight persistence.
用途：方便快捷存储和恢复指定变量，也可以讲指定变量内容写入文件。

%store bar          # Store the current value of the variable bar to disk 保存在 autorestore 目录。
%store -r bar       # Refresh specified variables and aliases from store
%store -d bar       # Remove the variable and its value from storage
%store foo >a.txt   # Store value of foo to new file a.txt
%store foo >>a.txt  # Append value of foo to file a.txt

# 注意：大于号(>)与文件名(a.txt)必须在一起。
# 错误：%store foo  >  a.txt   正确： >a.txt

```



## Save session to a file

```python
In [1]: a = 100
In [2]: b = 200
In [3]: c = a + b
In [4]: c
Out[4]: 300

In [5]: %save filename.py 1-4
```



## List all the variables

```python
In [1]: a = 100
In [2]: name = "Sebastian"
In [3]: squares = [x*x for x in range(100)]
In [4]: squares_sum = sum(squares)
In [5]: def say_hello():
   ...:     print("Hello!")

In [6]: %whos
Variable      Type        Data/Info
-----------------------------------
a             int         100
name          str         Sebastian
say_hello     function    <function say_hello at 0x111b60a60>
squares       list        n=100
squares_sum   int         328350
```



## IPython scripts

```bash
$ ls
file1.py    file2.py    file3.py    file4.py    wishes.ipy

$ cat wishes.ipy
files = !ls
# Run all the files with .py suffix
for file in files:
    if file.endswith(".py"):
        %run $file

$ ipython wishes.ipy
Have a
Very Merry
Christmas!
```



## IPython 写入部署脚本

```bash
# 写入部署脚本
text = """#!/bin/sh
set -xe
mkdir -p ~/deploy/golang/ && cd ~/deploy/golang/

# Linux golang 1.19 install from https://docs.studygolang.com/doc/install
wget -q https://studygolang.com/dl/golang/go1.20.6.linux-amd64.tar.gz
rm -rf ~/deploy/golang/go && tar -C ~/deploy/golang/ -xzf go1.20.6.linux-amd64.tar.gz
# echo 'export PATH=$PATH:/usr/local/go/bin' >> $HOME/.profile
export PATH=$PATH:~/deploy/golang/go/bin
go version
go env -w GO111MODULE=on 
go env -w GOPROXY=https://goproxy.cn

# subfinder requires go1.19 to install successfully. Run the following command to install the latest version:
go install github.com/projectdiscovery/subfinder/v2/cmd/subfinder@latest

# httpx requires go1.19 to install successfully. Run the following command to get the repo:
go install github.com/projectdiscovery/httpx/cmd/httpx@latest
"""
%store text >/tmp/deploy_env.sh
print("Write script done.")

# 执行部署脚本
! sh /tmp/deploy_env.sh
print("Install golang done.")
```


### 安装jupyter notebook

```
## Google 云服务
https://colab.research.google.com/

## 安装jupyter notebook

`$ pip3 install jupyter`

通过国内镜像源安装第三方包的方法（安装速度更快）

`$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple jupyter`

`$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple feedparser`

`$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple lxml`

`$ pip3 install html2text`

`$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple scrapy`


## 使用jupyter notebook

`$ jupyter notebook `

指定网络地址和端口

`$ jupyter notebook --port 8888 --ip=0.0.0.0 `

查看登陆授权码 Token authentication

`$ jupyter notebook list`
```
