FROM node:18.17.0

LABEL version="1.0"

LABEL maintainer = ["dhruvdarji145@gmail.com"]

WORKDIR '/app'

COPY package.json .

RUN npm install 

COPY . .

CMD ["npm", "start"]