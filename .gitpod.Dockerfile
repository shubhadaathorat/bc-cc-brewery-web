FROM node:16.19.1 

WORKDIR /workspace/my-project

COPY . .

RUN npm install -g nodemon

EXPOSE 4200
