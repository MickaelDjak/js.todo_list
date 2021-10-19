FROM node:13.12.0-alpine

ENV MONGO_DB_USERNAME=admin

ENV MONGO_DB_PASSWORD=rootpass

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .
