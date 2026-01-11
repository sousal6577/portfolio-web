// ============================================================================
// JURIS CONSULT - Sistema para Escritório de Advocacia
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, Scale, FileText, Users, Calendar, Clock,
  Shield, Award, Phone, Mail, MapPin, ChevronRight,
  Briefcase, BookOpen, MessageSquare, CheckCircle,
  Building, Gavel, FileSearch, TrendingUp, BarChart3,
  PieChart, Filter, Search, Plus, Eye, Download
} from 'lucide-react';
import './JurisConsult.css';

// Dados de Serviços
const services = [
  {
    id: 1,
    icon: Building,
    title: 'Direito Empresarial',
    description: 'Constituição de empresas, contratos, fusões e aquisições.',
    areas: ['Contratos', 'Societário', 'M&A', 'Compliance']
  },
  {
    id: 2,
    icon: Users,
    title: 'Direito Trabalhista',
    description: 'Consultoria e contencioso trabalhista para empresas e colaboradores.',
    areas: ['Reclamações', 'Acordos', 'Consultoria', 'FGTS']
  },
  {
    id: 3,
    icon: Scale,
    title: 'Direito Civil',
    description: 'Ações cíveis, contratos, família e sucessões.',
    areas: ['Família', 'Sucessões', 'Contratos', 'Danos']
  },
  {
    id: 4,
    icon: Gavel,
    title: 'Direito Tributário',
    description: 'Planejamento tributário e defesa em processos fiscais.',
    areas: ['Planejamento', 'Contencioso', 'ICMS', 'IR']
  }
];

// Advogados
const team = [
  {
    id: 1,
    name: 'Dr. Ricardo Mendes',
    role: 'Sócio Fundador',
    specialty: 'Direito Empresarial',
    oab: 'OAB/SP 123.456',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=300&fit=crop',
    experience: '25 anos'
  },
  {
    id: 2,
    name: 'Dra. Fernanda Costa',
    role: 'Sócia',
    specialty: 'Direito Trabalhista',
    oab: 'OAB/SP 234.567',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    experience: '18 anos'
  },
  {
    id: 3,
    name: 'Dr. André Lima',
    role: 'Associado Sênior',
    specialty: 'Direito Tributário',
    oab: 'OAB/SP 345.678',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    experience: '12 anos'
  },
  {
    id: 4,
    name: 'Dra. Carla Ribeiro',
    role: 'Associada',
    specialty: 'Direito Civil',
    oab: 'OAB/SP 456.789',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop',
    experience: '8 anos'
  }
];

// Processos Mock
const cases = [
  { id: 'PRO-2024-001', client: 'Tech Solutions Ltda', type: 'Trabalhista', status: 'Em andamento', value: 'R$ 150.000', date: '15/01/2024', priority: 'Alta' },
  { id: 'PRO-2024-002', client: 'Maria Silva', type: 'Civil', status: 'Aguardando audiência', value: 'R$ 80.000', date: '10/01/2024', priority: 'Média' },
  { id: 'PRO-2024-003', client: 'Indústrias ABC S.A.', type: 'Tributário', status: 'Recurso', value: 'R$ 2.500.000', date: '05/01/2024', priority: 'Crítica' },
  { id: 'PRO-2024-004', client: 'João Santos', type: 'Família', status: 'Concluído', value: 'R$ 45.000', date: '20/12/2023', priority: 'Normal' },
  { id: 'PRO-2024-005', client: 'Construtora XYZ', type: 'Empresarial', status: 'Em andamento', value: 'R$ 500.000', date: '18/01/2024', priority: 'Alta' }
];

// KPIs
const kpis = [
  { label: 'Processos Ativos', value: '247', change: '+12', icon: FileText, color: '#6366f1' },
  { label: 'Taxa de Sucesso', value: '94%', change: '+2%', icon: TrendingUp, color: '#10b981' },
  { label: 'Clientes Ativos', value: '182', change: '+8', icon: Users, color: '#f59e0b' },
  { label: 'Valor em Causas', value: 'R$ 45M', change: '+R$ 5M', icon: BarChart3, color: '#ec4899' }
];

const stats = [
  { value: '30+', label: 'Anos de Experiência' },
  { value: '2.500+', label: 'Casos Resolvidos' },
  { value: '98%', label: 'Clientes Satisfeitos' },
  { value: '150+', label: 'Empresas Atendidas' }
];

const JurisConsult = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedCase, setSelectedCase] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredCases = filterStatus === 'all' 
    ? cases 
    : cases.filter(c => c.status.toLowerCase().includes(filterStatus));

  const scrollToDemo = () => {
    document.getElementById('juris-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>JurisConsult - Sistema para Advocacia | Lucas Sousa</title>
        <meta name="description" content="Sistema completo para escritórios de advocacia com gestão de processos, clientes e documentos." />
      </Helmet>

      <div className="juris-page">
        {/* Header */}
        <header className="juris-header">
          <div className="juris-header-content">
            <Link to="/projetos" className="juris-back-btn">
              <ArrowLeft size={20} />
            </Link>
            <div className="juris-logo">
              <Scale size={24} />
              <span>JurisConsult</span>
            </div>
            <nav className="juris-nav">
              <a href="#servicos">Serviços</a>
              <a href="#equipe">Equipe</a>
              <a href="#juris-demo">Sistema</a>
              <Link to="/contato" className="juris-nav-btn">Consulta</Link>
            </nav>
          </div>
        </header>

        {/* Hero */}
        <section className="juris-hero">
          <div className="juris-hero-bg">
            <div className="juris-hero-gradient"></div>
            <div className="juris-hero-overlay"></div>
          </div>
          
          <div className="juris-hero-content">
            <motion.div 
              className="juris-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="juris-badge">
                <Shield size={16} />
                Advocacia de Excelência
              </span>
              <h1>Justiça com<br />Dedicação</h1>
              <p className="juris-tagline">
                Sistema completo para gestão de escritórios de advocacia: 
                processos, prazos, documentos e clientes em uma única plataforma.
              </p>
              
              <div className="juris-hero-stats">
                {stats.map((stat, idx) => (
                  <div key={idx} className="juris-hero-stat">
                    <span className="juris-hero-stat-value">{stat.value}</span>
                    <span className="juris-hero-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="juris-hero-buttons">
                <button className="juris-btn-primary" onClick={scrollToDemo}>
                  Ver Sistema
                  <ChevronRight size={18} />
                </button>
                <Link to="/contato" className="juris-btn-secondary">
                  <Phone size={18} />
                  Agendar Consulta
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="juris-hero-visual"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="juris-preview-card">
                <div className="juris-preview-header">
                  <span>Dashboard Jurídico</span>
                  <div className="juris-preview-dots">
                    <span></span><span></span><span></span>
                  </div>
                </div>
                <div className="juris-preview-content">
                  <div className="juris-preview-kpis">
                    <div className="juris-preview-kpi">
                      <FileText size={20} />
                      <div>
                        <span className="kpi-value">247</span>
                        <span className="kpi-label">Processos</span>
                      </div>
                    </div>
                    <div className="juris-preview-kpi">
                      <TrendingUp size={20} />
                      <div>
                        <span className="kpi-value">94%</span>
                        <span className="kpi-label">Sucesso</span>
                      </div>
                    </div>
                  </div>
                  <div className="juris-preview-chart">
                    <div className="chart-bar" style={{ height: '60%' }}></div>
                    <div className="chart-bar" style={{ height: '80%' }}></div>
                    <div className="chart-bar" style={{ height: '45%' }}></div>
                    <div className="chart-bar" style={{ height: '90%' }}></div>
                    <div className="chart-bar" style={{ height: '70%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Services */}
        <section className="juris-services" id="servicos">
          <div className="juris-container">
            <motion.div 
              className="juris-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Áreas de Atuação</h2>
              <p>Expertise em diversas áreas do Direito</p>
            </motion.div>

            <div className="juris-services-grid">
              {services.map((service, idx) => (
                <motion.div 
                  key={service.id}
                  className="juris-service-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="juris-service-icon">
                    <service.icon size={28} />
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="juris-service-areas">
                    {service.areas.map((area, i) => (
                      <span key={i} className="juris-area-tag">{area}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="juris-team" id="equipe">
          <div className="juris-container">
            <motion.div 
              className="juris-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Nossa Equipe</h2>
              <p>Profissionais qualificados e comprometidos</p>
            </motion.div>

            <div className="juris-team-grid">
              {team.map((member, idx) => (
                <motion.div 
                  key={member.id}
                  className="juris-team-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="juris-team-image">
                    <img src={member.image} alt={member.name} />
                  </div>
                  <div className="juris-team-info">
                    <h3>{member.name}</h3>
                    <span className="juris-team-role">{member.role}</span>
                    <span className="juris-team-specialty">{member.specialty}</span>
                    <div className="juris-team-details">
                      <span>{member.oab}</span>
                      <span>{member.experience}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo - Sistema */}
        <section className="juris-demo" id="juris-demo">
          <div className="juris-container">
            <motion.div 
              className="juris-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>⚖️ Sistema de Gestão</h2>
              <p>Plataforma completa para seu escritório</p>
            </motion.div>

            <div className="juris-demo-container">
              {/* Sidebar */}
              <aside className="juris-demo-sidebar">
                <div className="juris-sidebar-brand">
                  <Scale size={20} />
                  <span>JurisConsult</span>
                </div>
                <nav className="juris-sidebar-nav">
                  {[
                    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                    { id: 'processos', icon: FileText, label: 'Processos' },
                    { id: 'clientes', icon: Users, label: 'Clientes' },
                    { id: 'agenda', icon: Calendar, label: 'Agenda' },
                    { id: 'documentos', icon: FileSearch, label: 'Documentos' }
                  ].map(item => (
                    <button 
                      key={item.id}
                      className={`juris-nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon size={18} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </aside>

              {/* Main Content */}
              <main className="juris-demo-main">
                <div className="juris-demo-topbar">
                  <h3>{activeTab === 'dashboard' ? 'Dashboard' : activeTab === 'processos' ? 'Processos' : 'Sistema'}</h3>
                  <div className="juris-topbar-actions">
                    <div className="juris-search-box">
                      <Search size={16} />
                      <input type="text" placeholder="Buscar..." />
                    </div>
                    <button className="juris-add-btn">
                      <Plus size={16} />
                      Novo Processo
                    </button>
                  </div>
                </div>

                <div className="juris-demo-content">
                  {activeTab === 'dashboard' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* KPIs */}
                      <div className="juris-kpi-grid">
                        {kpis.map((kpi, idx) => (
                          <motion.div 
                            key={idx}
                            className="juris-kpi-card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                          >
                            <div className="juris-kpi-icon" style={{ background: `${kpi.color}20`, color: kpi.color }}>
                              <kpi.icon size={20} />
                            </div>
                            <div className="juris-kpi-info">
                              <span className="juris-kpi-value">{kpi.value}</span>
                              <span className="juris-kpi-label">{kpi.label}</span>
                            </div>
                            <span className="juris-kpi-change" style={{ color: kpi.color }}>
                              {kpi.change}
                            </span>
                          </motion.div>
                        ))}
                      </div>

                      {/* Charts */}
                      <div className="juris-charts-grid">
                        <div className="juris-chart-card">
                          <h4>Processos por Área</h4>
                          <div className="juris-pie-chart">
                            <div className="pie-segment" style={{ '--value': '35', '--color': '#6366f1' }}></div>
                            <div className="pie-center">
                              <span>247</span>
                              <small>Total</small>
                            </div>
                          </div>
                          <div className="juris-chart-legend">
                            <span><i style={{ background: '#6366f1' }}></i> Trabalhista (35%)</span>
                            <span><i style={{ background: '#10b981' }}></i> Civil (28%)</span>
                            <span><i style={{ background: '#f59e0b' }}></i> Tributário (22%)</span>
                            <span><i style={{ background: '#ec4899' }}></i> Empresarial (15%)</span>
                          </div>
                        </div>

                        <div className="juris-chart-card">
                          <h4>Evolução Mensal</h4>
                          <div className="juris-bar-chart">
                            {[65, 78, 52, 90, 75, 88].map((val, idx) => (
                              <motion.div 
                                key={idx}
                                className="bar-column"
                                initial={{ height: 0 }}
                                whileInView={{ height: `${val}%` }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                viewport={{ once: true }}
                              >
                                <span>{val}</span>
                              </motion.div>
                            ))}
                          </div>
                          <div className="juris-bar-labels">
                            <span>Jul</span><span>Ago</span><span>Set</span>
                            <span>Out</span><span>Nov</span><span>Dez</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'processos' && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="juris-filters">
                        <button 
                          className={`juris-filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
                          onClick={() => setFilterStatus('all')}
                        >
                          Todos
                        </button>
                        <button 
                          className={`juris-filter-btn ${filterStatus === 'andamento' ? 'active' : ''}`}
                          onClick={() => setFilterStatus('andamento')}
                        >
                          Em Andamento
                        </button>
                        <button 
                          className={`juris-filter-btn ${filterStatus === 'concluído' ? 'active' : ''}`}
                          onClick={() => setFilterStatus('concluído')}
                        >
                          Concluídos
                        </button>
                      </div>

                      <div className="juris-table-container">
                        <table className="juris-table">
                          <thead>
                            <tr>
                              <th>Processo</th>
                              <th>Cliente</th>
                              <th>Tipo</th>
                              <th>Status</th>
                              <th>Valor</th>
                              <th>Ações</th>
                            </tr>
                          </thead>
                          <tbody>
                            {filteredCases.map((c, idx) => (
                              <motion.tr 
                                key={c.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: idx * 0.05 }}
                              >
                                <td><strong>{c.id}</strong></td>
                                <td>{c.client}</td>
                                <td><span className="juris-type-badge">{c.type}</span></td>
                                <td>
                                  <span className={`juris-status-badge ${c.status.toLowerCase().replace(/ /g, '-')}`}>
                                    {c.status}
                                  </span>
                                </td>
                                <td>{c.value}</td>
                                <td>
                                  <div className="juris-actions">
                                    <button title="Ver detalhes"><Eye size={16} /></button>
                                    <button title="Download"><Download size={16} /></button>
                                  </div>
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </motion.div>
                  )}

                  {activeTab !== 'dashboard' && activeTab !== 'processos' && (
                    <div className="juris-coming-soon">
                      <BookOpen size={48} />
                      <h4>Módulo {activeTab}</h4>
                      <p>Esta funcionalidade está em desenvolvimento</p>
                    </div>
                  )}
                </div>
              </main>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="juris-cta">
          <div className="juris-container">
            <motion.div 
              className="juris-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Precisa de assessoria jurídica?</h2>
              <p>Entre em contato para uma consulta inicial gratuita</p>
              <div className="juris-cta-buttons">
                <Link to="/contato" className="juris-cta-primary">
                  <Phone size={20} />
                  Agendar Consulta
                </Link>
                <a href="mailto:contato@jurisconsult.com" className="juris-cta-secondary">
                  <Mail size={20} />
                  Enviar Email
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JurisConsult;
