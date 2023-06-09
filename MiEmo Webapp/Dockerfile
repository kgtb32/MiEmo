FROM node:alpine3.17 AS builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
COPY yarn.lock /app
RUN yarn
COPY . .
RUN yarn build --mode=prod

FROM nginx:mainline-alpine3.17-slim
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/dist . 
EXPOSE 80
ENTRYPOINT ["nginx", "-g", "daemon off;"]