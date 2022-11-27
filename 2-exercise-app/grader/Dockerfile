FROM docker:dind

RUN apk update
RUN apk add npm
# RUN service docker start
# RUN service docker status 

WORKDIR /opt/app
COPY . ./

# RUN docker build -t grader-image grader-image
RUN npm install
RUN npm run build-ts

EXPOSE 9001

# Sleep to wait for docker to start
ENTRYPOINT dockerd-entrypoint.sh & sleep 5 && exec npm start

# ENTRYPOINT ["dockerd-entrypoint.sh", "&"] 
# CMD ["sleep", "5", "&&", "exec", "npm", "start"]
# CMD dockerd-entrypoint.sh </dev/null &>/dev/null & sleep 5 && npm star