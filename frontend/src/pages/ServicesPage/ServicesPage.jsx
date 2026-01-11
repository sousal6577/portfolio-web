// ============================================================================
// SERVICES PAGE - Página de Serviços
// ============================================================================
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import ServicesSection from '../../components/sections/ServicesSection/ServicesSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection/TestimonialsSection';
import ContactSection from '../../components/sections/ContactSection/ContactSection';
import './ServicesPage.css';

const ServicesPage = () => {
  const { portfolioData } = usePortfolio();
  const { settings } = portfolioData;

  return (
    <>
      <Helmet>
        <title>Serviços | {settings?.siteName}</title>
        <meta name="description" content={`Conheça os serviços oferecidos por ${settings?.siteName}. Desenvolvimento web, mobile, backend e muito mais.`} />
      </Helmet>

      <main className="services-page">
        {/* Page Header */}
        <section className="page-hero">
          <div className="page-hero-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="page-hero-subtitle">O que faço</span>
              <h1 className="page-hero-title">Meus Serviços</h1>
              <p className="page-hero-description">
                Soluções completas para transformar suas ideias em realidade digital
              </p>
            </motion.div>
          </div>
          <div className="page-hero-bg"></div>
        </section>

        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default ServicesPage;
