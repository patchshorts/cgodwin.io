import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://cgodwin.io/",

  author: {
    name: "Christopher Godwin",
    url: "https://cgodwin.io",
  },

  iconAssets: "iconfont",

  logo: "/logo.svg",

  repo: "patchshorts/cgodwin.io",

  docsDir: "src",

  // navbar
  navbar: navbar,

  // sidebar
  sidebar: sidebar,

  copyright: "Copyright &copy; 2022, Christopher Godwin",

  footer: "“I know you're tired but come, this is the way.“ - Rumi",

  displayFooter: true,

  pageInfo: ["Author", "Original", "Date", "Category", "Tag", "ReadingTime"],

  blog: {
    description: "Manager, Cloud Architect, Developer, and Writer",
    intro: "/intro.html",
    medias: {
      GitHub: "https://github.com/patchshorts",
      Gitlab: "https://gitlab.com/patchshorts",
      Linkedin: "https://linkedin.com/in/chrissgodwin",
    },
  },

  encrypt: {
    config: {
      "/guide/encrypt.html": ["1234"],
    },
  },

  plugins: {
    blog: {
      autoExcerpt: true,
    },

    // If you don't need comment feature, you can remove following option
    // The following config is for demo ONLY, if you need comment feature, please generate and use your own config, see comment plugin documentation for details.
    // To avoid disturbing the theme developer and consuming his resources, please DO NOT use the following config directly in your production environment!!!!!
    comment: {
      /**
       * Using Giscus
       */
      // provider: "Giscus",
      // repo: "vuepress-theme-hope/giscus-discussions",
      // repoId: "R_kgDOG_Pt2A",
      // category: "Announcements",
      // categoryId: "DIC_kwDOG_Pt2M4COD69",

      /**
       * Using Twikoo
       */
      // provider: "Twikoo",
      // envId: "https://twikoo.ccknbc.vercel.app",

      /**
       * Using Waline
       */
      // provider: "Waline",
      // serverURL: "https://vuepress-theme-hope-comment.vercel.app",
    },

    mdEnhance: {
      enableAll: true,
      presentation: {
        plugins: ["highlight", "math", "search", "notes", "zoom"],
      },
    },
  },
});
