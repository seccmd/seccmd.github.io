# frp

### 文档 | frp (gofrp.org)
- https://gofrp.org/docs/

```
# ftp server dashborad
http://x.com:58080/static/#/

dashboard_port = 58080
dashboard_user = admin@qq.com
dashboard_pwd = passwd@qq.com

# 后台服务Systemd
systemctl start frpc
sudo cp frpc.service /etc/systemd/system/
[Unit]
Description=Frp Client Service
After=network.target
[Service]
Type=simple
User=nobody
Restart=on-failure
RestartSec=5s
ExecStart=/usr/bin/frpc -c /etc/frp/frpc.ini
ExecReload=/usr/bin/frpc reload -c /etc/frp/frpc.ini
LimitNOFILE=1048576
[Install]
WantedBy=multi-user.target
```
