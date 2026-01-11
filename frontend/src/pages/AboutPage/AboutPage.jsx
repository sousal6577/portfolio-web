// ============================================================================
// ABOUT PAGE - Página Sobre
// ============================================================================
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { usePortfolio } from '../../context/PortfolioContext';
import AboutSection from '../../components/sections/AboutSection/AboutSection';
import SkillsSection from '../../components/sections/SkillsSection/SkillsSection';
import ExperienceSection from '../../components/sections/ExperienceSection/ExperienceSection';
import './AboutPage.css';

const AboutPage = () => {
  const { portfolioData } = usePortfolio();
  const { settings, seo } = portfolioData;

  return (
    <>
      <Helmet>
        <title>Sobre | {settings?.siteName}</title>
        <meta name="description" content={`Conheça mais sobre ${settings?.siteName}, desenvolvedor full stack com anos de experiência.`} />
      </Helmet>

      <main className="about-page">
        {/* Page Header */}
        <section className="page-hero">
          <div className="page-hero-container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="page-hero-subtitle">Conheça-me</span>
              <h1 className="page-hero-title">Sobre Mim</h1>
              <p className="page-hero-description">
                Minha história, experiência e paixão por tecnologia
              </p>
            </motion.div>
          </div>
          <div className="page-hero-bg"></div>
        </section>

        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
      </main>
    </>
  );
};

export default AboutPage;
