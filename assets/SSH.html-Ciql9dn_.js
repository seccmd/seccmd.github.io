import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as e,o as i}from"./app-BGb_QXzP.js";const l={};function p(r,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="ssh" tabindex="-1"><a class="header-anchor" href="#ssh"><span>SSH</span></a></h1><h3 id="win-安装-ssh-服务" tabindex="-1"><a class="header-anchor" href="#win-安装-ssh-服务"><span>Win 安装 ssh 服务</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>- https://www.jianshu.com/p/d682b645615f</span></span>
<span class="line"><span>Get-WindowsCapability -Online | Where-Object Name -like &#39;OpenSSH*&#39;</span></span>
<span class="line"><span># Install the OpenSSH Client</span></span>
<span class="line"><span>Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0</span></span>
<span class="line"><span># Install the OpenSSH Server</span></span>
<span class="line"><span>Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0</span></span>
<span class="line"><span># Start the sshd service</span></span>
<span class="line"><span>Start-Service sshd</span></span>
<span class="line"><span># OPTIONAL but recommended:</span></span>
<span class="line"><span>Set-Service -Name sshd -StartupType &#39;Automatic&#39;</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="autossh" tabindex="-1"><a class="header-anchor" href="#autossh"><span>autossh</span></a></h3><p>autossh -M 8888 -NCfR 2222:localhost:22 -o ServerAliveInterval=30 <a href="mailto:root@ssh.test.cn" target="_blank" rel="noopener noreferrer">root@ssh.test.cn</a></p><ol><li>ssh-keygen</li><li>cat ~/.ssh/id_rsa.pub</li></ol><h2 id="ssh-命令的三种代理功能-l-r-d" tabindex="-1"><a class="header-anchor" href="#ssh-命令的三种代理功能-l-r-d"><span>SSH 命令的三种代理功能（-L/-R/-D）</span></a></h2><ul><li><a href="https://www.cnblogs.com/cangqinglang/p/12732661.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/cangqinglang/p/12732661.html</a></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>- 正向代理（-L）：相当于 iptable 的 port forwarding</span></span>
<span class="line"><span>- 反向代理（-R）：相当于 frp 或者 ngrok</span></span>
<span class="line"><span>- socks5 代理（-D）：相当于 ss/ssr</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="命令示例" tabindex="-1"><a class="header-anchor" href="#命令示例"><span>命令示例</span></a></h2><p>ssh -qTnN -o &quot;ServerAliveInterval 10&quot; -o &quot;TCPKeepAlive yes&quot; -R 0.0.0.0:3389:192.168.137.10:3389 <a href="mailto:root@www.glddns.com" target="_blank" rel="noopener noreferrer">root@www.glddns.com</a></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>ssh -NT -R 1122:127.0.0.1:22 用户名@服务器IP</span></span>
<span class="line"><span>ssh -R 9966:127.0.0.1:8080 user@&lt;云服务器 IP&gt; -i wang.pem</span></span>
<span class="line"><span>HostB$ ssh -L 0.0.0.0:PortB:HostC:PortC user@HostC</span></span>
<span class="line"><span>HostA$ ssh -L 0.0.0.0:PortA:HostC:PortC  user@HostB</span></span>
<span class="line"><span>HostA$ ssh -R HostC:PortC:HostB:PortB  user@HostC</span></span>
<span class="line"><span>HostA$ ssh -D localhost:1080  HostB</span></span>
<span class="line"><span></span></span>
<span class="line"><span>ssh -o &quot;ServerAliveInterval 10&quot; -o &quot;TCPKeepAlive yes&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># ssh 客户端参数</span></span>
<span class="line"><span>su -c \\</span></span>
<span class="line"><span>&quot;ssh -N -C \\</span></span>
<span class="line"><span>-L 0.0.0.0:$PORT:$TARGET_PORT remote_user@$TUNNEL_GATEWAY \\</span></span>
<span class="line"><span>-o \\&quot;ServerAliveInterval 30\\&quot; -o \\&quot;TCPKeepAlive yes\\&quot;&quot; \\</span></span>
<span class="line"><span>local_user</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ssh-客户端参数" tabindex="-1"><a class="header-anchor" href="#ssh-客户端参数"><span>SSH 客户端参数</span></a></h2><ul><li>ssh -CqTnN</li></ul><ul><li>-C 为压缩数据</li><li>-q 安静模式</li><li>-T 禁止远程分配终端</li><li>-n 关闭标准输入</li><li>-N 不执行远程命令</li><li>-f 后台运行</li><li>-o KexAlgorithms=+ssh-rsa 是SSH的选项，用于指定密钥交换算法（Key Exchange Algorithms）。+ssh-rsa 表示仅使用RSA算法。</li><li>-i wang.pem</li></ul><h2 id="配置ssh免密登录" tabindex="-1"><a class="header-anchor" href="#配置ssh免密登录"><span>配置ssh免密登录</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 输入密码之后即完成免密登录配置，之后再执行ssh命令连接到服务器就不用再输入密码了。</span></span>
<span class="line"><span>$ ssh-keygen</span></span>
<span class="line"><span>$ ssh-copy-id 用户名@服务器IP</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="远程端口转发-内网穿透-配置" tabindex="-1"><a class="header-anchor" href="#远程端口转发-内网穿透-配置"><span>远程端口转发 (内网穿透)配置</span></a></h2><ul><li>GatewayPorts 用于指定是否允许远程主机连接到为客户端转发的端口。</li><li>当设置为 yes 时，sshd 将允许远程端口转发绑定到 (0.0.0.0)，从而允许其他主机连接。</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>sudo vim /etc/ssh/sshd_config</span></span>
<span class="line"><span>GatewayPorts yes</span></span>
<span class="line"><span>sudo systemctl restart sshd</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用systemctl来实现断线重连和开机自动运行" tabindex="-1"><a class="header-anchor" href="#使用systemctl来实现断线重连和开机自动运行"><span>使用systemctl来实现断线重连和开机自动运行</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 在客户端创建一个systemctl服务配置文件</span></span>
<span class="line"><span>sudo vi /usr/lib/systemd/system/ssh-link.service</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 写入以下内容：</span></span>
<span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=ssh port forwarding service.</span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=simple</span></span>
<span class="line"><span>ExecStart= /bin/sh -c &#39;ssh -NT -R 1122:127.0.0.1:22 用户名@服务器IP&#39;</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span>RestartSec=10</span></span>
<span class="line"><span>User=pi</span></span>
<span class="line"><span>Group=pi</span></span>
<span class="line"><span>[Install] </span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span># User和Group为执行ssh-keygen命令的用户和用户组。</span></span>
<span class="line"><span># Restart=always表示ssh命令退出后，等待RestartSec=10秒，然后重新执行。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保存后运行一下：</span></span>
<span class="line"><span>sudo systemctl start ssh-link</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 查看运行状态，正常情况如下：</span></span>
<span class="line"><span>sudo systemctl status ssh-link</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置开机启动</span></span>
<span class="line"><span>sudo systemctl enable ssh-link</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="心跳检测" tabindex="-1"><a class="header-anchor" href="#心跳检测"><span>心跳检测</span></a></h2><ul><li><a href="https://segmentfault.com/a/1190000038153088" target="_blank" rel="noopener noreferrer">https://segmentfault.com/a/1190000038153088</a></li><li>一个稳定的ssh端口转发连接就建立起来了（已经经过数月的实际测试，断线后会自动重连）</li></ul><p>服务端配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># ssh命令退出后，systemctl会重新执行ssh命令以建立连接。但有些特殊情况下，连接实际上断开了，但ssh命令没有结束。</span></span>
<span class="line"><span># 例如服务器突然断电/网线被拔掉，服务器没有发送TCP reset包，所以客户端不知道连接断开，也就不会退出ssh命令。</span></span>
<span class="line"><span># 同理，客户端突然断电，服务器也不知道客户端“挂了”。如果客户端随后重新联网并创建ssh端口转发，可能会提示服务器端口已被占用（因为服务器上之前的ssh会话还保持着）。</span></span>
<span class="line"><span># 实际上，TCP连接是有心跳检测机制的，即TCP KeepAlive，不过它默认2小时发送一次心跳包，这实在是太长了。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 在服务器上编辑sshd配置文件/etc/ssh/sshd_config, 配置以下参数：</span></span>
<span class="line"><span># ClientAliveInterval：参数表示如果服务器连续N秒没有收到来自客户端的数据包，则服务器会向客户端发送一条消息。</span></span>
<span class="line"><span># ClientAliveCountMax：表示如果服务器发送了N次数据到客户端都没有收到回应时，就会认为连接已经断开，服务器会结束会话、关闭监听的端口。</span></span>
<span class="line"><span>ClientAliveInterval 10</span></span>
<span class="line"><span>ClientAliveCountMax 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 上述配置表示，如果服务器连续10秒没有收到客户端的数据，就会主动发送数据给客户端。</span></span>
<span class="line"><span># 连续发送了3次数据到客户端，都没有收到回复就断开连接。这意味着，网络断开后的最长30秒内，服务器就会关闭ssh会话。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保存之后需要重新sshd服务：</span></span>
<span class="line"><span>sudo systemctl restart sshd</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># todo?</span></span>
<span class="line"><span>TCPKeepAlive yes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端配置</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 通过上述配置，服务器就可以检测客户端是否存活。</span></span>
<span class="line"><span># 同理，也需要修改客户端的配置，让客户端可以检测服务端是否存活。</span></span>
<span class="line"><span># 在客户端编辑配置文件/etc/ssh/ssh_config，配置以下参数：</span></span>
<span class="line"><span>ServerAliveInterval 10</span></span>
<span class="line"><span>ServerAliveCountMax 3</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 保存之后在客户端重启ssh：</span></span>
<span class="line"><span>sudo systemctl restart ssh</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="autossh-模式" tabindex="-1"><a class="header-anchor" href="#autossh-模式"><span>autossh 模式</span></a></h2><ul><li><a href="https://zhuanlan.zhihu.com/p/680289253" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/680289253</a></li><li>编译安装 Autossh</li><li>apt 安装 autossh</li></ul><h2 id="supervisor-模式" tabindex="-1"><a class="header-anchor" href="#supervisor-模式"><span>supervisor 模式</span></a></h2><ul><li><a href="https://www.codewoody.com/posts/52376/" target="_blank" rel="noopener noreferrer">https://www.codewoody.com/posts/52376/</a></li></ul><h2 id="openwrt-配置-ssh" tabindex="-1"><a class="header-anchor" href="#openwrt-配置-ssh"><span>OpenWRT 配置 ssh</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>* dropbear 和标准sshd服务差异较大</span></span>
<span class="line"><span>- https://openwrt.org/docs/guide-user/base-system/dropbear</span></span>
<span class="line"><span>- SSHKeepAlive	integer	no	300</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># openwrt ssh免密登录</span></span>
<span class="line"><span>- https://www.cnblogs.com/xiaohuamao/p/12095358.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>* 重点：1.生成特定密钥，2.存放到指定路径</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- 免密登录，特定配置密钥，可能是性能原因</span></span>
<span class="line"><span>- ssh-keygen -b 1024 -t -rsa</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1 生成相关秘钥</span></span>
<span class="line"><span>dropbearkey -t rsa -f id_rsa</span></span>
<span class="line"><span>dropbearkey -y -f id_rsa | grep &quot;^ssh-rsa&quot; &gt;&gt; authorized_keys</span></span>
<span class="line"><span> </span></span>
<span class="line"><span></span></span>
<span class="line"><span>2 存放到指定路径</span></span>
<span class="line"><span>/etc/dropbear/authorized_keys (服务端)</span></span>
<span class="line"><span>/etc/dropbear/id_rsa  (客户端)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配置" tabindex="-1"><a class="header-anchor" href="#配置"><span>配置</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>其他:</span></span>
<span class="line"><span>限制用户 SSH 登录</span></span>
<span class="line"><span># 1.只允许指定用户进行登录（白名单）：</span></span>
<span class="line"><span># 在 /etc/ssh/sshd_config 配置文件中设置 AllowUsers 选项，（配置完成需要重启 SSHD 服务）格式如下：</span></span>
<span class="line"><span>&gt; AllowUsers    aliyun test@192.168.1.1   # 允许 aliyun 和从 192.168.1.1 登录的 test 帐户通过 SSH 登录系统。</span></span>
<span class="line"><span># 2.只拒绝指定用户进行登录（黑名单）：</span></span>
<span class="line"><span># 在/etc/ssh/sshd_config配置文件中设置DenyUsers选项，（配置完成需要重启SSHD服务）格式如下：   </span></span>
<span class="line"><span>&gt; DenyUsers    zhangsan aliyun  # 拒绝 zhangsan、aliyun 帐户通过 SSH 登录系统</span></span>
<span class="line"><span>限制 IP SSH 登录</span></span>
<span class="line"><span># 通过hosts.allow许可大于hosts.deny限制或者允许某个或者某段IP地址远程 SSH 登录服务器，具体如下：</span></span>
<span class="line"><span># hosts.allow 文件中的规则优先级高，按照此方法设置后服务器只允许 192.168.0.1 这个 IP 地址的 ssh 登录，其它的 IP 都会拒绝。</span></span>
<span class="line"><span>&gt; vim /etc/hosts.allow， 添加</span></span>
<span class="line"><span>&gt; sshd:192.168.0.1:allow  #允许 192.168.0.1 这个 IP 地址 ssh 登录</span></span>
<span class="line"><span>&gt; sshd:192.168.0.1/24:allow #允许 192.168.0.1/24 这段 IP 地址的用户登录</span></span>
<span class="line"><span>&gt; vim /etc/hosts.allow，添加</span></span>
<span class="line"><span>&gt; sshd:ALL # 允许全部的 ssh 登录</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,36)])])}const c=n(l,[["render",p]]),h=JSON.parse('{"path":"/tld/basetools/SSH.html","title":"SSH全攻略：安装、配置、代理","lang":"zh-CN","frontmatter":{"date":"2024-01-01T00:00:00.000Z","title":"SSH全攻略：安装、配置、代理","author":["SecCMD"],"description":"本页面全方位介绍SSH相关知识，涵盖Win系统安装ssh服务的步骤，autossh的使用方法，SSH命令三种代理功能（-L/-R/-D）的详细解析与命令示例，SSH客户端参数说明，配置ssh免密登录、远程端口转发（内网穿透）的操作流程，以及使用systemctl实现断线重连和开机自动运行、心跳检测的配置方法，还有autossh模式、supervisor模式和OpenWRT配置ssh的内容，同时包含SSH配置中限制用户和IP登录的方法。\\n","categories":"基础工具","tags":["远程连接","服务器管理"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSH全攻略：安装、配置、代理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-09T12:08:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/basetools/SSH.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"SSH全攻略：安装、配置、代理"}],["meta",{"property":"og:description","content":"本页面全方位介绍SSH相关知识，涵盖Win系统安装ssh服务的步骤，autossh的使用方法，SSH命令三种代理功能（-L/-R/-D）的详细解析与命令示例，SSH客户端参数说明，配置ssh免密登录、远程端口转发（内网穿透）的操作流程，以及使用systemctl实现断线重连和开机自动运行、心跳检测的配置方法，还有autossh模式、supervisor模式和OpenWRT配置ssh的内容，同时包含SSH配置中限制用户和IP登录的方法。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-09T12:08:14.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"服务器管理"}],["meta",{"property":"article:tag","content":"远程连接"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-09T12:08:14.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1757419694000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":2,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":5.76,"words":1728},"filePathRelative":"tld/basetools/SSH.md"}');export{c as comp,h as data};
