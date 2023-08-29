FROM node:alpine3.17

EXPOSE 8000
RUN mkdir -p /app
COPY package.json /app
COPY yarn.lock /app
WORKDIR /app
RUN yarn

COPY . /app/
CMD ["yarn", "dev"]