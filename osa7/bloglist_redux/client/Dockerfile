FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN npm install

ENV REACT_APP_API_URL=http://localhost:8080/api

EXPOSE 3000

CMD ["npm", "start"]