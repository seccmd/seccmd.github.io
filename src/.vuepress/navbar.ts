import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "🛡️明剑安全",
    prefix: "/sec/",
    link: "/sec/",
  },
  "/tld/",
  {
    text: "⚔️ATT&CK 中文版",
    link: "https://www.seccmd.net/Attack_CN/",
  },
/*
  {
    text: "指南",
    icon: "lightbulb",
    prefix: "/guide/",
    children: [
      {
        text: "V2 文档",
        icon: "book",
        link: "https://theme-hope.vuejs.press/zh/",
      },
      "/",
      "/portfolio",
      "/demo/",
      {
        text: "Bar",
        icon: "lightbulb",
        prefix: "bar/",
        children: ["baz", { text: "...", icon: "ellipsis", link: "" }],
      },
      {
        text: "Foo",
        icon: "lightbulb",
        prefix: "foo/",
        children: ["ray", { text: "...", icon: "ellipsis", link: "" }],
      },
    ],
  },
*/
]);
