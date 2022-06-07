# Get base image
FROM node:17.9.1-alpine3.15

# Install/Update Node
RUN apk add --update nodejs
RUN apk add --update npm

# Create directory for API
WORKDIR /usr/mern-server

# Get environment variable file as argument
ARG env

# Copy file to container 
# COPY $env config.env

# Copy other files to container
COPY ./ ./

# Install node_modules
RUN npm ci

#Start API service
CMD [ "npm start" ]