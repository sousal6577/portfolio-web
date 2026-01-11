// ============================================================================
// SERVICES SECTION - Seção de Serviços
// ============================================================================
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code2, Smartphone, Database, Palette, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './ServicesSection.css';

const iconMap = { Code2, Smartphone, Database, Palette };

const ServicesSection = () => {
  const { portfolioData } = usePortfolio();
  const { services } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  if (!services?.enabled) return null;

  return (
    <SectionWrapper id="servicos" className="services-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{services?.subtitle || 'O que faço'}</span>
          <h2 className="section-title">{services?.title || 'Serviços'}</h2>
        </div>

        <div className="services-grid" ref={ref}>
          {services?.items?.map((service, index) => {
            const Icon = iconMap[service.icon] || Code2;
            return (
              <motion.div
                key={service.id}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="service-icon">
                  <Icon size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features?.map((feature, i) => (
                    <li key={i}>
                      <ArrowRight size={14} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="services-cta"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
        >
          <Link to="/contato" className="btn btn-primary">
            <span>Solicitar Orçamento</span>
            <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default ServicesSection;
