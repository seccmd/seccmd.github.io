# AI 收集箱

## TODO

vllm

高级功能开发​​

​​多代理协作系统​​
​​层级式工作流​​：创建Manager Agent作为调度中心，连接多个专业Agent（如产品查询Agent、订单处理Agent）。
​​动态路由​​：通过条件分支组件，让Manager根据用户意图激活对应Agent。
​​
记忆与上下文管理​​
添加ConversationSummaryMemory组件，存储对话历史并生成摘要。
连接至Agent的Memory端口，实现多轮对话的连贯性。

​​RAG集成（知识增强）​​
串联组件：文件上传 → 文本分割 → 向量数据库（如FAISS）→ 检索工具。
将检索工具接入Agent，使其能回答基于知识库的复杂问题

路线：

* lang chain

  * <https://www.langchain.com/>
  * <https://github.com/langchain-ai/langchain>

* lang graph
  * <https://langchain-ai.github.io/langgraph/>

* lang smith
  * <https://docs.smith.langchain.com/>

* open deep research

* <https://github.com/langchain-ai/open_deep_research>

根据文章内容，以下是提到的AI平台：

1. [**z.ai**](http://z.ai) - 提供GLM 4.5模型，网页免费可用
2. **Pollinations AI** - 可通过该项目获得GLM 4.5的免费API访问
3. **LLM7** - 可通过它获得GLM 4.5的免费API访问
4. [**chat.qwen.ai**](http://chat.qwen.ai) - 提供Qwen3 Coder和其他新模型
5. [**kimi.com**](http://kimi.com) - 提供Kimi K2模型
6. **OpenAI Playground** - 提供GPT-4.5、o3等模型的免费tokens
7. **Google Gemini AI Studio** - 提供Gemini 2.5 Pro/Flash模型
8. **Gemini 2.5 Pro** (独立于AI Studio) - 图像生成和深度搜索功能更强
9. [**Poe.com**](http://Poe.com) - 提供Claude 4或o4-mini等模型
10. **OpenRouter** - 可同时连接多个模型
11. **ChatGPT** - 提供免费版
12. **Perplexity AI** - 适合资料调研
13. **Deepseek** - 提供v3和r1模型
14. [**Grok.com**](http://Grok.com) - 适合通用问答、深度搜索、图片编辑
15. **Phind** - 提供流程图/图表的可视化输出
16. [**lmArena.ai**](http://lmArena.ai) - 提供Claude Opus 4、Sonnet 4等模型的免费访问
17. [**Claude.ai**](http://Claude.ai) - Claude官方平台
18. **Qwen Code** - 每天可免费2000次API调用
19. **OpenAI** - 对大多数模型提供免费token
20. **Cerebras** - 提供免费额度
21. **Meta** - 提供免费的Llama 4 API
22. **Cody 插件** - 可用来访问Claude
23. **Copilot** - 可用来访问Claude

## 代码审计

使用ai code工具，不写代码，只做代码审计

- CC Security - [https://github.com/anthropics/claude-code-security-review](https://github.com/anthropics/claude-code-security-review)
- Qwen
- Codebuddy


## 29种本地部署大模型和调用的工具平台分类与总结

- https://blog.csdn.net/l35633/article/details/138379452
- 主要包括：Ollama，LM Studio，Ray Serve，GPT4ALL，vLLM，HuggingFace TGI，OpenLLM，LMDeploy, FastChat, LangChain。