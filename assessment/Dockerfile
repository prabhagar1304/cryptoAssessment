FROM node:latest
RUN mkdir -p app
WORKDIR /app
COPY ./assessment/package.json /app
RUN npm install
COPY ./assessment/. /app
EXPOSE 8080
CMD ["npm","run","start"]
