import { reveal, revealMarkdown, revealHighlight, revealMath, revealSearch, revealNotes, revealZoom } from "/home/cgodwin/code/cgodwin-io-github/new/node_modules/.pnpm/vuepress-plugin-md-enhance@2.0.0-beta.97/node_modules/vuepress-plugin-md-enhance/lib/client/reveal";

export const useReveal = () => [reveal(), revealMarkdown(), revealHighlight(), revealMath(), revealSearch(), revealNotes(), revealZoom()
];