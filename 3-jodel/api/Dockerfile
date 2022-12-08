FROM node:19-alpine

WORKDIR /opt/app
COPY . .
RUN npm install
RUN npm run build-ts

EXPOSE 5000

CMD npm start
