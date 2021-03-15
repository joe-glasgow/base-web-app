# specify the node base image with your desired version node:<version>
FROM node:14-alpine
RUN npm install pm2 -g
# replace this with your application's default port
COPY . /app
EXPOSE 8500
