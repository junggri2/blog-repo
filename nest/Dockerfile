FROM node:14-alpine
WORKDIR .
COPY ./package*.json ./

RUN npm install
RUN npm install -g pm2
COPY . .
CMD ["npm","run","start:prod"]