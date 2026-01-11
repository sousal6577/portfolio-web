# 🚀 COMANDOS RÁPIDOS - PORTFOLIO WEB

## 📍 Localização
```bash
cd /workspaces/portfolio-sousa
```

## 🏃 Iniciar Projeto
```bash
# Iniciar backend + frontend automaticamente
./start.sh

# OU manualmente:

# Terminal 1 - Backend
cd /workspaces/portfolio-sousa/backend
npm run dev

# Terminal 2 - Frontend  
cd /workspaces/portfolio-sousa/frontend
npm run dev
```

## 🌐 URLs
- **Backend**: http://localhost:3030
- **Frontend**: http://localhost:5173
- **Health Check**: http://localhost:3030/api/health

## 📦 Git
```bash
# Ver status
git status

# Commit
git add .
git commit -m "feat: sua mensagem"

# Push (após criar repo no GitHub)
git push -u origin main
```

## 🔥 Firebase (Próximo Passo)
1. Criar projeto: https://console.firebase.google.com
2. Nome: `portfolio-web-dev`
3. Ativar Realtime Database
4. Baixar serviceAccountKey.json → `backend/`
5. Copiar Web App config → `frontend/.env.local`

## 📁 Estrutura
```
portfolio-sousa/
├── backend/          # API Express + Firebase
├── frontend/         # React + Vite
├── projetos/         # Documentação de projetos
├── docs/             # Documentação
└── start.sh          # Iniciar tudo
```

## ✅ Status Atual
- ✅ Estrutura backend criada
- ✅ Estrutura frontend criada
- ✅ Dependências instaladas
- ✅ Commits feitos
- ⏳ Criar repositório no GitHub
- ⏳ Configurar Firebase

## 🔗 Criar Repositório no GitHub
```bash
# 1. Criar em: https://github.com/new
#    Nome: portfolio-web
#    Descrição: Portfólio profissional - Full Stack Developer
#    Público

# 2. Depois executar:
git push -u origin main
```

## 💡 Próximos Desenvolvimentos
1. Criar página Home
2. Implementar PWA Generator
3. Adicionar Templates
4. Sistema de autenticação
5. Dashboard de projetos
