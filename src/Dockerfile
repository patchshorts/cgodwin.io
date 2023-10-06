FROM node:16-alpine
ADD src /app
WORKDIR /app
RUN yarn global add http-server
RUN yarn install --production
RUN ./node_modules/.bin/vuepress build . --clean-cache
COPY toys .vuepress/dist/toys
RUN cd .vuepress/dist/toys/;wget https://github.com/patchshorts/cgodwin.io/raw/develop/toys/os.tar.gz -O os.tar.gz;tar -xzvf os.tar.gz;find .;cd ../../../
CMD ["http-server", ".vuepress/dist"]
EXPOSE 8080
