# Using the official 
FROM node:22

WORKDIR /usr/src/app

# Copying package.json and package-lock.json and installing dependencies
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copy the app source code and build the app
COPY . .
RUN npm run build

# Expose the port the app runs on
# The default port for NestJS applications is 3000
EXPOSE 3000

# Start the application
# The entry point for the application can be "dist/main.js" or "dist/src/main.js"
# depending if you have other code outside the src folder
CMD ["node", "dist/src/main.js"]