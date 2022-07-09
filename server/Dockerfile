# Get base image
FROM node:17.9.1-alpine3.15

# Install/Update Node
RUN apk add --update nodejs
RUN apk add --update npm

# Create directory for API
WORKDIR /usr/src/server

# Copy package.json over
COPY package*.json ./

# Copy other files to container, current dir (project) to current dir (container)
COPY . .

# Install node_modules
RUN npm ci



# Get environment variables as argument
ARG env
# ARG ATLAS_URI=""
# ARG PORT

# # Copy variable file
COPY $env .
# ENV ATLAS_URI=${ATLAS_URI}
# ENV PORT=${PORT}

EXPOSE 5000

#Start API service
CMD [ "npm", "run", "start" ]
