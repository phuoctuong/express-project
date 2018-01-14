FROM node:6.11.5

RUN mkdir -p /express-project
WORKDIR /express-project

COPY . /express-project

RUN npm install
CMD ["chmod", "+x", "./wait-for-it.sh"]

EXPOSE 8080