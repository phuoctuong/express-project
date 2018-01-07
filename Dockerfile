FROM ubuntu:14.04
FROM node:6.11.5

RUN mkdir -p /express-project
WORKDIR /express-project

COPY . /express-project

RUN npm install

EXPOSE 8080

CMD ["npm", "run", "dev"]