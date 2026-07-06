@echo off
REM FrotaPM Startup Script for Windows

echo 🚀 Iniciando FrotaPM...
echo.

REM Verificar Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js nao encontrado! Instale em https://nodejs.org/
    exit /b 1
)

for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%
echo.

REM Backend
echo 📦 Iniciando Backend...
cd backend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

start "FrotaPM Backend" cmd /k npm run dev
echo ✅ Backend iniciado
echo 📍 http://localhost:5000
echo.

timeout /t 3 /nobreak

REM Frontend
echo ⚛️  Iniciando Frontend...
cd ..
cd frontend

if not exist "node_modules" (
    echo Installing dependencies...
    call npm install
)

start "FrotaPM Frontend" cmd /k npm run dev
echo ✅ Frontend iniciado
echo 📍 http://localhost:5173
echo.

echo ═══════════════════════════════════════════════════════
echo 🎉 FrotaPM está rodando!
echo ═══════════════════════════════════════════════════════
echo.
echo 🌐 Abra no navegador: http://localhost:5173
echo.
echo 📊 Dashboard: http://localhost:5173
echo 🚗 Viaturas: Clique em "Viaturas"
echo 🔧 Manutenção: Clique em "Manutenção"
echo 🗺️  Mapa: Clique em "Mapa"
echo 📋 Relatórios: Clique em "Relatórios"
echo.
echo ⏹️  Para parar: Feche as janelas do terminal
echo ═══════════════════════════════════════════════════════

pause
