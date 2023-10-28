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
    components: {
      components: [
        "ArtPlayer",
        "AudioPlayer",
        "Badge",
        "CodePen",
        "FontIcon",
        "PDF",
        "Replit",
        "Share",
        "StackBlitz",
        "SiteInfo",
        "VideoPlayer",
        "YouTube"
      ],
    },
    blog: true,

    // install @waline/client before enabling it
    // WARNING: This is a test server for demo only.
    // You should create and use your own comment service in production.
    // comment: {
    //   provider: "Waline",
    //   serverURL: "https://waline-comment.vuejs.press",
    // },

    // all features are enabled for demo, only preserve features you need here
    mdEnhance: {
      align: true,
      attrs: true,
      card: true,

      // install chart.js before enabling it
      // chart: true,

      codetabs: true,
      demo: true,

      // install echarts before enabling it
      // echarts: true,

      figure: true,

      // install flowchart.ts before enabling it
      // flowchart: true,

      gfm: true,
      imgLazyload: true,
      imgSize: true,
      include: true,

      // install katex before enabling it
      // katex: true,

      // install mathjax-full before enabling it
      // mathjax: true,

      mark: true,

      // install mermaid before enabling it
      mermaid: true,

      playground: {
        presets: ["ts", "vue"],
      },

      // install reveal.js before enabling it
      // revealJs: {
      //   plugins: ["highlight", "math", "search", "notes", "zoom"],
      // },

      stylize: [
        {
          matcher: "Recommended",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Recommended",
              };
          },
        },
      ],
      sub: true,
      sup: true,
      tabs: true,
      vPre: true,

      // install @vue/repl before enabling it
      // vuePlayground: true,
    },
  },
});
