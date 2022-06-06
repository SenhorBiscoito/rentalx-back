FROM node
# Install the latest version of Node.js

WORKDIR /usr/app
# Set the working directory to the root of the project

COPY  package.json ./
# Copy the package.json file to the root of the project

RUN npm install
# Install the project dependencies

COPY . .
# Copy the project files to the root of the project

EXPOSE 3333
# Expose the Node.js application port

CMD ["npm", "run", "dev"]
# Run the Node.js application
