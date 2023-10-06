# ---- Build Stage ----
FROM node:16-alpine AS build
# Set working directory
WORKDIR /app
# Copy source code to working directory
ADD src /app
# Install http-server globally
RUN yarn global add http-server
# Install dependencies
RUN yarn install --production
# Build the project
RUN ./node_modules/.bin/vuepress build . --clean-cache
# Copy toys directory and download & extract os.tar.gz
COPY toys .vuepress/dist/toys
RUN cd .vuepress/dist/toys/ && \
    wget https://github.com/patchshorts/cgodwin.io/raw/develop/toys/os.tar.gz -O os.tar.gz && \
    tar -xzvf os.tar.gz && \
    find . && \
    cd ../../../

# ---- Serve Stage ----
FROM nginx:alpine
ENV PORT=8080
ENV NGINX_PORT=${PORT:-8080}
ENV NGINX_HOST=cgodwin.io
# Set working directory
WORKDIR /usr/share/nginx/html
# Copy built files from build stage to serve stage
COPY --from=build /app/.vuepress/dist .
RUN mkdir -p /etc/nginx/templates && \
    echo "server {" > /etc/nginx/templates/default.conf.template && \
    echo "    listen       \${PORT};" >> /etc/nginx/templates/default.conf.template && \
    echo "    location / {" >> /etc/nginx/templates/default.conf.template && \
    echo "        root /usr/share/nginx/html;" >> /etc/nginx/templates/default.conf.template && \
    echo "        index index.html;" >> /etc/nginx/templates/default.conf.template && \
    echo "        try_files \$uri \$uri/ /index.html;" >> /etc/nginx/templates/default.conf.template && \
    echo "    }" >> /etc/nginx/templates/default.conf.template && \
    echo "}" >> /etc/nginx/templates/default.conf.template
# Expose the specified port
EXPOSE ${PORT}
# The default command will run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
