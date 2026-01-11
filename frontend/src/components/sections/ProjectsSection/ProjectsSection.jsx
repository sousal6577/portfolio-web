// ============================================================================
// PROJECTS SECTION - Seção de Projetos
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, ArrowRight, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './ProjectsSection.css';

const ProjectsSection = ({ limit = 6, showViewAll = true }) => {
  const { portfolioData } = usePortfolio();
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState('all');
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

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

  if (!projects?.enabled) return null;

  const filteredProjects = activeCategory === 'all'
    ? projects?.items?.slice(0, limit)
    : projects?.items?.filter(p => p.category === activeCategory).slice(0, limit);

  return (
    <SectionWrapper id="projetos" className="projects-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{projects?.subtitle || 'Portfolio'}</span>
          <h2 className="section-title">{projects?.title || 'Projetos'}</h2>
        </div>

        {/* Category Filter */}
        <motion.div
          className="projects-filter"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
        >
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
        </motion.div>

        {/* Projects Grid */}
        <div className="projects-grid" ref={ref}>
          <AnimatePresence>
            {filteredProjects?.map((project, index) => (
              <motion.article
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
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
                    {project.tags?.slice(0, 4).map((tag, i) => (
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
          </AnimatePresence>
        </div>

        {/* View All Button */}
        {showViewAll && projects?.items?.length > limit && (
          <motion.div
            className="projects-cta"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <Link to="/projetos" className="btn btn-primary">
              <span>Ver Todos os Projetos</span>
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        )}
      </div>
    </SectionWrapper>
  );
};

export default ProjectsSection;
