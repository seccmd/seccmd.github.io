# K3S 笔记

## 安装 K3S Server 主节点

```bash
## 安装脚本
curl -sfL https://get.k3s.io | sh -

## 国内用户，可以使用以下方法加速安装：
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn sh -
```

运行此安装后：
- K3s 服务将被配置为在节点重启后或进程崩溃或被杀死时自动重启。
- 将安装其他实用程序，包括 kubectl、crictl、ctr、k3s-killall.sh 和 k3s-uninstall.sh。
- kubeconfig 文件将写入到 /etc/rancher/k3s/k3s.yaml，由 K3s 安装的 kubectl 将自动使用该文件。

## 安装 K3S Agent 节点

将 Agent 节点添加到集群，请使用 K3S_URL 和 K3S_TOKEN 环境变量运行安装脚本。以下示例演示了如何添加 Agent 节点：

```bash
## 安装脚本
curl -sfL https://get.k3s.io | K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -

## 国内用户，可以使用以下方法加速安装：
curl -sfL https://rancher-mirror.rancher.cn/k3s/k3s-install.sh | INSTALL_K3S_MIRROR=cn K3S_URL=https://myserver:6443 K3S_TOKEN=mynodetoken sh -
```

运行此安装后：
- K3S_URL 参数会导致安装程序将 K3s 配置为 Agent 而不是 Server。
- K3s Agent 将注册到在 URL 上监听的 K3s Server。
- K3S_TOKEN 使用的值存储在 Server 节点上的 /var/lib/rancher/k3s/server/node-token 中。

备注：
每台主机必须具有唯一的主机名。如果你的计算机没有唯一的主机名，请传递 K3S_NODE_NAME 环境变量，并为每个节点提供一个有效且唯一的主机名。


## 卸载 K3S Server 主节点

```bash
## 在 K3s Server 节点, 执行:
/usr/local/bin/k3s-uninstall.sh
```

## 卸载 K3S Agent 节点

```bash
## 在 K3s Agent 节点, 执行:
/usr/local/bin/k3s-agent-uninstall.sh
```

## 参考资料

- https://docs.k3s.io/zh/quick-start
