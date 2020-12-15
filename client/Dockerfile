FROM node:15.4.0-alpine3.12

RUN npm install -g serve

ADD build /app

CMD serve -s /app
