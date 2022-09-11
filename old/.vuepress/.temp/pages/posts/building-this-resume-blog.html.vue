<template><div><h1 id="building-this-site" tabindex="-1"><a class="header-anchor" href="#building-this-site" aria-hidden="true">#</a> Building this site</h1>
<h2 id="blog-aware-static-site-generator-ssg" tabindex="-1"><a class="header-anchor" href="#blog-aware-static-site-generator-ssg" aria-hidden="true">#</a> Blog Aware Static Site Generator(SSG)</h2>
<p>The decisions I made about the tech behind this site were equally about
learning, ease, quickness, git ops, use of git pages, and static site
generation.</p>
<p>I wanted all that in a single page application with the ability to make calls,
pull data and display it. So I fuddled around with a few things before landing
on <a href="https://vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">vuepress<ExternalLinkIcon/></a>.</p>
<p>I've been using it for other projects and if the number of pages you have are
below 500, vuepress is an excellent medium. I use
<a href="https://vuepress-theme-hope.github.io/" target="_blank" rel="noopener noreferrer">vuepress-theme-hope<ExternalLinkIcon/></a> which is resource
intensive on build but comes with a feature set that includes almost anything I
wan't to do.</p>
<p>Other options visted were <a href="https://docc-theme.netlify.app/docs/" target="_blank" rel="noopener noreferrer">Docc<ExternalLinkIcon/></a>,
<a href="https://docusaurus.io/" target="_blank" rel="noopener noreferrer">Docusaurus<ExternalLinkIcon/></a>,
<a href="https://www.11ty.dev/" target="_blank" rel="noopener noreferrer">Eleventy<ExternalLinkIcon/></a>(<em>Good for 1000s of pages</em>) and
<a href="https://jekyllrb.com/" target="_blank" rel="noopener noreferrer">Jekyll<ExternalLinkIcon/></a>.</p>
<p>More information on these SSGs can be found at <a href="http://jamstack.org" target="_blank" rel="noopener noreferrer">Jam Stack<ExternalLinkIcon/></a>.</p>
<h2 id="containerization" tabindex="-1"><a class="header-anchor" href="#containerization" aria-hidden="true">#</a> Containerization</h2>
<p>I can build a container around the resulting static-site directly from node with
something similar to the following</p>
<div class="language-Dockerfile ext-Dockerfile line-numbers-mode"><pre v-pre class="language-Dockerfile"><code>FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build .
CMD [&quot;http-server&quot;, &quot;.vuepress/dist&quot;]
EXPOSE 8080
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>And right after I typed this, I went ahead and did it with the following
docker-compose.yaml:</p>
<div class="language-yaml ext-yml line-numbers-mode"><pre v-pre class="language-yaml"><code><span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">"3.9"</span>  <span class="token comment"># optional since v1.27.0</span>
<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token key atrule">web</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span> .
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token string">"5000:8080"</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


