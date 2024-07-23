# Use the Node.js image with your version
FROM node:20.11.1-alpine AS builder

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire app to the container
COPY . .

# Expose the port the app runs on
EXPOSE 3001

# Start the app
CMD ["npm", "run", "start"]