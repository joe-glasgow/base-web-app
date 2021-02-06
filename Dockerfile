# specify the node base image with your desired version node:<version>
FROM node:14-alpine
# replace this with your application's default port
COPY . /app
EXPOSE 8500
