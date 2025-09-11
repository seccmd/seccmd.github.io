# Docker Image


## Docker Kali

```bash
## 官方镜像：
## https://www.kali.org/docs/containers/official-kalilinux-docker-images/
docker pull kalilinux/kali-rolling:latest
docker run -it --rm kalilinux/kali-rolling:latest

## 安装默认工具包​​ kali-linux-default 元包（约 300+ 工具）： 下载安装 15G 文件
apt update && sudo apt upgrade -y
apt install -y kali-linux-default

## nmap 报错：需要网络权限
docker run --rm -it --cap-add=NET_RAW --cap-add=NET_ADMIN kalilinux/kali-rolling:latest

## 配置固化​​：始终使用 Dockerfile + docker-compose.yml 管理配置
# docker-compose.yml 示例（避免手动操作）
services:
  app:
    image: nginx:alpine
    cap_add:
      - NET_ADMIN
      - NET_RAW
    ports:
      - "80:80"
      - "443:443"
```

---

## Docker Nodejs

```bash
# Docker has specific installation instructions for each operating system.
# Please refer to the official documentation at https://docker.com/get-started/

# Pull the Node.js Docker image:
docker pull node:22-alpine

# Create a Node.js container and start a Shell session:
docker run -it --rm --entrypoint sh node:22-alpine

# Verify the Node.js version:
node -v # Should print "v22.17.0".

# Verify npm version:
npm -v # Should print "10.9.2".
```

---

## Docker 快速编程镜像

通过 docker compose 快速搭建一个国内的编程环境，功能如下：

1. **国内高速源**：
    - APT → 清华源
    - PIP → 清华源
    - NPM → 淘宝镜像源
2. **预装工具**：
    - Python 3
    - Node.js + NPM
    - UV (ultra-fast Python包管理)
    - Qwen-Coder (通义代码模型)
    - Claude Code (Claude编程助手)
3. **自动初始化**：
    - 启动容器时自动执行配置脚本
    - 挂载本地目录到容器 `/app`
    - 端口 3000 直接映射

```yaml
# docker run -it --rm -p 3000:3000 ubuntu bash
services:
  test-env:
    image: ubuntu
    command: bash
    ports:
      - "3000:3000"
    volumes:
      - ./app:/app  # 挂载本地目录到容器
    tty: true       # 保持终端交互
```

```YAML
services:
  dev-env:
    image: ubuntu:24.04     # 预先构建好的编程环境
    container_name: code-dev-02
    #entrypoint: /setup.sh  # 启动时自动执行初始化脚本 - 启动时不会保存
    entrypoint: /bin/bash
    ports:
      - "3000:3000"
      - "8000:8000"
    volumes:
      - ./app:/app  # 挂载本地目录到容器
      - ./setup.sh:/setup.sh  # 挂载本地目录到容器
    environment:
      TZ: Asia/Shanghai
      DEBIAN_FRONTEND: noninteractive
    tty: true

# docker compose up -d
# docker compose exec dev-env bash
# /setup.sh  进入容器后手动执行，安装部署才会保存

# 问题：
# ​​entrypoint的修改不保存​​：因其发生在容器初始化阶段，且未通过卷或镜像固化。
​​# exec的修改可保存​​：因容器运行时修改直接作用于可写层（直到容器删除）。
```

创建一个优化的 Docker Compose 配置，快速搭建具有国内高速源的 Python/Node.js 开发环境。以下是完整的 `docker-compose.yml` 文件：

```YAML
services:
  dev-env:
    image: my-code-dev     # 预先构建好的编程环境
    container_name: code-dev-01
    entrypoint: /bin/bash  # 启动时自动执行初始化脚本
    ports:
      - "3000:3000"
      - "8000:8000"
    volumes:
      - ./app:/app  # 挂载本地目录到容器
    environment:
      TZ: Asia/Shanghai
    tty: true

# 启动和进入容器
# docker compose up -d
# docker compose exec dev-env bash
```

Dockfile 构建 my-code-dev

```bash
FROM ubuntu:24.04

# 复制初始化脚本
COPY setup.sh /setup.sh

# 在构建阶段执行初始化（RUN）
RUN chmod +x /setup.sh && /setup.sh

# 设置容器启动时的默认命令（非初始化）
ENTRYPOINT /bin/bash  # 保持容器运行但不执行setup

# 构建与运行​​：
# docker build -t my-code-dev .
# docker run -it --rm -p 3000:3000 -p 8000:8000 my-code-dev bash
```

在同一目录下创建 `setup.sh` 文件（用于执行初始化任务）：

```Bash
#!/bin/bash

# 临时禁用证书验证（仅测试环境）​
echo 'Acquire::https::Verify-Peer "false";' > /etc/apt/apt.conf.d/99ignore-ssl
echo 'Acquire::https::Verify-Host "false";' >> /etc/apt/apt.conf.d/99ignore-ssl

# 更新软件源并替换为清华源
cp /etc/apt/sources.list.d/ubuntu.sources /etc/apt/sources.list.d/ubuntu.sources.bak
tee /etc/apt/sources.list.d/ubuntu.sources << 'EOF'
Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg

Types: deb
URIs: https://mirrors.tuna.tsinghua.edu.cn/ubuntu
Suites: noble-security
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
EOF

echo "正在更新软件源..."
apt-get update -y
echo "安装基础工具..."
apt-get install -y curl wget unzip python3 python3-pip

# 安装 uv
echo "安装 uv 工具..."
curl -LsSf https://astral.sh/uv/install.sh | sh

# 使用 NodeSource 国内镜像
curl -fsSL https://deb.nodesource.com/setup_current.x | bash -
apt-get install -y nodejs

# 配置 Python pip 清华源
echo "配置 Pip 清华源..."
mkdir -p /etc/pip
cat > /etc/pip/pip.conf <<EOF
[global]
index-url = https://pypi.tuna.tsinghua.edu.cn/simple
[install]
trusted-host = pypi.tuna.tsinghua.edu.cn
EOF

# 配置 NPM 淘宝源
echo "配置 NPM 淘宝源..."
npm config set registry https://registry.npmmirror.com

# 安装 Qwen-Coder 和 Claude Code
echo "安装编程工具..."
npm install -g @qwen-code/qwen-code
npm install -g @anthropic-ai/claude-code

# 保持容器运行
echo "开发环境已就绪！"
echo "访问地址：http://localhost:3000"
#exec /bin/bash
```

### 使用说明

1. 创建项目目录：

```Bash
mkdir dev-env && cd dev-env
touch docker-compose.yml setup.sh
chmod +x setup.sh
```
2. 将上述代码分别复制到 `docker-compose.yml` 和 `setup.sh` 文件中
3. 启动开发环境：

```Bash
docker compose up -d
```
4. 进入容器：

```Bash
docker exec -it cn-dev-env bash
```

### 验证环境

1. 检查 pip 源配置：

```Bash
pip config list
# 应显示: global.index-url='https://pypi.tuna.tsinghua.edu.cn/simple'
```
2. 检查 NPM 源配置：

```Bash
npm config get registry
# 应显示: https://registry.npmmirror.com/
```
3. 验证工具安装：

```Bash
uv --version
qwen-coder --help
claude-code --version
```

此环境适合国内开发者快速搭建隔离的开发测试环境，所有下载都会走国内镜像源加速。

---

## Docker 国内安装解决方案

### Windows Docker 国内安装解决方案

- 任务栏搜索功能，启用"适用于Linux的Windows子系统" + "虚拟机平台"
- 管理员权限打开命令提示符，安装wsl2

```
wsl --set-default-version 2
wsl --update --web-download
```

- 下载Windows版本安装包，进入此项目的Release
https://github.com/tech-shrimp/docker_installer/releases

### Linux Docker 国内安装解决方案

```
# 一键安装命令（每天自动从官网定时同步）
sudo curl -fsSL https://github.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun

# 备用（如果Github访问不了，可以使用Gitee的链接）
sudo curl -fsSL https://gitee.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun

# 启动docker
sudo service docker start
```

### Docker 国内可用镜像加速列表

```
# 配置方式1：临时使用
# 直接使用，直接拿镜像域名拼接上官方镜像名，例如要拉去镜像yidadaa/chatgpt-next-web，可以用下面写法
docker pull dockerpull.com/yidadaa/chatgpt-next-web

# 配置方式2：长久有效 Ubuntu 16.04+、Debian 8+、CentOS 7+
# 修改文件 /etc/docker/daemon.json（如果不存在则需要创建创建，注意不要写入中文），并重启服务。

sudo mkdir -p /etc/docker

sudo tee /etc/docker/daemon.json <<-'EOF'
{
    "registry-mirrors": [
    	"https://dockerpull.com",
        "https://docker.anyhub.us.kg",
        "https://dockerhub.jobcher.com",
        "https://dockerhub.icu",
        "https://docker.awsl9527.cn"
    ]
}
EOF

sudo systemctl daemon-reload && sudo systemctl restart docker

# 可直接使用docker pull拉去镜像进行测试，或用以下命令检查是否生效：
docker info
```

### Docker Desktop国内镜像源

打开Docker Desktop设置 > Docker Engine

```
{
  "builder": {
    "gc": {
      "defaultKeepStorage": "20GB",
      "enabled": true
    }
  },
  "experimental": false,
  "features": {
    "buildkit": true
  },
  "registry-mirrors": [
    "https://registry.docker-cn.com",
    "https://docker.mirrors.ustc.edu.cn",
    "http://hub-mirror.c.163.com"
  ]
}
```

### Docker-CE 国内镜像

```
Docker-CE 国内镜像
https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/

# 如果你过去安装过 docker，先删掉:
sudo apt-get remove docker docker-engine docker.io

# 首先安装依赖:
sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common

# 根据你的发行版，下面的内容有所不同。你使用的发行版： 
# 信任 Docker 的 GPG 公钥:
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# 对于 amd64 架构的计算机，添加软件仓库:
sudo add-apt-repository \
   "deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
   $(lsb_release -cs) \
   stable"

# 如果你是树莓派或其它 ARM 架构计算机，请运行:
echo "deb [arch=armhf] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \
     $(lsb_release -cs) stable" | \
    sudo tee /etc/apt/sources.list.d/docker.list

# 最后安装
sudo apt-get update
sudo apt-get install docker-ce
```

### Docker-Compose 国外

```
### Install Docker
Follow this guide https://docs.docker.com/linux/step_one/ to get Docker installed

### Install Docker-Compose version 1.24.0 (64 bit) via cURL
1. sudo curl -L "https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64" -o /usr/local/bin/docker-compose

### Set the executable permissions:
1. sudo chmod +x /usr/local/bin/docker-compose
2. sudo docker-compose --version
3. sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compos
```
