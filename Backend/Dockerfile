FROM node:18.17.1

LABEL version="1.0"
LABEL description="This is the base docker backend API."
LABEL maintainer = ["dhruvdarji145@gmail.com"]

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]
RUN ls
RUN npm install --production
COPY . .

EXPOSE 5000

CMD ["npm", "start"]