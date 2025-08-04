FROM node:24-alpine as dev

WORKDIR /home/node

COPY --chown=node:node package*.json ./
RUN npm i
RUN npm i -g tsc
RUN npm i -g ts-node

COPY --chown=node:node . .

CMD [ "npm", "run", "dev" ]