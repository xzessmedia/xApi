FROM ubuntu:18.04

RUN apt-get update && apt-get upgrade -q -y && \
apt-get install -q -y vim && \
apt-get install -q -y nodejs

RUN apt-get install -q -y npm && \
npm -g install npm@latest && \
npm -g install pm2



ADD dist /api
ADD node_modules /node_modules
WORKDIR /api

COPY ./docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT /docker-entrypoint.sh