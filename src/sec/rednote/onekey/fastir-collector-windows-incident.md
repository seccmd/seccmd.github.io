---
date: 2023-07-08
title: FastIR Collector - Windows 事件响应工具
author: [SecCMD]
description: >
  FastIR Collector是一个Windows下的信息收集工具，该工具收集实时 Windows 上的信息包括：内存，注册表，文件信息等并将结果记录在 csv 文件中。通过对这些信息的分析，可以及时发现入侵痕迹。
categories: 网络攻防
tags:
  - HackTool
---

FastIR Collector是一个Windows下的信息收集工具，该工具收集实时 Windows 上的信息包括：内存，注册表，文件信息等并将结果记录在 csv 文件中。通过对这些信息的分析，可以及时发现入侵痕迹。

## 执行

```
./fastIR_x64.exe -h 帮助
./fastIR_x64.exe --packages fast 提取所有工件，除了 Dump 和 FileCatcher 包
./fastIR_x64.exe --packages dump --dump mft提取MFT
./fastIR_x64.exe --packages all --output_dir output_dir 设置目录输出（默认./output/）
./fastIR_x64.exe --profile you_file_profile 设置提取配置文件。
```

## 功能

* 文件系统
	- IE/Firefox/Chrome 历史记录
	- IE/Firefox/Chrome 下载
	- 命名管道
	- 预取
	- 回收站
	- 启动目录

* 运行状态
	- ARP表
	- 驱动器列表
	- 网络驱动器
	- 网卡
	- 进程
	- 路由表
	- 任务
	- 计划工作
	- 服务
	- 会话
	- 网络共享
	- 网络连接

* 注册表
	- 安装程序文件夹
	- OpenSaveMRU
	- 最近的文档
	- 服务
	- Shellbags
	- 自动运行
	- USB历史
	- UserAssists
	- 网络列表

* 内存信息
	- 剪贴板
	- 加载的 DLL
	- 打开的文件

* Dump
	- MFT
	- MBR
	- 内存
	- 磁盘
	- 注册表
	- SAM

* FileCatcher
	- Based on mime type
	- Define path and depth to filter the search
	- Possibility to filter your search
	- Yara Rules


完整的文档可以在这里下载：[帮助手册](https://github.com/SekoiaLab/Fastir_Collector/blob/master/documentation/FastIR_Documentation.pdf) [Github](https://github.com/SekoiaLab/Fastir_Collector)
