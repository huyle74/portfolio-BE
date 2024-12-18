# Use Node.js as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the application files
COPY . .        

# Build the application
RUN npm run build

# Expose the application port
EXPOSE 8080

# Start the application
CMD ["npm", "run", "start:prod"]
