
FROM node:latest

WORKDIR /usr/src/app/

COPY ./assessmentAngular/package*.json ./

RUN npm install -g @angular/cli @angular-devkit/build-angular && npm install

COPY ./assessmentAngular/. .

EXPOSE 4201

CMD ["npm", "start"]
