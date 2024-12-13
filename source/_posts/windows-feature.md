---
date: 2020-01-03
title: Windows 官方优质资源
authors: [SecAdmin]
description: >
  Windows 官方优质资源
categories: 基础工具
tags:
  - 操作系统
  - Windows
---

# Windows 官方优质资源

## todo

- Microsoft Configuration Manager 可帮助 IT 部门管理电脑和服务器，保持软件的最新状态，设置配置和安全策略，并监控系统状态
- https://www.microsoft.com/zh-cn/evalcenter/evaluate-microsoft-endpoint-configuration-manager-technical-preview
- System Center 2022 提供企业级数据中心管理方面的最新创新和安全性。
- https://www.microsoft.com/zh-cn/evalcenter/evaluate-system-center-2022

## Windows 官方评估版本

- https://www.microsoft.com/evalcenter/evaluate-windows-10-enterprise
- https://www.microsoft.com/evalcenter/evaluate-windows-11-enterprise

## Windows Server 官方评估版本

- https://www.microsoft.com/zh-cn/evalcenter/evaluate-windows-server-2022
- https://www.microsoft.com/zh-cn/evalcenter/evaluate-windows-admin-center
- https://www.microsoft.com/zh-cn/evalcenter/evaluate-sql-server-2022

- 绕过注册，直接下载方法
- evaluate-windows-server-2022 修改为 download-windows-server-2022

## Windows 开发环境 

- 打包好的多种虚拟机
- https://developer.microsoft.com/zh-cn/windows/downloads/virtual-machines/

```
我们目前将虚拟机打包为四种不同的虚拟化软件选项：

Hyper-V（Gen2）、Parallels、VirtualBox和 VMware。 

这些虚拟机包含 Windows 的评估版本，该版本将在发布日期过期。 

如果评估期到期，桌面背景将变为黑色，你将看到一个永久性桌面通知，指示系统不是正版的，电脑将每小时关闭一次。

到期日期：2024 年 10 月 23 日
```

# Hyper-V

## 使用文档

- https://learn.microsoft.com/en-us/virtualization/hyper-v-on-windows/quick-start/enable-hyper-v

> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

> DISM /Online /Enable-Feature /All /FeatureName:Microsoft-Hyper-V

## 关键问题：hyper-v 虚机中 开启 cpu 虚拟化功能 (开启后，才能正常使用wsl-2 docker等)

- https://medium.com/@kenslearningcurve/running-docker-in-hyper-v-433476043ec4

> Set-VMProcessor -VMName Windows10 -ExposeVirtualizationExtensions $true

# netsh

## cmd / powershell 配置代理

```
## 设置代理
netsh winhttp set proxy 127.0.0.1：7890

## 查看代理
netsh winhttp show proxy

## 取消代理
netsh winhttp reset proxy
```

# Microsoft Build of OpenJDK

- 专门给 Windows Java 开发者提供的便捷资源。（也包含其他语言：C++ C# 等等）
- https://learn.microsoft.com/en-us/java/openjdk/

- JavaAPI 文档，还有一些好的学习资料等待挖掘
- https://learn.microsoft.com/en-us/java/api/

## Download the Microsoft Build of OpenJDK (支持各种主流操作系统，直接下载编译好的java安装包)

- https://learn.microsoft.com/en-us/java/openjdk/download

```
# Graphical installation
- MSI
  - https://aka.ms/download-jdk/microsoft-jdk-21.0.4-windows-x64.msi
  - https://aka.ms/download-jdk/microsoft-jdk-17.0.12-windows-x64.msi
  - https://aka.ms/download-jdk/microsoft-jdk-11.0.24-windows-x64.msi
- PKG

# Package manager
- Winget
- Homebrew
- apt (Ubuntu)
- apt (Debian)
- yum (CentOS)

```

## Install the Microsoft Build of OpenJDK

```
# Install on Windows via MSI
# msiexec /i <package>.msi ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome INSTALLDIR="c:\Program Files\Microsoft\" /quiet
# This example silently installs the Microsoft Build of OpenJDK, updates the PATH, associates .jar files with Java applications, and defines JAVA_HOME.

msiexec /i https://aka.ms/download-jdk/microsoft-jdk-21.0.4-windows-x64.msi ADDLOCAL=FeatureMain,FeatureEnvironment,FeatureJarFileRunWith,FeatureJavaHome INSTALLDIR="c:\Program Files\Microsoft\" /quiet

```


## Install on Windows with the Windows Package Manager (winget)


```
winget search Microsoft.OpenJDK
winget install Microsoft.OpenJDK.21
```

## Install on macOS

- brew install --cask microsoft-openjdk

## Install on Ubuntu

```
# Valid values are only '18.04', '20.04', and '22.04'
# For other versions of Ubuntu, please use the tar.gz package
ubuntu_release=`lsb_release -rs`
wget https://packages.microsoft.com/config/ubuntu/${ubuntu_release}/packages-microsoft-prod.deb -O packages-microsoft-prod.deb
sudo dpkg -i packages-microsoft-prod.deb

sudo apt-get install apt-transport-https
sudo apt-get update
sudo apt-get install msopenjdk-21
```

## Install on CentOS 7 (RPM)

```
sudo rpm -Uvh https://packages.microsoft.com/config/centos/7/packages-microsoft-prod.rpm
sudo yum install msopenjdk-21
```

# Windows Sandbox

- 测试不安全软件的神器，自动擦除痕迹

- As you may already know, Windows Sandbox an isolated, temporary desktop environment where you can run untrusted software without the fear of lasting impact to your PC. In addition to the GUI method of enabling the feature, I would like to share two extra methods, PowerShell and DISM.

## To Enable Windows 10 Sandbox with PowerShell

> Enable-WindowsOptionalFeature -FeatureName "Containers-DisposableClientVM" -All -Online

> Disable-WindowsOptionalFeature -FeatureName "Containers-DisposableClientVM" -Online

## Enable Windows 10 Sandbox with DISM

> dism.exe /online /Enable-Feature /FeatureName:"Containers-DisposableClientVM" -All

> dism.exe /online /Disable-Feature /FeatureName:"Containers-DisposableClientVM"

# Windows Terminal

- https://learn.microsoft.com/zh-cn/windows/terminal/install

- Windows 终端是一个新式主机应用程序，它面向你喜爱的命令行 shell，如命令提示符、PowerShell 和 bash（通过适用于 Linux 的 Windows 子系统 (WSL)）。 它的主要功能包括多个选项卡、窗格、Unicode 和 UTF-8 字符支持、GPU 加速文本呈现引擎，你还可用它来创建你自己的主题并自定义文本、颜色、背景和快捷方式。

```
$ winget install Microsoft.WindowsTerminal

- https://github.com/microsoft/terminal/releases
```

# Windows 程序包管理器

- https://learn.microsoft.com/zh-cn/windows/package-manager/

- https://github.com/microsoft/winget-cli/

## 安装 WinGet

```
$progressPreference = 'silentlyContinue'
Write-Information "Downloading WinGet and its dependencies..."
Invoke-WebRequest -Uri https://aka.ms/getwinget -OutFile Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle
Invoke-WebRequest -Uri https://aka.ms/Microsoft.VCLibs.x64.14.00.Desktop.appx -OutFile Microsoft.VCLibs.x64.14.00.Desktop.appx
Invoke-WebRequest -Uri https://github.com/microsoft/microsoft-ui-xaml/releases/download/v2.8.6/Microsoft.UI.Xaml.2.8.x64.appx -OutFile Microsoft.UI.Xaml.2.8.x64.appx
Add-AppxPackage Microsoft.VCLibs.x64.14.00.Desktop.appx
Add-AppxPackage Microsoft.UI.Xaml.2.8.x64.appx
Add-AppxPackage Microsoft.DesktopAppInstaller_8wekyb3d8bbwe.msixbundle
```

- 常用工具
> winget install Microsoft.WindowsTerminal Microsoft.PowerToys Microsoft.VisualStudioCode

# WSL - Windows Subsystem for Linux

- https://learn.microsoft.com/en-us/windows/wsl/install
- https://learn.microsoft.com/en-us/windows/wsl/install-on-server
- https://learn.microsoft.com/en-us/windows/wsl/install-manual

## 安装 WSL 命令

```
# 现在，可以使用单个命令安装运行 WSL 所需的一切内容。 
# 在管理员模式下打开 PowerShell 或 Windows 命令提示符，方法是右键单击并选择“以管理员身份运行”，输入 wsl --install 命令，然后重启计算机。

wsl --install
# 此命令将启用运行 WSL 并安装 Linux 的 Ubuntu 发行版所需的功能。


## 命令行激活 WSL 服务，需要重启系统
> Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Windows-Subsystem-Linux

```

## 升级 WSL 2 版本

*** 必须升级，不升级很难用 ***
> dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart

> wsl --update

## 安装 WSL 发行版

- 在 Windows 应用商店搜索 ubuntu 
- wsl --install -d ubuntu-22.04  # 无法访问github下载镜像


## WSL 命令

```
# 查看安装的版本
wsl --list -v 

wsl -u root -d ubuntu-20.04 -e ls
-u 指定用户
-d 执行发行系统
-e 执行命令

```

## apt 换源

```
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak

sudo bash -c "cat > /etc/apt/sources.list" << EOF
# 默认注释了源码镜像以提高 apt update 速度，如有需要可自行取消注释
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-updates main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-backports main restricted universe multiverse
deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-security main restricted universe multiverse

# 预发布软件源，不建议启用
# deb https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
# deb-src https://mirrors.tuna.tsinghua.edu.cn/ubuntu/ focal-proposed main restricted universe multiverse
EOF

sudo apt-get update
```


## 问题

```
我在 hyper-v 虚拟机中安装 wsl ，只能安装 wsl v1，无法运行 wsl v2, 所以只能在 wsl v1 安装和运行。
# 错误代码: Wsl/InstallDistro/WSL_E_INSTALL_PROCESS_FAILED
# Problem installing WSL: Error code: Wsl/WSL_E_DEFAULT_DISTRO_NOT_FOUND
# https://github.com/microsoft/WSL/issues/9338
# WslRegisterDistribution failed with error: 0x80370102
# Please enable the Virtual Machine Platform Windows feature and ensure virtualization is enabled in the BIOS.

I switched to version 1, installed Ubuntu, then switched to Version 2 and it works now!
1- wsl --set-default-version 1
2- wsl.exe --install Ubuntu
3- wsl --set-default-version 2
```



## wsl --help

```
版权所有 (c) Microsoft Corporation。保留所有权利。
有关此产品的隐私信息，请访问 https://aka.ms/privacy。

用法: wsl.exe [参数] [选项...][命令行]

运行 Linux 二进制文件的参数:

   如果未提供命令行，wsl.exe 将启动默认 shell。

   --exec, -e <CommandLine>
       在不使用默认 Linux shell 的情况下执行指定的命令。

   --shell-type <standard|login|none>
       使用提供的 shell 类型执行指定的命令。

   --
       按原样传递剩余的命令行。

选项:
   --cd <Directory>
       将指定目录设置为当前工作目录。
       如果使用 ~，则将使用 Linux 用户的主路径。如果路径以
       /字符开始，它将解释为绝对 Linux 路径。
       否则，该值必须是绝对 Windows 路径。

   --distribution, -d <Distro>
       运行指定的分发版。

   --user, -u <UserName>
       以指定用户身份运行。

   --system
       为系统分发版启动 shell。

用于管理适用于 Linux 的 Windows 子系统的参数:

   --help
       显示使用情况信息。

   --debug-shell
       出于诊断目的打开 WSL2 调试 shell。

   --install [发行版] [选项...]
       安装适用于 Linux 的 Windows 子系统分发版。
       有关有效分发版的列表，请使用 'wsl.exe --list --online'。

       选项:
           --no-launch, -n
               安装后不要启动分发版。

           --web-download
               从 Internet 而不是 Microsoft Store 下载分发版。

           --no-distribution
               仅安装所需的可选组件，不安装分发版。

           --enable-wsl1
               启用 WSL1 支持。

   --manage <Distro> <Options...>
       更改发行版特定选项。

       选项:
           --set-sparse, -s <true|false>
               将发行版的 vhdx 设置为稀疏，从而允许自动回收磁盘空间。

   --mount <Disk>
       在所有 WSL 2 分发版中附加和装载物理磁盘或虚拟磁盘。

       选项:
           --vhd
               指定 <Disk> 引用虚拟硬盘。

           --bare
               将磁盘附加到 WSL2，但不要装载它。

           --name <Name>
               使用装入点的自定义名称装载磁盘。

           --type <Type>
               装载磁盘时要使用的文件系统(如果未指定)默认为 ext4。

           --options <Options>
               其他装载选项。

           --partition <Index>
               要装载的分区的索引(如果未指定)默认为整个磁盘。

   --set-default-version <Version>
       更改新分发版的默认安装版本。

   --shutdown
       立即终止所有正在运行的分发版和 WSL 2
       轻型实用工具虚拟机。

   --status
       显示适用于 Linux 的 Windows 子系统状态。

   --unmount [磁盘]
       从所有 WSL2 分发版中卸载和分离磁盘。
       如果在没有参数的情况下调用，则卸载和分离所有磁盘。

   --uninstall
       从此计算机卸载适用于 Linux 的 Windows 子系统包。

   --update
       更新适用于 Linux 的 Windows 子系统包。

       选项:
           --pre-release
               下载预发行版本(如果可用)。

   --version, -v
       显示版本信息。

用于在适用于 Linux 的 Windows 子系统中管理分发版的参数:

   --export <Distro> <FileName> [选项]
       将分发版导出到 tar 文件。
       文件名可以是 - for stdout。

       选项:
           --vhd
               指定应将分发版导出为 .vhdx 文件。

   --import <Distro> <InstallLocation> <FileName> [选项]
       将指定的 tar 文件作为新分发版导入。
       文件名可以是 - for stdin。

       选项:
           --version <Version>
               指定要用于新分发的版本。

           --vhd
               指定所提供的文件是 .vhdx 文件，而不是 tar 文件。
               此操作在指定的安装位置创建 .vhdx 文件的副本。

   --import-in-place <Distro> <FileName>
       将指定的 .vhdx 文件作为新分发版导入。
       必须使用 ext4 文件系统类型设置此虚拟硬盘的格式。

   --list, -l [选项]
       列出分发版。

       选项:
           --all
               列出所有分发版，包括当前
               正在安装或卸载的分发版。

           --running
               仅列出当前正在运行的分发版。

           --quiet, -q
               仅显示分发版名称。

           --verbose, -v
               显示有关所有分发版的详细信息。

           --online, -o
               显示适合通过 'wsl.exe --install' 安装的可用分发版列表。

   --set-default, -s <Distro>
       将分布版设置为默认值。

   --set-version <Distro> <Version>
       更改指定分发版的版本。

   --terminate, -t <Distro>
       终止指定的分发版。

   --unregister <Distro>
       取消注册分发版并删除根文件系统。

```


## WSL 配置，启用 Systemd

```
# To enable, start your Ubuntu (or other Systemd) distribution under WSL.
sudo -e /etc/wsl.conf

# Add the following:
[boot]
systemd=true

# Exit Ubuntu and again:
wsl --shutdown

# Then restart Ubuntu.
sudo systemctl status
```

## WSL2 中 Systemd 处于降级状态的原因分析及解决方案

- https://hydrotho.github.io/Analysis-Of-The-Causes-And-Solutions-Of-Systemd-In-Degraded-State-In-WSL2/

```
# 解决方案 创建 /etc/systemd/system/fix-shm.service

> sudo systemctl edit --force --full fix-shm.service
> systemctl cat fix-shm.service
# /etc/systemd/system/fix-shm.service
[Unit]
Description=Fix /dev/shm Issue
Before=sysinit.target
DefaultDependencies=no
ConditionPathExists=/dev/shm
ConditionPathIsSymbolicLink=/dev/shm
ConditionPathIsMountPoint=/run/shm

[Service]
Type=oneshot
ExecStart=/usr/bin/rm /dev/shm
ExecStart=/bin/mount --bind -o X-mount.mkdir /run/shm /dev/shm

[Install]
WantedBy=sysinit.target


# 开机自动启用单元
> sudo systemctl enable fix-shm.service

# 立即终止所有正在运行的发行版和 WSL2 轻型实用程序虚拟机
> wsl --shutdown

# 重新启动 WSL2 并查看 Systemd 状态
> systemctl status
```


## KMS激活Windows系统

- https://www.cnblogs.com/yuyanc/p/18150937

在开始菜单上右键，选择 Windows PowerShell(管理员)，依次输入以下命令即可激活成功

```
slmgr /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43 && slmgr /skms kms.03k.org && slmgr /ato


slmgr /ipk NPPR9-FWDCX-D2C8J-H872K-2YT43
slmgr /skms kms.03k.org
slmgr /ato
slmgr /upk ::卸载激活码
slmgr /xpr ::查看过期时间 激活日算起半年
slmgr.vbs -dlv ::命令可以看到激活后的使用期限为180天
```

## Windows各版本的产品密钥

- Win10企业版: NPPR9-FWDCX-D2C8J-H872K-2YT43
- Win10专业版: W269N-WFGWX-YVC9B-4J6C9-T83GX
- Windows Server 2019 Datacenter: WMDGN-G9PQG-XVVXX-R3X43-63DFG
- Windows Server 2019 Standard: N69G4-B89J2-4G8F4-WWYCC-J464C
- Windows Server 2019 Essential: WVDHN-86M7X-466 P 6-VHXV7-YY726

## KMS服务器

需要ping测试是否有效

```
zh.us.to
kms.03k.org
kms.chinancce.com
kms.shuax.com
kms.dwhd.org
kms.luody.info
kms.digiboy.ir
kms.lotro.cc
ss.yechiu.xin
www.zgbs.cc
cy2617.jios.org
```

## Windows Server 2022 KMS激活序列号

- https://www.orcy.net.cn/1882.html

```
# 激活教程
# 以管理员身份运行powershell或cmd，输入以下命令激活 （序列号替换如上对应的版本批量授权密钥）
# 以数据中心版为例，KMS激活server2022命令：
slmgr -ipk WX4NM-KYWYW-QJJR4-XV3QB-6VM33
slmgr -skms kms.0t.net.cn
slmgr -ato

# KMS服务器: kms.0t.net.cn

# Windows Server2022序列号
# Server2022 零售版：
RGN6B-MCPWX-6K6GK-HKM33-7VCXY - Standard 标准版（非图形界面和桌面体验）
DNVBD-FCT8Y-TQT8Q-HGQ34-QGRRV - Datacenter 数据中心版（非图形界面和桌面体验）
# Server2022 批量授权版：
VDYBN-27WPP-V4HQT-9VMD4-VMK7H - Standard 标准版（非图形界面和桌面体验）
WX4NM-KYWYW-QJJR4-XV3QB-6VM33 - Datacenter 数据中心版（非图形界面和桌面体验）

```


## WindowsServer评估版转为正式版并激活

一般从官网下载的Windows Server版本都是评估试用版本。这时候想转为正式版本，就需要使用转换激活代码。请参照不同的版本使用不同的代码。注意：以下代码请以管理员身份运行。

```
# Windows Server 2016标准版#

# 先执行下列命令将评估版转为正式版本：
DISM /online /Set-Edition:ServerStandard /ProductKey:WC2BQ-8NRM3-FDDYY-2BFGV-KHKQY /AcceptEula

# 转换完成后，系统可能提示需要重启，重启完成后，使用下列代码进行激活系统：
slmgr.vbs /upk
slmgr /skms kms.chinancce.com
slmgr /ipk P96NB-8TJQB-BW47F-TQRMX-T839R
slmgr /ato


# Windows Server 2016数据中心版#
# 先执行下列命令将评估版转为正式版本：
DISM /online /Set-Edition:ServerDatacenter /ProductKey:CB7KF-BWN84-R7R2Y-793K2-8XDDG /AcceptEula
# 转换完成后，系统可能提示需要重启，重启完成后，使用下列代码进行激活系统：
slmgr.vbs /upk
slmgr /skms kms.chinancce.com
slmgr /ipk W269N-WFGWX-YVC9B-4J6C9-T83GX
slmgr /ato

# Windows Server 2019标准版#

# 先执行下列命令将评估版转为正式版本：
DISM /online /Set-Edition:ServerStandard /ProductKey:N69G4-B89J2-4G8F4-WWYCC-J464C /AcceptEula

# 转换完成后，系统可能提示需要重启，重启完成后，使用下列代码进行激活系统：
slmgr.vbs /upk
slmgr /skms kms.chinancce.com
slmgr /ipk N69G4-B89J2-4G8F4-WWYCC-J464C
slmgr /ato


# Windows Server 2019数据中心版#

# 先执行下列命令将评估版转为正式版本：
DISM /online /Set-Edition:ServerDatacenter /ProductKey:WMDGN-G9PQG-XVVXX-R3X43-63DFG /AcceptEula

# 转换完成后，系统可能提示需要重启，重启完成后，使用下列代码进行激活系统：
slmgr.vbs /upk
slmgr /skms kms.chinancce.com
slmgr /ipk WMDGN-G9PQG-XVVXX-R3X43-63DFG
slmgr /ato
```

## Windows Server 2022 系统评估版转为正式版方法

- https://gclz.cn/post/737/

```
1、管理员模式运行cmd,输入命令:DISM /online /Get-CurrentEdition，得到结果：

C:\Users\Administrator>DISM /online /Get-CurrentEdition

部署映像服务和管理工具
版本: 10.0.20348.1
映像版本: 10.0.20348.202
当前版本为:
当前版本 : ServerDatacenterEval
操作成功完成。
其中ServerDatacenterEval去掉Eval后，就是当前的Edition ID

2、输入命令升级Windows Server 2022 数据中心版的例子，如果是其他版本，需要替换掉对应的key和Edition，运行结果如下：

C:\Users\Administrator>DISM /online /Set-Edition:ServerDatacenter /ProductKey:WX4NM-KYWYW-QJJR4-XV3QB-6VM33 /AcceptEula

部署映像服务和管理工具
版本: 10.0.20348.1
映像版本: 10.0.20348.202
开始升级组件...
开始安装产品密钥...
产品密钥安装已完成。
正在添加程序包 Microsoft-Windows-ServerDatacenterEdition~31bf3856ad364e35~amd64~~10.0.20348.169
[==========================100.0%==========================]
组件升级已完成。
重新启动 Windows 就变成正式版了。

```

## WindowsServer 2019 Active

```
## 方式1、
slmgr /upk
slmgr /ipk N69G4-B89J2-4G8F4-WWYCC-J464C
slmgr /skms kms.v0v.bid
slmgr /ato

## 方式2
slmgr /ipk WMDGN-G9PQG-XVVXX-R3X43-63DFG
slmgr /skms kms.v0v.bid
slmgr /ato
slmgr /xpr

## 方式3
slmgr /ipk WMDGN-G9PQG-XVVXX-R3X43-63DFG
slmgr /skms zh.us.to
slmgr /ato
slmgr /xpr

```
