// ============================================================================
// FITPRO ACADEMY - Sistema de Gestão para Academias
// Página demonstrativa completa e funcional
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Dumbbell, Users, Calendar, CreditCard, TrendingUp, Activity,
  ChevronRight, Star, Play, Check, ArrowRight, Menu, X,
  BarChart3, Clock, Target, Award, Heart, Zap, Bell,
  User, Search, Plus, Filter, MoreVertical, Edit, Trash2
} from 'lucide-react';
import './FitProAcademy.css';

// Mock Data para demonstração
const mockStudents = [
  { id: 1, name: 'João Silva', plan: 'Premium', status: 'active', avatar: '👨', lastCheckIn: '2h atrás', progress: 78 },
  { id: 2, name: 'Maria Santos', plan: 'Basic', status: 'active', avatar: '👩', lastCheckIn: '1d atrás', progress: 45 },
  { id: 3, name: 'Pedro Costa', plan: 'Premium', status: 'pending', avatar: '👨‍🦱', lastCheckIn: '3d atrás', progress: 92 },
  { id: 4, name: 'Ana Oliveira', plan: 'VIP', status: 'active', avatar: '👩‍🦰', lastCheckIn: '5h atrás', progress: 67 },
  { id: 5, name: 'Carlos Lima', plan: 'Basic', status: 'inactive', avatar: '👴', lastCheckIn: '1w atrás', progress: 23 },
];

const mockWorkouts = [
  { id: 1, name: 'Treino A - Peito/Tríceps', exercises: 8, duration: '45min', difficulty: 'Intermediário' },
  { id: 2, name: 'Treino B - Costas/Bíceps', exercises: 7, duration: '50min', difficulty: 'Avançado' },
  { id: 3, name: 'Treino C - Pernas', exercises: 10, duration: '60min', difficulty: 'Iniciante' },
  { id: 4, name: 'Treino D - Ombros/Abdômen', exercises: 9, duration: '40min', difficulty: 'Intermediário' },
];

const mockStats = [
  { label: 'Alunos Ativos', value: '1.247', change: '+12%', icon: Users, color: '#6366f1' },
  { label: 'Check-ins Hoje', value: '89', change: '+8%', icon: Activity, color: '#10b981' },
  { label: 'Receita Mensal', value: 'R$ 45.8K', change: '+23%', icon: CreditCard, color: '#f59e0b' },
  { label: 'Taxa de Retenção', value: '94%', change: '+5%', icon: TrendingUp, color: '#ec4899' },
];

const features = [
  {
    icon: Users,
    title: 'Gestão de Alunos',
    description: 'Cadastro completo, histórico de treinos, evolução física e controle de frequência em um só lugar.'
  },
  {
    icon: Dumbbell,
    title: 'Treinos Personalizados',
    description: 'Crie fichas de treino individualizadas com vídeos demonstrativos e progressão automática.'
  },
  {
    icon: CreditCard,
    title: 'Gestão Financeira',
    description: 'Controle de mensalidades, cobranças automáticas, relatórios financeiros e integração com gateways.'
  },
  {
    icon: Calendar,
    title: 'Agendamento',
    description: 'Sistema de agendamento para aulas, avaliações físicas e reserva de equipamentos.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Avançado',
    description: 'Dashboards em tempo real com métricas de performance, retenção e crescimento.'
  },
  {
    icon: Bell,
    title: 'Notificações',
    description: 'Comunicação automatizada via push, email e WhatsApp para engajamento dos alunos.'
  }
];

const testimonials = [
  {
    name: 'Ricardo Mendes',
    role: 'Proprietário - Academia PowerFit',
    content: 'Aumentamos nossa retenção em 35% após implementar o FitPro. O app dos alunos é sensacional!',
    avatar: '💪',
    rating: 5
  },
  {
    name: 'Fernanda Lopes',
    role: 'Gerente - CrossFit Elite',
    content: 'A gestão financeira automatizada me economiza 20 horas por mês. Simplesmente incrível.',
    avatar: '🏋️',
    rating: 5
  },
  {
    name: 'Marcos Ribeiro',
    role: 'Personal Trainer',
    content: 'Meus alunos adoram acompanhar o progresso pelo app. A fidelização nunca foi tão alta.',
    avatar: '🎯',
    rating: 5
  }
];

const FitProAcademy = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDemo, setShowDemo] = useState(false);

  // Simular carregamento de dados
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const filteredStudents = mockStudents.filter(s => 
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>FitPro Academy - Sistema de Gestão para Academias | Lucas Sousa</title>
        <meta name="description" content="Sistema completo de gestão para academias com controle de alunos, treinos personalizados e gestão financeira." />
      </Helmet>

      <div className="fitpro-page">
        {/* Hero Section */}
        <section className="fitpro-hero">
          <div className="fitpro-hero-bg">
            <div className="fitpro-hero-gradient"></div>
            <div className="fitpro-hero-pattern"></div>
          </div>
          
          <div className="fitpro-hero-content">
            <motion.div 
              className="fitpro-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="fitpro-badge">
                <Dumbbell size={16} />
                Projeto Demonstrativo
              </span>
              <h1>FitPro Academy</h1>
              <p className="fitpro-tagline">
                Sistema completo de gestão para academias e estúdios fitness
              </p>
              <p className="fitpro-description">
                Gerencie alunos, treinos, pagamentos e métricas em uma plataforma integrada. 
                App mobile para seus alunos acompanharem seu progresso.
              </p>
              
              <div className="fitpro-hero-stats">
                <div className="fitpro-stat-item">
                  <span className="fitpro-stat-value">5.000+</span>
                  <span className="fitpro-stat-label">Academias</span>
                </div>
                <div className="fitpro-stat-item">
                  <span className="fitpro-stat-value">500K+</span>
                  <span className="fitpro-stat-label">Alunos</span>
                </div>
                <div className="fitpro-stat-item">
                  <span className="fitpro-stat-value">99.9%</span>
                  <span className="fitpro-stat-label">Uptime</span>
                </div>
              </div>

              <div className="fitpro-hero-buttons">
                <button 
                  className="fitpro-btn-primary"
                  onClick={() => {
                    const demoSection = document.getElementById('fitpro-demo');
                    if (demoSection) demoSection.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <Play size={18} />
                  Ver Demo Interativa
                </button>
                <Link to="/contato" className="fitpro-btn-secondary">
                  Solicitar Orçamento
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="fitpro-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="fitpro-mockup">
                <div className="fitpro-mockup-header">
                  <div className="fitpro-mockup-dots">
                    <span></span><span></span><span></span>
                  </div>
                  <span className="fitpro-mockup-title">FitPro Dashboard</span>
                </div>
                <div className="fitpro-mockup-content">
                  <div className="fitpro-mini-stats">
                    {mockStats.slice(0, 2).map((stat, idx) => (
                      <div key={idx} className="fitpro-mini-stat">
                        <stat.icon size={20} style={{ color: stat.color }} />
                        <div>
                          <span className="value">{stat.value}</span>
                          <span className="label">{stat.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="fitpro-mini-chart">
                    <div className="chart-bars">
                      {[65, 80, 45, 90, 70, 85, 55].map((h, i) => (
                        <motion.div 
                          key={i} 
                          className="chart-bar"
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: 0.5 + i * 0.1 }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="fitpro-features">
          <div className="fitpro-container">
            <motion.div 
              className="fitpro-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="fitpro-section-tag">Recursos</span>
              <h2>Tudo que sua academia precisa</h2>
              <p>Funcionalidades completas para transformar a gestão do seu negócio fitness</p>
            </motion.div>

            <div className="fitpro-features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="fitpro-feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="fitpro-feature-icon">
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
        <section id="fitpro-demo" className="fitpro-demo-section">
          <div className="fitpro-container">
            <motion.div 
              className="fitpro-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="fitpro-section-tag">Demo Interativa</span>
              <h2>Experimente o sistema</h2>
              <p>Navegue pelo painel administrativo e veja como funciona na prática</p>
            </motion.div>

            <motion.div 
              className="fitpro-demo-container"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Sidebar */}
              <div className={`fitpro-demo-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
                <div className="fitpro-demo-logo">
                  <Dumbbell size={24} />
                  <span>FitPro</span>
                </div>
                
                <nav className="fitpro-demo-nav">
                  {[
                    { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
                    { id: 'students', icon: Users, label: 'Alunos' },
                    { id: 'workouts', icon: Dumbbell, label: 'Treinos' },
                    { id: 'schedule', icon: Calendar, label: 'Agenda' },
                    { id: 'finance', icon: CreditCard, label: 'Financeiro' },
                  ].map(item => (
                    <button
                      key={item.id}
                      className={`fitpro-nav-item ${activeTab === item.id ? 'active' : ''}`}
                      onClick={() => setActiveTab(item.id)}
                    >
                      <item.icon size={20} />
                      <span>{item.label}</span>
                    </button>
                  ))}
                </nav>
              </div>

              {/* Main Content */}
              <div className="fitpro-demo-main">
                {/* Top Bar */}
                <div className="fitpro-demo-topbar">
                  <button 
                    className="fitpro-menu-toggle"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                  >
                    {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                  </button>
                  
                  <div className="fitpro-search">
                    <Search size={18} />
                    <input 
                      type="text" 
                      placeholder="Buscar..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="fitpro-topbar-actions">
                    <button className="fitpro-icon-btn">
                      <Bell size={20} />
                      <span className="notification-dot"></span>
                    </button>
                    <div className="fitpro-user-avatar">LS</div>
                  </div>
                </div>

                {/* Content Area */}
                <div className="fitpro-demo-content">
                  <AnimatePresence mode="wait">
                    {activeTab === 'dashboard' && (
                      <motion.div 
                        key="dashboard"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fitpro-dashboard"
                      >
                        <h2>Dashboard</h2>
                        
                        {/* Stats Grid */}
                        <div className="fitpro-stats-grid">
                          {mockStats.map((stat, idx) => (
                            <motion.div 
                              key={idx} 
                              className="fitpro-stat-card"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.1 }}
                            >
                              <div className="fitpro-stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                                <stat.icon size={24} />
                              </div>
                              <div className="fitpro-stat-info">
                                <span className="fitpro-stat-label">{stat.label}</span>
                                <span className="fitpro-stat-value">{stat.value}</span>
                                <span className="fitpro-stat-change positive">{stat.change}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>

                        {/* Chart Section */}
                        <div className="fitpro-chart-section">
                          <div className="fitpro-chart-card">
                            <h3>Check-ins da Semana</h3>
                            <div className="fitpro-chart">
                              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => (
                                <div key={day} className="fitpro-chart-column">
                                  <motion.div 
                                    className="fitpro-chart-bar"
                                    initial={{ height: 0 }}
                                    animate={{ height: `${[65, 80, 45, 90, 70, 85, 30][idx]}%` }}
                                    transition={{ delay: 0.3 + idx * 0.1 }}
                                  />
                                  <span>{day}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="fitpro-recent-activity">
                            <h3>Atividade Recente</h3>
                            <div className="fitpro-activity-list">
                              {[
                                { icon: User, text: 'João Silva fez check-in', time: '2min' },
                                { icon: CreditCard, text: 'Pagamento recebido - R$ 199', time: '15min' },
                                { icon: Dumbbell, text: 'Novo treino criado', time: '1h' },
                                { icon: Users, text: 'Nova matrícula - Maria Santos', time: '2h' },
                              ].map((activity, idx) => (
                                <div key={idx} className="fitpro-activity-item">
                                  <div className="fitpro-activity-icon">
                                    <activity.icon size={16} />
                                  </div>
                                  <span className="fitpro-activity-text">{activity.text}</span>
                                  <span className="fitpro-activity-time">{activity.time}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'students' && (
                      <motion.div 
                        key="students"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fitpro-students"
                      >
                        <div className="fitpro-page-header">
                          <h2>Alunos</h2>
                          <button className="fitpro-btn-primary">
                            <Plus size={18} />
                            Novo Aluno
                          </button>
                        </div>

                        <div className="fitpro-table-container">
                          <table className="fitpro-table">
                            <thead>
                              <tr>
                                <th>Aluno</th>
                                <th>Plano</th>
                                <th>Status</th>
                                <th>Último Check-in</th>
                                <th>Progresso</th>
                                <th>Ações</th>
                              </tr>
                            </thead>
                            <tbody>
                              {filteredStudents.map((student) => (
                                <tr key={student.id}>
                                  <td>
                                    <div className="fitpro-student-info">
                                      <span className="fitpro-student-avatar">{student.avatar}</span>
                                      <span>{student.name}</span>
                                    </div>
                                  </td>
                                  <td><span className={`fitpro-plan-badge ${student.plan.toLowerCase()}`}>{student.plan}</span></td>
                                  <td><span className={`fitpro-status-badge ${student.status}`}>{student.status}</span></td>
                                  <td>{student.lastCheckIn}</td>
                                  <td>
                                    <div className="fitpro-progress-bar">
                                      <div className="fitpro-progress-fill" style={{ width: `${student.progress}%` }}></div>
                                      <span>{student.progress}%</span>
                                    </div>
                                  </td>
                                  <td>
                                    <div className="fitpro-actions">
                                      <button className="fitpro-action-btn"><Edit size={16} /></button>
                                      <button className="fitpro-action-btn"><Trash2 size={16} /></button>
                                    </div>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </motion.div>
                    )}

                    {activeTab === 'workouts' && (
                      <motion.div 
                        key="workouts"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fitpro-workouts"
                      >
                        <div className="fitpro-page-header">
                          <h2>Treinos</h2>
                          <button className="fitpro-btn-primary">
                            <Plus size={18} />
                            Novo Treino
                          </button>
                        </div>

                        <div className="fitpro-workouts-grid">
                          {mockWorkouts.map((workout) => (
                            <motion.div 
                              key={workout.id} 
                              className="fitpro-workout-card"
                              whileHover={{ scale: 1.02 }}
                            >
                              <div className="fitpro-workout-header">
                                <Dumbbell size={24} />
                                <span className={`fitpro-difficulty ${workout.difficulty.toLowerCase()}`}>
                                  {workout.difficulty}
                                </span>
                              </div>
                              <h3>{workout.name}</h3>
                              <div className="fitpro-workout-meta">
                                <span><Target size={14} /> {workout.exercises} exercícios</span>
                                <span><Clock size={14} /> {workout.duration}</span>
                              </div>
                              <button className="fitpro-workout-btn">Ver Detalhes</button>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {(activeTab === 'schedule' || activeTab === 'finance') && (
                      <motion.div 
                        key={activeTab}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fitpro-coming-soon"
                      >
                        <div className="fitpro-coming-soon-content">
                          <Calendar size={48} />
                          <h3>Módulo {activeTab === 'schedule' ? 'Agenda' : 'Financeiro'}</h3>
                          <p>Esta é uma demonstração. O módulo completo está disponível na versão full.</p>
                          <Link to="/contato" className="fitpro-btn-primary">
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

        {/* Testimonials */}
        <section className="fitpro-testimonials">
          <div className="fitpro-container">
            <motion.div 
              className="fitpro-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="fitpro-section-tag">Depoimentos</span>
              <h2>O que nossos clientes dizem</h2>
            </motion.div>

            <div className="fitpro-testimonials-grid">
              {testimonials.map((testimonial, index) => (
                <motion.div 
                  key={index}
                  className="fitpro-testimonial-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="fitpro-testimonial-stars">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" stroke="#f59e0b" />
                    ))}
                  </div>
                  <p>"{testimonial.content}"</p>
                  <div className="fitpro-testimonial-author">
                    <span className="fitpro-testimonial-avatar">{testimonial.avatar}</span>
                    <div>
                      <strong>{testimonial.name}</strong>
                      <span>{testimonial.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="fitpro-tech">
          <div className="fitpro-container">
            <motion.div 
              className="fitpro-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="fitpro-section-tag">Tecnologias</span>
              <h2>Stack Tecnológico</h2>
            </motion.div>

            <div className="fitpro-tech-grid">
              {['React', 'Node.js', 'MongoDB', 'React Native', 'Stripe', 'AWS', 'Redis', 'Docker'].map((tech, idx) => (
                <motion.div 
                  key={tech}
                  className="fitpro-tech-item"
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
        <section className="fitpro-cta">
          <div className="fitpro-container">
            <motion.div 
              className="fitpro-cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Pronto para transformar sua academia?</h2>
              <p>Entre em contato e vamos desenvolver a solução perfeita para o seu negócio.</p>
              <div className="fitpro-cta-buttons">
                <Link to="/contato" className="fitpro-btn-primary">
                  Solicitar Orçamento
                  <ArrowRight size={18} />
                </Link>
                <Link to="/projetos" className="fitpro-btn-secondary">
                  Ver Outros Projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Portfolio */}
        <div className="fitpro-back-link">
          <Link to="/projetos">
            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Voltar para Projetos
          </Link>
        </div>
      </div>
    </>
  );
};

export default FitProAcademy;
