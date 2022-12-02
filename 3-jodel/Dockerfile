FROM node:19-alpine

WORKDIR /opt/app/ui
COPY ui/ .
RUN rm -rf build
RUN npm install
RUN npm run build

WORKDIR /opt/app/api
COPY api/ .
RUN cp -r ../ui/build .
RUN npm install
RUN npm run build-ts

EXPOSE 5000

CMD npm start
