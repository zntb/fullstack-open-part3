#!/bin/bash

# Print a message indicating the build process
echo "Starting build process..."

# Add your build commands below

# Example: Install dependencies
npm install && cd ./frontend && npm install

# Example: Build the project
npm run build:dev

echo "Build process completed successfully!"