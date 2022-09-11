import { useStyleTag } from "/home/cgodwin/code/cgodwin-io-github/src/node_modules/vuepress-plugin-components/lib/client/composables/index.js";
import { h } from "vue";
import { defineClientConfig } from "@vuepress/client";
import Badge from "/home/cgodwin/code/cgodwin-io-github/src/node_modules/vuepress-plugin-components/lib/client/components/Badge";
import FontIcon from "/home/cgodwin/code/cgodwin-io-github/src/node_modules/vuepress-plugin-components/lib/client/components/FontIcon";
import BackToTop from "/home/cgodwin/code/cgodwin-io-github/src/node_modules/vuepress-plugin-components/lib/client/components/BackToTop";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("Badge", Badge);
    app.component("FontIcon", FontIcon);
    
  },
  setup: () => {
    useStyleTag(`@import url("//at.alicdn.com/t/font_2410206_a0xb9hku9iu.css");`, { id: "icon-assets" });
    
  },
  rootComponents: [
    () => h(BackToTop, { threshold: 300 }),
    
  ],
});