import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "明剑安全",
  description: "专注实战安全防护体系",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,
});
