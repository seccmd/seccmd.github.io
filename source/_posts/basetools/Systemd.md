# Systemd Demo

### 设置frp开机自启: https://www.cnblogs.com/srczhang/p/12698685.html
```
创建服务文件
sudo vi /etc/systemd/system/frpc.service
填入如下信息，ExecStart请自行替换
[Unit]
Description=Frp Client
After=network.target
Wants=network.target
[Service]
User=frp
Group=frp
Restart=on-failure
RestartSec=5
ExecStart=/home/frp/frps/frps -c /home/frp/frps/frps.ini
[Install]
WantedBy=multi-user.target
#刷新服务列表：
systemctl daemon-reload
#设置开机自启
systemctl enable frpc
#关闭开机自启
systemctl disable frpc
#启动服务
systemctl start frpc
#停止服务
systemctl stop frpc
#服务状态
systemctl status frpc
```

### 一键脚本: 待补充
