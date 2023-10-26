#!/bin/bash

# Navigate to project directory
cd url-shortener/server

# Stash any changes on ec2 repo
git stash

# Pull the latest code from repository
git pull

# Build your application (if needed)
npm install          # Install dependencies
npm run build        # Build your app (if necessary)

# Reload your PM2-managed application
pm2 reload server 
