---
date: 2024-01-29
title: Hexo 静态博客部署到 GitHub Pages 完整指南 | 快速搭建个人博客
authors: [SecAdmin]
description: >
  本指南详细介绍如何使用 Hexo 静态博客框架部署到 GitHub Pages，快速搭建个人博客。涵盖 Hexo 安装、主题配置、文章发布及自动化部署流程。通过 GitHub Actions 实现持续集成，轻松将博客更新推送到 GitHub Pages。适合开发者、技术爱好者快速搭建高效、美观的个人博客站点。
categories: 基础工具
tags:
  - Hexo
  - GitHub Pages
  - 静态博客
---

以下是 GitHub Pages 部署教程的中文翻译，基本保持原始风格：

---

# 使用 GitHub Pages 部署 Hexo 博客

在本教程中，我们将使用 GitHub Actions 将 Hexo 博客部署到 GitHub Pages。此方法适用于公共和私有仓库。如果您不想将源代码上传到 GitHub，可以直接跳转到 **一键部署** 部分。

## 步骤 1：创建 GitHub 仓库

1. 创建一个名为 `username.github.io` 的仓库，其中 `username` 是您的 GitHub 用户名。如果您已经将代码上传到其他仓库，可以直接重命名该仓库。
2. 将 Hexo 文件夹中的文件推送到仓库的默认分支（通常是 `main`，旧版仓库可能使用 `master` 分支）。
3. 使用以下命令将 `main` 分支推送到 GitHub：

   ```bash
   git push -u origin main
   ```

   **注意**：`public/` 文件夹默认不应上传，请确保 `.gitignore` 文件中包含 `public/` 这一行。仓库的文件结构应与 [此示例仓库](https://github.com/hexojs/hexo-starter) 类似。

## 步骤 2：配置 GitHub Actions

1. 在本地机器上运行 `node --version`，查看 Node.js 版本，并记下主版本号（例如 `v20.y.z`）。
2. 在 GitHub 仓库的设置中，导航到 `Settings > Pages > Source`，将源更改为 `GitHub Actions` 并保存。
3. 在仓库中创建 `.github/workflows/pages.yml` 文件，内容如下（将 `20` 替换为您记下的 Node.js 主版本号）：

   ```yaml
   name: Pages

   on:
     push:
       branches:
         - main # 默认分支

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
           with:
             token: ${{ secrets.GITHUB_TOKEN }}
             # 如果您的仓库依赖子模块，请参考：https://github.com/actions/checkout
             submodules: recursive
         - name: Use Node.js 20
           uses: actions/setup-node@v4
           with:
             # 示例：20, 18.19, >=16.20.2, lts/Iron, lts/Hydrogen, *, latest, current, node
             # 参考：https://github.com/actions/setup-node#supported-version-syntax
             node-version: "20"
         - name: Cache NPM dependencies
           uses: actions/cache@v4
           with:
             path: node_modules
             key: ${{ runner.OS }}-npm-cache
             restore-keys: |
               ${{ runner.OS }}-npm-cache
         - name: Install Dependencies
           run: npm install
         - name: Build
           run: npm run build
         - name: Upload Pages artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: ./public
     deploy:
       needs: build
       permissions:
         pages: write
         id-token: write
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
   ```

4. 部署完成后，访问 `username.github.io` 查看您的博客。

**注意**：如果您使用了自定义域名并配置了 CNAME 文件，请将 CNAME 文件添加到 `source/` 文件夹中。更多信息请参考 [相关文档](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)。

---

## 项目页面部署

如果您希望将博客部署为项目页面（而非用户页面），请按以下步骤操作：

1. 在 GitHub 仓库的设置中，更改仓库名称，使博客可通过 `username.github.io/repository` 访问，其中 `repository` 可以是任意名称，例如 `blog` 或 `hexo`。
2. 编辑 `_config.yml`，将 `url:` 的值更改为 `https://username.github.io/repository`。
3. 在 GitHub 仓库的设置中，导航到 `Settings > Pages > Source`，将源更改为 `GitHub Actions` 并保存。
4. 提交并推送到默认分支。
5. 部署完成后，访问 `username.github.io/repository` 查看您的博客。

---

## 一键部署

以下内容改编自 [一键部署页面](https://hexo.io/docs/one-command-deployment)。

1. 安装 `hexo-deployer-git`：

   ```bash
   npm install hexo-deployer-git --save
   ```

2. 在 `_config.yml` 中添加以下配置（如果已有相关配置，请删除）：

   ```yaml
   deploy:
     type: git
     repo: https://github.com/<username>/<project>
     # 示例：https://github.com/hexojs/hexojs.github.io
     branch: gh-pages
   ```

3. 运行以下命令：

   ```bash
   hexo clean && hexo deploy
   ```

4. 访问 `username.github.io` 查看您的博客。

---

通过以上步骤，您可以轻松将 Hexo 博客部署到 GitHub Pages，并享受免费的静态网站托管服务。
