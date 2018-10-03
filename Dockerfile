FROM node:9

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
# RUN npm install --only=production

RUN npm install --save sequelize

COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]
