// ============================================================================
// PROJECTS PAGE - Página de Projetos
// ============================================================================
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Search, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../context/PortfolioContext';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const { portfolioData } = usePortfolio();
  const { projects, settings } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mapeamento de nomes das categorias
  const categoryNames = {
    all: 'Todos',
    web: 'Web',
    mobile: 'Mobile',
    backend: 'Backend',
    fullstack: 'Full Stack',
    frontend: 'Frontend',
    design: 'Design',
    api: 'API'
  };

  const filteredProjects = projects?.items?.filter(project => {
    const matchesCategory = activeCategory === 'all' || project.category === activeCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Helmet>
        <title>Projetos | {settings?.siteName}</title>
        <meta name="description" content={`Explore os projetos desenvolvidos por ${settings?.siteName}. Portfolio completo com diversos trabalhos.`} />
      </Helmet>

      <main className="projects-page">
        {/* Page Header */}
        <section className="page-hero">
          <div className="page-hero-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="page-hero-subtitle">Portfolio</span>
              <h1 className="page-hero-title">Meus Projetos</h1>
              <p className="page-hero-description">
                Uma coleção dos meus melhores trabalhos e projetos desenvolvidos
              </p>
            </motion.div>
          </div>
          <div className="page-hero-bg"></div>
        </section>

        {/* Filters */}
        <section className="projects-filters">
          <div className="filters-container">
            {/* Search */}
            <div className="search-box">
              <Search size={20} />
              <input
                type="text"
                placeholder="Buscar projetos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="category-filters">
              {projects?.categories?.map((cat) => {
                // Suporta tanto string quanto objeto {id, name}
                const catId = typeof cat === 'string' ? cat : cat.id;
                const catName = typeof cat === 'string' ? (categoryNames[cat] || cat) : cat.name;
                return (
                  <button
                    key={catId}
                    className={`filter-btn ${activeCategory === catId ? 'active' : ''}`}
                    onClick={() => setActiveCategory(catId)}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Projects Grid */}
        <section className="projects-grid-section">
          <div className="projects-container">
            <AnimatePresence>
              {filteredProjects?.length > 0 ? (
                <motion.div
                  className="projects-grid"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  {filteredProjects.map((project, index) => (
                    <motion.article
                      key={project.id}
                      className={`project-card ${project.featured ? 'featured' : ''}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      layout
                    >
                      <div className="project-image">
                        <img 
                          src={project.image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop'} 
                          alt={project.title} 
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop';
                          }}
                        />
                        {project.featured && (
                          <span className="featured-badge">Destaque</span>
                        )}
                      </div>
                      <div className="project-content">
                        <h3 className="project-title">{project.title}</h3>
                        <p className="project-description">{project.description}</p>
                        <div className="project-tags">
                          {project.technologies?.slice(0, 4).map((tag, i) => (
                            <span key={i} className="project-tag">{tag}</span>
                          )) || project.tags?.slice(0, 4).map((tag, i) => (
                            <span key={i} className="project-tag">{tag}</span>
                          ))}
                        </div>
                        {project.liveUrl && (
                          project.liveUrl.startsWith('/') ? (
                            <Link to={project.liveUrl} className="project-cta-btn">
                              <Eye size={18} />
                              <span>Ver Projeto</span>
                              <ArrowRight size={16} />
                            </Link>
                          ) : (
                            <a
                              href={project.liveUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="project-cta-btn"
                            >
                              <ExternalLink size={18} />
                              <span>Ver Projeto</span>
                              <ArrowRight size={16} />
                            </a>
                          )
                        )}
                      </div>
                    </motion.article>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  className="no-results"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p>Nenhum projeto encontrado.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>
      </main>
    </>
  );
};

export default ProjectsPage;
