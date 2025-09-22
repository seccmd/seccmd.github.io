# Ollama

## 本地部署大模型 Ollama

- [https://ollama.fan/getting-started/](https://ollama.fan/getting-started/)
- 官网快捷下载安装 [https://ollama.com/](https://ollama.com/)
- 安装模型，执行命令 ollama run llama3

## Ollama 中文微调

- 直接下载别人微调好的中文版[https://huggingface.co/](https://huggingface.co/) 
- 导入微调后的模型，具体步骤todo

## Ollama使用指南【超全版】

[https://zhuanlan.zhihu.com/p/704951717](https://zhuanlan.zhihu.com/p/704951717)


## 功能设计

|||||
|-|-|-|-|
|功能|备注|笔记化|产品化|
|命令注入||||
|py代码后门||||
|配置安全||||
|ollama 密钥？|.ollama/id_ed25519|||
|ollama 日志|.ollama/logs/server.log|||
|ollama history 历史记录|.ollama/history|||
|ollama 模型配置|.ollama/models/manifests/registry.ollama.ai/library/llama3/latest|||
|md5 篡改替换 shasum -a 256|模型文件 .ollama/models/blobs/ MacOS: ~/.ollama/models Linux: /usr/share/ollama/.ollama/models Windows: C:\Users\username\.ollama\models|||
|ollama二进制文件|sudo chmod +x /usr/bin/ollama|||
|ollama 端口|curl [http://localhost:11434/](http://localhost:11434/)|||
|ollama API 安全|/api/generate|||
|环境变量|OLLAMA_HOST OLLAMA_MODELS OLLAMA_ORIGINS OLLAMA_LLM_LIBRARY OLLAMA_DEBUG  |||


