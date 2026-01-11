// ============================================================================
// EXPERIENCE SECTION - Seção de Experiência
// ============================================================================
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Calendar } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const { portfolioData } = usePortfolio();
  const { experience } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!experience?.enabled) return null;

  return (
    <SectionWrapper id="experiencia" className="experience-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{experience?.subtitle || 'Carreira'}</span>
          <h2 className="section-title">{experience?.title || 'Experiência'}</h2>
        </div>

        <div className="timeline" ref={ref}>
          {experience?.items?.map((item, index) => (
            <motion.div
              key={item.id}
              className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="timeline-content">
                <div className="timeline-icon">
                  <span>{item.logo}</span>
                </div>
                <div className="timeline-card">
                  <div className="timeline-period">
                    <Calendar size={14} />
                    <span>{item.period}</span>
                  </div>
                  <h3 className="timeline-position">{item.position}</h3>
                  <h4 className="timeline-company">{item.company}</h4>
                  <p className="timeline-description">{item.description}</p>
                  <div className="timeline-tech">
                    {item.technologies?.map((tech, i) => (
                      <span key={i} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          <div className="timeline-line"></div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ExperienceSection;
