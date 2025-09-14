# 01. Python 虚拟环境

本页面将教你如何使用 python 虚拟环境和工作原理

如果你想使用一个能够为您管理一切的工具（包括安装 Python），请尝试使用 uv

## 什么是虚拟环境

解决将所有包都放在全局环境中的问题的方法是为您处理的每个项目使用虚拟环境。

虚拟环境是一个目录 ，与全局环境非常相似，您可以在其中安装项目的软件包。

这样，每个项目都将拥有自己的虚拟环境（.venv 目录）和自己的包。

## 创建项目

首先为你的项目创建一个主文件夹，例如，创建一个 code 文件夹保存你的所有项目。

在 code 主文件夹中，为每个项目创建一个子文件夹(例如：项目文件夹01 项目文件夹02)。

```bash
# 创建一个主文件夹，保存你的所有项目
mkdir code

# 进入你的主文件夹
cd code

# 创建一个子文件夹，保存你的每个项目
mkdir project-01

# 进入这个项目文件夹
cd project-01
```

## 创建虚拟环境

当你第一次创建项目时，在项目文件夹（例如：项目文件夹01）中创建虚拟环境。

> 每个项目，你只需要运行一次，不需要每次都运行

创建一个虚拟环境，你可以使用 venv 模块（Python自带模块）

这个命令创建了一个新的虚拟环境，在当前项目的 .venv 文件夹

```bash
python -m venv .venv
```

## 激活虚拟环境

激活新的虚拟环境，让你的 Python 命令和你安装的模块在新环境使用。

每次开启一个新的终端会话时，都要重新激活一次虚拟环境。

```bash
source .venv/bin/activate
```

## 检查是否激活虚拟环境

检查虚拟环境是否被激活。这步是可选的，但是是个好习惯，确认使用了正确的虚拟环境。

```bash
which python
```

如果 python 命令 是在你的项目文件夹 `.venv/bin/python` ，说明是在虚拟环境中。

## 升级 pip

如果安装包，你使用 pip ，你需要升级到最新版本

许多在安装包时遇到的奇怪错误都可以通过先升级 pip 来解决。

```bash
python -m pip install --upgrade pip
```

## 添加 .gitignore

如果你使用 Git，通过增加 .gitignore 排查所有虚拟环境文件 .venv

```bash
echo "*" > .venv/.gitignore
```

## 直接安装软件包

如果你赶时间，不想用文件来声明项目的包需求，可以直接安装。

```bash
pip install sqlmodel
```

## 安装包 requirements.txt

将程序所需的包和版本放在一个文件中（例如 requirements.txt 或 pyproject.toml）是一个（非常）好主意。

```bash
pip install -r requirements.txt
```

## 运行程序

激活虚拟环境后，您可以运行您的程序，它将在虚拟环境中使用 Python 以及您在那里安装的软件包。

```bash
python main.py
```

## 停用虚拟环境

完成项目工作后，您可以停用虚拟环境。

```bash
deactivate
```

这样，当您运行 python 时，它就不会尝试从安装了软件包的虚拟环境中运行它。


## 参考链接

- https://sqlmodel.tiangolo.com/virtual-environments
