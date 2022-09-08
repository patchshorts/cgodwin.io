FROM node:16-alpine
WORKDIR /app
ADD src/* ./
ADD src/.vuepress ./
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build .
COPY toys .vuepress/dist/toys
CMD ["http-server", ".vuepress/dist"]
EXPOSE 8080
