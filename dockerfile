# Use the official Node.js image as a base
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on
EXPOSE 4000

RUN npm run build
# RUN npx knex migrate:latest

# Command to run your application
CMD ["npm", "run", "start"] 
