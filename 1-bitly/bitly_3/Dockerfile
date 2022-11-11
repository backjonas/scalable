FROM node:14-alpine

WORKDIR /opt/app/frontend
COPY frontend .
RUN npm install
RUN npm run build

WORKDIR /opt/app/backend
COPY backend .
RUN cp -r ../frontend/build .
RUN apk update
RUN apk add build-base libc-dev linux-headers zlib-dev jpeg-dev libjpeg g++ make python3 py3-pip
RUN pip install -r requirements.txt

EXPOSE 5000

CMD ["flask", "run", "--host=0.0.0.0"]