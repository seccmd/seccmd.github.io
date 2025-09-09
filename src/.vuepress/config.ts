import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "明剑实验室",
  description: "十年一剑，耐心坚持，做长期正确的事。慢稳急躁，张弛有度，忍住不做短期错误的事。",

  theme,

  // 和 PWA 一起启用 - 重复缓存: Prefetch 和 PWA 都在做类似的事情——在后台下载并缓存资源。如果你同时启用它们，可能会导致资源被重复下载两次，浪费用户的网络流量和带宽。
  shouldPrefetch: false,
});
