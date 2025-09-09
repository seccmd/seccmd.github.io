import{_ as s}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as e,o as i}from"./app-BGb_QXzP.js";const l={};function p(t,n){return i(),a("div",null,[...n[0]||(n[0]=[e(`<h1 id="python-环境安装、虚拟环境创建及打包工具指南-含国内镜像源" tabindex="-1"><a class="header-anchor" href="#python-环境安装、虚拟环境创建及打包工具指南-含国内镜像源"><span>Python 环境安装、虚拟环境创建及打包工具指南 | 含国内镜像源</span></a></h1><ul><li><a href="https://fullstackpython.com/" target="_blank" rel="noopener noreferrer">https://fullstackpython.com/</a></li></ul><h3 id="国内可用的一些第三方镜像源地址" tabindex="-1"><a class="header-anchor" href="#国内可用的一些第三方镜像源地址"><span>国内可用的一些第三方镜像源地址：</span></a></h3><ul><li>阿里云 <a href="http://mirrors.aliyun.com/pypi/simple/" target="_blank" rel="noopener noreferrer">http://mirrors.aliyun.com/pypi/simple/</a></li><li>中国科技大学 <a href="https://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.mirrors.ustc.edu.cn/simple/</a></li><li>豆瓣(douban) <a href="http://pypi.douban.com/simple/" target="_blank" rel="noopener noreferrer">http://pypi.douban.com/simple/</a></li><li>清华大学 <a href="https://pypi.tuna.tsinghua.edu.cn/simple/" target="_blank" rel="noopener noreferrer">https://pypi.tuna.tsinghua.edu.cn/simple/</a></li><li>中国科学技术大学 <a href="http://pypi.mirrors.ustc.edu.cn/simple/" target="_blank" rel="noopener noreferrer">http://pypi.mirrors.ustc.edu.cn/simple/</a></li></ul><h3 id="python-环境安装" tabindex="-1"><a class="header-anchor" href="#python-环境安装"><span>Python 环境安装</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>## 自动化脚本（下载 &amp; 静默安装）</span></span>
<span class="line"><span>cd %USERPROFILE%\\Downloads\\</span></span>
<span class="line"><span>curl https://mirrors.huaweicloud.com/python/3.9.10/python-3.9.10-amd64.exe -o python-3.9.10-amd64.exe</span></span>
<span class="line"><span>python-3.9.10-amd64.exe /quiet InstallAllUsers=0 PrependPath=1 Include_test=0</span></span>
<span class="line"><span>python -V # 静默安装完成，需要重新打开一个 CMD 窗口。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>## 国内镜像源安装第三方包,永久修改</span></span>
<span class="line"><span>pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple</span></span>
<span class="line"><span>pip config list</span></span>
<span class="line"><span>pip install html2text # 能看到使用了新的下载源</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>## 安装包下载地址：</span></span>
<span class="line"><span>- python官方各版本下载地址：https://www.python.org/ftp/python/</span></span>
<span class="line"><span>- python 国内华为镜像：https://mirrors.huaweicloud.com/python/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**测试**</span></span>
<span class="line"><span>python -V</span></span>
<span class="line"><span>CMD&gt; echo %PATH%</span></span>
<span class="line"><span>Psh&gt; echo $env:Path</span></span>
<span class="line"><span></span></span>
<span class="line"><span>**参考**</span></span>
<span class="line"><span>https://docs.python.org/3.9/using/windows.html#installing-without-ui</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="创建python3虚拟环境" tabindex="-1"><a class="header-anchor" href="#创建python3虚拟环境"><span>创建python3虚拟环境</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>首先强烈推荐大家使用python3提供的虚拟环境进行依赖管理，这样的话，每个项目都有自己独立的依赖环境。避免了不同项目使用同一个依赖的不同版本而导致的冲突。</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建项目根目录</span></span>
<span class="line"><span>mkdir myscrapy  </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 切换到项目目录</span></span>
<span class="line"><span>cd myscrapy</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 创建虚拟环境，第一个venv是python的模块venv，不能修改</span></span>
<span class="line"><span># 第二个venv是自定义的虚拟目录名称，可以修改，不过一般建议还是使用venv作为目录</span></span>
<span class="line"><span>python3 -m venv venv</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 此时在myscrapy目录中多了一个venv文件夹</span></span>
<span class="line"><span># 开启虚拟环境</span></span>
<span class="line"><span>source venv/bin/activate </span></span>
<span class="line"><span></span></span>
<span class="line"><span># 此时命令行变成了如下的样子</span></span>
<span class="line"><span>(venv) [root@itxxq myscrapy]#</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 开发阶段就一直保持在虚拟环境中进行各种操作，比如安装依赖，运行项目</span></span>
<span class="line"><span>(venv) [root@itxxq myscrapy]# pip3 install feedparser html2text scrapy</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 通过国内镜像源安装第三方包的方法（安装速度更快）</span></span>
<span class="line"><span></span></span>
<span class="line"><span>$ pip3 install -i https://pypi.tuna.tsinghua.edu.cn/simple feedparser html2text scrapy</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 退出虚拟环境</span></span>
<span class="line"><span>deactivate</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 生成 requirements.txt 文件，本地所有依赖都自动添加到文件里</span></span>
<span class="line"><span>pip3 freeze &gt; ./requirements.txt</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 迁移环境的时候，注意打包该文件，然后使用如下命令部署</span></span>
<span class="line"><span>pip3 install -r requirements.txt</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="打包工具" tabindex="-1"><a class="header-anchor" href="#打包工具"><span>打包工具</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>这次也是由于项目需要，要将python的代码转成exe的程序，在找了许久后，发现了2个都能对python项目打包的工具——pyintaller和nuitka。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>这2个工具同时都能满足项目的需要：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>隐藏源码。这里的pyinstaller是通过设置key来对源码进行加密的；而nuitka则是将python源码转成C++（这里得到的是二进制的pyd文件，防止了反编译），然后再编译成可执行文件。</span></span>
<span class="line"><span>方便移植。用户使用方便，不用再安装什么python啊，第三方包之类的。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>2个工具使用后的最大的感受就是：</span></span>
<span class="line"><span></span></span>
<span class="line"><span>pyinstaller体验很差！</span></span>
<span class="line"><span>一个深度学习的项目最后转成的exe竟然有近3个G的大小（pyinstaller是将整个运行环境进行打包），对，你没听错，一个EXE有3个G！</span></span>
<span class="line"><span>打包超级慢，启动超级慢。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>nuitka真香！</span></span>
<span class="line"><span>同一个项目，生成的exe只有7M！</span></span>
<span class="line"><span>打包超级快（1min以内），启动超级快。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>https://www.lixiaofei2yy.website/python%E7%9A%84%E6%89%93%E5%8C%85%E7%A5%9E%E5%99%A8nuitka</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)])])}const d=s(l,[["render",p]]),o=JSON.parse('{"path":"/tld/basetools/Python.html","title":"Python 快速安装、虚拟环境创建及打包工具 | 含国内镜像源","lang":"zh-CN","frontmatter":{"date":"2023-08-01T00:00:00.000Z","title":"Python 快速安装、虚拟环境创建及打包工具 | 含国内镜像源","author":["SecCMD"],"description":"本页面聚焦 Python 开发实用技巧，涵盖环境安装、虚拟环境管理及打包工具选择。提供自动化脚本实现 Python 静默安装，罗列国内可用第三方镜像源，助您加速包下载。详细阐述创建 Python3 虚拟环境步骤，有效避免项目依赖冲突。同时对比 pyinstaller 与 nuitka 两款打包工具，突出 nuitka 在隐藏源码、文件体积、打包及启动速度上的优势，为您的 Python 开发之路提供全面且实用的指引。\\n","categories":"基础工具","tags":["基础工具","Python"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Python 快速安装、虚拟环境创建及打包工具 | 含国内镜像源\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2023-08-01T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-09T12:08:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/basetools/Python.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"Python 快速安装、虚拟环境创建及打包工具 | 含国内镜像源"}],["meta",{"property":"og:description","content":"本页面聚焦 Python 开发实用技巧，涵盖环境安装、虚拟环境管理及打包工具选择。提供自动化脚本实现 Python 静默安装，罗列国内可用第三方镜像源，助您加速包下载。详细阐述创建 Python3 虚拟环境步骤，有效避免项目依赖冲突。同时对比 pyinstaller 与 nuitka 两款打包工具，突出 nuitka 在隐藏源码、文件体积、打包及启动速度上的优势，为您的 Python 开发之路提供全面且实用的指引。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-09T12:08:14.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"Python"}],["meta",{"property":"article:tag","content":"基础工具"}],["meta",{"property":"article:published_time","content":"2023-08-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-09T12:08:14.000Z"}]]},"git":{"createdTime":1737537205000,"updatedTime":1757419694000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":1,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":2,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":3.33,"words":998},"filePathRelative":"tld/basetools/Python.md"}');export{d as comp,o as data};
