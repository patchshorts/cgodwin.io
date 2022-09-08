import { defineUserConfig } from "vuepress";
import theme from "./theme";

export default defineUserConfig({
  lang: "en-US",
  title: "CGodwin",
  description: "A demo for vuepress-theme-hope",

  pagePatterns: ['**/*.md', '**/*.vue', '!toys/**/*'],

  base: "/",
  theme,
});
