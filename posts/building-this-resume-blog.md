---
icon: edit
date: 2022-07-13
category:
  - Technology
tag:
  - software development
  - jam-stack
---

# Building this site

## Blog Aware Static Site Generator(SSG)

The decisions I made about the tech behind this site were equally about
 learning, ease, quickness, git ops, use of git pages, and static site
 generation.

I wanted all that in a single page application with the ability to make calls,
 pull data and display it. So I fuddled around with a few things before landing
 on [vuepress](https://vuepress.vuejs.org/).

I've been using it for other projects and if the number of pages you have are
 below 500, vuepress is an excellent medium. I use
 [vuepress-theme-hope](https://vuepress-theme-hope.github.io/) which is resource
 intensive on build but comes with a feature set that includes almost anything I
 wan't to do.

Other options visted were [Docc](https://docc-theme.netlify.app/docs/),
 [Docusaurus](https://docusaurus.io/),
 [Eleventy](https://www.11ty.dev/)(*Good for 1000s of pages*) and
 [Jekyll](https://jekyllrb.com/).

More information on these SSGs can be found at [Jam Stack](http://jamstack.org).

## Containerization

I can build a container around the resulting static-site directly from node with
something similar to the following

```Dockerfile
FROM node:16-alpine
WORKDIR /app
COPY . .
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build .
CMD ["http-server", ".vuepress/dist"]
EXPOSE 8080
```

And right after I typed this, I went ahead and did it with the following
docker-compose.yaml:

```yaml
version: "3.9"  # optional since v1.27.0
services:
  web:
    build: .
    ports:
      - "5000:8080"
```