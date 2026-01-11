# 🔥 Configuração Firebase - OBRIGATÓRIA

## ⚠️ ERRO: API Key Inválida

Você está vendo este erro porque a Firebase API Key não está configurada corretamente.

```
API key not valid. Please pass a valid API key.
```

## 🔧 Como Corrigir

### Passo 1: Obter a API Key

1. Acesse o Firebase Console: https://console.firebase.google.com/project/portifolio-pessoal-bb80a/settings/general

2. Role até a seção **"Seus apps"**

3. Clique no app **Web** (ícone `</>`

4. Copie a **"Chave da API da Web"** (Web API Key)
   - Será algo como: `AIzaSyBt9vqKh_XXXXXXXXXXXXXXXXXXXXXXXXXX`

### Passo 2: Configurar no Projeto

Edite o arquivo `frontend/.env` e substitua a linha:

```env
VITE_FIREBASE_API_KEY=AIzaSyBt9vqKh_your_actual_key_here
```

Por:

```env
VITE_FIREBASE_API_KEY=SUA_CHAVE_REAL_AQUI
```

### Passo 3: Reiniciar o Servidor

```bash
# Pare o servidor (Ctrl+C) e rode novamente:
./start.sh
```

## 🌐 Configuração para Codespaces

A URL da API é detectada automaticamente! Não precisa configurar nada.

**Como funciona:**
- Em Codespaces: Detecta a URL automaticamente
- Localhost: Usa `http://localhost:3030/api`

**Se precisar forçar uma URL específica:**

Descomente e edite no `frontend/.env`:
```env
VITE_API_URL=https://sua-url-personalizada.com/api
```

## ✅ Verificar se Funcionou

Depois de configurar:

1. Recarregue a página (F5)
2. Abra o Console (F12)
3. Você deve ver:
   ```
   🔗 API URL Final: https://shiny-adventure-xxx-3030.app.github.dev/api
   ```

4. **NÃO deve ter** erros de "Network Error" ou "API key not valid"

## 🆘 Ainda com Problemas?

**Network Error:**
- Verifique se o backend está rodando na porta 3030
- Execute: `curl http://localhost:3030/api/health`
- Deve retornar: `{"status":"OK",...}`

**API Key Error:**
- A chave está correta no `.env`?
- Você reiniciou o servidor depois de editar?
- A chave é do projeto `portifolio-pessoal-bb80a`?

## 📞 Contato

Se continuar com problemas, verifique:
- Firebase Console está acessível
- Projeto `portifolio-pessoal-bb80a` existe e está ativo
- Você tem permissões de administrador no projeto
