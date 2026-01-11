// ============================================================================
// CONTA FÁCIL - Sistema para Contabilidade
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Calculator, FileText, TrendingUp, TrendingDown,
  DollarSign, Users, Building2, Calendar, PieChart, BarChart3,
  Download, Upload, Filter, Search, Plus, Eye, Edit, Trash2,
  Check, AlertCircle, Clock, ChevronRight, Shield, Zap,
  Receipt, Briefcase, Scale, Award, Target, Landmark
} from 'lucide-react';
import './ContaFacil.css';

// Serviços
const services = [
  { icon: Calculator, title: 'Contabilidade Empresarial', desc: 'Gestão contábil completa para sua empresa' },
  { icon: Receipt, title: 'Fiscal e Tributário', desc: 'Planejamento e otimização fiscal' },
  { icon: Users, title: 'Departamento Pessoal', desc: 'Folha de pagamento e obrigações trabalhistas' },
  { icon: FileText, title: 'Abertura de Empresas', desc: 'Assessoria para constituição de negócios' },
  { icon: Scale, title: 'Consultoria Tributária', desc: 'Análise e redução legal de impostos' },
  { icon: Briefcase, title: 'BPO Financeiro', desc: 'Terceirização do setor financeiro' }
];

// Estatísticas
const stats = [
  { value: '500+', label: 'Empresas Atendidas', icon: Building2 },
  { value: '15+', label: 'Anos de Experiência', icon: Award },
  { value: '98%', label: 'Satisfação', icon: Target },
  { value: '24h', label: 'Suporte', icon: Clock }
];

// Clientes Demo
const clientesDemo = [
  { id: 1, nome: 'Tech Solutions LTDA', cnpj: '12.345.678/0001-90', regime: 'Simples Nacional', status: 'Ativo', faturamento: 125000 },
  { id: 2, nome: 'Comércio ABC ME', cnpj: '23.456.789/0001-01', regime: 'Simples Nacional', status: 'Ativo', faturamento: 89000 },
  { id: 3, nome: 'Indústria XYZ S/A', cnpj: '34.567.890/0001-12', regime: 'Lucro Real', status: 'Ativo', faturamento: 890000 },
  { id: 4, nome: 'Consultoria Alfa EIRELI', cnpj: '45.678.901/0001-23', regime: 'Lucro Presumido', status: 'Pendente', faturamento: 210000 },
  { id: 5, nome: 'Serviços Beta LTDA', cnpj: '56.789.012/0001-34', regime: 'Simples Nacional', status: 'Ativo', faturamento: 156000 }
];

// Obrigações fiscais demo
const obrigacoes = [
  { id: 1, nome: 'DCTF Mensal', vencimento: '15/01/2025', status: 'entregue', empresa: 'Tech Solutions LTDA' },
  { id: 2, nome: 'EFD Contribuições', vencimento: '10/01/2025', status: 'entregue', empresa: 'Indústria XYZ S/A' },
  { id: 3, nome: 'GFIP/SEFIP', vencimento: '07/01/2025', status: 'pendente', empresa: 'Comércio ABC ME' },
  { id: 4, nome: 'DARF - PIS/COFINS', vencimento: '25/01/2025', status: 'pendente', empresa: 'Consultoria Alfa' },
  { id: 5, nome: 'DAS - Simples Nacional', vencimento: '20/01/2025', status: 'atrasado', empresa: 'Serviços Beta LTDA' }
];

// Dados do gráfico de receitas
const revenueData = [
  { month: 'Jan', receita: 450000, despesa: 380000 },
  { month: 'Fev', receita: 520000, despesa: 410000 },
  { month: 'Mar', receita: 480000, despesa: 395000 },
  { month: 'Abr', receita: 610000, despesa: 450000 },
  { month: 'Mai', receita: 580000, despesa: 420000 },
  { month: 'Jun', receita: 720000, despesa: 510000 }
];

const features = [
  { icon: Shield, title: 'Segurança Total', desc: 'Dados criptografados e backup diário' },
  { icon: Zap, title: 'Automação', desc: 'Processos automatizados e integrados' },
  { icon: BarChart3, title: 'Relatórios', desc: 'Dashboards e relatórios em tempo real' },
  { icon: Users, title: 'Multi-empresas', desc: 'Gerencie várias empresas em um só lugar' }
];

const ContaFacil = () => {
  const [activeTab, setActiveTab] = useState('clientes');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRegime, setFilterRegime] = useState('todos');

  const maxRevenue = Math.max(...revenueData.map(d => d.receita));

  const filteredClientes = clientesDemo.filter(c => 
    (filterRegime === 'todos' || c.regime === filterRegime) &&
    c.nome.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const scrollToDemo = () => {
    document.getElementById('conta-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>ContaFácil - Sistema para Contabilidade | Lucas Sousa</title>
        <meta name="description" content="Sistema completo para escritórios de contabilidade com gestão de clientes, obrigações fiscais e relatórios gerenciais." />
      </Helmet>

      <div className="conta-page">
        {/* Header */}
        <header className="conta-header">
          <div className="conta-header-content">
            <Link to="/projetos" className="conta-back-btn">
              <ArrowLeft size={20} />
            </Link>
            <div className="conta-logo">
              <span className="conta-logo-icon">📊</span>
              <span>Conta<strong>Fácil</strong></span>
            </div>
            <nav className="conta-nav">
              <a href="#servicos">Serviços</a>
              <a href="#conta-demo">Sistema</a>
              <Link to="/contato">Contato</Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="conta-hero">
          <div className="conta-hero-bg"></div>
          <div className="conta-hero-content">
            <motion.div 
              className="conta-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="conta-badge">
                <Calculator size={16} />
                Gestão Contábil Inteligente
              </span>
              <h1>Simplifique sua<br /><span>Contabilidade</span></h1>
              <p>
                Sistema completo para escritórios de contabilidade: gestão de clientes, 
                obrigações fiscais, folha de pagamento e muito mais.
              </p>
              
              <div className="conta-hero-features">
                {features.map((f, idx) => (
                  <div key={idx} className="conta-feature-mini">
                    <f.icon size={20} />
                    <div>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="conta-hero-buttons">
                <button className="conta-btn-primary" onClick={scrollToDemo}>
                  Ver Sistema
                  <ChevronRight size={18} />
                </button>
                <Link to="/contato" className="conta-btn-secondary">
                  Solicitar Demo
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="conta-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="conta-dashboard-preview">
                <div className="conta-preview-header">
                  <span>Dashboard Contábil</span>
                  <div className="conta-preview-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="conta-preview-content">
                  <div className="conta-preview-cards">
                    <div className="preview-card green">
                      <TrendingUp size={18} />
                      <span>Receitas</span>
                      <strong>R$ 720.000</strong>
                    </div>
                    <div className="preview-card red">
                      <TrendingDown size={18} />
                      <span>Despesas</span>
                      <strong>R$ 510.000</strong>
                    </div>
                  </div>
                  <div className="conta-preview-chart">
                    <div className="mini-chart">
                      {revenueData.slice(0, 4).map((d, i) => (
                        <div key={i} className="mini-bar" style={{ height: `${(d.receita / maxRevenue) * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="conta-stats">
          <div className="conta-container">
            <div className="conta-stats-grid">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="conta-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <stat.icon size={24} />
                  <span className="conta-stat-value">{stat.value}</span>
                  <span className="conta-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section className="conta-services" id="servicos">
          <div className="conta-container">
            <div className="conta-section-header">
              <h2>Nossos Serviços</h2>
              <p>Soluções completas para sua empresa</p>
            </div>
            <div className="conta-services-grid">
              {services.map((service, idx) => (
                <motion.div 
                  key={idx}
                  className="conta-service-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="conta-service-icon">
                    <service.icon size={28} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo */}
        <section className="conta-demo" id="conta-demo">
          <div className="conta-container">
            <div className="conta-section-header">
              <h2>📊 Painel de Gestão</h2>
              <p>Veja como o sistema funciona na prática</p>
            </div>

            {/* Dashboard Cards */}
            <div className="conta-dashboard-cards">
              <motion.div 
                className="conta-kpi-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="kpi-icon green">
                  <DollarSign size={24} />
                </div>
                <div className="kpi-info">
                  <span>Receita Total</span>
                  <strong>R$ 3.360.000</strong>
                  <div className="kpi-change positive">
                    <TrendingUp size={14} />
                    +12.5% vs mês anterior
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="conta-kpi-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                viewport={{ once: true }}
              >
                <div className="kpi-icon blue">
                  <Building2 size={24} />
                </div>
                <div className="kpi-info">
                  <span>Clientes Ativos</span>
                  <strong>247</strong>
                  <div className="kpi-change positive">
                    <TrendingUp size={14} />
                    +8 novos este mês
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="conta-kpi-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                viewport={{ once: true }}
              >
                <div className="kpi-icon orange">
                  <FileText size={24} />
                </div>
                <div className="kpi-info">
                  <span>Obrigações Pendentes</span>
                  <strong>23</strong>
                  <div className="kpi-change neutral">
                    <Clock size={14} />
                    Próximos 7 dias
                  </div>
                </div>
              </motion.div>

              <motion.div 
                className="conta-kpi-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                viewport={{ once: true }}
              >
                <div className="kpi-icon purple">
                  <PieChart size={24} />
                </div>
                <div className="kpi-info">
                  <span>Taxa de Cumprimento</span>
                  <strong>97.8%</strong>
                  <div className="kpi-change positive">
                    <Check size={14} />
                    Acima da meta
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Gráfico de Receitas */}
            <motion.div 
              className="conta-chart-section"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="conta-chart-header">
                <h3>📈 Receitas vs Despesas</h3>
                <div className="conta-chart-legend">
                  <span className="legend-item"><span className="dot green"></span> Receitas</span>
                  <span className="legend-item"><span className="dot red"></span> Despesas</span>
                </div>
              </div>
              <div className="conta-chart">
                {revenueData.map((data, idx) => (
                  <motion.div 
                    key={idx} 
                    className="conta-chart-bar"
                    initial={{ height: 0 }}
                    whileInView={{ height: 'auto' }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                  >
                    <div className="bar-group">
                      <motion.div 
                        className="bar receita"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(data.receita / maxRevenue) * 180}px` }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.2, duration: 0.6, ease: "easeOut" }}
                      >
                        <span className="bar-value">R$ {(data.receita / 1000).toFixed(0)}K</span>
                      </motion.div>
                      <motion.div 
                        className="bar despesa"
                        initial={{ height: 0 }}
                        whileInView={{ height: `${(data.despesa / maxRevenue) * 180}px` }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1 + 0.3, duration: 0.6, ease: "easeOut" }}
                      >
                        <span className="bar-value">R$ {(data.despesa / 1000).toFixed(0)}K</span>
                      </motion.div>
                    </div>
                    <span className="bar-label">{data.month}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Tabs */}
            <div className="conta-tabs">
              <button 
                className={activeTab === 'clientes' ? 'active' : ''}
                onClick={() => setActiveTab('clientes')}
              >
                <Building2 size={18} />
                Clientes
              </button>
              <button 
                className={activeTab === 'obrigacoes' ? 'active' : ''}
                onClick={() => setActiveTab('obrigacoes')}
              >
                <FileText size={18} />
                Obrigações
              </button>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'clientes' && (
                <motion.div 
                  key="clientes"
                  className="conta-tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="conta-filters">
                    <div className="conta-search">
                      <Search size={18} />
                      <input 
                        type="text" 
                        placeholder="Buscar cliente..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select 
                      value={filterRegime} 
                      onChange={(e) => setFilterRegime(e.target.value)}
                      className="conta-select"
                    >
                      <option value="todos">Todos os Regimes</option>
                      <option value="Simples Nacional">Simples Nacional</option>
                      <option value="Lucro Presumido">Lucro Presumido</option>
                      <option value="Lucro Real">Lucro Real</option>
                    </select>
                    <button className="conta-btn-add">
                      <Plus size={18} />
                      Novo Cliente
                    </button>
                  </div>

                  <div className="conta-table-wrapper">
                    <table className="conta-table">
                      <thead>
                        <tr>
                          <th>Empresa</th>
                          <th>CNPJ</th>
                          <th>Regime</th>
                          <th>Faturamento</th>
                          <th>Status</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredClientes.map(cliente => (
                          <tr key={cliente.id}>
                            <td>
                              <div className="empresa-cell">
                                <span className="empresa-icon">🏢</span>
                                <span>{cliente.nome}</span>
                              </div>
                            </td>
                            <td className="cnpj">{cliente.cnpj}</td>
                            <td>
                              <span className={`regime-badge ${cliente.regime.toLowerCase().replace(' ', '-')}`}>
                                {cliente.regime}
                              </span>
                            </td>
                            <td className="faturamento">
                              R$ {cliente.faturamento.toLocaleString('pt-BR')}
                            </td>
                            <td>
                              <span className={`status-badge ${cliente.status.toLowerCase()}`}>
                                {cliente.status}
                              </span>
                            </td>
                            <td>
                              <div className="conta-actions">
                                <button className="action-btn view"><Eye size={16} /></button>
                                <button className="action-btn edit"><Edit size={16} /></button>
                                <button className="action-btn delete"><Trash2 size={16} /></button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              )}

              {activeTab === 'obrigacoes' && (
                <motion.div 
                  key="obrigacoes"
                  className="conta-tab-content"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <div className="conta-obrigacoes-list">
                    {obrigacoes.map((obr, idx) => (
                      <motion.div 
                        key={obr.id}
                        className={`conta-obrigacao-card ${obr.status}`}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                      >
                        <div className="obrigacao-status-icon">
                          {obr.status === 'entregue' && <Check size={20} />}
                          {obr.status === 'pendente' && <Clock size={20} />}
                          {obr.status === 'atrasado' && <AlertCircle size={20} />}
                        </div>
                        <div className="obrigacao-info">
                          <h4>{obr.nome}</h4>
                          <span className="obrigacao-empresa">{obr.empresa}</span>
                        </div>
                        <div className="obrigacao-vencimento">
                          <Calendar size={14} />
                          <span>{obr.vencimento}</span>
                        </div>
                        <span className={`obrigacao-status ${obr.status}`}>
                          {obr.status === 'entregue' && 'Entregue'}
                          {obr.status === 'pendente' && 'Pendente'}
                          {obr.status === 'atrasado' && 'Atrasado'}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

        {/* CTA */}
        <section className="conta-cta">
          <div className="conta-container">
            <motion.div 
              className="conta-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="conta-cta-text">
                <h2>Quer um sistema assim para seu escritório?</h2>
                <p>Entre em contato e modernize sua contabilidade</p>
              </div>
              <div className="conta-cta-buttons">
                <Link to="/contato" className="conta-cta-primary">
                  Solicitar Orçamento
                </Link>
                <Link to="/projetos" className="conta-cta-secondary">
                  Ver Outros Projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ContaFacil;
