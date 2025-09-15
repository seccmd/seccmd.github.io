# wsl 笔记

记得以管理员权限，打开 Powershell 进行操作。

## ​​安装 WSL​​（如果尚未安装）：

```
wsl --install
```

此命令默认会安装 WSL 2

## ​​设置 WSL 2 为默认版本​​：

```
wsl --set-default-version 2
```

## 启用Windows虚拟化功能​（确认CPU已经开启虚拟化支持）

```
dism.exe /online /enable-feature /featurename:Microsoft-Windows-Subsystem-Linux /all /norestart
dism.exe /online /enable-feature /featurename:VirtualMachinePlatform /all /norestart
```

## 查看当前 wsl 版本

```
wsl -v

## 输出信息如下所示：
WSL 版本： 2.2.4.0
内核版本： 5.15.153.1-2
WSLg 版本： 1.0.61
MSRDC 版本： 1.2.5326
Direct3D 版本： 1.611.1-81528511
DXCore 版本： 10.0.26091.1-240325-1447.ge-release
```

## 查看已安装的虚拟机

```
wsl -l -v

## 输出信息如下所示：
  NAME            STATE           VERSION
* Ubuntu-22.04    Stopped         1
  Ubuntu          Stopped         1
```

## 注销删除已安装的虚拟机 (wsl版本和虚拟机版本必须匹配)

```
wsl --unregister Ubuntu

## 输出信息如下所示：
正在注销。
操作成功完成。
```

## 列出可用的Linux发行版
```
wsl.exe --list --online

## 输出信息如下所示：
以下是可安装的有效分发的列表。
使用 'wsl.exe --install <Distro>' 安装。

NAME                            FRIENDLY NAME
Ubuntu                          Ubuntu
Debian                          Debian GNU/Linux
kali-linux                      Kali Linux Rolling
Ubuntu-20.04                    Ubuntu 20.04 LTS
Ubuntu-22.04                    Ubuntu 22.04 LTS
Ubuntu-24.04                    Ubuntu 24.04 LTS
OracleLinux_7_9                 Oracle Linux 7.9
OracleLinux_8_10                Oracle Linux 8.10
OracleLinux_9_5                 Oracle Linux 9.5
openSUSE-Leap-15.6              openSUSE Leap 15.6
SUSE-Linux-Enterprise-15-SP6    SUSE Linux Enterprise 15 SP6
openSUSE-Tumbleweed             openSUSE Tumbleweed
```

## Linux发行版安装指定的Linux发行版

```
wsl --install -d Ubuntu-22.04
```


## 其他问题

### wsl 1 和 wsl 2 区别？  

WSL 1：
- ​​它没有虚拟机，没有虚拟硬件，也没有独立的 Linux 内核。​​
- 它的核心是一个 ​​“翻译层”​​ 或 ​​“兼容层”​​。
- 当您在 WSL 1 中运行一个 Linux 命令（例如 ls）时，这个命令会调用 Linux 内核的系统调用（system call）。
- WSL 1 的翻译层会​​即时（on-the-fly）​​ 将这个 Linux 系统调用翻译成 Windows 内核能理解的、功能对等的 Windows 系统调用。
- 然后由​​真实的 Windows 内核​​来执行这个操作，并将结果返回。
- 所以，WSL 1 更像是一个高度兼容的“模拟器”，它让 Linux 程序认为自己在 Linux 上运行，但实际上背后是 Windows 内核在干活。

WSL 2：
- 本质是一个​​轻量级虚拟机​​。为了实现虚拟化，它需要依赖 Windows 的虚拟化平台。
- ​​WSL 2 依赖于 Hyper-V 的架构​​：它使用了一种名为 ​​“核心虚拟机”（Core Virtual Machine）​​ 的 Hyper-V 特定功能。这是一种高度优化、精简的虚拟化技术，专门为 WSL 2 设计，因此其资源占用和启动速度远传统虚拟机。
- ​​如何启用​​：在首次安装 WSL 2 或运行 wsl --install命令时，系统会提示您启用 ​​“Windows 虚拟机监控程序平台”​​ 和 ​​“Microsoft Hyper-V”​​ 这两个可选功能。这正是 WSL 2 所依赖的虚拟化基础。


### 启用BIOS/UEFI虚拟化支持​

1.重启电脑进入BIOS/UEFI设置，启用 ​​Intel VT-x​​ 或 ​​AMD-V​​（具体名称可能不同）
2.虚拟化平台开启嵌套虚拟化，在 CPU 配置中，勾选 启用嵌套虚拟化（Host CPU 选项）


### 为什么 Docker Desktop 强烈依赖 WSL 2？

Docker Desktop 的完整功能依赖 WSL 2，官方仅支持在 WSL 2 后端运行。​

Docker 的核心技术依赖于 Linux 内核的特定功能，如：​​cgroups​​ (控制组)：用于限制和隔离资源（CPU、内存等）。​​namespaces​​ (命名空间)：用于实现容器间的隔离（网络、进程、文件系统等）。

​​WSL 2 的优势​​：WSL 2 运行着一个​​完整的、微软官方维护的 Linux 内核​​。这个内核天然就包含了所有 Docker 所需的特性。因此，Docker Desktop 可以无缝地将 Docker 引擎（dockerd）直接安装并运行在这个 WSL 2 的 Linux 环境中，几乎就像在原生 Linux 上运行一样，性能和兼容性都非常出色。

​​WSL 1 的局限​​：WSL 1 是一个​​系统调用翻译层​​，它​​没有独立的 Linux 内核​​。它无法提供 Docker 引擎所需的核心内核功能（如 namespaces）。因此，Docker 引擎无法在 WSL 1 内部正常运行。

