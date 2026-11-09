@echo off
setlocal
cd /d "%~dp0"

where node >nul 2>nul
if errorlevel 1 goto missing_node
node -e "const [major,minor]=process.versions.node.split('.').map(Number);process.exit(major>24||(major===24&&minor>=9)?0:1)"
if errorlevel 1 goto old_node
where npm >nul 2>nul
if errorlevel 1 goto missing_npm

if not exist "node-app\node_modules\@deepseek-ai\dsh\lib\bin.js" (
  echo Installing CIPHER dependencies. This may take a few minutes...
  call npm run setup
  if errorlevel 1 goto setup_failed
)

echo Starting CIPHER...
call npm start
exit /b %errorlevel%

:missing_node
echo Node.js 24.9 or newer is required.
echo Install it from https://nodejs.org/en/download and run this file again.
pause
exit /b 1

:old_node
echo This project requires Node.js 24.9 or newer.
echo Update Node.js from https://nodejs.org/en/download and run this file again.
pause
exit /b 1

:missing_npm
echo npm was not found. Reinstall Node.js 24.9 or newer from https://nodejs.org/en/download.
pause
exit /b 1

:setup_failed
echo Dependency installation failed. Check the error above, then retry install.bat.
pause
exit /b 1
