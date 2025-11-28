# FastAPI + LangGraph搭建 AI 工作流

AI大模型观察站**
[**查看原文**](https://mp.weixin.qq.com/s?__biz=MzkzMjkwMjk3Mw%3D%3D&mid=2247485621&idx=1&sn=5a3207f4b0e2876800b74cda5c3683df)

## 作者 AI研究生

AI大模型观察站

**Large Language Models (LLMs)** 擅长推理，但现实世界的应用往往需要有状态、多步骤的工作流。这就是 **LangGraph** 的用武之地——它让你可以通过由 LLM 驱动的节点图来构建智能工作流。

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/6Ex6Atic0gTyjGMgfE14oc2TGne0Vj2ibZQK9udtCtZDlo9JB2iaU81DNXJicyjWMbNHibmH2PxFPz6ya53GnB5hyTA/640?wx_fmt=webp&from=appmsg)

但如果你想把这些工作流暴露为 **APIs**，让其他应用（或用户）可以调用呢？这时候 **FastAPI** 就派上用场了——一个轻量级、高性能的 Python Web 框架。

在这篇指南中，你将学习如何将 **LangGraph** 工作流封装在 **FastAPI** 中，变成一个生产就绪的 **endpoint**。

### 为什么选择 LangGraph + FastAPI？

- • **LangGraph**：创建多步骤、有状态的 LLM 工作流（例如，多智能体推理、数据处理）。
- • **FastAPI**：轻松将这些工作流暴露为 **REST APIs**，以便与 Web 应用、微服务或自动化流水线集成。
- • **结合两者**：构建可从任何地方访问的可扩展 AI 智能体。

### 1. 项目设置

创建一个新项目文件夹并安装依赖：

```text
mkdir langgraph_fastapi_demo && cd langgraph_fastapi_demopython -m venv .venvsource .venv/bin/activate  
# 在 Windows 上：.venv\Scripts\activatepip install fastapi uvicorn langgraph langchain-openai python-dotenv
```

创建一个 `.env` 文件来存储你的 API 密钥：

```text
OPENAI_API_KEY=你的_openai_密钥_在此
```

### 2. 构建一个简单的 LangGraph 工作流

让我们构建一个简单的 **LangGraph**，它接收用户的问题并返回 AI 生成的答案。

```text
# workflow.pyfrom langgraph.graph import StateGraph, START, ENDfrom langchain_openai import ChatOpenAIfrom langchain_core.messages import HumanMessageimport osfrom dotenv import load_dotenvload_dotenv()llm = ChatOpenAI(model="gpt-4o")  # 可以切换到 gpt-4o-mini 以降低成本# 定义状态defanswer_question(state: dict) -> dict:    user_input = state["user_input"]    response = llm.invoke([HumanMessage(content=user_input)])    return {"answer": response.content}# 构建图workflow = StateGraph(dict)workflow.add_node("answer", answer_question)workflow.add_edge(START, "answer")workflow.add_edge("answer", END)graph = workflow.compile()
```

这个图：

- • 接收 **user_input**
- • 将其发送到 **GPT-4o**
- • 返回 AI 生成的响应

### 3. 让它生产就绪

在向全世界开放之前，让我们为真实用例加固它。

#### 错误处理与重试

**LLM APIs** 可能会失败或超时。用 **try/except** 包装调用：

```text
from tenacity import retry, wait_exponential, stop_after_attempt@retry(wait=wait_exponential(multiplier=1, min=2, max=10), stop=stop_after_attempt(3))def safe_invoke_llm(message):    return llm.invoke([HumanMessage(content=message)])def answer_question(state: dict) -> dict:    user_input = state["user_input"]    try:        response = safe_invoke_llm(user_input)        return {"answer": response.content}    except Exception as e:        return {"answer": f"错误：{str(e)}"}
```

#### 输入验证

我们不想让别人发送巨大的数据负载。添加 **Pydantic** 约束：

```text
from pydantic import BaseModel, constrclass RequestData(BaseModel):    user_input: constr(min_length=1, max_length=500)  # 限制输入大小
```

#### 日志记录

添加日志以提高可见性：

```text
import logginglogging.basicConfig(level=logging.INFO)logger = logging.getLogger(__name__)def answer_question(state: dict) -> dict:    logger.info(f"收到输入：{state['user_input']}")    response = safe_invoke_llm(state['user_input'])    logger.info("已生成 LLM 响应")    return {"answer": response.content}
```

### 4. 使用 FastAPI 暴露工作流

现在，让我们将这个工作流封装在 **FastAPI** 中。

```text
# main.py

from fastapi import FastAPI
from workflow import graph, RequestData

app = FastAPI()@app.post("/run")
async def run_workflow(data: RequestData):
    result = graph.invoke({"user_input": data.user_input})
        return {"result": result["answer"]}
```

运行服务器：

```text
uvicorn main:app --reload
```

### 5. 测试 API

你可以使用 **curl** 测试：

```text
curl -X POST "http://127.0.0.1:8000/run" \     -H "Content-Type: application/json" \     -d '{"user_input":"什么是 LangGraph？"}'
```

或者在浏览器中打开 `http://127.0.0.1:8000/docs` —— **FastAPI** 会自动为你生成 **Swagger UI**！

![](https://mmbiz.qpic.cn/sz_mmbiz_jpg/6Ex6Atic0gTyjGMgfE14oc2TGne0Vj2ibZRSicJpRgzcicS7pPoDtRjZFDx42sGRFxT7hJLnbIaGjTpZJknDLibMUFA/640?wx_fmt=webp&from=appmsg)

这个交互式 UI 让你直接在浏览器中测试你的 **endpoint**。

### 6. 扩展与部署

为生产环境做准备的几个步骤：

- • **异步执行**：**FastAPI** 是异步原生的。对于多个 LLM 调用，让函数变成异步的。
- • **工作进程**：使用多进程运行以实现并发：```
uvicorn main:app --workers 4
- • **Docker 化**：```
FROM python:3.11-slimWORKDIR /appCOPY . .RUN pip install -r requirements.txtCMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
- • **认证**：使用 API 密钥或 **JWT tokens** 来保护 **endpoints**（第二部分即将推出）。

### 7. 架构概览

以下是整体连接方式：

```text


POST /run

Client

FastAPI

LangGraph

OpenAI\_API

Response


```

这个简单的架构让你可以将任何 **LangGraph** 变成一个 **API**。

## 8. 结论

通过几个简单的步骤，我们：

- • 构建了一个 **LangGraph** 工作流
- • 使用 **FastAPI** 将其暴露为 **REST API**
- • 添加了生产就绪的功能（验证、重试、日志）
- • 为可扩展的 AI 微服务奠定了基础

这个设置可以支持从聊天机器人到文档处理器再到 AI SaaS 产品的各种应用。

## 下一步是什么？

我计划推出本教程的第二部分，但我想听听你的意见。

👉 你希望我接下来讲哪一个？

- • 流式响应（实时聊天）
- • 认证与安全性
- • **Docker** 与云部署
- • 错误监控与可观察性

在下方评论你的选择！