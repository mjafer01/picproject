# Use node:18 as the base image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json ./

# Remove existing node_modules
RUN rm -rf node_modules

# Install dependencies
RUN yarn install --legacy-peer-deps

# Copy the rest of the application code
COPY . ./


