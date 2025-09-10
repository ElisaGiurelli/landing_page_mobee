#!/bin/bash

# 🚀 Mobee Landing Page - Quick Deploy Script
# Uso: ./deploy.sh

echo "🚀 Starting Mobee Landing Page deployment..."

# Naviga nella directory corretta
cd "$(dirname "$0")"

# Controlla se siamo nella directory corretta
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Are you in the right directory?"
    exit 1
fi

# Installa dipendenze se necessario
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Test build
echo "🔨 Testing build..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed! Check errors above."
    exit 1
fi

echo "✅ Build successful!"

# Commit changes se ci sono
if [ -n "$(git status --porcelain)" ]; then
    echo "📝 Committing changes..."
    git add .
    git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M:%S')"
fi

# Push to GitHub
echo "⬆️ Pushing to GitHub..."
git push origin main

echo ""
echo "✅ Deployment preparation complete!"
echo ""
echo "🌐 NEXT STEPS:"
echo "1. Go to https://vercel.com or https://netlify.com"
echo "2. Import project: ElisaGiurelli/landing_page_mobee"
echo "3. Deploy automatically"
echo "4. Share the generated link with your team"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"