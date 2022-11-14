FROM node:14-alpine

WORKDIR /opt/app
# COPY frontend ./frontend
COPY / ./

WORKDIR /opt/app/backend
# RUN npm run build:ui
RUN npm install
RUN npm run build-ts

EXPOSE 5000

CMD npm start
