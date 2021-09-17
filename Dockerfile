FROM node:12-alpine AS app-base
WORKDIR .
COPY package.json yarn.lock tsconfig.json lerna.json ./
COPY packages ./packages
RUN yarn
RUN yarn build

EXPOSE 3000
CMD yarn workspace @xiaokyo/enterprise-message-server start