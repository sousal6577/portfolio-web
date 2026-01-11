import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FiArrowLeft, FiBarChart2, FiPieChart, FiTrendingUp, FiActivity,
  FiUsers, FiDollarSign, FiShoppingCart, FiTarget, FiDownload,
  FiFilter, FiCalendar, FiRefreshCw, FiMaximize2, FiLayers,
  FiDatabase, FiCpu, FiGlobe, FiZap, FiEye, FiExternalLink
} from 'react-icons/fi';
import './DataVizAnalytics.css';

const DataVizAnalytics = () => {
  // Dados mockados para os gráficos
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [isLiveMode, setIsLiveMode] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Atualiza o tempo em tempo real
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // KPIs principais
  const kpis = [
    { label: 'Receita Total', value: 'R$ 847.290', change: '+12.5%', positive: true, icon: FiDollarSign },
    { label: 'Usuários Ativos', value: '24.891', change: '+8.3%', positive: true, icon: FiUsers },
    { label: 'Taxa de Conversão', value: '3.24%', change: '+0.5%', positive: true, icon: FiTarget },
    { label: 'Pedidos Hoje', value: '1.247', change: '-2.1%', positive: false, icon: FiShoppingCart }
  ];

  // Dados para gráfico de barras (vendas semanais)
  const weeklyData = [
    { day: 'Seg', value: 82 },
    { day: 'Ter', value: 65 },
    { day: 'Qua', value: 95 },
    { day: 'Qui', value: 78 },
    { day: 'Sex', value: 110 },
    { day: 'Sáb', value: 125 },
    { day: 'Dom', value: 88 }
  ];

  // Dados para gráfico de pizza (canais de tráfego)
  const trafficSources = [
    { source: 'Orgânico', value: 45, color: '#6366f1' },
    { source: 'Direto', value: 25, color: '#f59e0b' },
    { source: 'Social', value: 18, color: '#10b981' },
    { source: 'Referência', value: 12, color: '#ec4899' }
  ];

  // Dados de atividade em tempo real
  const realtimeActivities = [
    { type: 'purchase', message: 'Nova compra de R$ 349,90', location: 'São Paulo, SP', time: '12s' },
    { type: 'signup', message: 'Novo usuário registrado', location: 'Rio de Janeiro, RJ', time: '28s' },
    { type: 'purchase', message: 'Nova compra de R$ 129,00', location: 'Curitiba, PR', time: '45s' },
    { type: 'view', message: '500 visualizações em /produtos', location: 'Brasil', time: '1m' },
    { type: 'signup', message: 'Novo usuário registrado', location: 'Belo Horizonte, MG', time: '2m' }
  ];

  // Métricas de performance
  const performanceMetrics = [
    { label: 'Tempo Médio', value: '4:32', subtitle: 'na sessão' },
    { label: 'Bounce Rate', value: '32.5%', subtitle: '-3.2% vs. ontem' },
    { label: 'Páginas/Sessão', value: '5.8', subtitle: '+0.4 vs. ontem' },
    { label: 'Uptime', value: '99.98%', subtitle: 'último mês' }
  ];

  // Features do dashboard
  const features = [
    {
      icon: <FiActivity size={28} />,
      title: 'Dados em Tempo Real',
      description: 'Monitoramento instantâneo com atualizações em WebSocket e streaming de dados ao vivo.'
    },
    {
      icon: <FiPieChart size={28} />,
      title: 'Visualizações Interativas',
      description: 'Gráficos dinâmicos com D3.js e Recharts, totalmente customizáveis e responsivos.'
    },
    {
      icon: <FiFilter size={28} />,
      title: 'Filtros Avançados',
      description: 'Segmentação poderosa por período, região, canal e múltiplas dimensões personalizadas.'
    },
    {
      icon: <FiDownload size={28} />,
      title: 'Exportação de Dados',
      description: 'Exporte relatórios em PDF, Excel e CSV com agendamento automático de envio.'
    },
    {
      icon: <FiLayers size={28} />,
      title: 'Dashboards Personalizados',
      description: 'Crie e salve múltiplos dashboards com widgets drag-and-drop totalmente flexíveis.'
    },
    {
      icon: <FiZap size={28} />,
      title: 'Alertas Inteligentes',
      description: 'Configuração de alertas automáticos baseados em métricas e anomalias detectadas por IA.'
    }
  ];

  // Tech stack
  const techStack = [
    'React', 'TypeScript', 'D3.js', 'Recharts', 'WebSocket', 
    'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS'
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'purchase': return '💰';
      case 'signup': return '👤';
      case 'view': return '👁️';
      default: return '📊';
    }
  };

  return (
    <div className="dataviz-page">
      {/* Hero Section */}
      <section className="dataviz-hero">
        <div className="dataviz-hero-bg">
          <div className="dataviz-hero-gradient"></div>
          <div className="dataviz-grid-bg"></div>
        </div>

        <div className="dataviz-hero-content">
          <div className="dataviz-hero-text">
            <motion.span 
              className="dataviz-badge"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <FiBarChart2 /> Analytics Dashboard
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              DataViz Analytics
            </motion.h1>

            <motion.p 
              className="dataviz-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Transforme dados em decisões inteligentes
            </motion.p>

            <motion.p 
              className="dataviz-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Dashboard analítico de última geração com visualizações interativas em tempo real, 
              insights automatizados por IA e integrações com múltiplas fontes de dados.
            </motion.p>

            <motion.div 
              className="dataviz-hero-stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="dataviz-stat-item">
                <span className="dataviz-stat-value">50+</span>
                <span className="dataviz-stat-label">Widgets</span>
              </div>
              <div className="dataviz-stat-item">
                <span className="dataviz-stat-value">1M+</span>
                <span className="dataviz-stat-label">Data Points</span>
              </div>
              <div className="dataviz-stat-item">
                <span className="dataviz-stat-value">&lt;100ms</span>
                <span className="dataviz-stat-label">Latência</span>
              </div>
            </motion.div>

            <motion.div 
              className="dataviz-hero-buttons"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <button 
                className="dataviz-btn-primary"
                onClick={() => {
                  const demoSection = document.getElementById('dataviz-demo');
                  if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <FiEye /> Ver Demo ao Vivo
              </button>
              <Link to="/contato" className="dataviz-btn-secondary">
                <FiBarChart2 /> Solicitar Demo
              </Link>
            </motion.div>
          </div>

          <motion.div 
            className="dataviz-hero-visual"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="dataviz-mini-dashboard">
              <div className="dataviz-mini-header">
                <span>📊 Dashboard</span>
                <span className="dataviz-live-indicator">
                  <span className="dataviz-live-dot"></span>
                  LIVE
                </span>
              </div>
              <div className="dataviz-mini-kpis">
                <div className="dataviz-mini-kpi">
                  <span className="dataviz-mini-value">R$ 847k</span>
                  <span className="dataviz-mini-label">Receita</span>
                </div>
                <div className="dataviz-mini-kpi">
                  <span className="dataviz-mini-value">24.8k</span>
                  <span className="dataviz-mini-label">Usuários</span>
                </div>
              </div>
              <div className="dataviz-mini-chart">
                {weeklyData.map((item, index) => (
                  <div key={index} className="dataviz-mini-bar" style={{ height: `${item.value}%` }}></div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="dataviz-features">
        <div className="dataviz-container">
          <div className="dataviz-section-header">
            <span className="dataviz-section-tag">Funcionalidades</span>
            <h2>Recursos Poderosos</h2>
            <p>Ferramentas avançadas para análise de dados completa</p>
          </div>

          <div className="dataviz-features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="dataviz-feature-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="dataviz-feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dashboard Demo Section */}
      <section id="dataviz-demo" className="dataviz-demo-section">
        <div className="dataviz-container">
          <div className="dataviz-section-header">
            <span className="dataviz-section-tag">Demo Interativo</span>
            <h2>Dashboard em Ação</h2>
            <p>Explore uma demonstração funcional do painel analítico</p>
          </div>

          <motion.div 
            className="dataviz-dashboard"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {/* Dashboard Header */}
            <div className="dataviz-dash-header">
              <div className="dataviz-dash-title">
                <FiBarChart2 />
                <span>Analytics Overview</span>
              </div>
              <div className="dataviz-dash-controls">
                <div className="dataviz-period-selector">
                  {['24h', '7d', '30d', '90d'].map(period => (
                    <button
                      key={period}
                      className={`dataviz-period-btn ${selectedPeriod === period ? 'active' : ''}`}
                      onClick={() => setSelectedPeriod(period)}
                    >
                      {period}
                    </button>
                  ))}
                </div>
                <button 
                  className={`dataviz-live-btn ${isLiveMode ? 'active' : ''}`}
                  onClick={() => setIsLiveMode(!isLiveMode)}
                >
                  <span className="dataviz-live-dot"></span>
                  Live
                </button>
                <button className="dataviz-icon-btn">
                  <FiRefreshCw />
                </button>
                <button className="dataviz-icon-btn">
                  <FiMaximize2 />
                </button>
              </div>
            </div>

            {/* KPIs Row */}
            <div className="dataviz-kpis-row">
              {kpis.map((kpi, index) => (
                <motion.div
                  key={index}
                  className="dataviz-kpi-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="dataviz-kpi-icon">
                    <kpi.icon />
                  </div>
                  <div className="dataviz-kpi-info">
                    <span className="dataviz-kpi-label">{kpi.label}</span>
                    <div className="dataviz-kpi-value-row">
                      <span className="dataviz-kpi-value">{kpi.value}</span>
                      <span className={`dataviz-kpi-change ${kpi.positive ? 'positive' : 'negative'}`}>
                        {kpi.change}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Charts Row */}
            <div className="dataviz-charts-row">
              {/* Bar Chart */}
              <div className="dataviz-chart-card">
                <div className="dataviz-chart-header">
                  <h3>Vendas por Dia</h3>
                  <FiTrendingUp className="dataviz-trend-icon" />
                </div>
                <div className="dataviz-bar-chart">
                  {weeklyData.map((item, index) => (
                    <div key={index} className="dataviz-bar-item">
                      <div className="dataviz-bar-container">
                        <motion.div 
                          className="dataviz-bar"
                          initial={{ height: 0 }}
                          animate={{ height: `${item.value}%` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                        />
                      </div>
                      <span className="dataviz-bar-label">{item.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Donut Chart */}
              <div className="dataviz-chart-card">
                <div className="dataviz-chart-header">
                  <h3>Fontes de Tráfego</h3>
                  <FiPieChart className="dataviz-trend-icon" />
                </div>
                <div className="dataviz-donut-wrapper">
                  <div className="dataviz-donut">
                    <svg viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1f1f23" strokeWidth="15" />
                      {trafficSources.map((source, index) => {
                        const offset = trafficSources.slice(0, index).reduce((acc, s) => acc + s.value, 0);
                        return (
                          <circle
                            key={index}
                            cx="50"
                            cy="50"
                            r="40"
                            fill="none"
                            stroke={source.color}
                            strokeWidth="15"
                            strokeDasharray={`${source.value * 2.51} 251`}
                            strokeDashoffset={-offset * 2.51}
                            transform="rotate(-90 50 50)"
                          />
                        );
                      })}
                    </svg>
                    <div className="dataviz-donut-center">
                      <span className="dataviz-donut-total">100%</span>
                      <span className="dataviz-donut-label">Total</span>
                    </div>
                  </div>
                  <div className="dataviz-donut-legend">
                    {trafficSources.map((source, index) => (
                      <div key={index} className="dataviz-legend-item">
                        <span className="dataviz-legend-color" style={{ background: source.color }}></span>
                        <span className="dataviz-legend-label">{source.source}</span>
                        <span className="dataviz-legend-value">{source.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Real-time Activity */}
              <div className="dataviz-chart-card dataviz-activity-card">
                <div className="dataviz-chart-header">
                  <h3>Atividade em Tempo Real</h3>
                  <span className="dataviz-activity-time">
                    {currentTime.toLocaleTimeString('pt-BR')}
                  </span>
                </div>
                <div className="dataviz-activity-feed">
                  {realtimeActivities.map((activity, index) => (
                    <motion.div
                      key={index}
                      className="dataviz-activity-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <span className="dataviz-activity-icon">{getActivityIcon(activity.type)}</span>
                      <div className="dataviz-activity-info">
                        <span className="dataviz-activity-msg">{activity.message}</span>
                        <span className="dataviz-activity-location">{activity.location}</span>
                      </div>
                      <span className="dataviz-activity-time-ago">{activity.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="dataviz-metrics-row">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="dataviz-metric-card">
                  <span className="dataviz-metric-value">{metric.value}</span>
                  <span className="dataviz-metric-label">{metric.label}</span>
                  <span className="dataviz-metric-subtitle">{metric.subtitle}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="dataviz-tech">
        <div className="dataviz-container">
          <div className="dataviz-section-header">
            <span className="dataviz-section-tag">Stack Tecnológico</span>
            <h2>Tecnologias Utilizadas</h2>
            <p>Construído com as melhores ferramentas do ecossistema</p>
          </div>

          <div className="dataviz-tech-grid">
            {techStack.map((tech, index) => (
              <motion.div
                key={index}
                className="dataviz-tech-item"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                viewport={{ once: true }}
              >
                {tech}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Section */}
      <section className="dataviz-architecture">
        <div className="dataviz-container">
          <div className="dataviz-section-header">
            <span className="dataviz-section-tag">Arquitetura</span>
            <h2>Como Funciona</h2>
            <p>Arquitetura robusta para processamento de dados em escala</p>
          </div>

          <div className="dataviz-arch-diagram">
            <div className="dataviz-arch-layer">
              <div className="dataviz-arch-title">Coleta de Dados</div>
              <div className="dataviz-arch-items">
                <div className="dataviz-arch-item">
                  <FiGlobe /> Web Analytics
                </div>
                <div className="dataviz-arch-item">
                  <FiDatabase /> APIs Externas
                </div>
                <div className="dataviz-arch-item">
                  <FiActivity /> IoT Devices
                </div>
              </div>
            </div>
            <div className="dataviz-arch-arrow">↓</div>
            <div className="dataviz-arch-layer">
              <div className="dataviz-arch-title">Processamento</div>
              <div className="dataviz-arch-items">
                <div className="dataviz-arch-item">
                  <FiCpu /> Stream Processing
                </div>
                <div className="dataviz-arch-item">
                  <FiZap /> Redis Cache
                </div>
              </div>
            </div>
            <div className="dataviz-arch-arrow">↓</div>
            <div className="dataviz-arch-layer">
              <div className="dataviz-arch-title">Visualização</div>
              <div className="dataviz-arch-items">
                <div className="dataviz-arch-item">
                  <FiBarChart2 /> React + D3.js
                </div>
                <div className="dataviz-arch-item">
                  <FiActivity /> WebSocket
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="dataviz-cta">
        <div className="dataviz-container">
          <div className="dataviz-cta-content">
            <h2>Interessado em um projeto similar?</h2>
            <p>
              Vamos conversar sobre como posso ajudar a construir uma solução de analytics 
              personalizada para o seu negócio.
            </p>
            <div className="dataviz-cta-buttons">
              <Link to="/contato" className="dataviz-btn-primary">
                <FiExternalLink /> Entrar em Contato
              </Link>
              <Link to="/projetos" className="dataviz-btn-secondary">
                <FiArrowLeft /> Ver Outros Projetos
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Back Link */}
      <div className="dataviz-back-link">
        <Link to="/">
          <FiArrowLeft /> Voltar ao Portfólio
        </Link>
      </div>
    </div>
  );
};

export default DataVizAnalytics;
