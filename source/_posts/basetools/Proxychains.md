# Proxychains

### 安装 proxychains

```
打开一个ssh 1080代理
ssh -D 1080  root@x.com

### 安装proxychains
sudo apt-get install proxychains

2.配置 /etc/proxychains.conf
修改 >socks4 127.0.0.1 9095为
socks5 127.0.0.1 1080
另外修改DNS：
proxy_dns 8.8.8.8

3. 执行
然后对于任何程序，只要在其前面加上proxychains命令就可以，例如：
proxychains xxx
xxx的所有连接就可以走proxychains了
```

### 代理方式一：
    ssh -D 1080 root@x.com
    curl --socks5 127.0.0.1:1080 cip.cc
    export http_proxy='socks5://127.0.0.1:1080'    
    export https_proxy='socks5://127.0.0.1:1080'
    export ALL_PROXY=socks5://127.0.0.1:1080

### 代理方式二：
    ssh -D 1080 root@x.com
    apt install proxychains4
    vi /etc/proxychains4.conf
    proxychains4 curl cip.cc
