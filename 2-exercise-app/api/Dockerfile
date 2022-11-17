FROM node:14-alpine

RUN apk add --update docker openrc

WORKDIR /opt/app
# COPY frontend ./frontend
COPY / ./

# WORKDIR /opt/app/backend
# RUN npm run build:ui
RUN docker build -t grader-image grader-image
RUN npm install
RUN npm run build-ts

EXPOSE 5000

CMD npm start
