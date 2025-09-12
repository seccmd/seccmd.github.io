---
date: 2024-01-01
title: SSL-TLS证书管理
author: [SecCMD]
description: >
  本页面详细介绍SSL-TLS证书相关知识，涵盖openssl生成自签名根证书、服务器端和客户端证书的具体步骤，Let's Encrypt申请免费SSL证书的流程及证书更新方法，以及SSL自签名证书的创建、安装和Nginx配置教程，为你提供全面的SSL-TLS证书实操指导。
categories: 基础工具
tags:
  - 证书管理
  - 加密技术
---

## openssl 基础命令

### openssl 加解密操作

```bash
计算MD5和SHA1

# MD5 digest
> openssl dgst -md5 filename

# SHA1 digest
> openssl dgst -sha1 filename
```

### openssl 查看证书

```bash
#### openssl 查看证书 crt pem

# 查看KEY信息
> openssl rsa -noout -text -in myserver.key
# 查看CSR信息
> openssl req -noout -text -in myserver.csr
# 查看证书信息
> openssl x509 -noout -text -in ca.crt
# 验证证书，提示self signed
> openssl verify selfsign.crt
# 因为myserver.crt 是幅ca.crt发布的，所以会验证成功
> openssl verify -CAfile ca.crt myserver.crt
# 去掉key的密码保护，有时候每次都要输入密码太繁琐了,可以把Key的保护密码去掉
> openssl rsa -in myserver.key -out server.key.insecure
```

### openssl 证书格式转换

```
一般证书有三种格式：
PEM(.pem) 前面命令生成的都是这种格式，
DER(.cer .der) Windows 上常见
PKCS#12文件(.pfx .p12) Mac上常见

# PEM转换为DER
> openssl x509 -outform der -in myserver.crt -out myserver.der

# DER转换为PEM
> openssl x509 -inform der -in myserver.cer -out myserver.pem

# PEM转换为PKCS
> openssl pkcs12 -export -out myserver.pfx -inkey myserver.key -in myserver.crt -certfile ca.crt

# PKCS转换为PEM
> openssl pkcs12 -in myserver.pfx -out myserver2.pem -nodes
```

### openssl 测试证书

```bash
Openssl提供了简单的client和server工具，可以用来模拟SSL连接，做测试使用。

Client
# 连接到远程服务器
> openssl s_client -connect www.google.com.hk:443

# 可以将服务器的证书保存下来
> openssl s_client -connect www.google.com.hk:443 remoteserver.pem

# 转换成DER文件，就可以在Windows下直接查看了
> openssl x509 -outform der -in remoteserver.pem -out remoteserver.cer

Server
# 模拟的HTTPS服务，可以返回Openssl相关信息
# -accept 用来指定监听的端口号
# -cert -key 用来指定提供服务的key和证书
> openssl s_server -accept 443 -cert myserver.crt -key myserver.key -www

# 可以将key和证书写到同一个文件中
> cat myserver.crt myserver.key > myserver.pem

# 使用的时候只提供一个参数就可以了
> openssl s_server -accept 443 -cert myserver.pem -www
```



HTTPS双向认证（Mutual TLS authentication)

PKI
https://smallstep.com/hello-mtls/doc/client/nodejs
Using Mutual TLS on the Client Side with Node.js — Smallstep

https://smallstep.com/docs/step-ca
step-ca open source server (smallstep.com)

https://github.com/smallstep/cli#installation-guide
GitHub - smallstep/cli: 🧰 A zero trust swiss army knife for working with X509, OAuth, JWT, OATH OTP, etc.

## SSL-TLS-Cert

### openssl

```
HTTPS双向认证（Mutual TLS authentication) 
https://help.aliyun.com/document_detail/160093.html

4.1生成自签名根证书
（1）创建根证书私钥：
openssl genrsa -out root.key 1024
（2）创建根证书请求文件：
openssl req -new -out root.csr -key root.key
	Country Name (2 letter code) [XX]:cn
	State or Province Name (full name) []:bj
	Locality Name (eg, city) [Default City]:bj
	Organization Name (eg, company) [Default Company Ltd]:alibaba
	Organizational Unit Name (eg, section) []:test
	Common Name (eg, your name or your servers hostname) []:root
	Email Address []:a.alibaba.com
	A challenge password []:
	An optional company name []:
（3）创建根证书：
openssl x509 -req -in root.csr -out root.crt -signkey root.key -CAcreateserial -days 3650

4.2 生成自签名服务器端证书
（1）生成服务器端证书私钥：

openssl genrsa -out server.key 1024
（2） 生成服务器证书请求文件，过程和注意事项参考根证书，本节不详述：

openssl req -new -out server.csr -key server.key
（3） 生成服务器端公钥证书

openssl x509 -req -in server.csr -out server.crt -signkey server.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650

4.3 生成自签名客户端证书
（1）生成客户端证书密钥：

openssl genrsa -out client.key 1024
openssl genrsa -out client2.key 1024
（2） 生成客户端证书请求文件，过程和注意事项参考根证书，本节不详述：

openssl req -new -out client.csr -key client.key
openssl req -new -out client2.csr -key client2.key
（3） 生客户端证书

openssl x509 -req -in client.csr -out client.crt -signkey client.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650
openssl x509 -req -in client2.csr -out client2.crt -signkey client2.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650
（4） 生客户端p12格式证书，需要输入一个密码，选一个好记的，比如123456

openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12
openssl pkcs12 -export -clcerts -in client2.crt -inkey client2.key -out client2.p12
重复使用上面的命令，我们得到两套客户端证书：

- client.key / client2.key：客户端的私钥文件

- client.crt / client2.key：有效期十年的客户端证书

使用根证书和客户端私钥一起生成 client.p12/client2.p12，这个证书文件包含客户端的公钥和私钥，主要用来给浏览器访问使用

curl --cert ./client.crt --key ./client.key https://integration-fred2.fredhuang.com -k -v

参考：
Demo for Client Certificate Authentication
https://github.com/julie-ng/nodejs-certificate-auth
```

### Let's Encrypt

说明：Let's Encrypt —— 是一个由非营利性组织 互联网安全研究小组（ISRG）提供的免费、自动化和开放的证书颁发机构（CA），简单的说，就是为网站提供免费的 SSL/TLS 证书。acme.sh 实现了 acme 协议,可以从letsencrypt生成免费的证书。接下来将为大家介绍怎样申请Let's Encrypt通配符证书。

- 使用acme.sh申请Let's Encrypt免费的SSL证书
- https://cloud.tencent.com/developer/article/1877928
- 详解 ACME V2 (RFC 8555) 协议，你是如何从Let's Encrypt 申请到证书的 
- https://zhuanlan.zhihu.com/p/75032510

```
# 使用 Let's Encrypt 获取 SSL 证书的第一步是在服务器上安装 Certbot
sudo apt-get update
sudo apt install certbot python3-certbot-nginx

# 为域名获取证书

sudo certbot --nginx --nginx-server-root /usr/local/nginx/conf/  -d seccmd.net -d www.seccmd.net

sudo certbot --expand --nginx --nginx-server-root /usr/local/nginx/conf/  -d seccmd.net -d www.seccmd.net -d 123.seccmd.net -d sec123.seccmd.net

# 由于Let's Encrypt的证书有效期只有90天，到期后使用certbot renew命令来更新证书，我们只需要把该命令做成任务定期执行即可
sudo systemctl status certbot.timer

# 最后测试任务运行情况
sudo certbot --nginx --nginx-server-root /usr/local/nginx/conf/ renew --dry-run

1.查看证书：
certbot certificates

2.删除某个安装了证书的域名：
certbot delete --cert-name example.com

3.重新创建和更新现有证书
certbot --expand -d existing.com,example.com,newdomain.com

使用教程：https://eff-certbot.readthedocs.io/en/stable/using.html
```

### SSL Self-Signed 自签名

```
1. Create and install a self-signed SSL certificate:
$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certificate.key -out /etc/nginx/certificate.crt
$ sudo chmod 400 /etc/nginx/certificate.key

2.Follow the prompts. 输入证书信息
Tip: It is IMPORTANT that the Common Name be set properly.  字段Common Name非常重要
Enter your fully qualified domain name(FQDN) here or, if you don’t have a FQDN,  输入域名
use your public IP address.  没有域名输入IP地址
For example, my FQDN for the chat server is chat.inumio.com .例如：chat.inumio.com

3. 配置 Nginx 删除默认SSL配置文件，拷贝下面配置
$ sudo nano /etc/nginx/sites-enable/default
# HTTPS Server
    server {
        listen 443 ssl;
        server_name _;

        error_log /var/log/nginx/rocketchat_error.log;

        ssl_certificate /etc/nginx/certificate.crt;
        ssl_certificate_key /etc/nginx/certificate.key;
        ssl_protocols TLSv1.2;
        ssl_ciphers 'ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA';
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:20m;
        ssl_session_timeout 180m;

        location / {
            proxy_pass http://chat.inumio.com:3000/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "upgrade";
            proxy_set_header Host $http_host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto https;
            proxy_set_header X-Nginx-Proxy true;
            proxy_redirect off;
        }
    }
```
