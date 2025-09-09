import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as e,o as i}from"./app-DOgIgeiH.js";const l={};function p(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h1 id="firewall配置全解-ufw、云主机nat及linux策略路由" tabindex="-1"><a class="header-anchor" href="#firewall配置全解-ufw、云主机nat及linux策略路由"><span>FireWall配置全解：UFW、云主机NAT及Linux策略路由</span></a></h1><h3 id="ufw" tabindex="-1"><a class="header-anchor" href="#ufw"><span>ufw</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1. sudo apt-get install ufw</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Set the default access rules:</span></span>
<span class="line"><span>1. sudo ufw default deny incoming</span></span>
<span class="line"><span>2. sudo ufw default allow outgoing</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Set the service rules (SSH / HTTPS)</span></span>
<span class="line"><span>1. sudo ufw allow 22/tcp</span></span>
<span class="line"><span>2. sudo ufw allow 443/tcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Enable the firewall:</span></span>
<span class="line"><span>1. sudo ufw enable</span></span>
<span class="line"><span>2. sudo ufw disable</span></span>
<span class="line"><span>3. sudo ufw status</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### If you ever add or delete rules you should reload the firewall</span></span>
<span class="line"><span>1. sudo ufw reload</span></span>
<span class="line"><span></span></span>
<span class="line"><span>注意</span></span>
<span class="line"><span>UFW是为了简化Iptables产生的，它在Iptables有自己的规则链。</span></span>
<span class="line"><span>Docker在启动时在Iptables会创建自己的规则链，所以不生效。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>可以把规则添加到Docker连中即可。</span></span>
<span class="line"><span>iptables -I DOCKER -p all -j DROP</span></span>
<span class="line"><span></span></span>
<span class="line"><span>最后记得执行 iptables-save 保存规则</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="ufw-demo" tabindex="-1"><a class="header-anchor" href="#ufw-demo"><span>ufw demo</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>netstat -antp | grep LISTEN | grep -v 127 | grep -v nginx</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN      546/sshd: /usr/sbin</span></span>
<span class="line"><span>tcp        0      0 0.0.0.0:35707           0.0.0.0:*               LISTEN      275644/java</span></span>
<span class="line"><span>tcp        0      0 172.31.225.91:41371     0.0.0.0:*               LISTEN      275644/java</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Set the default access rules:</span></span>
<span class="line"><span>sudo ufw default deny incoming</span></span>
<span class="line"><span>sudo ufw default allow outgoing</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Set the service rules (SSH / HTTPS)</span></span>
<span class="line"><span>sudo ufw allow 22/tcp</span></span>
<span class="line"><span>sudo ufw allow 443/tcp</span></span>
<span class="line"><span>sudo ufw allow 8443/tcp</span></span>
<span class="line"><span>sudo ufw allow 9443/tcp</span></span>
<span class="line"><span></span></span>
<span class="line"><span>### Enable the firewall:</span></span>
<span class="line"><span>sudo ufw enable</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="云主机-snat-配置" tabindex="-1"><a class="header-anchor" href="#云主机-snat-配置"><span>云主机 snat 配置</span></a></h3><pre><code>iptables -t nat -I POSTROUTING -s 192.168.0.0/16 -j SNAT --to-source  192.168.0.1(云主机自身本地IP)
iptables -t nat -I POSTROUTING -s 172.18.8.0/24 -j SNAT --to-source  172.18.8.210
iptables -L -n -t nat # 查看 nat 规则
- https://blog.csdn.net/weixin_46389364/article/details/109393899
- https://blog.csdn.net/qq_40025218/article/details/84837802
</code></pre><h3 id="云主机-dnat-配置-由于包转发-包含外网原始地址-不是内网地址直接丢弃。" tabindex="-1"><a class="header-anchor" href="#云主机-dnat-配置-由于包转发-包含外网原始地址-不是内网地址直接丢弃。"><span>云主机 dnat 配置，由于包转发，包含外网原始地址，不是内网地址直接丢弃。</span></a></h3><pre><code>iptables -t nat -A PREROUTING -d 172.18.8.210 -p tcp -m tcp --dport 2222 -j DNAT --to-destination 172.18.8.211:22
iptables -L -n -t nat # 查看 nat 规则
ssh -p 2222 -D 1080 nat_ip
- https://www.cnblogs.com/jjzd/p/6505871.html
</code></pre><h3 id="linux的策略路由" tabindex="-1"><a class="header-anchor" href="#linux的策略路由"><span>Linux的策略路由</span></a></h3><ul><li><a href="https://www.ujslxw.com/2020/10/19/44.html" target="_blank" rel="noopener noreferrer">https://www.ujslxw.com/2020/10/19/44.html</a></li></ul>`,11)])])}const r=n(l,[["render",p]]),o=JSON.parse('{"path":"/tld/basetools/FireWall-iptables-ufw.html","title":"FireWall配置全解：UFW、云主机NAT及Linux策略路由","lang":"zh-CN","frontmatter":{"date":"2024-03-02T00:00:00.000Z","title":"FireWall配置全解：UFW、云主机NAT及Linux策略路由","author":["SecCMD"],"description":"本页面聚焦防火墙相关配置技巧，涵盖UFW安装与配置，包括默认访问规则、服务规则设置、启用与状态查看等，同时深入探讨云主机的SNAT和DNAT配置，详细介绍命令使用及规则查看方法，还提供Linux策略路由的相关知识链接，助力用户全面掌握网络安全防护中的防火墙配置要点，保障网络环境安全稳定。\\n","categories":"基础工具","tags":["UFW配置"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"FireWall配置全解：UFW、云主机NAT及Linux策略路由\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-02T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-09T12:08:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/basetools/FireWall-iptables-ufw.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"FireWall配置全解：UFW、云主机NAT及Linux策略路由"}],["meta",{"property":"og:description","content":"本页面聚焦防火墙相关配置技巧，涵盖UFW安装与配置，包括默认访问规则、服务规则设置、启用与状态查看等，同时深入探讨云主机的SNAT和DNAT配置，详细介绍命令使用及规则查看方法，还提供Linux策略路由的相关知识链接，助力用户全面掌握网络安全防护中的防火墙配置要点，保障网络环境安全稳定。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-09T12:08:14.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"UFW配置"}],["meta",{"property":"article:published_time","content":"2024-03-02T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-09T12:08:14.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1757419694000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":2,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":1.75,"words":525},"filePathRelative":"tld/basetools/FireWall-iptables-ufw.md"}');export{r as comp,o as data};
