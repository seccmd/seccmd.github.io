# Jenkins

## 学习入门
- https://www.jenkins.io/
- https://www.jenkins.io/zh/doc/pipeline/tour/getting-started/
- https://www.cnblogs.com/wfd360/p/11314697.html


## 配置 git windows

- https://gitforwindows.org/

## 配置 mvn windows

- https://maven.apache.org/guides/getting-started/windows-prerequisites.html
- 遇到问题：正确安装mvn，还是找不到，需要重启。

## 升级版本

```
# 替换下载的 war 包
find /usr -name jenkins.war
/usr/share/java/jenkins.war
```

## 配置 jenkins 插件中心为国内镜像地址

```
进入 Manage Jenkins -》 Manage Plugin -> Advanced 最下面有 Update Site，
设置为：
https://mirrors.tuna.tsinghua.edu.cn/jenkins/updates/update-center.json
http://mirror.xmission.com/jenkins/updates/update-center.json
```

## Failure running any sh operations on Windows

```
Windows machines don’t have sh support from the Jenkins Pipeline. Use bat or powershell.
```

## Jenkins Docker error: Invalid agent type

```
Invalid agent type "docker" specified. Must be one of [any, label, none].

Jenkins Docker plugin, or the Jenkins Docker Pipeline plugin. Just add those two Jenkins plugins
```
