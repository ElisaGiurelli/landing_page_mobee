@echo off
echo 🚀 Starting Mobee Landing Page deployment...

REM Check if we're in the right directory
if not exist "package.json" (
    echo ❌ Error: package.json not found. Are you in the right directory?
    pause
    exit /b 1
)

REM Install dependencies if needed
echo 📦 Checking dependencies...
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
)

REM Test build
echo 🔨 Testing build...
npm run build

if %errorlevel% neq 0 (
    echo ❌ Build failed! Check errors above.
    pause
    exit /b 1
)

echo ✅ Build successful!

REM Commit and push changes
echo 📝 Committing changes...
git add .
git commit -m "Deploy: %date% %time%"

echo ⬆️ Pushing to GitHub...
git push origin main

echo.
echo ✅ Deployment preparation complete!
echo.
echo 🌐 NEXT STEPS:
echo 1. Go to https://vercel.com or https://netlify.com
echo 2. Import project: ElisaGiurelli/landing_page_mobee
echo 3. Deploy automatically
echo 4. Share the generated link with your team
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md
echo.
pause