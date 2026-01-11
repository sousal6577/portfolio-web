# 🚀 Portfolio Web - Guia de Configuração

## 📋 Visão Geral

Este é um sistema de portfólio profissional com painel administrativo, desenvolvido com:

- **Frontend:** React + Vite
- **Backend:** Node.js + Express
- **Database:** Firebase Realtime Database
- **Auth:** Firebase Authentication

## ⚙️ Configuração Inicial

### 1. Criar Usuário Admin no Firebase

Acesse o [Firebase Console](https://console.firebase.google.com/project/portifolio-pessoal-bb80a/authentication/users) e crie um usuário:

1. Vá em **Authentication** > **Users**
2. Clique em **Add user**
3. Digite email e senha
4. Salve e use estas credenciais para login no admin

### 2. Configurar API Key do Firebase

Para o login funcionar no frontend, você precisa da **Web API Key** do Firebase:

1. Vá em **Project Settings** > **General**
2. Copie a **Web API Key**
3. Atualize o arquivo `frontend/src/context/AuthContext.jsx`:

```javascript
const firebaseConfig = {
  apiKey: "SUA_WEB_API_KEY_AQUI", // Substitua!
  authDomain: "portifolio-pessoal-bb80a.firebaseapp.com",
  projectId: "portifolio-pessoal-bb80a",
};
```

### 3. Regras do Firebase Realtime Database

No Firebase Console, vá em **Realtime Database** > **Rules** e configure:

```json
{
  "rules": {
    "portfolio": {
      ".read": true,
      ".write": "auth != null"
    },
    "messages": {
      ".read": "auth != null",
      ".write": true
    }
  }
}
```

## 🚀 Executando o Projeto

### Opção 1: Script Automático
```bash
./start.sh
```

### Opção 2: Manual

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 🌐 URLs

| Serviço | URL |
|---------|-----|
| Frontend | http://localhost:5173 |
| Backend API | http://localhost:3030 |
| Admin Panel | http://localhost:5173/admin |
| Login | http://localhost:5173/login |

## 📡 API Endpoints

### Públicos (sem auth)
- `GET /api/health` - Status do servidor
- `GET /api/portfolio` - Todos os dados do portfólio
- `GET /api/portfolio/:section` - Seção específica
- `POST /api/portfolio/contact/message` - Enviar mensagem

### Protegidos (requer JWT)
- `PUT /api/portfolio` - Atualizar portfólio completo
- `PUT /api/portfolio/:section` - Atualizar seção
- `POST /api/portfolio/projects/add` - Adicionar projeto
- `DELETE /api/portfolio/projects/:id` - Remover projeto
- `POST /api/portfolio/testimonials/add` - Adicionar depoimento
- `DELETE /api/portfolio/testimonials/:id` - Remover depoimento
- `GET /api/portfolio/admin/messages` - Listar mensagens

### Autenticação
- `POST /api/auth/login` - Login (recebe Firebase ID Token)
- `GET /api/auth/verify` - Verificar JWT
- `POST /api/auth/logout` - Logout

## 🔧 Fluxo de Autenticação

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Frontend  │───▶│  Firebase   │───▶│   Backend   │
│             │    │    Auth     │    │             │
│  Login Form │    │             │    │   JWT Gen   │
└─────────────┘    └─────────────┘    └─────────────┘
      │                  │                   │
      │  1. Email/Pass   │                   │
      │─────────────────▶│                   │
      │                  │                   │
      │  2. ID Token     │                   │
      │◀─────────────────│                   │
      │                  │                   │
      │  3. ID Token    ─────────────────────▶│
      │                                      │
      │  4. JWT Token   ◀────────────────────│
      │                                      │
      │  5. Use JWT for API calls            │
      │─────────────────────────────────────▶│
```

## 🚂 Deploy no Railway

### Backend
```bash
cd backend
railway login
railway init
railway up
```

### Frontend
```bash
cd frontend
npm run build
railway login
railway init
railway up
```

## 📁 Estrutura do Projeto

```
portfolio-sousa/
├── backend/
│   ├── server.js           # Servidor Express
│   ├── routes/
│   │   ├── auth.js         # Rotas de autenticação
│   │   └── portfolio.js    # Rotas do portfólio
│   ├── serviceAccountKey.json  # Credenciais Firebase (NÃO COMMITAR!)
│   └── .env                # Variáveis de ambiente
├── frontend/
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── context/        # Contextos (Auth, Theme, Portfolio)
│   │   ├── pages/          # Páginas
│   │   ├── services/       # API Service
│   │   └── styles/         # Estilos globais
│   └── .env                # Variáveis de ambiente
└── start.sh                # Script de inicialização
```

## ⚠️ Importante

- **NUNCA** commite o arquivo `serviceAccountKey.json`
- **NUNCA** commite arquivos `.env`
- Configure variáveis de ambiente no Railway para produção
