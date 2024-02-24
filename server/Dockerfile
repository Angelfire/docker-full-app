FROM node:20.11.0-alpine

# set the working directory
WORKDIR /usr/src/app

# copy the package.json and package-lock.json
COPY package*.json ./

# install any needed packages
RUN npm ci

# copy the current directory contents into the container at WORKDIR
# COPY . .
COPY src/ ./src

CMD ["npm", "start"]
