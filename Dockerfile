# Step 1: Use Node.js as the base image
FROM node:18-alpine

# Step 2: Set the working directory
WORKDIR /usr/src/app

# Step 3: Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Install NestJS CLI globally
RUN npm install -g @nestjs/cli

# Step 6: Copy the rest of the application code
COPY . .

# Step 7: Build the application
RUN npm run build

# Step 8: Expose the application port
EXPOSE 3000

# Step 9: Start the application
CMD ["npm", "run", "start:prod"]
