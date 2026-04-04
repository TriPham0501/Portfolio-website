FROM node:10.13-alpine
ENV NODE_ENV production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install -g webpack-dev-server webpack-cli webpack
RUN npm install --production --silent
COPY . /app
EXPOSE 3000
CMD npm start