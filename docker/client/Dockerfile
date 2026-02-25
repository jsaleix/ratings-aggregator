FROM node:24-alpine as base

WORKDIR /app

RUN npm install -g pnpm

COPY --chown=node:node ./package.json ./pnpm-lock.yaml ./

RUN pnpm install

COPY --chown=node:node . .

FROM base as dev

CMD ["pnpm", "run", "dev", "--host"]

EXPOSE 5173

FROM base as prod

RUN pnpm run build
CMD ["pnpm", "run", "preview"]

EXPOSE 4173