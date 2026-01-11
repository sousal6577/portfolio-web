// ============================================================================
// ADMIN PAGE - Painel Administrativo
// ============================================================================
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, Settings, Palette, Image, FileText, 
  Users, MessageSquare, BarChart3, LogOut, Menu, X,
  Save, Eye, RefreshCw, ChevronRight, Check, Plus, Trash2, Edit3
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { useTheme } from '../../context/ThemeContext';
import toast, { Toaster } from 'react-hot-toast';
import './AdminPage.css';

const AdminPage = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const { portfolioData, setPortfolioData, updatePortfolioData, defaultPortfolioData } = usePortfolio();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  
  const [activeSection, setActiveSection] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [saving, setSaving] = useState(false);

  // Proteção de rota
  if (loading) {
    return <div className="admin-loading">Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const handleSave = async (section, data) => {
    setSaving(true);
    try {
      const success = await updatePortfolioData(section, data);
      if (success) {
        toast.success('Alterações salvas com sucesso!');
      } else {
        toast.error('Erro ao salvar alterações');
      }
    } catch (error) {
      toast.error('Erro ao salvar alterações');
    }
    setSaving(false);
  };

  const updateField = (section, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'settings', label: 'Configurações', icon: Settings },
    { id: 'hero', label: 'Hero Section', icon: Image },
    { id: 'about', label: 'Sobre', icon: FileText },
    { id: 'projects', label: 'Projetos', icon: BarChart3 },
    { id: 'services', label: 'Serviços', icon: Palette },
    { id: 'testimonials', label: 'Depoimentos', icon: MessageSquare },
    { id: 'contact', label: 'Contato', icon: Users },
  ];

  return (
    <div className="admin-page">
      <Toaster position="top-right" />
      
      {/* Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <span>{'</>'}</span>
            {sidebarOpen && <span className="logo-text">Admin</span>}
          </div>
          <button 
            className="sidebar-toggle"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => setActiveSection(item.id)}
              >
                <Icon size={20} />
                {sidebarOpen && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="nav-item preview" onClick={() => window.open('/', '_blank')}>
            <Eye size={20} />
            {sidebarOpen && <span>Ver Site</span>}
          </button>
          <button className="nav-item logout" onClick={handleLogout}>
            <LogOut size={20} />
            {sidebarOpen && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Top Bar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <h1>{menuItems.find(m => m.id === activeSection)?.label}</h1>
          </div>
          <div className="topbar-right">
            <span className="user-email">{user?.email}</span>
            <button className="theme-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        {/* Content */}
        <div className="admin-content">
          <AnimatePresence mode="wait">
            {activeSection === 'dashboard' && (
              <DashboardSection key="dashboard" portfolioData={portfolioData} />
            )}
            {activeSection === 'settings' && (
              <SettingsSection 
                key="settings" 
                data={portfolioData.settings} 
                onUpdate={(field, value) => updateField('settings', field, value)}
                onSave={() => handleSave('settings', portfolioData.settings)}
                saving={saving}
              />
            )}
            {activeSection === 'hero' && (
              <HeroSection 
                key="hero" 
                data={portfolioData.hero} 
                onUpdate={(field, value) => updateField('hero', field, value)}
                onSave={() => handleSave('hero', portfolioData.hero)}
                saving={saving}
              />
            )}
            {activeSection === 'about' && (
              <AboutSectionAdmin 
                key="about" 
                data={portfolioData.about} 
                onUpdate={(field, value) => updateField('about', field, value)}
                onSave={() => handleSave('about', portfolioData.about)}
                saving={saving}
              />
            )}
            {activeSection === 'projects' && (
              <ProjectsSection 
                key="projects" 
                data={portfolioData.projects} 
                setPortfolioData={setPortfolioData}
                onSave={() => handleSave('projects', portfolioData.projects)}
                saving={saving}
              />
            )}
            {activeSection === 'services' && (
              <ServicesSectionAdmin 
                key="services" 
                data={portfolioData.services} 
                setPortfolioData={setPortfolioData}
                onSave={() => handleSave('services', portfolioData.services)}
                saving={saving}
              />
            )}
            {activeSection === 'testimonials' && (
              <TestimonialsSectionAdmin 
                key="testimonials" 
                data={portfolioData.testimonials} 
                setPortfolioData={setPortfolioData}
                onSave={() => handleSave('testimonials', portfolioData.testimonials)}
                saving={saving}
              />
            )}
            {activeSection === 'contact' && (
              <ContactSectionAdmin 
                key="contact" 
                data={portfolioData.contact}
                settings={portfolioData.settings}
                onUpdateContact={(field, value) => updateField('contact', field, value)}
                onUpdateSettings={(field, value) => updateField('settings', field, value)}
                onSave={async () => {
                  await handleSave('contact', portfolioData.contact);
                  await handleSave('settings', portfolioData.settings);
                }}
                saving={saving}
              />
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

// ============================================================================
// Dashboard Section
// ============================================================================
const DashboardSection = ({ portfolioData }) => {
  const stats = [
    { label: 'Projetos', value: portfolioData?.projects?.items?.length || 0, icon: '📂' },
    { label: 'Serviços', value: portfolioData?.services?.items?.length || 0, icon: '⚙️' },
    { label: 'Depoimentos', value: portfolioData?.testimonials?.items?.length || 0, icon: '💬' },
    { label: 'Skills', value: portfolioData?.skills?.categories?.reduce((acc, cat) => acc + (cat.skills?.length || 0), 0) || 0, icon: '🎯' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="dashboard-section"
    >
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <span className="stat-icon">{stat.icon}</span>
            <div className="stat-info">
              <span className="stat-value">{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-info">
        <h2>Bem-vindo ao Painel Administrativo</h2>
        <p>Aqui você pode gerenciar todo o conteúdo do seu portfólio de forma simples e rápida.</p>
        
        <div className="quick-actions">
          <h3>Ações Rápidas</h3>
          <ul>
            <li><ChevronRight size={16} /> Altere as informações de contato na seção <strong>Configurações</strong></li>
            <li><ChevronRight size={16} /> Atualize sua foto e descrição na seção <strong>Hero</strong></li>
            <li><ChevronRight size={16} /> Adicione novos projetos na seção <strong>Projetos</strong></li>
            <li><ChevronRight size={16} /> Gerencie depoimentos de clientes em <strong>Depoimentos</strong></li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Settings Section
// ============================================================================
const SettingsSection = ({ data, onUpdate, onSave, saving }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <h2>Configurações Gerais</h2>
        
        <div className="form-grid">
          <div className="form-group">
            <label>Nome do Site</label>
            <input
              type="text"
              value={data?.siteName || ''}
              onChange={(e) => onUpdate('siteName', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Título do Site</label>
            <input
              type="text"
              value={data?.siteTitle || ''}
              onChange={(e) => onUpdate('siteTitle', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Descrição do Site</label>
            <textarea
              rows={3}
              value={data?.siteDescription || ''}
              onChange={(e) => onUpdate('siteDescription', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={data?.email || ''}
              onChange={(e) => onUpdate('email', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Telefone</label>
            <input
              type="text"
              value={data?.phone || ''}
              onChange={(e) => onUpdate('phone', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Número do WhatsApp</label>
            <input
              type="text"
              value={data?.whatsappNumber || ''}
              onChange={(e) => onUpdate('whatsappNumber', e.target.value)}
              placeholder="5511999999999"
            />
          </div>

          <div className="form-group">
            <label>Mensagem do WhatsApp</label>
            <input
              type="text"
              value={data?.whatsappMessage || ''}
              onChange={(e) => onUpdate('whatsappMessage', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Endereço</label>
            <input
              type="text"
              value={data?.address || ''}
              onChange={(e) => onUpdate('address', e.target.value)}
            />
          </div>
        </div>

        <div className="toggle-options">
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={data?.sliderEnabled ?? true}
              onChange={(e) => onUpdate('sliderEnabled', e.target.checked)}
            />
            <span className="toggle-label">Ativar Slider</span>
          </label>

          <label className="toggle-option">
            <input
              type="checkbox"
              checked={data?.animationsEnabled ?? true}
              onChange={(e) => onUpdate('animationsEnabled', e.target.checked)}
            />
            <span className="toggle-label">Ativar Animações</span>
          </label>
        </div>

        <div className="form-group">
          <label>Tipo de Animação</label>
          <select
            value={data?.animationType || 'fade-up'}
            onChange={(e) => onUpdate('animationType', e.target.value)}
          >
            <option value="fade-up">Fade Up</option>
            <option value="fade-in">Fade In</option>
            <option value="slide-left">Slide Left</option>
            <option value="slide-right">Slide Right</option>
            <option value="zoom-in">Zoom In</option>
          </select>
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Hero Section Admin
// ============================================================================
const HeroSection = ({ data, onUpdate, onSave, saving }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <h2>Hero Section</h2>
        
        <label className="toggle-option">
          <input
            type="checkbox"
            checked={data?.enabled ?? true}
            onChange={(e) => onUpdate('enabled', e.target.checked)}
          />
          <span className="toggle-label">Seção Ativa</span>
        </label>

        <div className="form-grid">
          <div className="form-group">
            <label>Saudação</label>
            <input
              type="text"
              value={data?.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
              placeholder="Olá, eu sou"
            />
          </div>

          <div className="form-group">
            <label>Nome</label>
            <input
              type="text"
              value={data?.name || ''}
              onChange={(e) => onUpdate('name', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Subtítulo</label>
            <input
              type="text"
              value={data?.subtitle || ''}
              onChange={(e) => onUpdate('subtitle', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Descrição</label>
            <textarea
              rows={3}
              value={data?.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>URL da Imagem de Perfil</label>
            <input
              type="url"
              value={data?.profileImage || ''}
              onChange={(e) => onUpdate('profileImage', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Texto CTA Principal</label>
            <input
              type="text"
              value={data?.ctaText || ''}
              onChange={(e) => onUpdate('ctaText', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Texto CTA Secundário</label>
            <input
              type="text"
              value={data?.secondaryCtaText || ''}
              onChange={(e) => onUpdate('secondaryCtaText', e.target.value)}
            />
          </div>
        </div>

        <div className="toggle-options">
          <label className="toggle-option">
            <input
              type="checkbox"
              checked={data?.showParticles ?? true}
              onChange={(e) => onUpdate('showParticles', e.target.checked)}
            />
            <span className="toggle-label">Mostrar Partículas</span>
          </label>

          <label className="toggle-option">
            <input
              type="checkbox"
              checked={data?.showTypingEffect ?? true}
              onChange={(e) => onUpdate('showTypingEffect', e.target.checked)}
            />
            <span className="toggle-label">Efeito de Digitação</span>
          </label>
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// About Section Admin
// ============================================================================
const AboutSectionAdmin = ({ data, onUpdate, onSave, saving }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <h2>Seção Sobre</h2>
        
        <label className="toggle-option">
          <input
            type="checkbox"
            checked={data?.enabled ?? true}
            onChange={(e) => onUpdate('enabled', e.target.checked)}
          />
          <span className="toggle-label">Seção Ativa</span>
        </label>

        <div className="form-grid">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={data?.title || ''}
              onChange={(e) => onUpdate('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Subtítulo</label>
            <input
              type="text"
              value={data?.subtitle || ''}
              onChange={(e) => onUpdate('subtitle', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Descrição</label>
            <textarea
              rows={6}
              value={data?.description || ''}
              onChange={(e) => onUpdate('description', e.target.value)}
              placeholder="Use duas quebras de linha para criar parágrafos"
            />
          </div>

          <div className="form-group full">
            <label>URL da Imagem</label>
            <input
              type="url"
              value={data?.image || ''}
              onChange={(e) => onUpdate('image', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Link do Currículo (PDF)</label>
            <input
              type="url"
              value={data?.resumeLink || ''}
              onChange={(e) => onUpdate('resumeLink', e.target.value)}
            />
          </div>
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Projects Section Admin
// ============================================================================
const ProjectsSection = ({ data, setPortfolioData, onSave, saving }) => {
  const [editingProject, setEditingProject] = useState(null);

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'Novo Projeto',
      description: 'Descrição do projeto',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      tags: ['React'],
      liveUrl: '',
      githubUrl: '',
      featured: false,
      category: 'web'
    };

    setPortfolioData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: [...(prev.projects?.items || []), newProject]
      }
    }));

    setEditingProject(newProject.id);
  };

  const updateProject = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      projects: {
        ...prev.projects,
        items: prev.projects.items.map(p => 
          p.id === id ? { ...p, [field]: value } : p
        )
      }
    }));
  };

  const deleteProject = (id) => {
    if (confirm('Tem certeza que deseja excluir este projeto?')) {
      setPortfolioData(prev => ({
        ...prev,
        projects: {
          ...prev.projects,
          items: prev.projects.items.filter(p => p.id !== id)
        }
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <div className="section-header-admin">
          <h2>Projetos</h2>
          <button className="add-btn" onClick={addProject}>
            <Plus size={18} />
            <span>Adicionar Projeto</span>
          </button>
        </div>

        <div className="items-list">
          {data?.items?.map((project) => (
            <div key={project.id} className={`item-card ${editingProject === project.id ? 'editing' : ''}`}>
              {editingProject === project.id ? (
                <div className="item-edit-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Título</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Categoria</label>
                      <select
                        value={project.category}
                        onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                      >
                        <option value="web">Web</option>
                        <option value="mobile">Mobile</option>
                        <option value="data">Data</option>
                      </select>
                    </div>
                    <div className="form-group full">
                      <label>Descrição</label>
                      <textarea
                        rows={3}
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                      />
                    </div>
                    <div className="form-group full">
                      <label>URL da Imagem</label>
                      <input
                        type="url"
                        value={project.image}
                        onChange={(e) => updateProject(project.id, 'image', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>URL do Projeto</label>
                      <input
                        type="url"
                        value={project.liveUrl}
                        onChange={(e) => updateProject(project.id, 'liveUrl', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>URL do GitHub</label>
                      <input
                        type="url"
                        value={project.githubUrl}
                        onChange={(e) => updateProject(project.id, 'githubUrl', e.target.value)}
                      />
                    </div>
                    <div className="form-group full">
                      <label>Tags (separadas por vírgula)</label>
                      <input
                        type="text"
                        value={project.tags?.join(', ')}
                        onChange={(e) => updateProject(project.id, 'tags', e.target.value.split(',').map(t => t.trim()))}
                      />
                    </div>
                    <label className="toggle-option">
                      <input
                        type="checkbox"
                        checked={project.featured}
                        onChange={(e) => updateProject(project.id, 'featured', e.target.checked)}
                      />
                      <span className="toggle-label">Destaque</span>
                    </label>
                  </div>
                  <div className="item-actions">
                    <button className="btn-done" onClick={() => setEditingProject(null)}>
                      <Check size={16} />
                      <span>Concluído</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="item-preview">
                  <img src={project.image} alt={project.title} />
                  <div className="item-info">
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="item-tags">
                      {project.tags?.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => setEditingProject(project.id)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="delete" onClick={() => deleteProject(project.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Services Section Admin
// ============================================================================
const ServicesSectionAdmin = ({ data, setPortfolioData, onSave, saving }) => {
  const updateService = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      services: {
        ...prev.services,
        items: prev.services.items.map(s => 
          s.id === id ? { ...s, [field]: value } : s
        )
      }
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <h2>Serviços</h2>
        
        <div className="services-list">
          {data?.items?.map((service) => (
            <div key={service.id} className="service-edit-card">
              <div className="form-grid">
                <div className="form-group">
                  <label>Título</label>
                  <input
                    type="text"
                    value={service.title}
                    onChange={(e) => updateService(service.id, 'title', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Ícone</label>
                  <select
                    value={service.icon}
                    onChange={(e) => updateService(service.id, 'icon', e.target.value)}
                  >
                    <option value="Code2">Código</option>
                    <option value="Smartphone">Mobile</option>
                    <option value="Database">Backend</option>
                    <option value="Palette">Design</option>
                  </select>
                </div>
                <div className="form-group full">
                  <label>Descrição</label>
                  <textarea
                    rows={2}
                    value={service.description}
                    onChange={(e) => updateService(service.id, 'description', e.target.value)}
                  />
                </div>
                <div className="form-group full">
                  <label>Features (separadas por vírgula)</label>
                  <input
                    type="text"
                    value={service.features?.join(', ')}
                    onChange={(e) => updateService(service.id, 'features', e.target.value.split(',').map(f => f.trim()))}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Testimonials Section Admin
// ============================================================================
const TestimonialsSectionAdmin = ({ data, setPortfolioData, onSave, saving }) => {
  const [editingTestimonial, setEditingTestimonial] = useState(null);

  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now().toString(),
      name: 'Nome do Cliente',
      position: 'Cargo',
      company: 'Empresa',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      content: 'Depoimento do cliente sobre o trabalho realizado.',
      rating: 5
    };

    setPortfolioData(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: [...(prev.testimonials?.items || []), newTestimonial]
      }
    }));

    setEditingTestimonial(newTestimonial.id);
  };

  const updateTestimonial = (id, field, value) => {
    setPortfolioData(prev => ({
      ...prev,
      testimonials: {
        ...prev.testimonials,
        items: prev.testimonials.items.map(t => 
          t.id === id ? { ...t, [field]: value } : t
        )
      }
    }));
  };

  const deleteTestimonial = (id) => {
    if (confirm('Tem certeza que deseja excluir este depoimento?')) {
      setPortfolioData(prev => ({
        ...prev,
        testimonials: {
          ...prev.testimonials,
          items: prev.testimonials.items.filter(t => t.id !== id)
        }
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <div className="section-header-admin">
          <h2>Depoimentos</h2>
          <button className="add-btn" onClick={addTestimonial}>
            <Plus size={18} />
            <span>Adicionar Depoimento</span>
          </button>
        </div>

        <div className="items-list">
          {data?.items?.map((testimonial) => (
            <div key={testimonial.id} className={`item-card testimonial ${editingTestimonial === testimonial.id ? 'editing' : ''}`}>
              {editingTestimonial === testimonial.id ? (
                <div className="item-edit-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Nome</label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => updateTestimonial(testimonial.id, 'name', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Cargo</label>
                      <input
                        type="text"
                        value={testimonial.position}
                        onChange={(e) => updateTestimonial(testimonial.id, 'position', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Empresa</label>
                      <input
                        type="text"
                        value={testimonial.company}
                        onChange={(e) => updateTestimonial(testimonial.id, 'company', e.target.value)}
                      />
                    </div>
                    <div className="form-group">
                      <label>Avaliação (1-5)</label>
                      <input
                        type="number"
                        min="1"
                        max="5"
                        value={testimonial.rating}
                        onChange={(e) => updateTestimonial(testimonial.id, 'rating', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="form-group full">
                      <label>URL do Avatar</label>
                      <input
                        type="url"
                        value={testimonial.avatar}
                        onChange={(e) => updateTestimonial(testimonial.id, 'avatar', e.target.value)}
                      />
                    </div>
                    <div className="form-group full">
                      <label>Depoimento</label>
                      <textarea
                        rows={4}
                        value={testimonial.content}
                        onChange={(e) => updateTestimonial(testimonial.id, 'content', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="item-actions">
                    <button className="btn-done" onClick={() => setEditingTestimonial(null)}>
                      <Check size={16} />
                      <span>Concluído</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="item-preview testimonial">
                  <img src={testimonial.avatar} alt={testimonial.name} className="avatar" />
                  <div className="item-info">
                    <h3>{testimonial.name}</h3>
                    <p className="role">{testimonial.position} - {testimonial.company}</p>
                    <p className="content">"{testimonial.content}"</p>
                  </div>
                  <div className="item-actions">
                    <button onClick={() => setEditingTestimonial(testimonial.id)}>
                      <Edit3 size={16} />
                    </button>
                    <button className="delete" onClick={() => deleteTestimonial(testimonial.id)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

// ============================================================================
// Contact Section Admin
// ============================================================================
const ContactSectionAdmin = ({ data, settings, onUpdateContact, onUpdateSettings, onSave, saving }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="admin-section"
    >
      <div className="section-card">
        <h2>Configurações de Contato</h2>
        
        <label className="toggle-option">
          <input
            type="checkbox"
            checked={data?.enabled ?? true}
            onChange={(e) => onUpdateContact('enabled', e.target.checked)}
          />
          <span className="toggle-label">Seção Ativa</span>
        </label>

        <label className="toggle-option">
          <input
            type="checkbox"
            checked={data?.formEnabled ?? true}
            onChange={(e) => onUpdateContact('formEnabled', e.target.checked)}
          />
          <span className="toggle-label">Mostrar Formulário</span>
        </label>

        <div className="form-grid">
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={data?.title || ''}
              onChange={(e) => onUpdateContact('title', e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Subtítulo</label>
            <input
              type="text"
              value={data?.subtitle || ''}
              onChange={(e) => onUpdateContact('subtitle', e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Descrição</label>
            <textarea
              rows={3}
              value={data?.description || ''}
              onChange={(e) => onUpdateContact('description', e.target.value)}
            />
          </div>
        </div>

        <h3 style={{ marginTop: '2rem', marginBottom: '1rem' }}>Redes Sociais</h3>

        <div className="social-links-edit">
          {data?.socialLinks?.map((social, index) => (
            <div key={index} className="social-edit-item">
              <select
                value={social.platform}
                onChange={(e) => {
                  const newLinks = [...data.socialLinks];
                  newLinks[index] = { ...social, platform: e.target.value, icon: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1) };
                  onUpdateContact('socialLinks', newLinks);
                }}
              >
                <option value="github">GitHub</option>
                <option value="linkedin">LinkedIn</option>
                <option value="twitter">Twitter</option>
                <option value="instagram">Instagram</option>
              </select>
              <input
                type="url"
                value={social.url}
                placeholder="URL"
                onChange={(e) => {
                  const newLinks = [...data.socialLinks];
                  newLinks[index] = { ...social, url: e.target.value };
                  onUpdateContact('socialLinks', newLinks);
                }}
              />
            </div>
          ))}
        </div>

        <button className="save-btn" onClick={onSave} disabled={saving}>
          {saving ? <RefreshCw size={18} className="spin" /> : <Save size={18} />}
          <span>{saving ? 'Salvando...' : 'Salvar Alterações'}</span>
        </button>
      </div>
    </motion.div>
  );
};

export default AdminPage;
