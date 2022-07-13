import { defineAsyncComponent } from 'vue'

export const layoutComponents = {
  "404": defineAsyncComponent(() => import("/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-theme-hope/lib/client/layouts/404.js")),
  "Layout": defineAsyncComponent(() => import("/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-theme-hope/lib/client/layouts/Layout.js")),
  "Slide": defineAsyncComponent(() => import("/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-theme-hope/lib/client/layouts/Slide.js")),
  "Blog": defineAsyncComponent(() => import("/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-theme-hope/lib/client/module/blog/layouts/Blog.js")),
}
