FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

RUN npm update chokidar

COPY . .