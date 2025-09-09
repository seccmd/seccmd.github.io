import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,e as a,o as i}from"./app-gOoo-Njs.js";const l={};function p(r,s){return i(),e("div",null,[...s[0]||(s[0]=[a(`<h1 id="docker-国内安装解决方案" tabindex="-1"><a class="header-anchor" href="#docker-国内安装解决方案"><span>Docker 国内安装解决方案</span></a></h1><ul><li>支持Linux、Win、Mac</li><li><a href="https://github.com/tech-shrimp/docker_installer/releases" target="_blank" rel="noopener noreferrer">https://github.com/tech-shrimp/docker_installer/releases</a></li></ul><h2 id="windows" tabindex="-1"><a class="header-anchor" href="#windows"><span>Windows</span></a></h2><ul><li>任务栏搜索功能，启用&quot;适用于Linux的Windows子系统&quot; + &quot;虚拟机平台&quot;</li><li>管理员权限打开命令提示符，安装wsl2<br> wsl --set-default-version 2<br> wsl --update --web-download</li><li>下载Windows版本安装包，进入此项目的Release<br><a href="https://github.com/tech-shrimp/docker_installer/releases" target="_blank" rel="noopener noreferrer">https://github.com/tech-shrimp/docker_installer/releases</a></li></ul><h2 id="linux" tabindex="-1"><a class="header-anchor" href="#linux"><span>Linux</span></a></h2><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 一键安装命令（每天自动从官网定时同步）</span></span>
<span class="line"><span>sudo curl -fsSL https://github.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 备用（如果Github访问不了，可以使用Gitee的链接）</span></span>
<span class="line"><span>sudo curl -fsSL https://gitee.com/tech-shrimp/docker_installer/releases/download/latest/linux.sh| bash -s docker --mirror Aliyun</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 启动docker</span></span>
<span class="line"><span>sudo service docker start</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-好的学习项目-多个一键安装项目、工具、学习游戏" tabindex="-1"><a class="header-anchor" href="#docker-好的学习项目-多个一键安装项目、工具、学习游戏"><span>Docker 好的学习项目（多个一键安装项目、工具、学习游戏）</span></a></h2><ul><li><a href="https://github.com/y0ngb1n/dockerized" target="_blank" rel="noopener noreferrer">https://github.com/y0ngb1n/dockerized</a></li></ul><h2 id="docker-国内可用镜像加速列表" tabindex="-1"><a class="header-anchor" href="#docker-国内可用镜像加速列表"><span>Docker 国内可用镜像加速列表</span></a></h2><ul><li><a href="https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea" target="_blank" rel="noopener noreferrer">https://www.coderjia.cn/archives/dba3f94c-a021-468a-8ac6-e840f85867ea</a></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 配置方式1：临时使用</span></span>
<span class="line"><span># 直接使用，直接拿镜像域名拼接上官方镜像名，例如要拉去镜像yidadaa/chatgpt-next-web，可以用下面写法</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker pull dockerpull.com/yidadaa/chatgpt-next-web</span></span>
<span class="line"><span></span></span>
<span class="line"><span></span></span>
<span class="line"><span># 配置方式2：长久有效 Ubuntu 16.04+、Debian 8+、CentOS 7+</span></span>
<span class="line"><span># 修改文件 /etc/docker/daemon.json（如果不存在则需要创建创建，注意不要写入中文），并重启服务。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo mkdir -p /etc/docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo tee /etc/docker/daemon.json &lt;&lt;-&#39;EOF&#39;</span></span>
<span class="line"><span>{</span></span>
<span class="line"><span>    &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>    	&quot;https://dockerpull.com&quot;,</span></span>
<span class="line"><span>        &quot;https://docker.anyhub.us.kg&quot;,</span></span>
<span class="line"><span>        &quot;https://dockerhub.jobcher.com&quot;,</span></span>
<span class="line"><span>        &quot;https://dockerhub.icu&quot;,</span></span>
<span class="line"><span>        &quot;https://docker.awsl9527.cn&quot;</span></span>
<span class="line"><span>    ]</span></span>
<span class="line"><span>}</span></span>
<span class="line"><span>EOF</span></span>
<span class="line"><span></span></span>
<span class="line"><span>sudo systemctl daemon-reload &amp;&amp; sudo systemctl restart docker</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 可直接使用docker pull拉去镜像进行测试，或用以下命令检查是否生效：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>docker info</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="docker-desktop国内镜像源" tabindex="-1"><a class="header-anchor" href="#docker-desktop国内镜像源"><span>Docker Desktop国内镜像源</span></a></h2><ul><li><p><a href="https://www.cnblogs.com/Flat-White/p/17107494.html" target="_blank" rel="noopener noreferrer">https://www.cnblogs.com/Flat-White/p/17107494.html</a></p></li><li><p>打开Docker Desktop设置 &gt; Docker Engine</p></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>{</span></span>
<span class="line"><span>  &quot;builder&quot;: {</span></span>
<span class="line"><span>    &quot;gc&quot;: {</span></span>
<span class="line"><span>      &quot;defaultKeepStorage&quot;: &quot;20GB&quot;,</span></span>
<span class="line"><span>      &quot;enabled&quot;: true</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;experimental&quot;: false,</span></span>
<span class="line"><span>  &quot;features&quot;: {</span></span>
<span class="line"><span>    &quot;buildkit&quot;: true</span></span>
<span class="line"><span>  },</span></span>
<span class="line"><span>  &quot;registry-mirrors&quot;: [</span></span>
<span class="line"><span>    &quot;https://registry.docker-cn.com&quot;,</span></span>
<span class="line"><span>    &quot;https://docker.mirrors.ustc.edu.cn&quot;,</span></span>
<span class="line"><span>    &quot;http://hub-mirror.c.163.com&quot;</span></span>
<span class="line"><span>  ]</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-ce-国内镜像" tabindex="-1"><a class="header-anchor" href="#docker-ce-国内镜像"><span>Docker-CE 国内镜像</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>Docker-CE 国内镜像</span></span>
<span class="line"><span>https://mirror.tuna.tsinghua.edu.cn/help/docker-ce/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果你过去安装过 docker，先删掉:</span></span>
<span class="line"><span>sudo apt-get remove docker docker-engine docker.io</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 首先安装依赖:</span></span>
<span class="line"><span>sudo apt-get install apt-transport-https ca-certificates curl gnupg2 software-properties-common</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 根据你的发行版，下面的内容有所不同。你使用的发行版： </span></span>
<span class="line"><span># 信任 Docker 的 GPG 公钥:</span></span>
<span class="line"><span>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 对于 amd64 架构的计算机，添加软件仓库:</span></span>
<span class="line"><span>sudo add-apt-repository \\</span></span>
<span class="line"><span>   &quot;deb [arch=amd64] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \\</span></span>
<span class="line"><span>   $(lsb_release -cs) \\</span></span>
<span class="line"><span>   stable&quot;</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 如果你是树莓派或其它 ARM 架构计算机，请运行:</span></span>
<span class="line"><span>echo &quot;deb [arch=armhf] https://mirrors.tuna.tsinghua.edu.cn/docker-ce/linux/ubuntu \\</span></span>
<span class="line"><span>     $(lsb_release -cs) stable&quot; | \\</span></span>
<span class="line"><span>    sudo tee /etc/apt/sources.list.d/docker.list</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 最后安装</span></span>
<span class="line"><span>sudo apt-get update</span></span>
<span class="line"><span>sudo apt-get install docker-ce</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="docker-compose-国外" tabindex="-1"><a class="header-anchor" href="#docker-compose-国外"><span>Docker-Compose 国外</span></a></h3><h3 id="install-docker" tabindex="-1"><a class="header-anchor" href="#install-docker"><span>Install Docker</span></a></h3><p>Follow this guide <a href="https://docs.docker.com/linux/step_one/" target="_blank" rel="noopener noreferrer">https://docs.docker.com/linux/step_one/</a> to get Docker installed</p><h3 id="install-docker-compose-version-1-24-0-64-bit-via-curl" tabindex="-1"><a class="header-anchor" href="#install-docker-compose-version-1-24-0-64-bit-via-curl"><span>Install Docker-Compose version 1.24.0 (64 bit) via cURL</span></a></h3><ol><li>sudo curl -L &quot;<a href="https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64" target="_blank" rel="noopener noreferrer">https://github.com/docker/compose/releases/download/1.24.0/docker-compose-Linux-x86_64</a>&quot; -o /usr/local/bin/docker-compose</li></ol><h3 id="set-the-executable-permissions" tabindex="-1"><a class="header-anchor" href="#set-the-executable-permissions"><span>Set the executable permissions:</span></a></h3><ol><li>sudo chmod +x /usr/local/bin/docker-compose</li><li>sudo docker-compose --version</li><li>sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compos</li></ol>`,23)])])}const o=n(l,[["render",p]]),d=JSON.parse('{"path":"/basetools/Docker.html","title":"Docker国内安装全攻略及镜像加速指南","lang":"zh-CN","frontmatter":{"date":"2024-03-01T00:00:00.000Z","title":"Docker国内安装全攻略及镜像加速指南","author":["SecCMD"],"description":"本页面聚焦Docker在Windows、Linux等多平台的国内安装解决方案，提供便捷的一键安装命令及备用安装链接，以应对不同网络环境。同时详细介绍Docker镜像加速配置方法，涵盖临时使用与长久有效的配置方式，以及Docker Desktop国内镜像源设置和Docker-CE国内镜像安装步骤，还推荐了Docker学习项目，助力用户高效掌握Docker安装与使用技巧。\\n","categories":"基础工具","tags":["Docker安装","镜像加速"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Docker国内安装全攻略及镜像加速指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2024-03-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-09T09:34:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/basetools/Docker.html"}],["meta",{"property":"og:site_name","content":"明剑安全"}],["meta",{"property":"og:title","content":"Docker国内安装全攻略及镜像加速指南"}],["meta",{"property":"og:description","content":"本页面聚焦Docker在Windows、Linux等多平台的国内安装解决方案，提供便捷的一键安装命令及备用安装链接，以应对不同网络环境。同时详细介绍Docker镜像加速配置方法，涵盖临时使用与长久有效的配置方式，以及Docker Desktop国内镜像源设置和Docker-CE国内镜像安装步骤，还推荐了Docker学习项目，助力用户高效掌握Docker安装与使用技巧。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-09T09:34:45.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"镜像加速"}],["meta",{"property":"article:tag","content":"Docker安装"}],["meta",{"property":"article:published_time","content":"2024-03-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-09T09:34:45.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1757410485000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":1,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":2.56,"words":768},"filePathRelative":"basetools/Docker.md"}');export{o as comp,d as data};
