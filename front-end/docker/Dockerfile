FROM node:18.16.0-alpine3.17 As development

RUN npm install -g @angular/cli@15.0.1

WORKDIR /home/uca_user/user-app

COPY ./user-app/*.json ./

RUN npm install 

COPY . .