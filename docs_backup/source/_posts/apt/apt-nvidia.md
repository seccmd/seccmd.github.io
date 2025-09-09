---
date: 2022-02-23
authors: [SecAdmin]
title: 英伟达泄露 NVIDIA GPU 驱动程序代码和固件
description: >
  NVIDIA 公司遭到黑客攻击，攻击者设法从该公司窃取了大约 1 TB 的敏感数据。这包括各种文件，如 GPU 驱动程序和 GPU 固件源代码以及一些更有趣的东西。
categories: 网络攻防
tags:
  - APT
---

## 英伟达泄露

黑客威胁要发布 NVIDIA GPU 驱动程序代码、固件和哈希率限制器绕过
几天前，我们发现 NVIDIA 公司遭到黑客攻击，攻击者设法从该公司窃取了大约 1 TB 的敏感数据。这包括各种文件，如 GPU 驱动程序和 GPU 固件源代码以及一些更有趣的东西。负责这次攻击的 LAPSUS$ 黑客组织现在威胁要“帮助采矿和游戏社区”，为 Lite Hash Rate (LHR) GPU 哈希率限制器发布绕过解决方案。正如该小组所指出的，适用于 GA102-GA104 之间的任何东西的完整 LHR V2 解决方法正在销售中，并准备好进一步传播。

## 新闻报道

https://www.techpowerup.com/292512/nvidia-data-breach-hackers-demand-geforce-drivers-be-made-open-source
https://www.bleepingcomputer.com/news/security/nvidia-confirms-data-was-stolen-in-recent-cyberattack/

## 英伟达确认数据泄露

2022 年 2 月 23 日，NVIDIA 获悉一起影响 IT 资源的网络安全事件。发现事件后不久，我们进一步强化了网络，聘请了网络安全事件响应专家，并通知了执法部门。
我们没有证据表明勒索软件被部署在 NVIDIA 环境中，或者这与俄罗斯-乌克兰冲突有关。但是，我们知道威胁参与者从我们的系统中获取了员工凭证和一些 NVIDIA 专有信息，并开始在网上泄露这些信息。我们的团队正在努力分析这些信息。我们预计该事件不会对我们的业务或我们为客户提供服务的能力造成任何干扰。
安全是一个持续的过程，我们在 NVIDIA 非常重视 - 我们每天都在投资于代码和产品的保护和质量。

## 数据分析

Telegram ID
- LAPSUS$
- LAPSUS$ Chat
- NVIDIA_LEAKS_PARTONE.torrent

继 LAPSUS$ 勒索组织泄露 NVIDIA 源代码后， @BleepinComputer
报告称，已使用被盗的 NVIDIA 证书在野外识别出恶意软件。
Cert: integdev_gpu_drv/integ/gpu_drv/stage_rel/tools/Security/COPP
Tweet: #LeakedCertificate
