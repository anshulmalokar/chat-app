FROM ubuntu:22.04

RUN apt-get update
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_20.x | bash -
RUN apt-get upgrade -y
RUN apt-get install -y nodejs

RUN apt-get install git -y

WORKDIR /home/app
COPY package.json package.json
COPY package-lock.json package-lock.json 
COPY tsconfig.json tsconfig.json
COPY .env .env
COPY src/ src/
COPY .dockerignore .dockerignore
COPY Dockerfile Dockerfile

RUN npm install
RUN npm install -g typescript

EXPOSE 3002

CMD ["npm","run","start"]