FROM node:latest

WORKDIR /app

COPY . /app

COPY .dockerignore /app

RUN npm install

RUN npm run build

CMD [ "npm","run","start" ]
