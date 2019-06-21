FROM ubuntu:18.04
MAINTAINER Tim Koepsel

EXPOSE 2250

RUN apt-get update && apt-get install vim -q -y && \
apt-get install vim -q -y && \
apt-get install curl -q -y && \
apt-get install lsof -q -y && \
apt-get install nodejs -q -y

WORKDIR /api

ADD dist /api
ADD node_modules /node_modules

RUN apt-get install npm -q -y && npm install -g pm2

ENTRYPOINT pm2 start index.js && bash