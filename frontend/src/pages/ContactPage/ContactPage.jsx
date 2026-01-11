// ============================================================================
// CONTACT PAGE - Página de Contato
// ============================================================================
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import ContactSection from '../../components/sections/ContactSection/ContactSection';
import './ContactPage.css';

const ContactPage = () => {
  const { portfolioData } = usePortfolio();
  const { settings } = portfolioData;

  return (
    <>
      <Helmet>
        <title>Contato | {settings?.siteName}</title>
        <meta name="description" content={`Entre em contato com ${settings?.siteName}. Disponível para projetos freelance e oportunidades.`} />
      </Helmet>

      <main className="contact-page">
        {/* Page Header */}
        <section className="page-hero">
          <div className="page-hero-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="page-hero-subtitle">Fale Comigo</span>
              <h1 className="page-hero-title">Contato</h1>
              <p className="page-hero-description">
                Vamos conversar sobre seu próximo projeto ou oportunidade
              </p>
            </motion.div>
          </div>
          <div className="page-hero-bg"></div>
        </section>

        <ContactSection />
      </main>
    </>
  );
};

export default ContactPage;
