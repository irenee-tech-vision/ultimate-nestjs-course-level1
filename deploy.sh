#!/bin/bash

: "${LOCAL_KEY_PATH:?LOCAL_KEY_PATH not set}"
: "${REMOTE_USER:?REMOTE_USER not set}"
: "${REMOTE_HOST:?REMOTE_HOST not set}"
: "${REMOTE_APP_PATH:?REMOTE_APP_PATH not set}"


if [ "$SKIP_GIT" != "true" ]; then
  echo "🔄 Pulling latest changes..."
  git checkout master
  git pull origin master
fi

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building app..."
npm run build

echo "🚀 Sending files to server"
rsync -avz \
  --exclude=".git" \
  --exclude="node_modules" \
  --exclude=".env" \
  -e "ssh -i $LOCAL_KEY_PATH" \
  . $REMOTE_USER@$REMOTE_HOST:$REMOTE_APP_PATH

echo "✅ Files synced!"


ssh -i "$LOCAL_KEY_PATH" "$REMOTE_USER@$REMOTE_HOST" << EOF
  export NVM_DIR="\$HOME/.nvm"
  [ -s "\$NVM_DIR/nvm.sh" ] && \. "\$NVM_DIR/nvm.sh"
  echo "📦 Installing prod dependencies..."
  cd $REMOTE_APP_PATH
  npm ci --omit=dev
  echo "🔁 Restarting app with PM2..."
  pm2 restart habits-tracker-api
EOF

echo "🎉 Deployment complete!"