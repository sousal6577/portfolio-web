// ============================================================================
// HOME PAGE - Página inicial do portfólio
// ============================================================================
import { Helmet } from 'react-helmet-async';
import { usePortfolio } from '../../context/PortfolioContext';
import HeroSection from '../../components/sections/HeroSection/HeroSection';
import AboutSection from '../../components/sections/AboutSection/AboutSection';
import SkillsSection from '../../components/sections/SkillsSection/SkillsSection';
import ServicesSection from '../../components/sections/ServicesSection/ServicesSection';
import ProjectsSection from '../../components/sections/ProjectsSection/ProjectsSection';
import ExperienceSection from '../../components/sections/ExperienceSection/ExperienceSection';
import TestimonialsSection from '../../components/sections/TestimonialsSection/TestimonialsSection';
import ContactSection from '../../components/sections/ContactSection/ContactSection';
import './HomePage.css';

const HomePage = () => {
  const { portfolioData } = usePortfolio();
  const { seo, settings } = portfolioData;

  return (
    <>
      <Helmet>
        <title>{seo?.metaTitle || `${settings?.siteName} | Desenvolvedor Full Stack`}</title>
        <meta name="description" content={seo?.metaDescription} />
        <meta name="keywords" content={seo?.metaKeywords} />
        <meta property="og:title" content={seo?.metaTitle} />
        <meta property="og:description" content={seo?.metaDescription} />
        <meta property="og:image" content={seo?.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href={window.location.href} />
      </Helmet>

      <main className="home-page">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ServicesSection />
        <ProjectsSection limit={6} showViewAll={true} />
        <ExperienceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
    </>
  );
};

export default HomePage;
