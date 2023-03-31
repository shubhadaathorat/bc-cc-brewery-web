FROM node:16.19.1 
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
RUN npm install -g @angular/cli@13.1.0 
COPY . .
CMD npm run start-local
#RUN npm run start-local
