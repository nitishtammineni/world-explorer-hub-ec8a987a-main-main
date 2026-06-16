@echo off
REM Set Git path for this session
set PATH=%ProgramFiles%\Git\bin;%PATH%

REM Initialize git
git init
git add .
git commit -m "first commit"
git branch -M main

pause
