#!/bin/bash

# ============================================================================
# START SCRIPT - Portfolio Web
# Inicia Backend e Frontend simultaneamente
# ============================================================================

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║   🚀 PORTFOLIO WEB - INICIANDO SERVIÇOS                  ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""

# Matar processos existentes nas portas
echo "🔄 Liberando portas..."
lsof -ti:3030 | xargs kill -9 2>/dev/null
lsof -ti:5173 | xargs kill -9 2>/dev/null

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
npm start &
BACKEND_PID=$!


# Iniciar frontend
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "╔══════════════════════════════════════════════════════════╗"
echo "║                                                          ║"
echo "║      ✅ SERVIDORES INICIADOS COM SUCESSO                 ║"
echo "║                                                          ║"
echo "╚══════════════════════════════════════════════════════════╝"
echo ""
echo "📡 Backend:  http://localhost:3030"
echo "🎨 Frontend: http://localhost:5173"
echo "👤 Admin:    http://localhost:5173/admin"
echo "🔑 Login:    http://localhost:5173/login"
echo ""
echo "Para parar: Ctrl+C"
echo ""

# Esperar pelos processos
wait $BACKEND_PID $FRONTEND_PID
