FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY . .
RUN yarn install --immutable
RUN yarn build
EXPOSE 3000
CMD yarn start
