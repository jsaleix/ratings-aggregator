FROM node:23 as base

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    && rm -rf /var/lib/apt/lists/*

COPY --chown=node:node . .

FROM base as dev

RUN npm i -g ts-node
RUN npm install --force

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]

FROM base as prod

RUN npm install --force
RUN npm run build

RUN npx prisma generate

CMD ["npm", "run", "start"]