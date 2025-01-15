FROM node:18-alpine as builder

WORKDIR /build
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn .yarn
RUN yarn set version 4.3.1
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:1.20.2-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /build/out /usr/share/nginx/html
