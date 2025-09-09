import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as a,f as e,o as i}from"./app-CEDa-ARl.js";const l={};function p(t,s){return i(),a("div",null,[...s[0]||(s[0]=[e(`<h3 id="iam" tabindex="-1"><a class="header-anchor" href="#iam"><span>IAM</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># 访问管理后台,管理员IAM</span></span>
<span class="line"><span></span></span>
<span class="line"><span>https://iam.lab.com/admin/master/console/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Keycloak OIDC Auth Provider</span></span>
<span class="line"><span></span></span>
<span class="line"><span>1.Create new client in your Keycloak realm with Access Type &#39;confidental&#39;, Client protocol &#39;openid-connect&#39; and Valid Redirect URIs &#39;https://internal.yourcompany.com/oauth2/callback&#39;</span></span>
<span class="line"><span>2.Take note of the Secret in the credential tab of the client</span></span>
<span class="line"><span>3.Create a mapper with Mapper Type &#39;Group Membership&#39; and Token Claim Name &#39;groups&#39;.</span></span>
<span class="line"><span>4.Create a mapper with Mapper Type &#39;Audience&#39; and Included Client Audience and Included Custom Audience set to your client name.</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="oauth-proxy" tabindex="-1"><a class="header-anchor" href="#oauth-proxy"><span>Oauth proxy</span></a></h3><ul><li>下载 <a href="https://github.com/oauth2-proxy/oauth2-proxy/releases" target="_blank" rel="noopener noreferrer">https://github.com/oauth2-proxy/oauth2-proxy/releases</a></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Make sure you set the following to the appropriate url:</span></span>
<span class="line"><span>./oauth2-proxy \\</span></span>
<span class="line"><span>   --provider=keycloak-oidc \\</span></span>
<span class="line"><span>   --client-id=oauth_proxy \\</span></span>
<span class="line"><span>   --client-secret=&lt;password&gt; \\</span></span>
<span class="line"><span>   --redirect-url=https://wiki.lab.com/oauth2/callback \\</span></span>
<span class="line"><span>   --oidc-issuer-url=https://x.x.x.x/realms/master \\</span></span>
<span class="line"><span>   --email-domain=* \\</span></span>
<span class="line"><span>   --upstream=http://127.0.0.1:3000/ \\</span></span>
<span class="line"><span>   --reverse-proxy=true \\</span></span>
<span class="line"><span>   --cookie-secure=true \\</span></span>
<span class="line"><span>   --cookie-secret=&lt;password&gt; \\</span></span>
<span class="line"><span>   --insecure-oidc-allow-unverified-email  </span></span>
<span class="line"><span>    --allowed-role=&lt;realm role name&gt; // Optional, required realm role</span></span>
<span class="line"><span>    --allowed-role=&lt;client id&gt;:&lt;client role name&gt; // Optional, required client role</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx"><span>Nginx</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>server {</span></span>
<span class="line"><span>    listen 443 default ssl;</span></span>
<span class="line"><span>    server_name wiki.lab.com;</span></span>
<span class="line"><span>    ssl_certificate /path/to/cert.pem;</span></span>
<span class="line"><span>    ssl_certificate_key /path/to/cert.key;</span></span>
<span class="line"><span>    add_header Strict-Transport-Security max-age=2592000;</span></span>
<span class="line"><span></span></span>
<span class="line"><span>    location / {</span></span>
<span class="line"><span>        proxy_buffer_size 8k;</span></span>
<span class="line"><span>        proxy_pass http://127.0.0.1:4180;</span></span>
<span class="line"><span>        proxy_set_header Host $host;</span></span>
<span class="line"><span>        proxy_set_header X-Real-IP $remote_addr;</span></span>
<span class="line"><span>        proxy_set_header X-Scheme $scheme;</span></span>
<span class="line"><span>        proxy_connect_timeout 1;</span></span>
<span class="line"><span>        proxy_send_timeout 30;</span></span>
<span class="line"><span>        proxy_read_timeout 30;</span></span>
<span class="line"><span>    }</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="wikijs" tabindex="-1"><a class="header-anchor" href="#wikijs"><span>WiKiJS</span></a></h3><ul><li><a href="http://wiki.lab.com" target="_blank" rel="noopener noreferrer">wiki.lab.com</a></li></ul><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span># Wiki.js</span></span>
<span class="line"><span>SITE URL: https://x.x.x.x:8443/</span></span>
<span class="line"><span></span></span>
<span class="line"><span>配置sso登录：</span></span>
<span class="line"><span>https://gist.github.com/Sherex/283d1e4ef07b2bf0a930417dc0117238</span></span>
<span class="line"><span></span></span>
<span class="line"><span>被坑点，wiki不信任iam的自签名证书，强制关闭证书检验</span></span>
<span class="line"><span>  wiki:</span></span>
<span class="line"><span>    environment:</span></span>
<span class="line"><span>      NODE_TLS_REJECT_UNAUTHORIZED: 0</span></span>
<span class="line"><span></span></span>
<span class="line"><span># Demo 体验一下：</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 普通用户登录Wiki：</span></span>
<span class="line"><span>https://x.x.x.x:8443/login 选择 SSO 登录</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 管理员登录Wiki：</span></span>
<span class="line"><span>https://x.x.x.x:8443/</span></span>
<span class="line"><span></span></span>
<span class="line"><span># 管理员IAM</span></span>
<span class="line"><span>https://x.x.x.x/admin/master/console/</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="chat" tabindex="-1"><a class="header-anchor" href="#chat"><span>Chat</span></a></h3><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code class="language-"><span class="line"><span>openssl req -x509 -out lab.crt -keyout lab.key -days 1825 \\</span></span>
<span class="line"><span>  -newkey rsa:2048 -nodes -sha256 \\</span></span>
<span class="line"><span>  -subj &#39;/CN=lab.com&#39; -extensions EXT -config &lt;( \\</span></span>
<span class="line"><span>   printf &quot;[dn]\\nCN=lab.com\\n[req]\\ndistinguished_name = dn\\n[EXT]\\nsubjectAltName=DNS:lab.com\\nkeyUsage=digitalSignature\\nextendedKeyUsage=serverAuth&quot;)</span></span>
<span class="line"><span></span></span>
<span class="line"><span>openssl req -x509 -out lab.crt -keyout lab.key -days 1825 \\</span></span>
<span class="line"><span>  -newkey rsa:2048 -nodes -sha256 \\</span></span>
<span class="line"><span>  -subj &#39;/CN=lab.com&#39; -extensions EXT -config &lt;( \\</span></span>
<span class="line"><span>   printf &quot;[dn]\\nCN=lab.com\\n[req]\\ndistinguished_name = dn\\n[EXT]\\nsubjectAltName=IP:x.x.x.x\\nkeyUsage=digitalSignature\\nextendedKeyUsage=serverAuth&quot;)</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,12)])])}const d=n(l,[["render",p]]),o=JSON.parse('{"path":"/tld/basetools/IAM-oauth-proxy.html","title":"IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南","lang":"zh-CN","frontmatter":{"date":"2022-11-11T00:00:00.000Z","title":"IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南","author":["SecCMD"],"description":"本页面聚焦于身份验证与代理服务的集成部署，详细介绍了访问管理后台IAM的使用，以及在Keycloak中设置OIDC身份验证提供程序的步骤。同时，阐述了oauth proxy的下载与配置，Nginx的服务器配置，以及Wiki.js的安装、SSO登录配置和自签名证书信任问题解决方案。此外，还提供了Chat证书生成的openssl命令，为企业构建安全、高效的身份验证与访问管理体系提供全面且实用的技术指导。\\n","categories":"基础工具","tags":["身份验证"],"head":[["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2022-11-11T00:00:00.000Z\\",\\"dateModified\\":\\"2025-09-09T12:08:14.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"SecCMD\\"}]}"],["meta",{"property":"og:url","content":"https://www.seccmd.net/tld/basetools/IAM-oauth-proxy.html"}],["meta",{"property":"og:site_name","content":"明剑实验室"}],["meta",{"property":"og:title","content":"IAM、Oauth proxy、Nginx及Wiki.js等集成部署指南"}],["meta",{"property":"og:description","content":"本页面聚焦于身份验证与代理服务的集成部署，详细介绍了访问管理后台IAM的使用，以及在Keycloak中设置OIDC身份验证提供程序的步骤。同时，阐述了oauth proxy的下载与配置，Nginx的服务器配置，以及Wiki.js的安装、SSO登录配置和自签名证书信任问题解决方案。此外，还提供了Chat证书生成的openssl命令，为企业构建安全、高效的身份验证与访问管理体系提供全面且实用的技术指导。\\n"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2025-09-09T12:08:14.000Z"}],["meta",{"property":"article:author","content":"SecCMD"}],["meta",{"property":"article:tag","content":"身份验证"}],["meta",{"property":"article:published_time","content":"2022-11-11T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2025-09-09T12:08:14.000Z"}]]},"git":{"createdTime":1737552083000,"updatedTime":1757419694000,"contributors":[{"name":"seccmd","username":"seccmd","email":"79789833+seccmd@users.noreply.github.com","commits":2,"url":"https://github.com/seccmd"},{"name":"fireadm","username":"fireadm","email":"iwanwu@hotmail.com","commits":2,"url":"https://github.com/fireadm"}]},"readingTime":{"minutes":1.79,"words":538},"filePathRelative":"tld/basetools/IAM-oauth-proxy.md"}');export{d as comp,o as data};
