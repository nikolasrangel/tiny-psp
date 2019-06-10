FROM node:10.16.0

WORKDIR /app

COPY . /app

RUN npm install

EXPOSE 3000