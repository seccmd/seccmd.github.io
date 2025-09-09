import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/": [
    "",
  ],
  "/test": [
    "",
    "portfolio",
    {
      text: "案例",
      icon: "laptop-code",
      prefix: "demo/",
      link: "demo/",
      children: "structure",
    },
    {
      text: "文档",
      icon: "book",
      prefix: "guide/",
      children: "structure",
    },
    {
      text: "幻灯片",
      icon: "person-chalkboard",
      link: "https://ecosystem.vuejs.press/zh/plugins/markdown/revealjs/demo.html",
    },
  ],
  "/sec/": [
    {
      text: "明剑安全",
      icon: "shield",
      link: "/sec/",
      children: "structure",
    },
  ],
  "/tld/": [
    {
      text: "明剑知识库",
      icon: "book",
      link: "/tld/",
      children: "structure",
    },
  ],
});
