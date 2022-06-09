# Get base image
FROM node:17.9.1-alpine3.15

# Install/Update Node
RUN apk add --update nodejs
RUN apk add --update npm

# Create directory for API
WORKDIR /usr/src/app

# Copy package.json over
COPY package.json ./

# Install node_modules
RUN npm install

# Copy other files to container, current dir (project) to current dir (container)
COPY . .

# Get environment variables as argument
ARG env
# ARG ATLAS_URI=""
# ARG PORT

# # Copy variable file
COPY $env ./config.env
# ENV ATLAS_URI=${ATLAS_URI}
# ENV PORT=${PORT}


#Start API service
CMD [ "npm start" ]
