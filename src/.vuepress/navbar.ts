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
    text: "Toy box",
    icon: "style",
    link: "/toybox",
  }
]);
