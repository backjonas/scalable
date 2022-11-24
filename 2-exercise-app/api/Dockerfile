FROM node:14-alpine

WORKDIR /opt/app
COPY ui ./ui
COPY api/ ./api

WORKDIR /opt/app/api
RUN npm run build:ui
RUN npm install
RUN npm run build-ts

EXPOSE 5000

CMD npm start
