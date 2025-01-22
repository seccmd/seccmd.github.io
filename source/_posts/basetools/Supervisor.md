# Supervisor

### 安装

    apt-get install supervisor
    systemctl status supervisord

### 配置文件

    /etc/supervisor/supervisord.conf
    /etc/supervisor/conf.d

### supervisorctl 常用命令

    supervisorctl start/stop/restart program_name
    supervisorctl reload/upload
    supervisorctl stop all	停止全部进程

### 创建一个hwapp.conf进程配置文件：

    [program:hwapp]
    directory=/root/wwwroot/hwapp/publish
    command=dotnet hwapp.dll
    autostart=true
    autorestart=true
    startretries=10
    redirect_stderr=true
    stdout_logfile=/root/wwwroot/hwapp/hwapp.log
    environment=ASPNETCORE_ENVIRONMENT="Development"
