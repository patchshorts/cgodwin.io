FROM node:16-alpine
ADD src /app
WORKDIR /app
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build . --clean-cache
COPY toys .vuepress/dist/toys
RUN cd .vuepress/dist/toys/;tar -xzvf os.tar.gz;cd ../../../
CMD ["http-server", ".vuepress/dist"]
EXPOSE 8080
