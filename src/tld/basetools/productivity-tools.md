---
date: 2023-03-10
title: 办公生产力效率工具合集
author: [SecCMD]
description: >
  搭建自己个人博客，尝试多个博客系统，我想在博客中表达的内容类型比较多，总是不能完全满足需求，最后选择这个组合Hexo-Stellar是我最喜欢的，基本不用修改太多配置，阅读使用注意力很集中。安装过程记录一下，便于快速部署。
categories: 程序编程
tags:
  - Mkdocs
  - Program
---

## 浏览器插件

* WeTab 标签页插件
	- Wetab 是一款可以亲手打造属于自己的高颜值主页的小组件新标签页插件。  

* Ublock 去除广告
	- [ublock](https://chrome.google.com/webstore/detail/cjpalhdlnbpafiamejdnhcphjbkeiagm) 免除优酷，腾讯，爱奇艺，YouTube视频广告

* Workona 大量标签页管理
	- 这款插件可以帮助我在不同的工作区组织多个Tab。

* Web for TikTok
	- [Web for TikTok](https://chrome.google.com/webstore/detail/dedphjedjalglppdfpmmibdbbkmifnbb) 刷海外版抖音TikTok，下载Tiktok短视频

* RSSHub Radar
	- 快速发现和订阅当前网站 RSS 和 RSSHub 的浏览器扩展 万物皆可 RSS

## AI 助手

| 名称 | 功能 |
|---|---|
| [AIshort.top](https://www.aishort.top/) | 提示词助手 |
| [Looka.com](https://looka.com/) | Logo 设计助手 |
| [ChatPDF.com](https://www.chatpdf.com/) | PDF 阅读分析助手 |
| [myGPTReader](https://github.com/madawei2699/myGPTReader) | AI 阅读助手(支持多种类型文档) |
| [Copy.ai](https://www.copy.ai/) | 辅助编写商业市场营销文案 |
| [Copyai.cn](https://copyai.cn/) | 文案种类做很多  |


## 在线翻译

* DeepL
	- https://www.deepl.com/  
* 沉浸式浏览器翻译插件
	- https://immersive-translate.owenyoung.com/  
* Saladict 聚合词典, 并行翻译
	- [Saladict](https://chrome.google.com/webstore/detail/%E6%B2%99%E6%8B%89%E6%9F%A5%E8%AF%8D-%E8%81%9A%E5%90%88%E8%AF%8D%E5%85%B8%E5%88%92%E8%AF%8D%E7%BF%BB%E8%AF%91/cdonnmffkdaoajfknoeeecmchibpmkmg/related)
* 科大讯飞文档翻译
	- https://fanyi.xfyun.cn/console/trans/doc  
* 福昕翻译
	- https://fanyi.pdf365.cn/doc  
* 知云文献
	- http://www.zhiyunwenxian.cn  
* 搜狗翻译
	- https://fanyi.sogou.com/document  

## 听力口语

* 语言交流App
	- https://zh.hinative.com/  

* Myshell.ai 一款可以和虚拟人语音聊天的网页工具
	- https://myshell.ai

* IELTS speaking test
	- [IELTS speaking test.](https://www.ieltsadvantage.com/2023/02/19/ielts-speaking-questions/?gad=1&gclid=CjwKCAjwqZSlBhBwEiwAfoZUIIZ5QHD0RiflgRKaJgu3qycTSjf_MM4HIB0SFwCh7tw8qv_evQOTLBoCjhUQAvD_BwE)

* Qwerty Learner 单词记忆与英语肌肉记忆锻炼软件
	- https://qwerty.kaiyi.cool


## 绘图工具

* Draw.io
	- https://github.com/jgraph/drawio-desktop  
* Asciiflow 免费在线绘制ASCII风格图
	- https://asciiflow.com/  
* PlantUML 支持文本绘制类UML图的工具
	- https://plantuml.com/zh/
* Mermaid 原生支持Web，无需通过生成图片即可集成到网站页面
	- https://github.com/mermaid-js/mermaid

## 白板工具

* Excalidraw
	- https://excalidraw.com/
	Excalidraw is a virtual collaborative whiteboard tool that lets you easily sketch diagrams that have a hand-drawn feel to them.  

* Whimsical
	- https://whimsical.com/
	Whimsical brings together four powerful formats in a unified hub for collaboration. 

## 好用的在线工具集

- https://tool.browser.qq.com/
- [PDF24 Tools: 免费且易于使用的在线PDF工具](https://tools.pdf24.org/zh/)
- [无需上传文件也可在线处理图片 (imagestool.com)](https://imagestool.com/zh_CN/index.html)

## 其他工具

- 寻找替代软件的网站：[AlternativeTo](https://alternativeto.net/)
- 世界最大开源及开放数据图书馆：[安娜的档案 (annas-archive.org)](https://zh.annas-archive.org/)

## IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南

### IAM

```
# 访问管理后台,管理员IAM

https://iam.lab.com/admin/master/console/

# Keycloak OIDC Auth Provider

1.Create new client in your Keycloak realm with Access Type 'confidental', Client protocol 'openid-connect' and Valid Redirect URIs 'https://internal.yourcompany.com/oauth2/callback'
2.Take note of the Secret in the credential tab of the client
3.Create a mapper with Mapper Type 'Group Membership' and Token Claim Name 'groups'.
4.Create a mapper with Mapper Type 'Audience' and Included Client Audience and Included Custom Audience set to your client name.
```

### Oauth proxy

- 下载 https://github.com/oauth2-proxy/oauth2-proxy/releases

```
# Make sure you set the following to the appropriate url:
./oauth2-proxy \
   --provider=keycloak-oidc \
   --client-id=oauth_proxy \
   --client-secret=<password> \
   --redirect-url=https://wiki.lab.com/oauth2/callback \
   --oidc-issuer-url=https://x.x.x.x/realms/master \
   --email-domain=* \
   --upstream=http://127.0.0.1:3000/ \
   --reverse-proxy=true \
   --cookie-secure=true \
   --cookie-secret=<password> \
   --insecure-oidc-allow-unverified-email  
    --allowed-role=<realm role name> // Optional, required realm role
    --allowed-role=<client id>:<client role name> // Optional, required client role
```

### Nginx

```
server {
    listen 443 default ssl;
    server_name wiki.lab.com;
    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/cert.key;
    add_header Strict-Transport-Security max-age=2592000;

    location / {
        proxy_buffer_size 8k;
        proxy_pass http://127.0.0.1:4180;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Scheme $scheme;
        proxy_connect_timeout 1;
        proxy_send_timeout 30;
        proxy_read_timeout 30;
    }
}
```

## WiKiJS

- wiki.lab.com

```
# Wiki.js
SITE URL: https://x.x.x.x:8443/

配置sso登录：
https://gist.github.com/Sherex/283d1e4ef07b2bf0a930417dc0117238

被坑点，wiki不信任iam的自签名证书，强制关闭证书检验
  wiki:
    environment:
      NODE_TLS_REJECT_UNAUTHORIZED: 0

# Demo 体验一下：

# 普通用户登录Wiki：
https://x.x.x.x:8443/login 选择 SSO 登录

# 管理员登录Wiki：
https://x.x.x.x:8443/

# 管理员IAM
https://x.x.x.x/admin/master/console/
```

### Chat

```
openssl req -x509 -out lab.crt -keyout lab.key -days 1825 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=lab.com' -extensions EXT -config <( \
   printf "[dn]\nCN=lab.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:lab.com\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")

openssl req -x509 -out lab.crt -keyout lab.key -days 1825 \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=lab.com' -extensions EXT -config <( \
   printf "[dn]\nCN=lab.com\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=IP:x.x.x.x\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth")
```


## Atlassian-Confluence与JIRA安装配置全攻略

```
系统: Ubuntu 20.04

# 安装Java
$ apt install openjdk-8-jre-headless

# 安装PSQL
$ apt install postgresql
$ su - postgres
$ psql
  create user confluence with password 'cfpaasswoord';
  create database confluence owner confluence;
  grant all on database confluence to confluence;
$ psql -U username databasename < /data/dum.sql 

# 安装CF
下载地址: https://www.atlassian.com/software/confluence/download-archives
版本: 7.13.5-x64
$ ./atlassian-confluence-7.13.5-x64.bin
  Installation Directory: /opt/atlassian/confluence 
  Home Directory: /var/atlassian/application-data/confluence 
  HTTP Port: 8090 
  RMI Port: 8000 
安装过程，先不启动

# 破解补丁
  地址: https://gitee.com/pengzhile/atlassian-agent/attach_files/832833/download/atlassian-agent-v1.3.1.zip
  目录: /opt/atlassian/atlassian-agent

# 启动运行补丁: vi /etc/init.d/confluence
  # Padding hhll
  export JAVA_OPTS="-javaagent:/opt/atlassian/atlassian-agent/atlassian-agent.jar ${JAVA_OPTS}"

!!! 启动服务
!!! 访问Web8090，获取序列号 B405-8EDR-W57R-NYCY

# 生成激活码 KeyGen
  java -jar /opt/atlassian/atlassian-agent/atlassian-agent.jar
 /opt/atlassian/confluence/jre/bin/java -jar atlassian-agent.jar -p conf -m admin@admin.com -n my_name -o admin -s B405-8EDR-W57R-NYCY

!!! 访问Web8090，输入激活码

# 启动服务:
/etc/init.d/confluence start
   Enter your Confluence license key
# 初始化步骤
  设置数据库
  设置管理员

# 参考：

CF安装教程:
https://zhuanlan.zhihu.com/p/127343265
https://blog.zhongkehuayu.com/?p=1223
https://www.cnblogs.com/ling-yu-amen/p/10487739.html
https://chenliny.com/archives/426/
https://www.cnblogs.com/lizm166/p/12331047.html
https://blog.csdn.net/RAPTORHAWK/article/details/115679891

x安装MySQLx
$ apt-get install mysql-server
$ mysql
mysql > create database confluence default character set utf8 collate utf8_bin;
mysql > create user 'confluence'@'%' identified by 'cfpassword';
mysql > grant all on confluence.* to 'confluence'@'%';
mysql > flush privileges;

Docker安装方案（版本太老了）
https://github.com/cptactionhank/docker-atlassian-confluence
```

## JIRA

### 安装Java

`$ apt install openjdk-8-jre-headless`

### 安装PSQL

```
$ apt install postgresql
$ su - postgres
$ psql
  create user jira with password 'jirapassword';
  create database jira owner jira;
  grant all on database jira to jira;
$ psql -U username databasename < /data/dum.sql 
```

### 安装Jira

下载地址: https://www.atlassian.com/software/jira/update

```
$ ./atlassian-jira-software-8.20.8-x64.bin
  Installation Directory: /opt/atlassian/jira 
  Home Directory: /var/atlassian/application-data/jira 
  HTTP Port: 8080 
  RMI Port: 8005 
```

### 补丁

```
  地址: https://gitee.com/pengzhile/atlassian-agent/attach_files/832833/download/atlassian-agent-v1.3.1.zip
  目录: /opt/atlassian/atlassian-agent

  # 启动运行补丁: vi /etc/init.d/confluence
  # Padding hhll
  export JAVA_OPTS="-javaagent:/opt/atlassian/atlassian-agent/atlassian-agent.jar ${JAVA_OPTS}"
  /etc/init.d/jira start

  # 获取激活码 KeyGen
  Enter your Confluence license key
  java -jar /opt/atlassian/atlassian-agent/atlassian-agent.jar
  java -jar /opt/atlassian/atlassian-agent/atlassian-agent.jar -p jira -m admin@admin.com -n my_name -o admin -s XXXX-XXXX-XXXX-XXXX
```

### 启动服务:

`/etc/init.d/confluence start`

### 初始化步骤

- 设置数据库、设置管理员
- http://x.x.x.x:8080

# confluence+nginx配置https
```
# https://confluence.atlassian.com/doc/running-confluence-over-ssl-or-https-161203.html
# https://www.cnblogs.com/lixiaoran/p/12134531.html

server {
    listen 443 ssl;
    server_name _;
    error_log /var/log/nginx/cf_error.log;
    ssl_certificate /etc/nginx/certificate.crt;
    ssl_certificate_key /etc/nginx/certificate.key;

        ssl_protocols TLSv1.2;
        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:20m;
        ssl_session_timeout 180m;

 
    location /confluence {
        client_max_body_size 100m;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:8090/confluence;
    }
    location /synchrony {
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_pass http://localhost:8091/synchrony;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
    }
}
```
