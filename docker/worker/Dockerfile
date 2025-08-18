FROM node:24 as base

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    chromium \
    && rm -rf /var/lib/apt/lists/*

# RUN apt-get update && apt-get install curl gnupg -y \
#   && curl --location --silent https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
#   && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
#   && apt-get update \
#   && apt-get install google-chrome-stable -y --no-install-recommends \
#   && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
ENV BROWSER_PATH='/usr/bin/chromium'

COPY --chown=node:node . .

FROM base as dev

RUN npm i -g ts-node
RUN npm install --force

RUN npx prisma generate

CMD [ "npm", "run", "dev" ]

FROM base as prod

# ENV BROWSER_PATH='/usr/bin/chromium'

RUN npm install --force

# RUN wget -q --show-progress 'https://playwright.azureedge.net/builds/chromium/1151/chromium-linux-arm64.zip' -O chromium-linux-arm64.zip
# RUN unzip -o chromium-linux-arm64.zip
# RUN rm -f ./chromium-linux-arm64.zip
# RUN mv ./chromium-linux-arm64/chrome-linux64/chrome /usr/bin/chromium

RUN npm run build

RUN npx prisma generate

CMD ["npm", "run", "start"]