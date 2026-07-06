#!/bin/bash
# FrotaPM Startup Script

echo "🚀 Iniciando FrotaPM..."
echo ""

# Verificar se Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado! Instale em https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Backend
echo "📦 Iniciando Backend..."
cd backend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

npm run dev &
BACKEND_PID=$!
echo "✅ Backend iniciado (PID: $BACKEND_PID)"
echo "📍 http://localhost:5000"
echo ""

sleep 3

# Frontend
echo "⚛️  Iniciando Frontend..."
cd ../frontend

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

npm run dev &
FRONTEND_PID=$!
echo "✅ Frontend iniciado (PID: $FRONTEND_PID)"
echo "📍 http://localhost:5173"
echo ""

echo "═══════════════════════════════════════════════════════"
echo "🎉 FrotaPM está rodando!"
echo "═══════════════════════════════════════════════════════"
echo ""
echo "🌐 Abra no navegador: http://localhost:5173"
echo ""
echo "📊 Dashboard: http://localhost:5173"
echo "🚗 Viaturas: http://localhost:5173 → Viaturas"
echo "🔧 Manutenção: http://localhost:5173 → Manutenção"
echo "🗺️  Mapa: http://localhost:5173 → Mapa"
echo "📋 Relatórios: http://localhost:5173 → Relatórios"
echo ""
echo "⏹️  Para parar: Pressione Ctrl+C"
echo "═══════════════════════════════════════════════════════"

# Aguardar processos
wait
