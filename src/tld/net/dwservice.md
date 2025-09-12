# DWService

从Web浏览器远程访问您的设备

## 服务端操作

### 注册账号，通过浏览器 云端控制客户端设备

- https://www.dwservice.net/

## 客户端操作

### 下载客户端

- https://www.dwservice.net/en/download.html

### 安装客户端（手动选项）

```bash
wget https://www.dwservice.net/download/dwagent.sh
sudo bash dwagent.sh
```

### 卸载客户端（手动选项）

```bash
/usr/share/dwagent/native/uninstall
```

### 自动安装操作

```bash
#!/bin/bash

# DWAgent 安装脚本 - 自动安装 expect
# 适用于 Ubuntu / Debian / CentOS / RHEL / Rocky Linux

set -euo pipefail

# ========== 配置区 ==========
INSTALL_CODE="492-650-252"    # 🔐 替换为你的实际安装码！
DOWNLOAD_URL="https://site007.dwservice.net/app/agent/3/installer/dwagent.sh"
SCRIPT_NAME="dwagent.sh"
LOG_FILE="/var/log/dwagent_install.log"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# ========== 检测并安装 expect ==========
install_expect() {
    log "正在检测是否安装 expect..."
    if command -v expect &> /dev/null; then
        log "✅ expect 已安装。"
        return 0
    fi

    log "❌ expect 未安装，正在自动安装..."

    if command -v apt-get &> /dev/null; then
        # Ubuntu/Debian
        apt-get update && apt-get install -y expect
    elif command -v yum &> /dev/null; then
        # CentOS/RHEL 7
        yum install -y expect
    elif command -v dnf &> /dev/null; then
        # CentOS 8+/RHEL 8+/Rocky Linux
        dnf install -y expect
    else
        log "ERROR: 无法识别的包管理器，请手动安装 expect：apt-get install expect 或 yum install expect"
        exit 1
    fi

    if command -v expect &> /dev/null; then
        log "✅ expect 安装成功。"
    else
        log "❌ expect 安装失败，请手动安装后重试。"
        exit 1
    fi
}

# ========== 主程序 ==========
main() {
    log "开始 DWAgent 安装（仅安装，不启动服务）..."

    # 检查是否已安装
    if [ -f "/usr/share/dwagent/DWAgent" ]; then
        log "DWAgent 已安装在 /usr/share/dwagent，跳过安装。"
        exit 0
    fi

    # 安装 expect（关键步骤）
    install_expect

    # 下载安装脚本
    log "正在下载 dwagent.sh..."
    if ! wget -q --tries=3 --timeout=10 -O "$SCRIPT_NAME" "$DOWNLOAD_URL"; then
        log "ERROR: 下载失败，请检查网络或 URL 是否正确。"
        exit 1
    fi

    chmod +x "$SCRIPT_NAME"
    log "下载完成：$SCRIPT_NAME"

    # 使用 expect 模拟用户交互
    log "启动 expect 自动化安装流程..."

    expect <<EOF
set timeout 60

spawn ./$SCRIPT_NAME

# 选择 Install (选项 1)
expect "*Option (3):*"
send "1\r"

# 使用默认路径 /usr/share/dwagent（直接回车）
expect "*Path (/usr/share/dwagent):*"
send "\r"

# 确认安装路径 (Yes)
expect "*Option (2):*"
send "1\r"

# 选择“输入安装码” (选项 1)
expect "*Option (1):*"
send "1\r"

# 输入安装码
expect "*Code:*"
send "$INSTALL_CODE\r"

# 等待安装完成提示
expect {
    "*Installation has been completed.*" {
        send_log "✅ DWAgent 安装成功！\n"
        exit 0
    }
    timeout {
        send_log "⚠️ 超时未收到完成确认，但可能已安装成功。\n"
        exit 1
    }
}
EOF

    # 清理临时文件
    rm -f "$SCRIPT_NAME"
    log "清理临时文件：$SCRIPT_NAME"

    # 最终验证
    if [ -f "/usr/share/dwagent/native/uninstall" ]; then
        log "🎉 安装目录已创建：/usr/share/dwagent"
        log "注意：软件已安装完毕 /usr/share/dwagent"
    else
        log "❌ 安装目录未找到，安装可能失败。请检查日志：$LOG_FILE"
        exit 1
    fi
}

# ========== 执行 ==========
main
```

## 参考信息

### Chrome Remote Desktop 开源替代品

- https://alternativeto.net/software/chrome-remote-desktop/?license=opensource

### Abusing Chrome Remote Desktop

- https://trustedsec.com/blog/abusing-chrome-remote-desktop-on-red-team-operations-a-practical-guide
