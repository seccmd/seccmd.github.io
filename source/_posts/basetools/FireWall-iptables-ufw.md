# FireWall

### ufw 
```
1. sudo apt-get install ufw

### Set the default access rules:
1. sudo ufw default deny incoming
2. sudo ufw default allow outgoing

### Set the service rules (SSH / HTTPS)
1. sudo ufw allow 22/tcp
2. sudo ufw allow 443/tcp

### Enable the firewall:
1. sudo ufw enable
2. sudo ufw disable
3. sudo ufw status

### If you ever add or delete rules you should reload the firewall
1. sudo ufw reload

注意
UFW是为了简化Iptables产生的，它在Iptables有自己的规则链。
Docker在启动时在Iptables会创建自己的规则链，所以不生效。

可以把规则添加到Docker连中即可。
iptables -I DOCKER -p all -j DROP

最后记得执行 iptables-save 保存规则
```

### ufw demo

```
netstat -antp | grep LISTEN | grep -v 127 | grep -v nginx
tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      546/sshd: /usr/sbin
tcp        0      0 0.0.0.0:35707           0.0.0.0:*               LISTEN      275644/java
tcp        0      0 172.31.225.91:41371     0.0.0.0:*               LISTEN      275644/java

### Set the default access rules:
sudo ufw default deny incoming
sudo ufw default allow outgoing

### Set the service rules (SSH / HTTPS)
sudo ufw allow 22/tcp
sudo ufw allow 443/tcp
sudo ufw allow 8443/tcp
sudo ufw allow 9443/tcp

### Enable the firewall:
sudo ufw enable
```

### 云主机 snat 配置
    iptables -t nat -I POSTROUTING -s 192.168.0.0/16 -j SNAT --to-source  192.168.0.1(云主机自身本地IP)
    iptables -t nat -I POSTROUTING -s 172.18.8.0/24 -j SNAT --to-source  172.18.8.210
    iptables -L -n -t nat # 查看 nat 规则
    - https://blog.csdn.net/weixin_46389364/article/details/109393899
    - https://blog.csdn.net/qq_40025218/article/details/84837802

### 云主机 dnat 配置，由于包转发，包含外网原始地址，不是内网地址直接丢弃。
    iptables -t nat -A PREROUTING -d 172.18.8.210 -p tcp -m tcp --dport 2222 -j DNAT --to-destination 172.18.8.211:22
    iptables -L -n -t nat # 查看 nat 规则
    ssh -p 2222 -D 1080 nat_ip
    - https://www.cnblogs.com/jjzd/p/6505871.html

### Linux的策略路由
- https://www.ujslxw.com/2020/10/19/44.html
