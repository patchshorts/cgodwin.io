import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Timeline",
    icon: "time",
    link: "/timeline/",
  },
  {
    text: "Resume",
    icon: "read",
    link: "/resume",
  },
  {
    text: "Toybox",
    icon: "style",
    link: "/toys",
  }
]);
