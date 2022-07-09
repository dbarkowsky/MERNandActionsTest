# Get base image
FROM node:17.9.1-alpine3.15

# Install/Update Node
RUN apk add --update nodejs
RUN apk add --update npm

# Create directory for React
WORKDIR /usr/src/client

# Copy package.json over
COPY package*.json ./

# Copy other files to container, current dir (project) to current dir (container)
COPY . .

# Install node_modules
RUN npm ci

EXPOSE 3000

#Start frontend service
CMD [ "npm", "run", "start" ]