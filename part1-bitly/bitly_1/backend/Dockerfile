FROM node:14-alpine
WORKDIR /opt/app
COPY . ./
RUN npm install && npm run build-ts

EXPOSE 5000

CMD npm start
