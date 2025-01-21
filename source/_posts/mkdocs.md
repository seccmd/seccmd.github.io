---
date: 2025-01-21
title: MkDocs 配置谷歌统计和谷歌广告
authors: [SecAdmin]
description: >
  MkDocs 如何配置 Google Analytics & Google AdSense
categories: 基础工具
tags:
  - Wiki
---

# MkDocs

## 配置 Google Analytics

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


## 配置 Google AdSense

打开谷歌广告网站：https://www.google.com/adsense/

点选【广告】-> 点击【获取代码】-> 完成


### 使用 extra_javascript 配置

可以在 mkdocs.yml 文件中使用 extra_javascript 配置来引入 Google AdSense 脚本。

在你的 mkdocs.yml 中添加以下配置：

```
extra_javascript:
  - https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxxxxxxxxx
```


### 使用base文件配置

```
1. 定位 base.html 文件

cd /usr/local/lib/python3.x/site-packages/mkdocs/themes/mkdocs

2. 编辑 base.html 文件
使用文本编辑器（如 vi 或 nano）打开并编辑 base.html 文件。

vi base.html

在 base.html 文件中找到 <head> 或 <body> 标签的位置，然后插入 Google AdSense 代码。

建议将 Google AdSense 脚本代码放在 {% block site_meta %} 块内合适的位置。

{% block site_meta %}
  <!-- 之前的 meta 标签内容 -->
  <!-- Google AdSense Code -->
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxx"
    crossorigin="anonymous"></script>
{% endblock %}

3. 重新构建并部署

保存文件后，使用 mkdocs build 重新构建你的站点，这样 Adsense 代码将被包含在你所有页面的 <head> 部分中。

如果你不想修改 base.html 文件，可以通过 MkDocs 配置或 extra_javascript 来引入 Google AdSense 的广告脚本。
```

### 在文档中直接嵌入广告代码

如果只想在特定页面显示广告，直接在 .md 文件中插入 AdSense 代码。

可以使用以下方式在文档中嵌入广告：

```
<!-- Google AdSense Code -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-xxxx"
  crossorigin="anonymous"></script>

<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-7114121088728794"
     data-ad-slot="YOUR_AD_SLOT"
     data-ad-format="auto"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```