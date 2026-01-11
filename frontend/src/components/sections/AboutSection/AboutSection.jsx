// ============================================================================
// ABOUT SECTION - Seção Sobre
// ============================================================================
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Download, Award, Users, Coffee, Rocket } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './AboutSection.css';

const statIcons = [Rocket, Award, Users, Coffee];

const AboutSection = () => {
  const { portfolioData } = usePortfolio();
  const { about } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (!about?.enabled) return null;

  return (
    <SectionWrapper id="sobre" className="about-section">
      <div className="section-container">
        <div className="about-grid" ref={ref}>
          {/* Image Side */}
          <motion.div
            className="about-image"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="image-wrapper">
              <div className="image-decoration"></div>
              <img
                src={about?.image || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop'}
                alt="Sobre mim"
                loading="lazy"
              />
              <div className="experience-badge">
                <span className="badge-number">5+</span>
                <span className="badge-text">Anos de Experiência</span>
              </div>
            </div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="section-subtitle">{about?.subtitle || 'Conheça-me'}</span>
            <h2 className="section-title">{about?.title || 'Sobre Mim'}</h2>
            
            <div className="about-text">
              {about?.description?.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            {/* Stats */}
            <div className="about-stats">
              {about?.stats?.map((stat, index) => {
                const Icon = statIcons[index] || Rocket;
                return (
                  <motion.div
                    key={index}
                    className="stat-item"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                  >
                    <div className="stat-icon">
                      <Icon size={24} />
                    </div>
                    <div className="stat-content">
                      <span className="stat-number">{stat.number}</span>
                      <span className="stat-label">{stat.label}</span>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Resume Button */}
            {about?.resumeLink && (
              <motion.a
                href={about.resumeLink}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Download size={18} />
                <span>Download CV</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutSection;
