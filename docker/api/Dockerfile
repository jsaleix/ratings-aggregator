FROM node:24-alpine as dev

WORKDIR /app

COPY --chown=node:node . .

RUN npm i -g @nestjs/cli
RUN npm i
# RUN npx prisma migrate deploy 
RUN npx prisma generate

EXPOSE 3000

# CMD ["npx", "prisma", "generate"]
CMD [ "npm", "run", "dev" ]