import { defineClientConfig } from "@vuepress/client";
import ChartJS from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/ChartJS";
import ECharts from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/ECharts";
import CodeDemo from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeDemo";
import CodeTabs from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/CodeTabs";
import FlowChart from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/FlowChart";
import Mermaid from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/Mermaid";
import Presentation from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/Presentation";
import "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/styles/container/index.scss";
import "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/styles/footnote.scss";
import "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/styles/image-mark.scss";
import Tabs from "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/components/Tabs";
import "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tasklist.scss";
import "/mnt/d/Users/Chris Godwin/code/cgodwin-io-github/node_modules/vuepress-plugin-md-enhance/lib/client/styles/tex.scss";


export default defineClientConfig({
  enhance: ({ app }) => {
    app.component("ChartJS", ChartJS);
    app.component("ECharts", ECharts);
    app.component("CodeDemo", CodeDemo);
    app.component("CodeTabs", CodeTabs);
    app.component("FlowChart", FlowChart);
    app.component("Mermaid", Mermaid);
    app.component("Presentation", Presentation);
    app.component("Tabs", Tabs);
    
  }
});