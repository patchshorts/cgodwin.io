import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "en-US",
  title: "CGodwin",
  description: "A Resume for Christopher Shaun Godwin",

  base: "/",

  theme,
});
