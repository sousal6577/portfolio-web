# 🏭 CMMS Industrial - Sistema de Gestão de Manutenção

## Visão Geral

Sistema completo de Computerized Maintenance Management System (CMMS) para indústrias, com foco em manutenção preditiva e preventiva.

## Tecnologias Utilizadas

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Database**: Firebase Realtime Database
- **IA**: OpenAI GPT-4 para análise de dados
- **Deploy**: Railway (Backend) + Firebase Hosting (Frontend)

## Features Principais

### 1. Dashboard Analítico
- Visualização em tempo real de KPIs industriais
- Gráficos de disponibilidade e performance
- Alertas e notificações automáticas
- Exportação de relatórios

### 2. Sistema de Conquistas
- Gamificação do processo de manutenção
- Ranking de técnicos e setores
- Badges e recompensas
- Sistema de reações em tempo real

### 3. Timeline de Eventos
- Rastreamento completo de máquinas
- Histórico de manutenções
- Análise de peças e componentes
- Cálculo automático de disponibilidade

### 4. Assistente IA
- Chat integrado com GPT-4
- Análise de dados históricos
- Sugestões de manutenção preditiva
- Respostas estruturadas e contextuais

## Arquitetura

```
cmms/
├── backend/
│   ├── routes/
│   │   ├── apontamentoRoutes.js
│   │   ├── feedRoutes.js
│   │   ├── iotRoutes.js
│   │   └── ...
│   ├── services/
│   │   ├── apontamentoService.js
│   │   ├── cacheService.js
│   │   ├── cleanupService.js
│   │   └── ...
│   └── middleware/
│       ├── authMiddleware.js
│       └── requestGuard.js
│
└── frontend/
    └── src/
        ├── pages/
        │   ├── LeaderDashboard.jsx
        │   ├── AnalyticalDashboard.jsx
        │   └── TimelineMaquina.jsx
        └── hooks/
            └── useRealTimeActivityFeed.js
```

## Otimizações Implementadas

### Performance
- Cache em memória para reduzir chamadas ao Firebase
- Lazy loading de componentes
- Debounce em inputs de busca
- Virtualização de listas longas

### Firebase
- Queries otimizadas com índices
- Cleanup automático de dados antigos (>90 dias)
- Listeners otimizados (on/off quando necessário)
- Batch operations para múltiplas escritas

### Segurança
- Request guard com rate limiting
- Autenticação baseada em sessões
- Validação de permissões por rota
- Sanitização de inputs

## Métricas

- **Usuários Ativos**: 50+ usuários simultâneos
- **Uptime**: 99.8%
- **Response Time**: < 200ms (média)
- **Firebase Reads**: Redução de 60% com cache

## Clientes

- **Bracol** - Ambiente de desenvolvimento
- **Grupo AMB** - Produção (múltiplas empresas)
- **Trinca Games** - Sistema adaptado para gamificação

## Desafios Técnicos Resolvidos

1. **Intersecção Temporal**
   - Problema: Eventos simultâneos causavam duplicação
   - Solução: Sistema de deduplicação por timestamp

2. **Divergência de Disponibilidade**
   - Problema: Cálculo inconsistente entre turnos
   - Solução: Algoritmo de agregação com priorização

3. **Performance Firebase**
   - Problema: Muitas leituras desnecessárias
   - Solução: Cache service + cleanup automático

## Screenshots

[Em desenvolvimento - adicionar imagens]

## Links

- [Documentação Completa](../docs/cmms/)
- [Changelog](../docs/cmms/CHANGELOG.md)
