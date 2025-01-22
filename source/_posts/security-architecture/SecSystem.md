---
date: 2024-01-01
title: 安全体系全解析
authors: [SecAdmin]
description: >
  本页面全面介绍安全体系相关知识，涵盖攻防对抗、云安全、网络安全、应用安全、数据安全、安全运营及安全合规等多个领域。详细阐述了各类安全工具和技术，如FW、IPS、WAF等网络安全工具，Webscan、DAST、SAST等应用安全工具，以及SCA、IAST、SAST等细分技术。同时，提供了GitHub安全、Fortify、CodeQL等工具的使用指南和相关链接，为用户了解和实践安全技术提供全面且实用的信息。
categories: 安全体系
tags:
  - 网络安全工具
  - 应用安全测试
  - 安全细分技术
---

# Sec System

## 攻防对抗

## 云安全

## 网络安全

- FW
- IPS
- WAF
- HIDS
- AV
- EDR
- JumpServer
- 漏洞扫描
- SOC

## 应用安全

- Webscan xray burp nuclei
- DAST 黑盒
- SAST 白盒
- IAST 灰盒
- SCA 开源组件
- RASP

- Snyk https://snyk.io/

## 数据安全

- 身份认证
- 权限鉴权
- 代码保护
- 文档保护
- 云桌面
- 数据审批流程
- 数据传输加密
- 数据存储加密
- 数据访问控制
- 数据操作审计
- DLP
- 分类分级
- 脱敏

## 安全运营

- MSS
- SOC
- 应急响应
- 威胁狩猎
- 设备监控

## 安全合规

- 等级保护
- 信息安全管理体系
- 隐私保护 GDPR


## 细分领域

- 移动安全
- 工控安全、车联网安全、
- IoT安全、无人机、机器人
- AI安全

## 细分技术

### SCA 技术

- OpenSCA

### IAST 技术

- OpenIAST

### SAST 技术

- Fortify SCA
- Checkmarx
- Gitlab
- SonarQube
- Semgrep
- CodeQL

### DAST 技术

- Appscan AWVS


### SCA

- Sca主动扫描
- Sca被动扫描jenkins
- Sca帮助文档学习

``` bash
#!/bin/bash
# OSS平台配置相关
OSS_URL="https://sca.test.com:8080" # OSS平台地址(如：https://192.168.1.1:8080)
OSS_TOKEN="oss-token-xxx" # OSS平台令牌(从OSS平台的集成部署中获取)

JOB_NAME="TestJob"
# 检测类型相关
CHECK_TYPE=0     # 审查方式：快速审查(0)，深度审查(1)
CHECK_DEEP=-1    # 检测深度：实际深度(-1)，指定深度(1-100)
CLEAN_LEVEL=2    # 清洗等级：快速清洗(1)，深度清洗(2)

# 质量红线相关
QUALITY_TYPE=2                             # 质量红线类型：自定义(1)，平台内配置(2)
SWITCH_COMPONENT_BASELINE="true"          # 组件版本基线开关。质量红线类型为自定义时生效
SWITCH_COMPONENT_BLACKLIST="false"          # 组件黑名单开关。质量红线类型为自定义时生效
SWITCH_COMPONENT_WHITELIST="false"          # 组件白名单开关。质量红线类型为自定义时生效
SWITCH_VULNERABILITY_BLACKLIST="false"     # 漏洞黑名单开关。质量红线类型为自定义时生效
SWITCH_VULNERABILITY_WHITELIST="false"     # 漏洞白名单开关。质量红线类型为自定义时生效
SWITCH_LICENSE_BLACK_LIST="false"          # 许可证黑名单开关。质量红线类型为自定义时生效
SWITCH_LICENSE_WHITE_LIST="false"          # 许可证白名单开关。质量红线类型为自定义时生效
# 门禁阈值相关
SWITCH_QUALITY="false"                     # 门禁阈值总开关。质量红线类型为自定义时生效
SWITCH_QUALITY_VULNERABILITY="false"       # 漏洞阈值开关。门禁阈值开关打开时生效
SWITCH_QUALITY_LICENSE="false"             # 许可证阈值开关。门禁阈值开关打开时生效
VULNERABILITY_SERIOUS_THRESHOLD=0          # 严重漏洞阈值。漏洞阈值开关打开时生效
VULNERABILITY_HIGH_THRESHOLD=0             # 高危漏洞阈值。漏洞阈值开关打开时生效
VULNERABILITY_MEDIUM_THRESHOLD=0           # 中危漏洞阈值。漏洞阈值开关打开时生效
VULNERABILITY_LOW_THRESHOLD=0              # 低危漏洞阈值。漏洞阈值开关打开时生效
LICENSE_HIGH_THRESHOLD=0                   # 高风险许可证阈值。许可证阈值开关打开时生效
LICENSE_MEDIUM_THRESHOLD=0                 # 中风险许可证阈值。许可证阈值开关打开时生效
LICENSE_LOW_THRESHOLD=0                    # 低风险许可证阈值。许可证阈值开关打开时生效
# 检测包路径
FILEPATH=/tmp/${JOB_NAME}.tgz

if [ -z ${OSS_URL} -o -z ${OSS_TOKEN} ]; then
  echo "OSS平台地址和令牌不能为空"
  exit 1
fi

echo "打包中..."
echo ${FILEPATH}
tar -zcf ${FILEPATH} .

echo "上传检测..."
TASK_ID=`curl -k -L -X POST "${OSS_URL}/oss/api-v1/open-api/jenkins/pipeline/add" \
-H "OpenApiToken: ${OSS_TOKEN}" \
-F "file=@${FILEPATH}" \
-F "token=${OSS_TOKEN}" \
-F "taskName=${JOB_NAME}" \
-F "version=${BUILD_NUMBER}" \
-F "integrationType=2" \
-F "cleanLevel=${CLEAN_LEVEL}" \
-F "checkType=${CHECK_TYPE}" \
-F "deepLimit=${CHECK_DEEP}" \
-F "qualityType=${QUALITY_TYPE}" \
-F "componentBaseLineSwitch=${SWITCH_COMPONENT_BASELINE}" \
-F "componentBlacklistSwitch=${SWITCH_COMPONENT_BLACKLIST}" \
-F "componentWhitelistSwitch=${SWITCH_COMPONENT_WHITELIST}" \
-F "blackSwitch=${SWITCH_VULNERABILITY_BLACKLIST}" \
-F "whiteSwitch=${SWITCH_VULNERABILITY_WHITELIST}" \
-F "licenseBlackListSwitch=${SWITCH_LICENSE_BLACK_LIST}" \
-F "licenseWhiteListSwitch=${SWITCH_LICENSE_WHITE_LIST}" \
-F "qualitySwitch=${SWITCH_QUALITY}" \
-F "vulQualitySwitch=${SWITCH_QUALITY_VULNERABILITY}" \
-F "licenseQualitySwitch=${SWITCH_QUALITY_LICENSE}" \
-F "vulSeriousNum=${VULNERABILITY_SERIOUS_THRESHOLD}" \
-F "vulHighNum=${VULNERABILITY_HIGH_THRESHOLD}" \
-F "vulMediumNum=${VULNERABILITY_MEDIUM_THRESHOLD}" \
-F "vulLowNum=${VULNERABILITY_LOW_THRESHOLD}" \
-F "licenseHighNum=${LICENSE_HIGH_THRESHOLD}" \
-F "licenseMediumNum=${LICENSE_MEDIUM_THRESHOLD}" \
-F "licenseLowNum=${LICENSE_LOW_THRESHOLD}" \
-F "desc=${DESCRIPTION}"`

if [[ ! $TASK_ID =~ ^[0-9]+$ ]];then
  echo "上传检测包失败：${TASK_ID}"
  exit 1
fi

# 获取结果。状态：待检测(0)，检测中(1)，检测完成(2)，检测失败(3)
echo "检测中..."
TASK_STATUS=0
while [ ${TASK_STATUS} -eq 0 -o ${TASK_STATUS} -eq 1 ]
do
  sleep 3
  TASK_STATUS=`curl -k -L -X GET "${OSS_URL}/oss/api-v1/open-api/jenkins/pipeline/status/${TASK_ID}" -H "OpenApiToken: ${OSS_TOKEN}"`
done

echo "检测完成..."
if [ ${TASK_STATUS} -eq 2 ]; then
  # 检测结果
  TASK_RESULT=`curl -k -L -X GET "${OSS_URL}/oss/api-v1/open-api/jenkins/pipeline/result/${TASK_ID}" -H "OpenApiToken: ${OSS_TOKEN}"`
  echo -e "$TASK_RESULT"

  # 质量状态。不通过(0)，通过(1)
  QUALITY_STATUS=`curl -k -L -X GET "${OSS_URL}/oss/api-v1/open-api/jenkins/pipeline/quality/status/${TASK_ID}" -H "OpenApiToken: ${OSS_TOKEN}"`
  if [ ${QUALITY_STATUS} -ne 1 ]; then
    echo "质量状态(不通过：0，通过：1)：${QUALITY_STATUS}"
    exit 2
  fi
  elif [ ${TASK_STATUS} -eq 3 ]; then
    echo "检测出错"
    exit 3
  else
    echo "未知的任务状态：${TASK_STATUS}"
exit 4
fi
```

# GitHub 安全

- https://docs.github.com/zh/code-security/getting-started/github-security-features

* 入门
* 保护你的组织
* 机密扫描
* 代码扫描
* CodeQL CLI
* 适用于 VS Code 的 CodeQL
* 安全通知
* 供应链安全
* Dependabot

# Fortify

# 先进软件开发技术-重点学习文档

这个网站记录了很多软件测试领域，先进的软件工具，值得学习。

```
## 应用程序安全性测试Checkmarx
https://www.softtest.cn/show/43.html

## C/C++代码静态测试工具Helix QAC
https://www.softtest.cn/show/41.html

## 支持C/C++/C#/Java/Python/JavaScript/Kotlin的静态分析工具Klocwork
- https://www.softtest.cn/show/232.html

## 酷探SCA软件成分分析工具
- https://www.softtest.cn/show/267.html

## Codee Analyzer 静态代码分析器 — 提高C/C++代码性能
- https://www.softtest.cn/show/264.html

## 企业级源代码安全漏洞和质量缺陷扫描分析服务平台—酷探SAST
- https://www.softtest.cn/show/310.html
```

# CodeQL

    ## 替代品 Checkmarx，Fortify SCA
    - https://codeql.github.com/
    - https://codeql.github.com/docs/codeql-overview/

    ## learn
    - https://learn.microsoft.com/en-us/training/modules/code-scanning-with-github-codeql/
    - https://www.freebuf.com/articles/web/283795.html

## codeql docker

- https://github.com/j3ssie/codeql-docker

```
docker pull j3ssie/codeql-docker:latest

# simple usage
docker run --rm --name codeql-docker -v "/tmp/src:/opt/src" -v "/tmp/local-results:/opt/results" -e "LANGUAGE=go" j3ssie/codeql-docker:latest

# webgoat
docker run --rm --name codeql-docker -v "/root/WebGoat-main:/opt/src" -v "/tmp/local-results:/opt/results" -e "LANGUAGE=java" j3ssie/codeql-docker:latest

```


### Docker AWVS

- AWVS https://hub.docker.com/r/secfa/docker-awvs

```
Usage:
* docker pull secfa/docker-awvs
* docker run -it -d -p 13443:3443 --cap-add LINUX_IMMUTABLE secfa/docker-awvs
* Then visit https://YOUR_IP:13443/
INFO:
* Username:admin@admin.com⁠
* password:Admin123
* AWVS Version:231123131
```

### webgoat

- https://hub.docker.com/r/webgoat/webgoat

```
docker run -p 127.0.0.1:8080:8080 -p 127.0.0.1:9090:9090 webgoat/webgoat
```
