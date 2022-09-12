import { sidebar } from "vuepress-theme-hope";

export default sidebar([
  "/",
  {
    text: "Blog Home",
    icon: "blog",
    link: "/posts/",
  },
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
    link: "/toybox",
  }
]);
