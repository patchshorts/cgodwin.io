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
# Set working directory
WORKDIR /usr/share/nginx/html
# Copy built files from build stage to serve stage
COPY --from=build /app/.vuepress/dist .
# Expose port 80 for Nginx
EXPOSE 80
# The default command will run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
