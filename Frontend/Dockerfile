# FROM node:18.17.1

# LABEL version="1.0"
# LABEL description="This is the base docker frontend react app."
# LABEL maintainer = ["dhruvdarji145@gmail.com"]

# WORKDIR /app

# COPY ["package.json", "package-lock.json", "babel.confing.js", "babel-plugin-macros.confing.js", "tailwind.config.js", "./"]

# RUN npm install

# RUN npx babel --clear-cache

# COPY . .

# EXPOSE 3000

# CMD ["npm", "start"]
# Use an official Node.js runtime as the base image
FROM node:18.17.1

LABEL version="1.0"
LABEL description="This is the base Docker image for a frontend React app."
LABEL maintainer="dhruvdarji145@gmail.com"

# Set the working directory inside the container
WORKDIR /app

# Copy package.json, package-lock.json, and other relevant files to the working directory
COPY package*.json babel.config.js babel-plugin-macros.config.js tailwind.config.js ./

# Install app dependencies
RUN npm install

# Clear the Babel cache
RUN npx babel --clear-cache

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port the app will run on
EXPOSE 3000

# Define the command to run when the container starts
CMD ["npm", "start"]
