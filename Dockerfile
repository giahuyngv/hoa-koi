FROM node:20-alpine

RUN apk update && apk upgrade --no-cache && \
    rm -rf /usr/local/lib/node_modules \
           /usr/local/bin/npm \
           /usr/local/bin/npx \
           /usr/local/bin/corepack \
           /opt/yarn* \
           /root/.npm \
           /tmp/* \
           /var/cache/apk/*

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=80

COPY package.json server.js index.html ./
COPY src ./src
COPY public ./public
COPY data ./data

RUN mkdir -p /app/data && chown -R node:node /app && chmod 750 /app/data

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/api/health || exit 1

CMD ["node", "server.js"]
