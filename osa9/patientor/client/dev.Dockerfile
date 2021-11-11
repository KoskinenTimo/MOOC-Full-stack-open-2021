FROM node:16

WORKDIR /home/node/app

COPY package*.json ./

RUN npm i

RUN npm update chokidar

COPY . .
