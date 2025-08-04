FROM node:23 as dev

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node . .

RUN npm i -g ts-node
RUN npm install --force

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]