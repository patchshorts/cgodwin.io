import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  lang: "en-US",
  title: "Chris's Resume",
  description: "A Resume for Christopher Shaun Godwin",

  base: "/",

  theme,
});
