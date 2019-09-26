FROM node:12-alpine

RUN apk add openssl

WORKDIR /home/node/app

COPY package.json yarn.lock ./
RUN yarn
COPY . .

CMD sh -c 'yarn start:dev'
