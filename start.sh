#!/bin/bash

echo "🚀 Iniciando Portfolio Web..."
echo ""

# Verificar se as dependências estão instaladas
if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "✅ Iniciando servidores..."
echo ""

# Iniciar backend em background
cd backend
npm run dev &
BACKEND_PID=$!

# Iniciar frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔════════════════════════════════════════╗"
echo "║                                        ║"
echo "║      ✅ SERVIDORES INICIADOS           ║"
echo "║                                        ║"
echo "╚════════════════════════════════════════╝"
echo ""
echo "📡 Backend: http://localhost:3030"
echo "🎨 Frontend: http://localhost:5173"
echo ""
echo "Para parar: Ctrl+C"
echo ""

# Esperar pelos processos
wait $BACKEND_PID $FRONTEND_PID
