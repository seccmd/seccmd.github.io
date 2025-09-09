---
date: 2022-11-11
title: IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南
author: [SecCMD]
description: >
  本页面聚焦于身份验证与代理服务的集成部署，详细介绍了访问管理后台IAM的使用，以及在Keycloak中设置OIDC身份验证提供程序的步骤。同时，阐述了oauth proxy的下载与配置，Nginx的服务器配置，以及Wiki.js的安装、SSO登录配置和自签名证书信任问题解决方案。此外，还提供了Chat证书生成的openssl命令，为企业构建安全、高效的身份验证与访问管理体系提供全面且实用的技术指导。
categories: 基础工具
tags:
  - 身份验证
---

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

### WiKiJS

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
