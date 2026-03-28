import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as e,o as i}from"./app-CsJIAhaq.js";const l={};function p(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h2 id="openssl-基础命令" tabindex="-1"><a class="header-anchor" href="#openssl-基础命令"><span>openssl 基础命令</span></a></h2><h3 id="openssl-加解密操作" tabindex="-1"><a class="header-anchor" href="#openssl-加解密操作"><span>openssl 加解密操作</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">计算MD5和SHA1</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># MD5 digest</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl dgst -md5 filename</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># SHA1 digest</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl dgst -sha1 filename</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="openssl-查看证书" tabindex="-1"><a class="header-anchor" href="#openssl-查看证书"><span>openssl 查看证书</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;">#### openssl 查看证书 crt pem</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看KEY信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl rsa -noout -text -in myserver.key</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看CSR信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl req -noout -text -in myserver.csr</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 查看证书信息</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl x509 -noout -text -in ca.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 验证证书，提示self signed</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl verify selfsign.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 因为myserver.crt 是幅ca.crt发布的，所以会验证成功</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl verify -CAfile ca.crt myserver.crt</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 去掉key的密码保护，有时候每次都要输入密码太繁琐了,可以把Key的保护密码去掉</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl rsa -in myserver.key -out server.key.insecure</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="openssl-证书格式转换" tabindex="-1"><a class="header-anchor" href="#openssl-证书格式转换"><span>openssl 证书格式转换</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>一般证书有三种格式：</span></span>
<span class="line"><span>PEM(.pem) 前面命令生成的都是这种格式，</span></span>
<span class="line"><span>DER(.cer .der) Windows 上常见</span></span>
<span class="line"><span>PKCS#12文件(.pfx .p12) Mac上常见</span></span>
<span class="line"><span></span></span>
<span class="line"><span># PEM转换为DER</span></span>
<span class="line"><span>&gt; openssl x509 -outform der -in myserver.crt -out myserver.der</span></span>
<span class="line"><span></span></span>
<span class="line"><span># DER转换为PEM</span></span>
<span class="line"><span>&gt; openssl x509 -inform der -in myserver.cer -out myserver.pem</span></span>
<span class="line"><span></span></span>
<span class="line"><span># PEM转换为PKCS</span></span>
<span class="line"><span>&gt; openssl pkcs12 -export -out myserver.pfx -inkey myserver.key -in myserver.crt -certfile ca.crt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># PKCS转换为PEM</span></span>
<span class="line"><span>&gt; openssl pkcs12 -in myserver.pfx -out myserver2.pem -nodes</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="openssl-测试证书" tabindex="-1"><a class="header-anchor" href="#openssl-测试证书"><span>openssl 测试证书</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="shiki" data-ext="bash" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-bash"><span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Openssl提供了简单的client和server工具，可以用来模拟SSL连接，做测试使用。</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Client</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 连接到远程服务器</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl s_client -connect www.google.com.hk:443</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 可以将服务器的证书保存下来</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl s_client -connect www.google.com.hk:443 remoteserver.pem</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 转换成DER文件，就可以在Windows下直接查看了</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl x509 -outform der -in remoteserver.pem -out remoteserver.cer</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#4078F2;--shiki-dark:#61AFEF;">Server</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 模拟的HTTPS服务，可以返回Openssl相关信息</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># -accept 用来指定监听的端口号</span></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># -cert -key 用来指定提供服务的key和证书</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl s_server -accept 443 -cert myserver.crt -key myserver.key -www</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 可以将key和证书写到同一个文件中</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; cat myserver.crt myserver.key &gt; myserver.pem</span></span>
<span class="line"></span>
<span class="line"><span style="--shiki-light:#A0A1A7;--shiki-light-font-style:italic;--shiki-dark:#7F848E;--shiki-dark-font-style:italic;"># 使用的时候只提供一个参数就可以了</span></span>
<span class="line"><span style="--shiki-light:#383A42;--shiki-dark:#ABB2BF;">&gt; openssl s_server -accept 443 -cert myserver.pem -www</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="let-s-encrypt" tabindex="-1"><a class="header-anchor" href="#let-s-encrypt"><span>Let&#39;s Encrypt</span></a></h3><p>说明：Let&#39;s Encrypt —— 是一个由非营利性组织 互联网安全研究小组（ISRG）提供的免费、自动化和开放的证书颁发机构（CA），简单的说，就是为网站提供免费的 SSL/TLS 证书。<a href="http://acme.sh" target="_blank" rel="noopener noreferrer">acme.sh</a> 实现了 acme 协议,可以从letsencrypt生成免费的证书。接下来将为大家介绍怎样申请Let&#39;s Encrypt通配符证书。</p><ul><li>使用acme.sh申请Let&#39;s Encrypt免费的SSL证书</li><li><a href="https://cloud.tencent.com/developer/article/1877928" target="_blank" rel="noopener noreferrer">https://cloud.tencent.com/developer/article/1877928</a></li><li>详解 ACME V2 (RFC 8555) 协议，你是如何从Let&#39;s Encrypt 申请到证书的</li><li><a href="https://zhuanlan.zhihu.com/p/75032510" target="_blank" rel="noopener noreferrer">https://zhuanlan.zhihu.com/p/75032510</a></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 使用 Let&#39;s Encrypt 获取 SSL 证书的第一步是在服务器上安装 Certbot</span></span>
<span class="line"><span>sudo apt-get update</span></span>
<span class="line"><span>sudo apt install certbot python3-certbot-nginx</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 为域名获取证书</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo certbot --nginx --nginx-server-root /usr/local/nginx/conf/  -d seccmd.net -d www.seccmd.net</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo certbot --expand --nginx --nginx-server-root /usr/local/nginx/conf/  -d seccmd.net -d www.seccmd.net -d 123.seccmd.net -d sec123.seccmd.net</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 由于Let&#39;s Encrypt的证书有效期只有90天，到期后使用certbot renew命令来更新证书，我们只需要把该命令做成任务定期执行即可</span></span>
<span class="line"><span>sudo systemctl status certbot.timer</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最后测试任务运行情况</span></span>
<span class="line"><span>sudo certbot --nginx --nginx-server-root /usr/local/nginx/conf/ renew --dry-run</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1.查看证书：</span></span>
<span class="line"><span>certbot certificates</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.删除某个安装了证书的域名：</span></span>
<span class="line"><span>certbot delete --cert-name example.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.重新创建和更新现有证书</span></span>
<span class="line"><span>certbot --expand -d existing.com,example.com,newdomain.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用教程：https://eff-certbot.readthedocs.io/en/stable/using.html</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ssl-self-signed-自签名" tabindex="-1"><a class="header-anchor" href="#ssl-self-signed-自签名"><span>SSL Self-Signed 自签名</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1. Create and install a self-signed SSL certificate:</span></span>
<span class="line"><span>$ sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout /etc/nginx/certificate.key -out /etc/nginx/certificate.crt</span></span>
<span class="line"><span>$ sudo chmod 400 /etc/nginx/certificate.key</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.Follow the prompts. 输入证书信息</span></span>
<span class="line"><span>Tip: It is IMPORTANT that the Common Name be set properly.  字段Common Name非常重要</span></span>
<span class="line"><span>Enter your fully qualified domain name(FQDN) here or, if you don’t have a FQDN,  输入域名</span></span>
<span class="line"><span>use your public IP address.  没有域名输入IP地址</span></span>
<span class="line"><span>For example, my FQDN for the chat server is chat.inumio.com .例如：chat.inumio.com</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 配置 Nginx 删除默认SSL配置文件，拷贝下面配置</span></span>
<span class="line"><span>$ sudo nano /etc/nginx/sites-enable/default</span></span>
<span class="line"><span># HTTPS Server</span></span>
<span class="line"><span>    server {</span></span>
<span class="line"><span>        listen 443 ssl;</span></span>
<span class="line"><span>        server_name _;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        error_log /var/log/nginx/rocketchat_error.log;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        ssl_certificate /etc/nginx/certificate.crt;</span></span>
<span class="line"><span>        ssl_certificate_key /etc/nginx/certificate.key;</span></span>
<span class="line"><span>        ssl_protocols TLSv1.2;</span></span>
<span class="line"><span>        ssl_ciphers &#39;ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-AES256-GCM-SHA384:DHE-RSA-AES128-GCM-SHA256:DHE-DSS-AES128-GCM-SHA256:kEDH+AESGCM:ECDHE-RSA-AES128-SHA256:ECDHE-ECDSA-AES128-SHA256:ECDHE-RSA-AES128-SHA:ECDHE-ECDSA-AES128-SHA:ECDHE-RSA-AES256-SHA384:ECDHE-ECDSA-AES256-SHA384:ECDHE-RSA-AES256-SHA:ECDHE-ECDSA-AES256-SHA:DHE-RSA-AES128-SHA256:DHE-RSA-AES128-SHA:DHE-DSS-AES128-SHA256:DHE-RSA-AES256-SHA256:DHE-DSS-AES256-SHA:DHE-RSA-AES256-SHA:AES128-GCM-SHA256:AES256-GCM-SHA384:AES128-SHA256:AES256-SHA256:AES128-SHA:AES256-SHA:AES:CAMELLIA:DES-CBC3-SHA:!aNULL:!eNULL:!EXPORT:!DES:!RC4:!MD5:!PSK:!aECDH:!EDH-DSS-DES-CBC3-SHA:!EDH-RSA-DES-CBC3-SHA:!KRB5-DES-CBC3-SHA&#39;;</span></span>
<span class="line"><span>        ssl_prefer_server_ciphers on;</span></span>
<span class="line"><span>        ssl_session_cache shared:SSL:20m;</span></span>
<span class="line"><span>        ssl_session_timeout 180m;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>        location / {</span></span>
<span class="line"><span>            proxy_pass http://chat.inumio.com:3000/;</span></span>
<span class="line"><span>            proxy_http_version 1.1;</span></span>
<span class="line"><span>            proxy_set_header Upgrade $http_upgrade;</span></span>
<span class="line"><span>            proxy_set_header Connection &quot;upgrade&quot;;</span></span>
<span class="line"><span>            proxy_set_header Host $http_host;</span></span>
<span class="line"><span>            proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;</span></span>
<span class="line"><span>            proxy_set_header X-Forwarded-Proto https;</span></span>
<span class="line"><span>            proxy_set_header X-Nginx-Proxy true;</span></span>
<span class="line"><span>            proxy_redirect off;</span></span>
<span class="line"><span>        }</span></span>
<span class="line"><span>    }</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="https双向认证-mutual-tls-authentication" tabindex="-1"><a class="header-anchor" href="#https双向认证-mutual-tls-authentication"><span>HTTPS双向认证（Mutual TLS authentication)</span></a></h3><p>PKI<br><a href="https://smallstep.com/hello-mtls/doc/client/nodejs" target="_blank" rel="noopener noreferrer">https://smallstep.com/hello-mtls/doc/client/nodejs</a><br> Using Mutual TLS on the Client Side with Node.js — Smallstep</p><p><a href="https://smallstep.com/docs/step-ca" target="_blank" rel="noopener noreferrer">https://smallstep.com/docs/step-ca</a><br> step-ca open source server (<a href="http://smallstep.com" target="_blank" rel="noopener noreferrer">smallstep.com</a>)</p><p><a href="https://github.com/smallstep/cli#installation-guide" target="_blank" rel="noopener noreferrer">https://github.com/smallstep/cli#installation-guide</a><br> GitHub - smallstep/cli: 🧰 A zero trust swiss army knife for working with X509, OAuth, JWT, OATH OTP, etc.</p><h2 id="ssl-tls-cert" tabindex="-1"><a class="header-anchor" href="#ssl-tls-cert"><span>SSL-TLS-Cert</span></a></h2><h3 id="openssl" tabindex="-1"><a class="header-anchor" href="#openssl"><span>openssl</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>HTTPS双向认证（Mutual TLS authentication) </span></span>
<span class="line"><span>https://help.aliyun.com/document_detail/160093.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4.1生成自签名根证书</span></span>
<span class="line"><span>（1）创建根证书私钥：</span></span>
<span class="line"><span>openssl genrsa -out root.key 1024</span></span>
<span class="line"><span>（2）创建根证书请求文件：</span></span>
<span class="line"><span>openssl req -new -out root.csr -key root.key</span></span>
<span class="line"><span>	Country Name (2 letter code) [XX]:cn</span></span>
<span class="line"><span>	State or Province Name (full name) []:bj</span></span>
<span class="line"><span>	Locality Name (eg, city) [Default City]:bj</span></span>
<span class="line"><span>	Organization Name (eg, company) [Default Company Ltd]:alibaba</span></span>
<span class="line"><span>	Organizational Unit Name (eg, section) []:test</span></span>
<span class="line"><span>	Common Name (eg, your name or your servers hostname) []:root</span></span>
<span class="line"><span>	Email Address []:a.alibaba.com</span></span>
<span class="line"><span>	A challenge password []:</span></span>
<span class="line"><span>	An optional company name []:</span></span>
<span class="line"><span>（3）创建根证书：</span></span>
<span class="line"><span>openssl x509 -req -in root.csr -out root.crt -signkey root.key -CAcreateserial -days 3650</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4.2 生成自签名服务器端证书</span></span>
<span class="line"><span>（1）生成服务器端证书私钥：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl genrsa -out server.key 1024</span></span>
<span class="line"><span>（2） 生成服务器证书请求文件，过程和注意事项参考根证书，本节不详述：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl req -new -out server.csr -key server.key</span></span>
<span class="line"><span>（3） 生成服务器端公钥证书</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl x509 -req -in server.csr -out server.crt -signkey server.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4.3 生成自签名客户端证书</span></span>
<span class="line"><span>（1）生成客户端证书密钥：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl genrsa -out client.key 1024</span></span>
<span class="line"><span>openssl genrsa -out client2.key 1024</span></span>
<span class="line"><span>（2） 生成客户端证书请求文件，过程和注意事项参考根证书，本节不详述：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl req -new -out client.csr -key client.key</span></span>
<span class="line"><span>openssl req -new -out client2.csr -key client2.key</span></span>
<span class="line"><span>（3） 生客户端证书</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl x509 -req -in client.csr -out client.crt -signkey client.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650</span></span>
<span class="line"><span>openssl x509 -req -in client2.csr -out client2.crt -signkey client2.key -CA root.crt -CAkey root.key -CAcreateserial -days 3650</span></span>
<span class="line"><span>（4） 生客户端p12格式证书，需要输入一个密码，选一个好记的，比如123456</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12</span></span>
<span class="line"><span>openssl pkcs12 -export -clcerts -in client2.crt -inkey client2.key -out client2.p12</span></span>
<span class="line"><span>重复使用上面的命令，我们得到两套客户端证书：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- client.key / client2.key：客户端的私钥文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>- client.crt / client2.key：有效期十年的客户端证书</span></span>
<span class="line"><span></span></span>
<span class="line"><span>使用根证书和客户端私钥一起生成 client.p12/client2.p12，这个证书文件包含客户端的公钥和私钥，主要用来给浏览器访问使用</span></span>
<span class="line"><span></span></span>
<span class="line"><span>curl --cert ./client.crt --key ./client.key https://integration-fred2.fredhuang.com -k -v</span></span>
<span class="line"><span></span></span>
<span class="line"><span>参考：</span></span>
<span class="line"><span>Demo for Client Certificate Authentication</span></span>
<span class="line"><span>https://github.com/julie-ng/nodejs-certificate-auth</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,22)])])}const d=n(l,[["render",p]]),o=JSON.parse(`{"path":"/tld/prod/SSL-TLS-Cert.html","title":"SSL-TLS证书管理","lang":"zh-CN","frontmatter":{"date":"2024-01-01T00:00:00.000Z","title":"SSL-TLS证书管理","author":["SecCMD"],"description":"本页面详细介绍SSL-TLS证书相关知识，涵盖openssl生成自签名根证书、服务器端和客户端证书的具体步骤，Let's Encrypt申请免费SSL证书的流程及证书更新方法，以及SSL自签名证书的创建、安装和Nginx配置教程，为你提供全面的SSL-TLS证书实操指导。\\n","categories":"基础工具","tags":["证书管理","加密技术"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"SSL-TLS证书管理\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-01-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-11-28T09:55:00.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/prod/SSL-TLS-Cert.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"SSL-TLS证书管理"}],["meta",{"property":"og:description","content":"本页面详细介绍SSL-TLS证书相关知识，涵盖openssl生成自签名根证书、服务器端和客户端证书的具体步骤，Let's Encrypt申请免费SSL证书的流程及证书更新方法，以及SSL自签名证书的创建、安装和Nginx配置教程，为你提供全面的SSL-TLS证书实操指导。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-11-28T09:55:00.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"加密技术"}],["meta",{"property":"article:tag","content":"证书管理"}],["meta",{"property":"article:published_time","content":"2024-01-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-11-28T09:55:00.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1764323700000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":4,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":5.85,"words":1755},"filePathRelative":"tld/prod/SSL-TLS-Cert.md"}`);export{d as comp,o as data};
