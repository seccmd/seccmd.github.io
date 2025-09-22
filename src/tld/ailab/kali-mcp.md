# Kali MCP Lab

测试主机：ssh root@hk.local

测试服务：

- LangFlow: http://hk.local:7860
- MCP: mcp_server.py --server http://hk.local:5000

## 一、测试 langflow + kalimcp

1.1 配置 langfow llm key

1.2 配置mcp模型

```Bash
source /opt/langflow/.venv/bin/activate
pip install --upgrade langflow langchain-core

# Linux，安装 mcp_server 运行环境

cd /opt/langflow/MCP-Kali-Server
uv venv
uv pip install requests
uv pip install FastMCP
uv run ./mcp_server.py --server http://127.0.0.1:5000
/opt/langflow/MCP-Kali-Server/.venv/bin/python3 /opt/langflow/MCP-Kali-Server/mcp_server.py --server http://127.0.0.1:5000

# langfow 配置 Mcp server
{
  "mcpServers": {
    "kali_mcp": {
      "command": "/opt/langflow/MCP-Kali-Server/.venv/bin/python3",
      "args": [
        "/opt/langflow/MCP-Kali-Server/mcp_server.py",
        "--server",
        "http://127.0.0.1:5000"
      ]
    }
  }
}
```

## 二、测试 qewn-coder + kalimcp

调用工具：qewn-coder

```JSON
Configuration for claude desktop:
edit (C:\Users\USERNAME\AppData\Roaming\Claude\claude_desktop_config.json)

{
    "mcpServers": {
        "kali_mcp": {
            "command": "python3",
            "args": [
                "/absolute/path/to/mcp_server.py",
                "http://LINUX_IP:5000/"
            ]
        }
    }
}
```



## 三、基于Trae测试验证

### 3.1第一步：MCP-Kali-Server 服务端配置（通过api操作kali os）

```Bash
docker run -it --rm kali-base # 我们自己打包的镜像 kali-base
 * Running on all addresses (0.0.0.0)
 * Running on http://127.0.0.1:5000
 * Running on http://172.17.0.3:5000
```



### 3.2第二步：配置mcp-server

```Markdown
# Windows 电脑，安装 mcp_server 运行环境
uv pip install requests
uv pip install FastMCP
uv run .\mcp_server.py http://hk.local:5000
uv run .\mcp_server.py --server http://hk.local:5000

# Trae 配置 Mcp server
{
  "mcpServers": {
    "kali_mcp": {
      "command": "C:\\Users\\USERNAME\\Desktop\\kalimcp\\.venv\\Scripts\\python.exe",
      "args": [
        "C:\\Users\\USERNAME\\Desktop\\kalimcp\\mcp_server.py",  // 替换为Linux绝对路径
        "--server",                         // 参数标志
        "http://hk.local:5000"              // 推荐用占位符
      ]
    }
  }
}

```


## 四、附件

### docker 编译命令

```Markdown
# 编译新镜像
docker build -f Dockerfile.base -t kali-base .

# Debug
docker run -it --rm --entrypoint /bin/bash kali-base
```

### **Kali MCP 选型**

```Markdown
# https://github.com/Wh0am123/MCP-Kali-Server
git clone https://github.com/Wh0am123/MCP-Kali-Server.git
cd MCP-Kali-Server
python3 kali_server.py

# 使用容器封装后运行
## 开启服务 5000
docker run -d --rm -p 5000:5000 kali-base
```

### Kali docker 打包基础镜像：kali-base

```Docker
#cat Dockerfile.base.v2
# todo
# 补充kali工具
# dirb, gobuster, nikto, nmap
FROM kalilinux/kali-rolling

# 全局设置
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=Asia/Shanghai

# 1. 临时禁用SSL验证（初始阶段）
RUN echo 'Acquire::https::Verify-Peer "false";\nAcquire::https::Verify-Host "false";' \
    > /etc/apt/apt.conf.d/99verify-peer.conf

# 2. 优先使用清华APT源
RUN sed -i "s|http://http.kali.org/kali|https://mirrors.tuna.tsinghua.edu.cn/kali|g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        tzdata && \
    ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# 3. 安装核心工具
RUN apt-get install -y --no-install-recommends \
        python3 \
        python3-pip \
        git \
        curl

# 4. 增强证书信任链
RUN curl -sSfL https://letsencrypt.org/certs/isrgrootx1.pem \
    -o /usr/local/share/ca-certificates/isrgrootx1.crt && \
    update-ca-certificates --fresh && \
    rm /etc/apt/apt.conf.d/99verify-peer.conf  # 立即恢复验证

# 5. 配置清华镜像源（Python）
RUN pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/ && \
    echo "使用镜像源：\n" \
         "APT: mirrors.tuna.tsinghua.edu.cn\n" \
         "pip: pypi.tuna.tsinghua.edu.cn" > /opt/mirror-info.txt

# 6. 部署新的MCP服务器应用
RUN git clone https://github.com/Wh0am123/MCP-Kali-Server.git /opt/MCP-Kali-Server && \
    cd /opt/MCP-Kali-Server && \
    # 根据需要安装Python依赖
    if [ -f requirements.txt ]; then pip install -r requirements.txt; fi && \
    # 补充安装依赖文件
    apt-get install -y python3-flask python3-requests

# 7. 最终清理
RUN apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* && \
    unset DEBIAN_FRONTEND

# 元数据
LABEL maintainer="your-email@example.com" \
      description="Kali MCP Server with Tsinghua Mirror Optimization"

WORKDIR /opt/MCP-Kali-Server
# 注意：这里改为运行Python服务器
CMD ["python3", "kali_server.py"]
```



```Docker
# cat Dockerfile.base
FROM kalilinux/kali-rolling

# 全局设置
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=Asia/Shanghai

# 1. 临时禁用SSL验证（初始阶段）
RUN echo 'Acquire::https::Verify-Peer "false";\nAcquire::https::Verify-Host "false";' \
    > /etc/apt/apt.conf.d/99verify-peer.conf

# 2. 优先使用清华APT源
RUN sed -i "s|http://http.kali.org/kali|https://mirrors.tuna.tsinghua.edu.cn/kali|g" /etc/apt/sources.list && \
    apt-get update && \
    apt-get install -y --no-install-recommends \
        ca-certificates \
        tzdata && \
    ln -sf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

# 3. 安装核心工具
RUN apt-get install -y --no-install-recommends \
        nodejs \
        npm \
        python3-pip \
        git \
        curl

# 4. 增强证书信任链
RUN curl -sSfL https://letsencrypt.org/certs/isrgrootx1.pem \
    -o /usr/local/share/ca-certificates/isrgrootx1.crt && \
    update-ca-certificates --fresh && \
    rm /etc/apt/apt.conf.d/99verify-peer.conf  # 立即恢复验证

# 5. 配置清华镜像源（全栈）
RUN npm config set registry https://registry.npmmirror.com && \
    pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple/ && \
    echo "使用镜像源：\n" \
         "APT: mirrors.tuna.tsinghua.edu.cn\n" \
         "npm: registry.npmmirror.com\n" \
         "pip: pypi.tuna.tsinghua.edu.cn" > /opt/mirror-info.txt

# 6. 部署应用
RUN mkdir -p /opt/kali_mcp && \
    curl -fL https://codeload.github.com/0x7556/kali_mcp/tar.gz/refs/heads/main -o /tmp/source.tar.gz && \
    tar xzf /tmp/source.tar.gz --strip-components=1 -C /opt/kali_mcp && \
    chmod +x /opt/kali_mcp/kali_mcp_server

# 7. 最终清理
RUN apt-get autoremove -y && \
    apt-get clean -y && \
    rm -rf /var/lib/apt/lists/* /tmp/* && \
    unset DEBIAN_FRONTEND

# 元数据
LABEL maintainer="your-email@example.com" \
      description="Kali MCP with Tsinghua Mirror Optimization"

WORKDIR /opt/kali_mcp
CMD ["/bin/bash"]
```

！！重要工作就是 安全工具的提示词优化，大模型还是不熟悉安全工具使用，重复乱用跑不通的问题严重
