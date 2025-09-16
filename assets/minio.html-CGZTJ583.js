import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as i,o as e}from"./app-1i0vUALM.js";const l={};function p(c,n){return e(),a("div",null,[...n[0]||(n[0]=[i(`<h1 id="minio" tabindex="-1"><a class="header-anchor" href="#minio"><span>Minio</span></a></h1><p>安装过程：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>wget https://dl.min.io/server/minio/release/linux-amd64/archive/minio_20241002175041.0.0_amd64.deb -O minio.deb</span></span>
<span class="line"><span>dpkg -i minio.deb</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 手动调试</span></span>
<span class="line"><span>export MINIO_ROOT_USER=user; export MINIO_ROOT_PASSWORD=passwrod; minio server ~/minio_dir --console-address 0.0.0.0:9001</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 服务配置</span></span>
<span class="line"><span>systemctl start minio</span></span>
<span class="line"><span>systemctl enable minio</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Minio 配置文件</span></span>
<span class="line"><span></span></span>
<span class="line"><span>vi /etc/default/minio</span></span>
<span class="line"><span>MINIO_ROOT_USER=root</span></span>
<span class="line"><span>MINIO_ROOT_PASSWORD=rootpassword</span></span>
<span class="line"><span>MINIO_VOLUMES=/home/admin/minio</span></span>
<span class="line"><span>MINIO_OPTS=&quot;--console-address 0.0.0.0:9001&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Minio 服务配置 注意修改运行权限</span></span>
<span class="line"><span>vi /lib/systemd/system/minio.service</span></span>
<span class="line"><span>User=admin</span></span>
<span class="line"><span>Group=admin</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这个配置文件很清晰，值得学习敷用</p><ul><li>cat /lib/systemd/system/minio.service</li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>[Unit]</span></span>
<span class="line"><span>Description=MinIO</span></span>
<span class="line"><span>Documentation=https://docs.min.io</span></span>
<span class="line"><span>Wants=network-online.target</span></span>
<span class="line"><span>After=network-online.target</span></span>
<span class="line"><span>AssertFileIsExecutable=/usr/local/bin/minio</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Service]</span></span>
<span class="line"><span>Type=notify</span></span>
<span class="line"><span></span></span>
<span class="line"><span>WorkingDirectory=/usr/local</span></span>
<span class="line"><span></span></span>
<span class="line"><span>User=admin</span></span>
<span class="line"><span>Group=admin</span></span>
<span class="line"><span>ProtectProc=invisible</span></span>
<span class="line"><span></span></span>
<span class="line"><span>EnvironmentFile=-/etc/default/minio</span></span>
<span class="line"><span>ExecStart=/usr/local/bin/minio server $MINIO_OPTS $MINIO_VOLUMES</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Let systemd restart this service always</span></span>
<span class="line"><span>Restart=always</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Specifies the maximum file descriptor number that can be opened by this process</span></span>
<span class="line"><span>LimitNOFILE=1048576</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Turn-off memory accounting by systemd, which is buggy.</span></span>
<span class="line"><span>MemoryAccounting=no</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Specifies the maximum number of threads this process can create</span></span>
<span class="line"><span>TasksMax=infinity</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Disable timeout logic and wait until process is stopped</span></span>
<span class="line"><span>TimeoutSec=infinity</span></span>
<span class="line"><span></span></span>
<span class="line"><span>SendSIGKILL=no</span></span>
<span class="line"><span></span></span>
<span class="line"><span>[Install]</span></span>
<span class="line"><span>WantedBy=multi-user.target</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Built for \${project.name}-\${project.version} (\${project.name})</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,6)])])}const r=s(l,[["render",p]]),m=JSON.parse('{"path":"/tld/prod/minio.html","title":"Minio快速安装记录","lang":"zh-CN","frontmatter":{"date":"2022-09-03T00:00:00.000Z","title":"Minio快速安装记录","author":["SecCMD"],"description":"快速安装 Minio\\n","categories":"基础工具","tags":["网络存储"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Minio快速安装记录\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-09-03T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-12T16:33:57.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/prod/minio.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"Minio快速安装记录"}],["meta",{"property":"og:description","content":"快速安装 Minio\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-12T16:33:57.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"网络存储"}],["meta",{"property":"article:published_time","content":"2022-09-03T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-12T16:33:57.000Z"}]]},"git":{"createdTime":1734081853000,"updatedTime":1757694837000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":3,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":0.75,"words":225},"filePathRelative":"tld/prod/minio.md"}');export{r as comp,m as data};
