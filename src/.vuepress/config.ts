import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "明剑实验室",
  description: "十年一剑，耐心坚持，做长期正确的事。慢稳急躁，张弛有度，忍住不做短期错误的事。",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
