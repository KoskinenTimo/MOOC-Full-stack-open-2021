FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm install -g nodemon

EXPOSE 3003

CMD ["npm", "run", "dev"]