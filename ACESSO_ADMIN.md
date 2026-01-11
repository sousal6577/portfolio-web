# 🔐 Acesso ao Painel Administrativo

## Credenciais de Login

**Email:** lgcdsousa@gmail.com  
**Senha:** Admin@2026

## URLs de Acesso

### 🌐 Desenvolvimento Local
- **Painel Admin:** http://localhost:5175/admin
- **Página de Login:** http://localhost:5175/login
- **Frontend:** http://localhost:5175/
- **Backend API:** http://localhost:3030/api

### 📱 Acesso Remoto (se estiver usando Dev Container com port forwarding)
- Verifique as portas encaminhadas no VS Code

## 🎯 Funcionalidades do Painel Admin

### ✅ Gerenciamento Completo
- **Hero Section** - Configurar banner principal
- **Sobre** - Atualizar informações pessoais
- **Habilidades** - Adicionar/editar skills
- **Serviços** - Gerenciar serviços oferecidos
- **Projetos** - CRUD completo de projetos
- **Experiência** - Adicionar experiências profissionais
- **Depoimentos** - Gerenciar testemunhos
- **Contato** - Configurar informações de contato
- **Configurações** - SEO, Analytics, etc.

### 📊 Dados Iniciais Populados
- ✅ 6 Projetos completos com páginas exemplares
- ✅ 3 Experiências profissionais
- ✅ 3 Depoimentos
- ✅ Todas as seções configuradas

## 🎨 Páginas de Projetos Exemplares Criadas

Todos os projetos agora têm páginas completas e funcionais:

1. **FitPro Academy** - `/projetos/fitpro-academy`
   - Plataforma de fitness moderna

2. **CMMS Industrial** - `/projetos/cmms-industrial`
   - Sistema de manutenção industrial

3. **TaskFlow Pro** - `/projetos/taskflow`
   - Gerenciador de tarefas colaborativo

4. **NexusShop** - `/projetos/nexusshop`
   - E-commerce moderno

5. **DataViz Analytics** - `/projetos/dataviz-analytics`
   - Dashboard de analytics

6. **HealthTrack** - `/projetos/healthtrack`
   - Sistema de saúde digital

## 🔄 Como Usar

1. Acesse http://localhost:5175/login
2. Faça login com as credenciais acima
3. Você será redirecionado para /admin
4. Edite qualquer seção clicando nos cards
5. Salve as alterações
6. Visualize as mudanças ao vivo no site

## 🚀 Próximos Passos

1. Configurar Firebase Web API Key no `frontend/.env`:
   ```
   VITE_FIREBASE_API_KEY=sua-api-key-aqui
   ```

2. Configurar regras do Firebase Realtime Database (ver docs/SETUP.md)

3. Deploy no Railway:
   ```bash
   railway login
   railway init
   railway up
   ```

## 📝 Observações

- As senhas são armazenadas com hash bcrypt
- O JWT expira em 7 dias
- Todos os dados estão no Firebase Realtime Database
- As imagens dos projetos usam Unsplash temporariamente
