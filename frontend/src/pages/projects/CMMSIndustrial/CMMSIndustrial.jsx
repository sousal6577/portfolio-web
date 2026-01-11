// ============================================================================
// CMMS INDUSTRIAL - Sistema de Gestão de Manutenção
// Página demonstrativa completa e funcional
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Wrench, Building2, ClipboardList, BarChart3, AlertTriangle,
  ChevronRight, Star, Play, Check, ArrowRight, Menu, X,
  Settings, Clock, Target, Award, Calendar, Zap, Bell,
  User, Search, Plus, Filter, CheckCircle, XCircle,
  Truck, Package, FileText, Activity, TrendingUp, Users
} from 'lucide-react';
import './CMMSIndustrial.css';

// Mock Data
const mockWorkOrders = [
  { id: 'OS-2024001', equipment: 'Prensa Hidráulica #01', type: 'Corretiva', priority: 'Alta', status: 'Em Andamento', technician: 'Carlos M.', date: '11/01/2026' },
  { id: 'OS-2024002', equipment: 'Compressor de Ar #03', type: 'Preventiva', priority: 'Média', status: 'Pendente', technician: 'João S.', date: '11/01/2026' },
  { id: 'OS-2024003', equipment: 'Torno CNC #02', type: 'Preditiva', priority: 'Baixa', status: 'Concluída', technician: 'Maria L.', date: '10/01/2026' },
  { id: 'OS-2024004', equipment: 'Esteira Transportadora', type: 'Corretiva', priority: 'Crítica', status: 'Em Andamento', technician: 'Pedro R.', date: '11/01/2026' },
  { id: 'OS-2024005', equipment: 'Caldeira Industrial', type: 'Preventiva', priority: 'Alta', status: 'Agendada', technician: 'Ana C.', date: '12/01/2026' },
];

const mockAssets = [
  { id: 1, name: 'Prensa Hidráulica #01', location: 'Galpão A', status: 'Operando', health: 92, lastMaintenance: '05/01/2026' },
  { id: 2, name: 'Compressor de Ar #03', location: 'Galpão B', status: 'Manutenção', health: 65, lastMaintenance: '28/12/2025' },
  { id: 3, name: 'Torno CNC #02', location: 'Galpão A', status: 'Operando', health: 88, lastMaintenance: '02/01/2026' },
  { id: 4, name: 'Esteira Transportadora', location: 'Linha 1', status: 'Parado', health: 45, lastMaintenance: '15/12/2025' },
  { id: 5, name: 'Caldeira Industrial', location: 'Utilidades', status: 'Operando', health: 95, lastMaintenance: '08/01/2026' },
];

const mockStats = [
  { label: 'Ativos Cadastrados', value: '1.247', change: '+5%', icon: Package, color: '#6366f1' },
  { label: 'OS Abertas', value: '23', change: '-12%', icon: ClipboardList, color: '#f59e0b' },
  { label: 'MTBF', value: '847h', change: '+8%', icon: Clock, color: '#10b981' },
  { label: 'Disponibilidade', value: '96.5%', change: '+2%', icon: TrendingUp, color: '#ec4899' },
];

const features = [
  {
    icon: ClipboardList,
    title: 'Ordens de Serviço',
    description: 'Gestão completa do ciclo de vida das OS, desde a abertura até o fechamento com histórico detalhado.'
  },
  {
    icon: Package,
    title: 'Gestão de Ativos',
    description: 'Cadastro hierárquico de equipamentos, histórico de manutenções e documentação técnica.'
  },
  {
    icon: Calendar,
    title: 'Manutenção Preventiva',
    description: 'Planos de manutenção baseados em tempo ou contador com geração automática de OS.'
  },
  {
    icon: Activity,
    title: 'Manutenção Preditiva',
    description: 'Integração com sensores IoT para monitoramento de vibração, temperatura e análise de óleo.'
  },
  {
    icon: Truck,
    title: 'Gestão de Estoque',
    description: 'Controle de peças sobressalentes, requisições de material e ponto de reposição automático.'
  },
  {
    icon: BarChart3,
    title: 'Indicadores KPI',
    description: 'Dashboards com MTBF, MTTR, disponibilidade, custos e OEE em tempo real.'
  }
];

const CMMSIndustrial = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedOS, setSelectedOS] = useState(null);

  return (
    <>
      <Helmet>
        <title>CMMS Industrial - Sistema de Gestão de Manutenção | Lucas Sousa</title>
        <meta name="description" content="Sistema de Gestão de Manutenção Computadorizado para indústrias. Controle de OS, ativos e manutenção preventiva." />
      </Helmet>

      <div className="cmms-page">
        {/* Hero Section */}
        <section className="cmms-hero">
          <div className="cmms-hero-bg">
            <div className="cmms-hero-gradient"></div>
            <div className="cmms-hero-grid"></div>
          </div>
          
          <div className="cmms-hero-content">
            <motion.div 
              className="cmms-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="cmms-badge">
                <Wrench size={16} />
                Sistema Industrial
              </span>
              <h1>CMMS Industrial</h1>
              <p className="cmms-tagline">
                Sistema de Gestão de Manutenção Computadorizado
              </p>
              <p className="cmms-description">
                Controle total sobre seus ativos industriais. Reduza paradas não programadas,
                otimize custos de manutenção e aumente a disponibilidade operacional.
              </p>
              
              <div className="cmms-hero-metrics">
                <div className="cmms-metric">
                  <span className="cmms-metric-value">+35%</span>
                  <span className="cmms-metric-label">Eficiência</span>
                </div>
                <div className="cmms-metric">
                  <span className="cmms-metric-value">-40%</span>
                  <span className="cmms-metric-label">Paradas</span>
                </div>
                <div className="cmms-metric">
                  <span className="cmms-metric-value">50+</span>
                  <span className="cmms-metric-label">Empresas</span>
                </div>
              </div>

              <div className="cmms-hero-buttons">
                <button 
                  className="cmms-btn-primary"
                  onClick={() => {
                    const demoSection = document.getElementById('cmms-demo');
                    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play size={18} />
                  Ver Demonstração
                </button>
                <Link to="/contato" className="cmms-btn-secondary">
                  Solicitar Proposta
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="cmms-hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="cmms-dashboard-preview">
                <div className="cmms-preview-header">
                  <div className="cmms-preview-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span>CMMS Dashboard</span>
                </div>
                <div className="cmms-preview-content">
                  <div className="cmms-preview-stats">
                    <div className="cmms-preview-stat">
                      <Package size={18} />
                      <div>
                        <span className="value">1,247</span>
                        <span className="label">Ativos</span>
                      </div>
                    </div>
                    <div className="cmms-preview-stat">
                      <AlertTriangle size={18} />
                      <div>
                        <span className="value warning">23</span>
                        <span className="label">OS Abertas</span>
                      </div>
                    </div>
                  </div>
                  <div className="cmms-preview-chart">
                    <div className="cmms-gauge">
                      <svg viewBox="0 0 100 50">
                        <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#2d2d3d" strokeWidth="8"/>
                        <motion.path 
                          d="M 10 50 A 40 40 0 0 1 90 50" 
                          fill="none" 
                          stroke="url(#cmmsGradient)" 
                          strokeWidth="8"
                          strokeLinecap="round"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 0.965 }}
                          transition={{ duration: 1.5, delay: 0.5 }}
                        />
                        <defs>
                          <linearGradient id="cmmsGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#10b981" />
                            <stop offset="100%" stopColor="#6366f1" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="cmms-gauge-value">96.5%</div>
                      <div className="cmms-gauge-label">Disponibilidade</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="cmms-features">
          <div className="cmms-container">
            <motion.div 
              className="cmms-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cmms-section-tag">Funcionalidades</span>
              <h2>Gestão completa de manutenção</h2>
              <p>Todas as ferramentas que sua equipe precisa para maximizar a disponibilidade dos equipamentos</p>
            </motion.div>

            <div className="cmms-features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="cmms-feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5, borderColor: '#10b981' }}
                >
                  <div className="cmms-feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo Section */}
        <section id="cmms-demo" className="cmms-demo-section">
          <div className="cmms-container">
            <motion.div 
              className="cmms-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cmms-section-tag">Demo Interativa</span>
              <h2>Experimente o sistema</h2>
              <p>Navegue pelo painel de gestão de manutenção</p>
            </motion.div>

            <motion.div 
              className="cmms-demo-container"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Sidebar */}
              <div className={`cmms-demo-sidebar ${sidebarOpen ? '' : 'collapsed'}`}>
                <div className="cmms-demo-logo">
                  <Wrench size={24} />
                  <span>CMMS</span>
                </div>
                
                <nav className="cmms-demo-nav">
                  {[
                    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                    { id: 'workorders', icon: ClipboardList, label: 'Ordens de Serviço' },
                    { id: 'assets', icon: Package, label: 'Ativos' },
                    { id: 'preventive', icon: Calendar, label: 'Preventiva' },
                    { id: 'inventory', icon: Truck, label: 'Estoque' },
                  ].map(item => (
                    <button
                      key={item.id}
                      className={`cmms-nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="cmms-demo-main">
                {/* Top Bar */}
                <div className="cmms-demo-topbar">
                  <button 
                    className="cmms-menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    <Menu size={20} />
                  </button>
                  
                  <div className="cmms-search">
                    <Search size={18} />
                    <input type="text" placeholder="Buscar OS, equipamento..." />
                  </div>

                  <div className="cmms-topbar-actions">
                    <button className="cmms-icon-btn">
                      <Bell size={20} />
                      <span className="cmms-notification-badge">3</span>
                    </button>
                    <div className="cmms-user-info">
                      <span>Admin</span>
                      <div className="cmms-user-avatar">
                        <User size={18} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="cmms-demo-content">
                  <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                      <motion.div 
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cmms-dashboard"
                      >
                        <div className="cmms-dashboard-header">
                          <h2>Dashboard de Manutenção</h2>
                          <div className="cmms-date-filter">
                            <Calendar size={16} />
                            <span>Janeiro 2026</span>
                          </div>
                        </div>
                        
                        {/* KPIs */}
                        <div className="cmms-kpi-grid">
                          {mockStats.map((stat, idx) => (
                            <motion.div 
                              key={idx} 
                              className="cmms-kpi-card"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="cmms-kpi-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <stat.icon size={24} />
                              </div>
                              <div className="cmms-kpi-info">
                                <span className="cmms-kpi-label">{stat.label}</span>
                                <div className="cmms-kpi-row">
                                  <span className="cmms-kpi-value">{stat.value}</span>
                                  <span className={`cmms-kpi-change ${stat.change.startsWith('+') ? 'positive' : 'negative'}`}>
                                    {stat.change}
                                  </span>
                                </div>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Charts Row */}
                        <div className="cmms-charts-row">
                          <div className="cmms-chart-card">
                            <h3>OS por Tipo de Manutenção</h3>
                            <div className="cmms-donut-chart">
                              <div className="cmms-donut">
                                <svg viewBox="0 0 100 100">
                                  <circle cx="50" cy="50" r="40" fill="none" stroke="#2d2d3d" strokeWidth="12"/>
                                  <motion.circle 
                                    cx="50" cy="50" r="40" 
                                    fill="none" 
                                    stroke="#ef4444" 
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="175.84"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 175.84 }}
                                    transition={{ duration: 1 }}
                                  />
                                  <motion.circle 
                                    cx="50" cy="50" r="40" 
                                    fill="none" 
                                    stroke="#10b981" 
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="100.48"
                                    transform="rotate(-90 50 50)"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 100.48 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                  />
                                  <motion.circle 
                                    cx="50" cy="50" r="40" 
                                    fill="none" 
                                    stroke="#6366f1" 
                                    strokeWidth="12"
                                    strokeDasharray="251.2"
                                    strokeDashoffset="200.96"
                                    transform="rotate(70 50 50)"
                                    initial={{ strokeDashoffset: 251.2 }}
                                    animate={{ strokeDashoffset: 200.96 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                  />
                                </svg>
                              </div>
                              <div className="cmms-donut-legend">
                                <div className="cmms-legend-item">
                                  <span className="cmms-legend-dot" style={{ background: '#ef4444' }}></span>
                                  <span>Corretiva (30%)</span>
                                </div>
                                <div className="cmms-legend-item">
                                  <span className="cmms-legend-dot" style={{ background: '#10b981' }}></span>
                                  <span>Preventiva (60%)</span>
                                </div>
                                <div className="cmms-legend-item">
                                  <span className="cmms-legend-dot" style={{ background: '#6366f1' }}></span>
                                  <span>Preditiva (10%)</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="cmms-chart-card">
                            <h3>MTBF por Linha (horas)</h3>
                            <div className="cmms-bar-chart">
                              {[
                                { label: 'Linha 1', value: 847, max: 1000 },
                                { label: 'Linha 2', value: 623, max: 1000 },
                                { label: 'Linha 3', value: 912, max: 1000 },
                                { label: 'Linha 4', value: 756, max: 1000 },
                              ].map((item, idx) => (
                                <div key={idx} className="cmms-bar-item">
                                  <span className="cmms-bar-label">{item.label}</span>
                                  <div className="cmms-bar-track">
                                    <motion.div 
                                      className="cmms-bar-fill"
                                      initial={{ width: 0 }}
                                      animate={{ width: `${(item.value / item.max) * 100}%` }}
                                      transition={{ duration: 1, delay: idx * 0.1 }}
                                    />
                                  </div>
                                  <span className="cmms-bar-value">{item.value}h</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Recent Work Orders */}
                        <div className="cmms-recent-section">
                          <div className="cmms-recent-header">
                            <h3>Ordens de Serviço Recentes</h3>
                            <button className="cmms-link-btn" onClick={() => setActiveTab('workorders')}>
                              Ver todas <ArrowRight size={16} />
                            </button>
                          </div>
                          <div className="cmms-os-list">
                            {mockWorkOrders.slice(0, 3).map((os) => (
                              <div key={os.id} className="cmms-os-item">
                                <div className="cmms-os-main">
                                  <span className="cmms-os-id">{os.id}</span>
                                  <span className="cmms-os-equipment">{os.equipment}</span>
                                </div>
                                <div className="cmms-os-meta">
                                  <span className={`cmms-os-type ${os.type.toLowerCase()}`}>{os.type}</span>
                                  <span className={`cmms-os-priority ${os.priority.toLowerCase()}`}>{os.priority}</span>
                                  <span className={`cmms-os-status ${os.status.toLowerCase().replace(' ', '-')}`}>{os.status}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'workorders' && (
                      <motion.div 
                        key="workorders"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cmms-workorders"
                      >
                        <div className="cmms-page-header">
                          <h2>Ordens de Serviço</h2>
                          <button className="cmms-btn-primary">
                            <Plus size={18} />
                            Nova OS
                          </button>
                        </div>

                        <div className="cmms-filters">
                          <button className="cmms-filter-btn active">Todas</button>
                          <button className="cmms-filter-btn">Pendentes</button>
                          <button className="cmms-filter-btn">Em Andamento</button>
                          <button className="cmms-filter-btn">Concluídas</button>
                        </div>

                        <div className="cmms-table-container">
                          <table className="cmms-table">
                            <thead>
                              <tr>
                                <th>OS</th>
                                <th>Equipamento</th>
                                <th>Tipo</th>
                                <th>Prioridade</th>
                                <th>Status</th>
                                <th>Técnico</th>
                                <th>Data</th>
                              </tr>
                            </thead>
                            <tbody>
                              {mockWorkOrders.map((os) => (
                                <tr key={os.id} onClick={() => setSelectedOS(os)}>
                                  <td><strong>{os.id}</strong></td>
                                  <td>{os.equipment}</td>
                                  <td><span className={`cmms-badge-type ${os.type.toLowerCase()}`}>{os.type}</span></td>
                                  <td><span className={`cmms-badge-priority ${os.priority.toLowerCase()}`}>{os.priority}</span></td>
                                  <td><span className={`cmms-badge-status ${os.status.toLowerCase().replace(' ', '-')}`}>{os.status}</span></td>
                                  <td>{os.technician}</td>
                                  <td>{os.date}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'assets' && (
                      <motion.div 
                        key="assets"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cmms-assets"
                      >
                        <div className="cmms-page-header">
                          <h2>Gestão de Ativos</h2>
                          <button className="cmms-btn-primary">
                            <Plus size={18} />
                            Novo Ativo
                          </button>
                        </div>

                        <div className="cmms-assets-grid">
                          {mockAssets.map((asset) => (
                            <motion.div 
                              key={asset.id}
                              className="cmms-asset-card"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="cmms-asset-header">
                                <div className={`cmms-asset-status ${asset.status.toLowerCase()}`}>
                                  {asset.status === 'Operando' && <CheckCircle size={16} />}
                                  {asset.status === 'Manutenção' && <Wrench size={16} />}
                                  {asset.status === 'Parado' && <XCircle size={16} />}
                                  {asset.status}
                                </div>
                              </div>
                              <h3>{asset.name}</h3>
                              <p className="cmms-asset-location">📍 {asset.location}</p>
                              
                              <div className="cmms-asset-health">
                                <div className="cmms-health-header">
                                  <span>Saúde do Ativo</span>
                                  <span className={`cmms-health-value ${asset.health >= 80 ? 'good' : asset.health >= 60 ? 'warning' : 'critical'}`}>
                                    {asset.health}%
                                  </span>
                                </div>
                                <div className="cmms-health-bar">
                                  <motion.div 
                                    className={`cmms-health-fill ${asset.health >= 80 ? 'good' : asset.health >= 60 ? 'warning' : 'critical'}`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${asset.health}%` }}
                                    transition={{ duration: 1 }}
                                  />
                                </div>
                              </div>
                              
                              <div className="cmms-asset-footer">
                                <span>Última manutenção: {asset.lastMaintenance}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {(activeTab === 'preventive' || activeTab === 'inventory') && (
                      <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="cmms-coming-soon"
                      >
                        <div className="cmms-coming-soon-content">
                          <Settings size={48} />
                          <h3>Módulo {activeTab === 'preventive' ? 'Preventiva' : 'Estoque'}</h3>
                          <p>Esta é uma demonstração. O módulo completo está disponível na versão full.</p>
                          <Link to="/contato" className="cmms-btn-primary">
                            Solicitar Demo Completa
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="cmms-benefits">
          <div className="cmms-container">
            <motion.div 
              className="cmms-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cmms-section-tag">Benefícios</span>
              <h2>Resultados comprovados</h2>
            </motion.div>

            <div className="cmms-benefits-grid">
              {[
                { value: '+35%', label: 'Aumento na Eficiência', description: 'Manutenções mais rápidas e assertivas' },
                { value: '-40%', label: 'Redução de Paradas', description: 'Menos interrupções não programadas' },
                { value: '-25%', label: 'Economia em Custos', description: 'Otimização de recursos e peças' },
                { value: '2x', label: 'Vida Útil dos Ativos', description: 'Equipamentos duram mais tempo' },
              ].map((benefit, idx) => (
                <motion.div 
                  key={idx}
                  className="cmms-benefit-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="cmms-benefit-value">{benefit.value}</span>
                  <h3>{benefit.label}</h3>
                  <p>{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="cmms-tech">
          <div className="cmms-container">
            <motion.div 
              className="cmms-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="cmms-section-tag">Tecnologias</span>
              <h2>Stack de desenvolvimento</h2>
            </motion.div>

            <div className="cmms-tech-grid">
              {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Docker', 'Redis', 'MQTT', 'AWS'].map((tech, idx) => (
                <motion.div 
                  key={tech}
                  className="cmms-tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="cmms-cta">
          <div className="cmms-container">
            <motion.div 
              className="cmms-cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Pronto para otimizar sua manutenção?</h2>
              <p>Entre em contato e descubra como podemos ajudar sua indústria.</p>
              <div className="cmms-cta-buttons">
                <Link to="/contato" className="cmms-btn-primary">
                  Solicitar Proposta
                  <ArrowRight size={18} />
                </Link>
                <Link to="/projetos" className="cmms-btn-secondary">
                  Ver Outros Projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back Link */}
        <div className="cmms-back-link">
          <Link to="/projetos">
            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Voltar para Projetos
          </Link>
        </div>
      </div>
    </>
  );
};

export default CMMSIndustrial;
