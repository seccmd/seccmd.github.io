# LLM Gateway

## One-API

Cambridge: <https://dictionary.cambridge.org/dictionary/english/repository>

Code Repository: <https://github.com/songquanpeng/one-api>

### 基于 Docker 进行部署

```Markdown
# 使用 SQLite 的部署命令：
docker run --name one-api -d --restart always -p 3000:3000 -e TZ=Asia/Shanghai -v /opt/jupyter-lab/one-api/data:/data justsong/one-api
# 使用 MySQL 的部署命令，在上面的基础上添加 `-e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi"`，请自行修改数据库连接参数，不清楚如何修改请参见下面环境变量一节。
# 例如：
docker run --name one-api -d --restart always -p 3000:3000 -e SQL_DSN="root:123456@tcp(localhost:3306)/oneapi" -e TZ=Asia/Shanghai -v /home/ubuntu/data/one-api:/data justsong/one-api
```

### 测试环境

[http://47.76.253.98:3000/](http://47.76.253.98:3000/user/edit)

root/Test@27

## any-llm：又一个统一模型服务接口的Python代理库

由 Mozilla AI 开发的开源项目 - any-llm，它专门解决多 LLM 提供商接口统一的问题，让你可以用一个简单的接口调用不同的大语言模型。

github地址：https://github.com/mozilla-ai/any-llm

**核心优势：**

- **统一接口**：只需要改变一个字符串参数就能切换不同的模型提供商
- **官方 SDK 支持**：尽可能使用官方 SDK，确保兼容性和稳定性
- **开发友好**：完整的类型提示和清晰的错误信息
- **无需代理**：直接与 LLM 提供商通信，无需额外的网关服务
- **框架无关**：可以在任何 Python 项目中使用

