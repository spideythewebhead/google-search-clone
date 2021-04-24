FROM node:15.12.0-alpine3.13

RUN apk add git

USER node

RUN mkdir -p /home/node/app && \
  mkdir ~/.npm-global && \
  npm config set prefix '~/.npm-global' && \
  export PATH=~/.npm-global/bin:$PATH && \
  npm install -g npm && \
  npm install -g yarn

WORKDIR /home/node/app

COPY ./package*.json ./

RUN yarn install