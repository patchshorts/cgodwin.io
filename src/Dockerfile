FROM node:16-alpine
WORKDIR /app
ADD src/* ./
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build .
COPY toys .vuepress/dist/toys
CMD ["http-server", ".vuepress/dist"]
EXPOSE 8080
