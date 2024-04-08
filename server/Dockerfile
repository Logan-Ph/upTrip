FROM node:20-alpine
FROM ghcr.io/puppeteer/puppeteer:22.6.3

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true \
    PUPPETEER_EXECUTABLE_PATH=/usr/bin/google-chrome-stable

WORKDIR /app

COPY package*.json ./

RUN npm ci
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]

