# Get Base
FROM bp/node:8.4.0

RUN mkdir /app

WORKDIR /app

COPY ./package.json .

RUN npm install

COPY . .

EXPOSE 4500

RUN npm run build-client

CMD npm start
