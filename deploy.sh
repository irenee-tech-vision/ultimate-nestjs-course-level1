SERVICE_NAME=${SERVICE_NAME:-habits-tracker-api}

echo "🔄 Pulling latest changes..."
git pull origin master

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building app..."
npm run build

echo "🚀 Restarting app: $SERVICE_NAME"
pm2 restart "$SERVICE_NAME"