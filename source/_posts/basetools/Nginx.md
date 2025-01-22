---
date: 2023-09-01
title: Nginx安装配置全攻略
authors: [SecAdmin]
description: >
  本页面专注于Nginx服务器的安装与配置技巧，涵盖从基础安装到多种高级应用场景。介绍Nginx安装指令，以及如何测试配置文件确保其正确性。深入讲解Basic Auth认证设置、Http Proxy代理配置、云主机TCP端口转发等操作，还详细阐述NGINX location在配置中的优先级，为您提供全面且实用的Nginx使用指引。
categories: 基础工具
tags:
  - Nginx
  - 网络代理
---

# Nginx安装配置全攻略

### Install Nginx

```
$ sudo apt-get install nginx

### 测试配置文件01
Test the config & Restart nginx: 
$ sudo service nginx configtest && sudo service nginx restart

### 测试配置文件02
TIP: You can pinpoint problems in your nginx config using the following command
$ sudo nginx -t
```

### Basic Auth

```
1、生成认证文件
# printf "test:$(openssl passwd -crypt 123456)\n" >> /etc/nginx/htpasswd 
# cat /etc/nginx/htpasswd 
test:xyJkVhXGAZ8tM

2、配置网站conf文件
server{
       listen 80;
       server_name  www.moerats.com moerats.com;
       index index.html index.php;
       root /home/wwwroot/www.moerats.com;       
       location /
       {
                auth_basic "Please enter your username and password";
                auth_basic_user_file /etc/nginx/htpasswd; 
                autoindex on; # 打开目录浏览功能
       }
}

3、重启Nginx
/etc/init.d/nginx restart
/usr/local/nginx/sbin/nginx -t测试配置是否有错误。 
/usr/local/nginx/sbin/nginx -s reload载入配置文件。

```

### Http Proxy

```
$ vi /etc/nginx/sites-enabled/local8080
$ /etc/init.d/nginx reload

upstream local8080 {
    server 127.0.0.1:8080 weight=1;
}

server {
    #侦听的80端口
    listen       80;
    server_name  sso.lab.com;

    #匹配以jsp结尾的，tomcat的网页文件是以jsp结尾
    location / {
        index index.html;
        proxy_pass   http://local8080;    #在这里设置一个代理，和upstream的名字一样
        #以下是一些反向代理的配置可删除
        proxy_redirect             off;
        #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
        proxy_set_header           Host $host;
        proxy_set_header           X-Real-IP $remote_addr;
        proxy_set_header           X-Forwarded-For $proxy_add_x_forwarded_for;
        client_max_body_size       10m; #允许客户端请求的最大单文件字节数
        client_body_buffer_size    128k; #缓冲区代理缓冲用户端请求的最大字节数
        proxy_connect_timeout      300; #nginx跟后端服务器连接超时时间(代理连接超时)
        proxy_send_timeout         300; #后端服务器数据回传时间(代理发送超时)
        proxy_read_timeout         300; #连接成功后，后端服务器响应时间(代理接收超时)
        proxy_buffer_size          4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
        proxy_buffers              4 32k; #proxy_buffers缓冲区，网页平均在32k以下的话，这样设置
        proxy_busy_buffers_size    64k; #高负荷下缓冲大小（proxy_buffers*2）
        proxy_temp_file_write_size 64k; #设定缓存文件夹大小，大于这个值，将从upstream服务器传
    }
    #设定查看Nginx状态的地址
    #location /nginxstatus{
    #     stub_status on;
    #     access_log on;
    #     auth_basic "nginxstatus";
    #     auth_basic_user_file htpasswd;
    #}
}
```

### 云主机 nginx tcp 端口转发
```
- https://blog.csdn.net/qq_40863328/article/details/92802958
apt install nginx
vi /etc/nginx/nginx.conf
stream {
upstream tcp4444to22 {
            server 172.18.8.211:22;
}
server {
            listen 4444;
            proxy_connect_timeout 8s;
            proxy_pass tcp4444to22;
}
```

### NGINX location 在配置中的优先级

```
NGINX location 在配置中的优先级 - 技术颜良 - 博客园 (cnblogs.com)
nginx location配置详细解释 - 星朝 - 博客园 (cnblogs.com)
location表达式类型
~ 表示执行一个正则匹配，区分大小写
~* 表示执行一个正则匹配，不区分大小写
^~ 表示普通字符匹配。使用前缀匹配。如果匹配成功，则不再匹配其他location。
= 进行普通字符精确匹配。也就是完全匹配。
@ "@" 定义一个命名的 location，使用在内部定向时，例如 error_page, try_files
location优先级说明
在nginx的location和配置中location的顺序没有太大关系。正location表达式的类型有关。相同类型的表达式，字符串长的会优先匹配。
以下是按优先级排列说明：
第一优先级：等号类型（=）的优先级最高。一旦匹配成功，则不再查找其他匹配项。
第二优先级：^~类型表达式。一旦匹配成功，则不再查找其他匹配项。
第三优先级：正则表达式类型（~ ~*）的优先级次之。如果有多个location的正则能匹配的话，则使用正则表达式最长的那个。
第四优先级：常规字符串匹配类型。按前缀匹配。
location优先级示例
配置项如下:
location = / {
# 仅仅匹配请求 /
[ configuration A ]
}
location / {
# 匹配所有以 / 开头的请求。但是如果有更长的同类型的表达式，则选择更长的表达式。如果有正则表达式可以匹配，则
# 优先匹配正则表达式。
[ configuration B ]
}
location /documents/ {
# 匹配所有以 /documents/ 开头的请求。但是如果有更长的同类型的表达式，则选择更长的表达式。
#如果有正则表达式可以匹配，则优先匹配正则表达式。
[ configuration C ]
}
location ^~ /images/ {
# 匹配所有以 /images/ 开头的表达式，如果匹配成功，则停止匹配查找。所以，即便有符合的正则表达式location，也
# 不会被使用
[ configuration D ]
}
location ~* \.(gif|jpg|jpeg)$ {
# 匹配所有以 gif jpg jpeg结尾的请求。但是 以 /images/开头的请求，将使用 Configuration D
[ configuration E ]
}
请求匹配示例
/ -> configuration A
/index.html -> configuration B
/documents/document.html -> configuration C
/images/1.gif -> configuration D
/documents/1.jpg -> configuration E
注意，以上的匹配和在配置文件中定义的顺序无关。

# 来自 <https://www.bo56.com/nginx-location%E5%9C%A8%E9%85%8D%E7%BD%AE%E4%B8%AD%E7%9A%84%E4%BC%98%E5%85%88%E7%BA%A7/> 
```
