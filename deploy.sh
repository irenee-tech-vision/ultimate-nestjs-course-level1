#!/bin/bash

# export NVM_DIR="$HOME/.nvm"
# [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

SERVICE_NAME=${SERVICE_NAME:-habits-tracker-api}

echo "🔄 Pulling latest changes..."
git pull origin master

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building app..."
npm run build

echo "🚀 Restarting app: $SERVICE_NAME"
pm2 restart "$SERVICE_NAME"