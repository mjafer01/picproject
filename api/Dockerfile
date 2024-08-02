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

# Install sqlite3 CLI tool
RUN apt-get update && apt-get install -y sqlite3

# Copy the rest of the application code
COPY . ./

# Copy SQL initialization file and custom script
COPY ./initialize/init.sql ./
COPY ./initialize/check-and-init.sh ./
RUN chmod +x check-and-init.sh

# Run the custom script to initialize the database
RUN ./check-and-init.sh

# Command to run the application
CMD ["yarn", "start:dev"]
