---
date: 2023-03-09
title: 寻找适合自己的博客笔记系统
authors: [SecAdmin]
description: >
  搭建自己个人博客，尝试多个博客系统，我想在博客中表达的内容类型比较多，总是不能完全满足需求，最后选择这个组合Hexo-Stellar是我最喜欢的，基本不用修改太多配置，阅读使用注意力很集中。安装过程记录一下，便于快速部署。
categories: 程序编程
tags:
  - Mkdocs
  - Program
---

# 寻找适合自己的博客笔记系统

## 背景

搭建自己个人博客，尝试多个博客系统，我想在博客中表达的内容类型比较多，总是不能完全满足需求，最后选择这个组合Hexo-Stellar是我最喜欢的，基本不用修改太多配置，阅读使用注意力很集中。安装过程记录一下，便于快速部署。

每个人的需求不同，博客或笔记工具选择也不同，可以自行尝试，找到最适合的。
* Docusaurus
* GitBook
* MkDocs
* Docsify
* vuepress
* Hego
* Hexo
* Wordpress

## Hexo 系统

Hexo 官网帮助文档：[快速上手](https://hexo.io/zh-cn/docs/)

### Hexo 安装
```bash
$ npm install -g hexo-cli
$ npx hexo <command>
```

### Hexo 新建与运行项目

安装 Hexo 完成后，请执行下列命令，Hexo 将会在指定文件夹中新建所需要的文件。

```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
$ hexo s
```

### Hexo 安装插件

[安装主题插件](https://github.com/xaoxuu/hexo-theme-stellar)

```bash
$ npm i hexo-theme-stellar

# Edit your _config.yml:
> theme: stellar

Install Stellar in terminal:
$ npm i hexo-theme-stellar
```

安装部署插件

```bash

# 先找到 myblog/_config.yml 文件，在其中设置：
deploy:
  - type: git
    repo: https://github.com/username/username.github.io.git # 注意要把地址改为自己的仓库地址
    branch: gh-pages
    message: "Build at {{ now('YYYY-MM-DD HH:mm:ss Z') }}"

# 这个指令用来安装插件
npm i hexo-deployer-git

# 此插件可以将博客部署到 git 仓库中
hexo clean && hexo g && hexo d
```

## MkDocs 系统

Material for MkDocs 官网帮助文档：[快速上手](https://squidfunk.github.io/mkdocs-material/getting-started/)

### MkDocs 基础操作

```bash
$ pip install mkdocs-material

$ mkdocs new [dir-name] - Create a new project.
$ mkdocs serve - Start the live-reloading docs server.
$ mkdocs build - Build the documentation site.
$ mkdocs -h - Print help message and exit.
```

### Mkdocs 配置

```python
# Mkdocs Blog 插件 https://liang2kl.github.io/mkdocs-blogging-plugin/
$ pip install mkdocs-blogging-plugin

# 配置参考
https://github.com/gledos/ggame/blob/master/mkdocs.yml
https://segmentfault.com/a/1190000018592279
```

## Docusaurus 系统

Docusaurus 官网帮助文档： [开始上手](https://docusaurus.io/zh-CN/)

### Docusaurus 安装
```nodejs
$ npx create-docusaurus@latest my-website classic
$ cd my-website 
$ npx docusaurus start
```

### Docusaurus 运行
```nodejs
npm run build
npm run serve
npm run serve -- --build --port 3001 --host 0.0.0.0
```

## Linux 安装 NodeJS 脚本

```bash
$ wget https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.xz
$ tar -xJvf node-v16.15.0-linux-x64.tar.xz -C /usr/local/lib/nodejs 
$ vi ~/.profile 
  export PATH=//usr/local/lib/nodejs/node-v16.15.0-linux-x64/bin:$PATH

$ source ~/.profile
$ node -v 
$ npm version 
$ npx -v
```