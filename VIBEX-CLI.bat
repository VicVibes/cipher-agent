@echo off
setlocal
cd /d "%~dp0"
node scripts\launch-cli.mjs %*
exit /b %errorlevel%
