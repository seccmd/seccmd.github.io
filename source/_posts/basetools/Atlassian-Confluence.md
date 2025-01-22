# Atlassian-Confluence

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

# JIRA

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
