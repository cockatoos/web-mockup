FROM node:14

WORKDIR /workarea

COPY package.json ./
RUN npm install
