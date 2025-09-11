---
date: 2023-03-09
title: 寻找适合自己的博客笔记系统
author: [SecCMD]
description: >
  搭建自己个人博客，尝试多个博客系统，我想在博客中表达的内容类型比较多，总是不能完全满足需求，最后选择这个组合Hexo-Stellar是我最喜欢的，基本不用修改太多配置，阅读使用注意力很集中。安装过程记录一下，便于快速部署。
categories: 程序编程
tags:
  - Docusaurus
  - GitBook
  - MkDocs
  - Docsify
  - Vuepress
  - Hego
  - Hexo
  - Wordpress
---

# 寻找适合自己的博客笔记系统

## 背景

搭建自己个人博客，尝试多个博客系统，我想在博客中表达的内容类型比较多，总是不能完全满足需求，最后选择这个组合Hexo-Stellar是我最喜欢的，基本不用修改太多配置，阅读使用注意力很集中。安装过程记录一下，便于快速部署。

每个人的需求不同，博客或笔记工具选择也不同，可以自行尝试，找到最适合的。
* Docusaurus
* GitBook
* MkDocs
* Docsify
* Vuepress
* Hego
* Hexo
* Wordpress

## 方案一、Docsify 系统

> 一个神奇的文档网站生成器。
- [https://docsify.js.org/#/zh-cn/](https://docsify.js.org/#/zh-cn/)

## 方案二、HonKit 搭建文档中心指南

- https://github.com/honkit/honkit
- https://honkit.netlify.app

```bash
Install with NPM
$ npm install honkit --save-dev

Create a book
$ npx honkit init

Preview and serve your book using:
$ npx honkit serve

Or build the static website using:
$ npx honkit build
```



## 方案三、MkDocs 系统

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


### MkDocs 配置谷歌统计和谷歌广告

配置 Google Analytics

在配置文件 mkdocs.yml 中启用，并配置自己的 Google 代码。

```
extra:
  analytics:
    provider: google
    property: G-XXXXXXXXXX
```

查看自己的代码：

```
打开：https://analytics.google.com/

需要点击十次才找到我的 Google 代码，“人性化设计”！！！

【首页】 -> 左下角【管理】 -> 【数据收集与修改】 -> 【数据流】 -> 点选自己的【网站】 -> 【配置代码设置】-> 【数据流】 -> 标签【管理】-> 【添加此 Google 代码】  ->  【手动添加】
```

配置 Google AdSense

打开谷歌广告网站：https://www.google.com/adsense/

点选【广告】-> 点击【获取代码】-> 完成


使用 extra_javascript 配置

可以在 mkdocs.yml 文件中使用 extra_javascript 配置来引入 Google AdSense 脚本。

```
extra_javascript:
  - https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxx
```

## 方案四、Docusaurus 系统

Docusaurus 官网帮助文档： [开始上手](https://docusaurus.io/zh-CN/)

### Docusaurus 安装
```bash
$ npx create-docusaurus@latest my-website classic
$ cd my-website 
$ npx docusaurus start
```

### Docusaurus 运行
```bash
npm run build
npm run serve
npm run serve -- --build --port 3001 --host 0.0.0.0
```

## 方案五、Hexo 系统

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

### 快速开始

``` bash
$ hexo new "My New Post"   ### Create a new post
$ hexo server   ### Run server
$ hexo generate   ### Generate static files
$ hexo deploy    ### Deploy to remote sites
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