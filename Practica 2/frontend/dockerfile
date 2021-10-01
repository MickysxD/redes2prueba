FROM nginx:latest

WORKDIR /usr/share/nginx/html

COPY ./dist/frontend .

COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


#FROM node:14

#RUN mkdir -p /usr/src/app

#WORKDIR /usr/src/app

#COPY package.json ./

#RUN npm install
#COPY . .

#EXPOSE 4200

#CMD npm start