// ============================================================================
// SKILLS SECTION - Seção de Habilidades
// ============================================================================
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Monitor, Server, Wrench } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './SkillsSection.css';

const iconMap = { Monitor, Server, Wrench };

const SkillsSection = () => {
  const { portfolioData } = usePortfolio();
  const { skills } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!skills?.enabled) return null;

  return (
    <SectionWrapper id="habilidades" className="skills-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{skills?.subtitle || 'Expertise'}</span>
          <h2 className="section-title">{skills?.title || 'Habilidades'}</h2>
        </div>

        <div className="skills-grid" ref={ref}>
          {skills?.categories?.map((category, catIndex) => {
            const Icon = iconMap[category.icon] || Monitor;
            return (
              <motion.div
                key={category.id}
                className="skill-category"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: catIndex * 0.15 }}
              >
                <div className="category-header">
                  <div className="category-icon">
                    <Icon size={24} />
                  </div>
                  <h3 className="category-title">{category.name}</h3>
                </div>

                <div className="skills-list">
                  {category.skills?.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="skill-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: catIndex * 0.15 + skillIndex * 0.05 }}
                    >
                      <div className="skill-header">
                        <span className="skill-icon">{skill.icon}</span>
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-level">{skill.level}%</span>
                      </div>
                      <div className="skill-bar">
                        <motion.div
                          className="skill-progress"
                          initial={{ width: 0 }}
                          animate={inView ? { width: `${skill.level}%` } : {}}
                          transition={{ duration: 1, delay: catIndex * 0.15 + skillIndex * 0.05 }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default SkillsSection;
