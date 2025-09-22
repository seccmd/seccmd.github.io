# AI MCP

## autoMate

无代码自动化神器，让电脑任务“自己动起来”

GitHub 仓库地址：https://github.com/yuruotong1/autoMate

## MCP-Playwright

MCP-Playwright：AI自动化神器，可执行JS代码进行复杂交互任务！


> **作者：AI研究生 AI大模型观察站** [**查看原文**](https://mp.weixin.qq.com/s?__biz=MzkzMjkwMjk3Mw%3D%3D\&mid=2247484597\&idx=1\&sn=970d78788d087b4c358c08509d9cfd6a)


最近笔者在用Next.js写一个前端项目项目，半夜 11 点还在手动复制SQL表结构、Google各种JS报错信息。PS：笔者是一个算法+后端工程师，对于前端的框架语法基本上只能靠搜索完成😭。

AI 编程助手不停地吐出过时的 React Hooks 或者是没理解我意思给出我不想要的代码，这让笔者极近崩溃，甚至想把电脑给砸了！！！！！

经过过不断AI工具的尝试，最终笔者发现了 MCP 服务器 —— 这些工具从根本上解决了 AI 编码时的上下文错乱、规划混乱和 UI 丑陋的问题（还的是MCP啊，专业的人干专业的事，在此刻具象化了）。

今天笔者将我用过的7款MCP工具安利给小伙伴们，让大家少走点弯路。

如果喜欢请关注公众号，以后会不断更新内容，和大家一起学习成长~~~

## 1. Context 7 MCP：让你的 AI 永远跟得上最新版文档

有没有遇到过这样的情况？你问 AI 一个新框架的问题，它却给你回复 2019 年的代码。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7LwgicKgC4aCDvXN0rYdibwnWLY9WDnqDVu005pSseC9SMiaMDpCGDYXjogicA/640?wx_fmt=jpeg\&from=appmsg)

Context 7 MCP 会连接实时文档，让 AI 拥有“最新知识”。

比如你要搭建一个 Next.js 应用，想要设置 App Router。如果没有 Context 7，AI 可能会给你老掉牙的 `getServerSideProps`。但有了它，它会查阅 Next.js 14 的文档，并提供正确代码。

```text
// 老派错误用法export async function getServerSideProps(){...}
// Context 7 的正确用法exportdefaultfunctionProfile(){returnYourProfile;}
```

就像给 AI 打了一针鸡血：速度快、信息准，还节省 token。

适合：经常使用新框架（如 Next.js、SvelteKit）的开发者。

## 2. Supabase MCP：让你远离手写 SQL 的痛苦

写 SQL 或同步 schema 就是一个体力劳动，还容易出错，稍不注意字段名字抄错？类型抄错？字符串长度抄错？在调试的时候才发现问题，到时候整个人都麻了，还要回过头全部检查转换的对不对，非常浪费时间！

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7LwgFd99ibJ6SmXwMibpKOl6z1dvWhOdiclwwP0LHhryo9Y6LFBmYPnAicyMjQ/640?wx_fmt=png\&from=appmsg)

Supabase MCP 可以把你的 IDE（比如 Cursor）连接到 Supabase 数据库，允许你用自然语言控制它。

比如你可以说：

•“创建一个包含 name 和 email 的 users 表”•“给 posts 表添加 RLS（行级安全）”

它会自动拉取 schema、执行修改，还能保持同步。

```text
--老方法（痛苦）CREATE TABLE users (  id UUID PRIMARY KEY,  email TEXT NOT NULL,  name TEXT);
--Supabase MCP：你说“创建 users 表”，它自动生成 SQL
```

简直就像有个数据库精灵。

适合：不想再为 SQL 烦心的后端开发者。

## 3. Browser MCP：让你的 IDE 内置搜索引擎

调试的时候在浏览器里开 47 个标签页？太常见了。

Browser MCP 让 AI 在 IDE 里“浏览网页”！

你遇到一个奇怪的报错？告诉它搜索日志信息。

需要最新的 Stripe API 文档？它会帮你搜索并总结。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7Lwg1soSBvNUD2sWCSP0hI30EKuPGaib7lne2wVMQia5CVWSm8HUZYccYCCw/640?wx_fmt=png\&from=appmsg)

举个例子：

```text
// 报错：ReferenceError: fetch is not defined你问 AI：“为啥Node.js 的 fetch 会出错？”Browser MCP 查完后告诉你：“Node.js 需要手动引入 fetch，试试这段代码：”import fetch from'node-fetch';
```

就像拥有了一个永不休息的研究助手。

适合：需要调试和查文档的开发者。

## 4. Claude Taskmaster：你的私人项目经理

你有一个超棒的 App 想法，但不知道从哪开始？

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7LwgagBtzvQPmAtrw66rsAjXC69tP56Vj4iahPcHFMr1WDwbGcaicndmO4jw/640?wx_fmt=png\&from=appmsg)

Claude Taskmaster 可以把你的“想法垃圾堆”变成一个清晰的执行计划。

比如我说：“做一个带登录和暗黑模式的 todo 应用”，它会返回一个有逻辑的任务列表：

```text
1.登录功能：接入Supabase登录，搭个简单界面2.Todo功能：创建数据库表，编写 CRUD 接口3.深色模式：添加主题切换功能，保存用户设置
```

就像有个产品经理一样，而且不会在晚上 9 点给你发 Slack 消息。

适合：身兼数职的个人开发者。

## 5. Exa MCP：杜绝 AI 胡说八道

AI 最令人抓狂的事就是 —— 它编造事实。

Exa MCP 会实时联网查询信息，为 AI 提供真实数据。

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7Lwg90iafM0d9xy5bZibTNAmCoSLpKtr1QdKf68ibCMbvDUSuznoq17iagbJSA/640?wx_fmt=png\&from=appmsg)

比如你问：

> “Tailwind CSS 每周下载量是多少？”

Exa MCP 会查 npm 或 GitHub，并回答：

> “截至 2025 年 5 月，Tailwind CSS 每周下载量为 1000 万。”

它是 AI 的“真相血清”。

适合：需要查数据、API 或竞品的开发者。

## 6. Knowledge Graph Memory：不用重复造轮子

又要做深色模式了？为什么不复用？

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7LwgUKeuibaVqSqlvZmgnaBAL40Cc5MoQLGQwCppDibwcibJw35IxCMVxWKoA/640?wx_fmt=png\&from=appmsg)

Knowledge Graph Memory 可以保存你项目的核心逻辑，以便在未来项目中复用。

比如我之前做过一个深色模式，现在只要说“在这个新项目加深色模式”，它就能把之前的逻辑迁移过来。

```text
/* 之前的深色样式 */:root {--bg:#fff;--text:#000;}.dark {--bg:#000;--text:#fff;}
```

简直就是编程界的时间机器。

适合：经常做类似项目的开发者。

## 7. Magic MCP：你身边的免费 UI 设计师

你写的登录按钮看起来像是用 Word 做的？

![](https://mmbiz.qpic.cn/sz_mmbiz_png/6Ex6Atic0gTz2sZU3oeM2sqOoLovh7Lwg8gss0mxksbATwKLkGuwau1iaIIfseManpmqAFJJQESxib4YxsIibDyTsw/640?wx_fmt=png\&from=appmsg)

Magic MCP 可以根据你的提示，生成漂亮的 UI 组件。

比如你说：“做一个现代风格的 Tailwind 登录按钮。”

它就会生成这样的代码：

```text
SignIn
```

UI 看起来就像找了个专业设计师做的。

适合：对设计苦手但想要好看界面的开发者。

## 总结：为什么这些 MCP 工具值得尝试？

这些 MCP 工具，解决了使用 AI 编程时最头疼的问题：

•**上下文错误**：Context 7 MCP、Exa MCP 保证信息新鲜又真实。•**规划混乱**：Claude Taskmaster 自动拆分任务。•**资料缺失**：Browser MCP 秒搜文档。•**界面太丑**：21st Dev Magic 给你“颜值自由”。•**重复造轮子**：Knowledge Graph Memory 让你“写一次用十次”。

挑 1~2 个工具用上，你就像给自己配了个专业 AI 编程助理。

效率翻倍、心情加分，开发体验直接起飞 🚀

具体用法都可以在Github上项目的README中找到，如果有啥问题欢迎留言交流~~~~~~~

![](https://mmbiz.qpic.cn/sz_mmbiz_gif/6Ex6Atic0gTzeibm9CCXcWPWujMu0GVELQr4GKLdtPBEl0L0X8iaQF4oooKwXvpoQewxeJqrjazZ1UP7DuTkHdpVQ/640?wx_fmt=gif\&from=appmsg)


## 开发第一个MCP Server

> **作者：AI取经路** [**查看原文**](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ%3D%3D\&mid=2649038855\&idx=1\&sn=941028c77cb1632fb52909e76287a6cd)


本文提供了一个完整的**MCP Server 实现示例**，通过 Python 代码和Cline测试，展示了 MCP 如何用于**增强 AI 应用的能力**，特别是**Tool 能力的集成和调用**。

* 1. 常见AI应用对MCP Server能力的支持情况
* 2. 代码实现MCP Server
* 2.1 配置环境
* 2.2 新建MCP Server : hello\_mcp\_server.py
* 3. 使用Cline测试Server
* 3.1 Cline连接MCP Server的相关源码

\--领取学习资料大礼包，见文末

在[《一文说清楚让LangChain大佬“开战”的MCP是什么？》](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038667\&idx=1\&sn=d1467904da2f8acc62b7bb4838737ed2\&scene=21#wechat_redirect)中详细的介绍了MCP.

MCP为连接**AI应用**与数据源提供了一个通用的开放标准，用单一协议取代了碎片化的集成。通过这个机制， 能力小的**AI应用**会变成更强的应用

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybMKLre9NTvIQYlUw1lc0hVWAcQ8icgboib0BaKWWaPpUPEjFOH7S8Oftw/640?wx_fmt=png\&from=appmsg)

在整个MCP的架构中，我们的**AI应用**（如Cline）作为MCP Hosts，通过内部的MCP Client去接入不同的MCP Server，从而达到增强能力的目的

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybaTB3Zd25QM2UfyN1Wk3u7pPibZWnwR8FjZqRXicNuHMcD6Fm8yNytKFA/640?wx_fmt=png\&from=appmsg)

根据MCP协议，当**AI应用**连接到MCP Server后，能够获取多种能力，比如Tool，Prompts、Resources等

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybUnX88IU5WcdYqLh2rcQnnoPqj8w1IcBfhrTsgiaIPJBpCsYfVFMu6rw/640?wx_fmt=png\&from=appmsg)

详细内容见：[一文说清楚让LangChain大佬“开战”的MCP是什么？](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038667\&idx=1\&sn=d1467904da2f8acc62b7bb4838737ed2\&scene=21#wechat_redirect)

## 1. 常见AI应用对MCP Server能力的支持情况

目前MCP还在发展过程中，我们可以通过官方看到常见**AI应用**目前可以使用的能力情况。

应用对于Tool能力的使用，目前是最广泛的：

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybYf4ziaNL3zmIdMEqsUTIIjPBWaUhKUKPa5InAdeQ10StsibuskLzZmKQ/640?wx_fmt=png\&from=appmsg)

## 2. 代码实现MCP Server

我们要实现一个简单的server，他将有一个tool，可以通过订单号查询物流信息。

这个server在整个架构中的位置，就是下图中绿色的块：

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybDPreWrahvLcoTHrEzmNxHQBvgSUibp7sKy1ncVO4qjvH1Y1IX3vlD6w/640?wx_fmt=png\&from=appmsg)

### 2.1 配置环境

首先，让我们安装 `uv` 并设置我们的 Python 项目和环境：

**安装uv工具（windows）**

```text
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

**重新开启一个终端，并确认uv已经安装成功**

```text
PS G:\workspace\idea\py\hello-mcp-server> uv version
uv 0.6.6 (c1a0bb85e 2025-03-12)
```

> ❝ 在macos/linux环境中安装uv

```text
curl -LsSf https://astral.sh/uv/install.sh | sh
```

> ❝ uv是一个用 Rust 编写的极快的 Python 包和项目管理器。 官网：<https://github.com/astral-sh/uv>

**创建项目，初始化环境：**

```text
`# 初始化项目 uv init hello-mcp-server # 创建Python虚拟环境 cd hello-mcp-server uv venv # 激活虚拟环境 .venv\Scripts\activate # 安装依赖 uv add mcp[cli]` 
```

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybdRkcicJkPua6OyPLRwb79WcVSibZqCJT0C49DrCHtvo1yfUTACorWd4Q/640?wx_fmt=png\&from=appmsg)

### 2.2  新建MCP Server : `hello_mcp_server.py`

我们新建一个Server，并增加tool来模拟通过订单号查询物流信息的功能

#### 2.2.1 定义一个server

导入包并定义mcp实例

```text
"""
pip install mcp[cli]
"""
from mcp.server.fastmcp import FastMCP
from pydantic import Field

# Initialize FastMCP server
mcp = FastMCP("hello-mcp-server", log_level="ERROR")
```

#### 2.2.2 定义工具

通过`@mcp.tool()`注解，把一个函数注册为Tool

```text
# 注册工具的装饰器，可以很方便的把一个函数注册为工具
@mcp.tool()
asyncdef query_logistics(order_id: str = Field(description="订单号")) -> str:
    """查询物流信息。当用户需要根据订单号查询物流信息时，调用此工具
    
    Args:
        order_id: 订单号
    
    Returns:
        物流信息的字符串描述
    """
    # 统一的物流信息数据
    tracking_info = [
        {"time": "2024-01-20 10:00:00", "status": "包裹已揽收", "location": "深圳转运中心"},
        {"time": "2024-01-20 15:30:00", "status": "运输中", "location": "深圳市"},
        {"time": "2024-01-21 09:00:00", "status": "到达目的地", "location": "北京市"},
        {"time": "2024-01-21 14:00:00", "status": "派送中", "location": "北京市朝阳区"},
        {"time": "2024-01-21 16:30:00", "status": "已签收", "location": "北京市朝阳区三里屯"}
    ]

    # 格式化物流信息
    result = f"物流单号：{order_id}\n\n物流轨迹：\n"
    for item in tracking_info:
        result += f"[{item['time']}] {item['status']} - {item['location']}\n"

    return result
```

#### 2.2.3 使用 MCP Inspector 进行测试

MCP Inspector 是一个用于测试和调试 MCP 服务器的交互式开发工具。

<https://modelcontextprotocol.io/docs/tools/inspector>

**启动MCP Inspector：**

执行命令：`mcp dev hello_mcp_server.py`

```text
(hello-mcp-server) PS G:\workspace\idea\py\hello-mcp-server> mcp dev hello_mcp_server.py
Starting MCP inspector...
Proxy server listening on port 3000

🔍 MCP Inspector is up and running at http://localhost:5173 🚀
```

通过浏览器打开<http://localhost:5173>

**连接MCP Server:**

点击“Connect”启动MCP Server并建立连接

1.使用标准输入输出作为传输层

2.使用命令是uv

3.uv命令的参数

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybCVSGnxEmYrcbUpGQerNPjvicP1rbXdZJK6XHR8DQhjAPl5N40ev0GgQ/640?wx_fmt=png\&from=appmsg)

**查询所有的Tool：**

1.点击“Tools”能力标签

2.点击“List Tools”，查询server中所有的tool（调用了协议的`tools/list` 端点）

3.显示出所有的tool

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybLJVvZxcgMG4iaM6TDZXaTpEByFSFTOdSStlHJJL7IcNdId8xJx246iaQ/640?wx_fmt=png\&from=appmsg)

**执行Tool：**

1.选择需要测试的tool

2.输入入参：ORDER-123456，点击“Run Tool”（调用了协议的`tools/call` 端点）

3.Tool成功返回结果

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybib5fgzBlWxxtTjwDbZRqKnPD1G4TAo4JrHHyTylRnehokfKBrmwC8AQ/640?wx_fmt=png\&from=appmsg)

## 3. 使用Cline测试Server

打开Cline，点击上边的“MCP Server”

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybQ42ugOBC7WCIwrAOq9e7e1uIRe1CGeibKY3icicDtvJHCC5KNspHThq2A/640?wx_fmt=png\&from=appmsg)

选择“Installed”

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybicdYZEsViaibPxIDR14Nt7v4MBKsFxzGQQyfa8ibstnd1kmY6xnu0IDslA/640?wx_fmt=png\&from=appmsg)

点击“Configure MCP Servers”

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybMibxs7r0pw2xX6KpvBCQXhxIibibMHdOk7uYB2Cib11iaFyYoR8sxsNZJjw/640?wx_fmt=png\&from=appmsg)

右边会弹出配置文件

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybMmjEypWIG2d5Lf8MMm8Fyr0rDgctZM2FO1icCyiafsvFqfyPUUEEFFgg/640?wx_fmt=png\&from=appmsg)

将自己刚写的服务器相关配置填进去，保存

```text
"hello-mcp-server": {
"name": "第一个MCP服务",
"key": "hello-mcp-server",
"command": "uv",       
"args": [
    "--directory",
    "G:\\workspace\\idea\\py\\hello-mcp-server\\",
    "run",
    "--with",
    "mcp",
    "mcp",
    "run",
    "hello_mcp_server.py"
  ],
"disabled": false,
"autoApprove": []
}
```

**整个完整命令相当于：**

```text
uv --directory G:\workspace\idea\py\hello-mcp-server\ run --with mcp mcp run hello_mcp_server.py
```

分为3段：

1. `uv --directory G:\workspace\idea\py\hello-mcp-server\` 指定工作目录
2. `run --with mcp` 运行时必须要有mcp包被安装
3. `mcp run hello_mcp_server.py` 使用mcp启动server

左边会生成对应的服务列表，点击“Done”退出

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybq87x7c4ANPFAQQZo9RwBLnUjGBNhNTt6yQOj0FXX9CR1JyBLSnc6AA/640?wx_fmt=png\&from=appmsg)

在Cline对话框中输入提示词：查一下订单为“ORDER-123456”的物流信息

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybPRibREKgV2CG8AdbMjuee8UypzdK46aBCQrbXv6Xy4L4z5ztJDVm20w/640?wx_fmt=png\&from=appmsg)

Cline开始调用MCP Server，点击“Approve”同意

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vybSzicJic7SxytdicSp7OJwh4hHuTKtEVLYED85yp9GkWJ1slS9FP1R1Jfw/640?wx_fmt=png\&from=appmsg)

MCP Server调用成功

![\<span leaf="">\<br>\</span>](https://mmbiz.qpic.cn/mmbiz_png/ko3ibXTD3NELmMxVONY7HGo0kYdPe6vyb7kEsfRyGegYmPV4ymIMcbuhPF5TNcvDx3010SHc9w0qtUP9HV07dxg/640?wx_fmt=png\&from=appmsg)

### 3.1 Cline连接MCP Server的相关Client源码

Cline(相当于MCP架构中的Host)源码中，MCP相关的代码在`src/services/mcp/McpHub.ts`中，MCP Clinet连接MCP  Server的代码在`connectToServer`:

```text
private async connectToServer(name: string, config: StdioServerParameters): Promise<void> {
  ...

try {
   // 创建新的MCP客户端实例，设置客户端名称和版本信息
   const client = new Client(
    {
     name: "Cline",
     version: this.providerRef.deref()?.context.extension?.packageJSON?.version ?? "1.0.0",
    },
    {
     capabilities: {},        // 客户端没有给服务端暴露能力
    },
   )

   // 创建标准输入输出传输实例，配置命令、参数和环境变量
   // 这个是我们配置文件的内容
   const transport = new StdioClientTransport({
    command: config.command,
    args: config.args,
    env: {
     ...config.env,
     ...(process.env.PATH ? { PATH: process.env.PATH } : {}),
    },
    stderr: "pipe", 
   })

            ......
            
   // 启动传输层，建立实际的进程间通信通道
   await transport.start()
   
   ...

   // 建立MCP客户端连接
   // 连接成功后更新服务器状态为已连接，清除错误信息
   // 初始化并获取服务器提供的工具和资源列表
   await client.connect(transport)
   connection.server.status = "connected"
   connection.server.error = ""

   // 初始化获取工具资源列表
   connection.server.tools = awaitthis.fetchToolsList(name)
   connection.server.resources = awaitthis.fetchResourcesList(name)
   connection.server.resourceTemplates = awaitthis.fetchResourceTemplatesList(name)
  } catch (error) {
   ......
  }
 }
```

到目前为止我们实现了一个能提供Tool能力的MCP Server

往日推荐：

1. [从源码看OpenManus：如何用开源技术复刻Manus](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038516\&idx=1\&sn=172254bf26b3f7ff23f853f480e87a5e\&scene=21#wechat_redirect)
2. [LangChain实战 | 路由机制让AI助手更聪明，专业问题交给专业模块！](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038248\&idx=1\&sn=fb46934ddd6c12b261a4dcd23fb503ab\&scene=21#wechat_redirect)
3. [以前做PPT要3天，现在只要10分钟！DeepSeek+Kimi 让我效率起飞！](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038160\&idx=1\&sn=2c5087f3f823097352483e86a54be59b\&scene=21#wechat_redirect)
4. [LangChain实战 | MultiQueryRetriever 让 RAG 更懂你的问题](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038076\&idx=1\&sn=c876b11f688e1efa065c80fe53b9807d\&scene=21#wechat_redirect)
5. [北京大学发布《DeepSeek提示词工程与落地场景》技术文档，推动国产AI应用创新](https://mp.weixin.qq.com/s?__biz=MzI4MjE1Nzc2MQ==\&mid=2649038009\&idx=1\&sn=ef85b93bec5d908b2b436b316f19a986\&scene=21#wechat_redirect)

![](https://mmbiz.qpic.cn/mmbiz_jpg/ko3ibXTD3NELPrDo2pTRDCrjba7NoOSElQlJzumtya910soFutD2XGib3oSicr70TziazoNq96bcEHNud8aJjVYcrw/640?wx_fmt=jpeg\&from=appmsg)

有需要的，在公众号「**AI取经路**」发消息「学习资料」即可获取。

**--END--**

点亮 **“赞”**和**“在看”**，\*\*“分享”\*\*好友一起看
