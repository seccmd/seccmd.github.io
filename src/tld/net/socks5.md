# SOCKS5

## SOCKS5 代理客户端

### Linux 命令行设置代理（当前终端生效）

```Bash
export http_proxy="http://192.168.1.100:8080"
export https_proxy="http://192.168.1.100:8080"
export ftp_proxy="http://<代理IP>:<端口>"       # FTP 代理
export no_proxy="localhost,127.0.0.1"          # 不走代理的地址
curl -I http://www.google.com  # 检查是否能访问外网

# 直接在命令前设置代理​
http_proxy="http://192.168.1.100:8080" curl -I http://www.google.com

# 代理服务器认证（用户名/密码）​
export http_proxy="http://用户名:密码@192.168.1.100:8080"
export https_proxy="http://用户名:密码@192.168.1.100:8080"
unset http_proxy
unset https_proxy
unset ftp_proxy

```

### Proxychains

```Bash
apt update && apt install -y curl wget proxychains

nano /etc/proxychains.conf
socks5 192.168.1.100 1080 

# 测试代理是否生效​​：
proxychains curl -I http://www.google.com

```

**上帝模式：所有命令走代理​**​：牛X

```Bash
proxychains bash  # 启动一个子 Shell，所有命令自动走代理
curl -I http://www.google.com  # 现在无需手动加 proxychains
```

### Git 代理设置

```Bash
git config --global http.proxy "http://192.168.1.100:8080"
git config --global https.proxy "http://192.168.1.100:8080"

git config --global --unset http.proxy
git config --global --unset https.proxy

```

### Docker 代理设置

```JSON
sudo nano /etc/docker/daemon.json

{
  "proxies": {
    "default": {
      "httpProxy": "http://192.168.1.100:8080",
      "httpsProxy": "http://192.168.1.100:8080",
      "noProxy": "localhost,127.0.0.1"
    }
  }
}

```

---

## SOCKS5 服务端

### 方案一、 Microsocks

<https://github.com/rofl0r/microsocks>

```text
microsocks -1 -q -i listenip -p port -u user -P passw -b bindaddr -w wl
```

所有参数都是可选的。默认情况下，listenip 为 0.0.0.0，端口为 1080。

* 选项 -q 禁用日志记录。
* 选项 -b 指定传出连接绑定到哪个 ip
* 选项 -w 允许指定以逗号分隔的 IP 地址白名单，这些 IP 地址可以使用代理而无需用户/密码身份验证。例如 -w 127.0.0.1,192.168.1.1.1,::1 或仅 -w 10.0.0.1 仅允许访问这些 IP，选择一个不可能猜测的用户/密码组合。
* 选项 -1 激活 auth\_once 模式：一旦特定 IP 地址使用用户/密码成功验证，它将被添加到白名单中，并且可以在未验证的情况下使用代理。这对于不支持用户/密码验证的程序（如 Firefox）非常方便。为了使其工作，您基本上需要与支持它的另一个程序建立一个连接，然后您也可以使用 Firefox。例如，使用 curl 进行一次身份验证： curl --socks5 用户:密码@listenip:端口 anyurl

### 方案二、Dante socks5代理服务

一键安装Dante建立socks5代理

下载一键安装脚本

```
$ curl -o socks5.sh https://raw.githubusercontent.com/Lozy/danted/refs/heads/master/install.sh
```

安装 Dante

```
$ sudo chmod +x socks5.sh
$ ./socks5.sh --port=端口 --user=用户名 --passwd=密码
```

启动 Dante socks5 代理服务器并加入开机启动

```
$ sudo service sockd start
$ sudo systemctl enable sockd
```

代理测试

```
curl -v --socks5 1.2.3.4:80 --proxy-user name:pass http://abc.com
curl -x socks5://username:password@proxy_server_ip:1080 https://ifconfig.me
curl -x socks5://username:password@proxy_server_ip:1080 https://ipinfo.io
```


### 方案三、容器 podman 部署 socks5 操作指南

💥 **牛逼内存占用极少，1G的主机，爽爆歪歪！**

- 比软件干净方便，容易管理，居然还很节省
- curl --socks5 100.64.0.4:1080 [http://ipinfo.io](http://ipinfo.io)

基于 Podman 部署 `go-socks5-proxy` 的详细操作指南，涵盖安装、配置和验证全流程：

---

#### 1.安装 Podman

1. **Linux 系统安装**  

- **Ubuntu/Debian**：  

```Bash
sudo apt update && sudo apt install -y podman
```
- **CentOS/RHEL**：  

```Bash
sudo dnf install -y podman
```
- **验证安装**：  

```Bash
podman --version  # 输出类似 podman 4.x.x
```

2. **Windows/macOS 安装**  

- **Windows**：通过 WSL2 安装 Linux 发行版后执行上述命令。  
- **macOS**：  

```Bash
brew install podman
podman machine init --cpus 2 -m 4096 --disk-size 20  # 初始化虚拟机
podman machine start
```

---

#### 2.拉取并运行 `go-socks5-proxy` 镜像

1. **拉取镜像**  

```Bash
podman pull docker.io/serjs/go-socks5-proxy  # 从 Docker Hub 拉取镜像
```

2. **启动 SOCKS5 代理容器**  

```Bash
podman run -d --name socks5-proxy \
  -p 1080:1080 \
  docker.io/serjs/go-socks5-proxy
```

- **参数说明**：  
    - `-d`：后台运行容器。  
    - `-p 1080:1080`：将主机端口 1080 映射到容器端口 1080。  
    - 默认无认证，若需用户名密码认证，使用 `xujinkai/redsocks5` 镜像并添加环境变量（如 `-e USERNAME=admin -e PASSWORD=123456`）。  

---

#### 3.验证代理服务

1. **检查容器状态**  

```Bash
podman ps  # 确认容器状态为 "Up"
```

2. **测试代理功能**  

```Bash
curl --socks5 127.0.0.1:1080 http://ipinfo.io  # 应返回代理服务器的IP地址
```

或使用浏览器配置 SOCKS5 代理（地址 `127.0.0.1`，端口 `1080`）访问验证。  

---

#### 4.高级配置（可选）

##### a. **持久化配置**  

若需容器重启后保留配置，可挂载卷：  

```Bash
podman run -d --name socks5-proxy \
  -p 1080:1080 \
  -v ./socks5-config:/etc/socks5  \  # 假设镜像支持配置持久化
  docker.io/serjs/go-socks5-proxy
```

##### b. **开机自启**  

通过 `systemd` 管理容器自启：  

```Bash
podman generate systemd --name socks5-proxy > /etc/systemd/system/socks5-proxy.service
systemctl enable --now socks5-proxy.service
```

##### c. **镜像加速**  

编辑 `/etc/containers/registries.conf` 添加国内镜像源（如阿里云、网易）以加速拉取：  

```Toml
[[registry.mirror]]
location = "mirror.baidubce.com"
insecure = true
```

---

#### 五、常见问题

1. **端口冲突**：若 1080 端口被占用，修改映射端口（如 `-p 1081:1080`）。  
2. **防火墙放行**：确保主机防火墙允许代理端口（如 `sudo ufw allow 1080`）。  
3. **Rootless 模式**：普通用户运行需配置用户命名空间：  

```Bash
sudo usermod --add-subuids 100000-165535 $USER
podman run --security-opt label=disable ...  # 禁用 SELinux 限制（测试环境）
```

---

通过 Podman 部署 `go-socks5-proxy` 仅需 3 步：安装 Podman → 拉取镜像 → 运行容器。其无守护进程架构比 Docker 更轻量，适合资源受限环境。若需企业级扩展，可结合 `podman-compose` 管理多容器服务。