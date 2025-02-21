FROM node:18-alpine as base
RUN apk add --no-cache g++ make py3-pip libc6-compat
WORKDIR /app
COPY package*.json yarn.lock ./
EXPOSE 3000

FROM base as builder
WORKDIR /app
COPY . .
RUN yarn install --immutable
RUN yarn build

FROM base as production
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder . .
#RUN addgroup -g 1001 -S nodejs
#RUN adduser -S nextjs -u 1001
#USER nextjs
CMD yarn start
