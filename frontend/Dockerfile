FROM node:latest

#create app directory
WORKDIR /usr/src/app

#install app dependencies
COPY package*.json ./
RUN npm install

#copy source
COPY . .

CMD ["npm","run","start"]