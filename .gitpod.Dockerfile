FROM gitpod/workspace-full:latest

RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

WORKDIR /workspace/my-project

COPY . .

RUN npm install -g nodemon

EXPOSE 4200