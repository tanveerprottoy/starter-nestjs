FROM node:lts-alpine as build

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i

COPY . .

RUN npm run build

FROM node:lts-alpine as prod

# static
ENV NODE_ENV prod

# dynamic
# ARG NODE_ENV
# ENV NODE_ENV $NODE_ENV

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i --only=prod

COPY . .

COPY --from=build /usr/src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/main"]