// ============================================================================
// HERO SECTION - Seção inicial do portfólio
// ============================================================================
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Twitter, Instagram, Mail, ChevronDown } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import './HeroSection.css';

// Mapeamento de ícones para redes sociais
const socialIconMap = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  instagram: Instagram,
  email: Mail
};

const HeroSection = () => {
  const { portfolioData } = usePortfolio();
  const { hero, settings, contact } = portfolioData;
  const [currentText, setCurrentText] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typing effect
  useEffect(() => {
    if (!hero?.showTypingEffect || !hero?.typingTexts?.length) return;

    const texts = hero.typingTexts;
    const currentFullText = texts[currentText];
    const typingSpeed = isDeleting ? 50 : 100;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setCurrentText((prev) => (prev + 1) % texts.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentText, hero]);

  if (!hero?.enabled) return null;

  const scrollToContent = () => {
    const aboutSection = document.getElementById('sobre');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Background Effects */}
      <div className="hero-bg">
        <div className="hero-gradient"></div>
        <div className="hero-grid"></div>
        {hero?.showParticles && (
          <div className="hero-particles">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="particle"
                initial={{ opacity: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: [0, -100],
                  x: Math.random() * 20 - 10
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  delay: Math.random() * 2,
                  repeat: Infinity
                }}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${50 + Math.random() * 50}%`
                }}
              />
            ))}
          </div>
        )}
      </div>

      <div className="hero-container">
        <div className="hero-content">
          {/* Text Content */}
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.span
              className="hero-greeting"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {hero?.title || 'Olá, eu sou'}
            </motion.span>

            <motion.h1
              className="hero-name"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {hero?.name || settings?.siteName || 'Lucas Sousa'}
            </motion.h1>

            <motion.div
              className="hero-role"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <span className="role-prefix">{'<'}</span>
              <span className="role-text">
                {hero?.showTypingEffect ? displayText : hero?.subtitle}
              </span>
              {hero?.showTypingEffect && <span className="cursor">|</span>}
              <span className="role-suffix">{'/>'}</span>
            </motion.div>

            <motion.p
              className="hero-description"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {hero?.description}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="hero-ctas"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Link to="/projetos" className="btn btn-primary">
                <span>{hero?.ctaText || 'Ver Projetos'}</span>
                <ArrowRight size={18} />
              </Link>
              <Link to="/contato" className="btn btn-secondary">
                <span>{hero?.secondaryCtaText || 'Contato'}</span>
              </Link>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="hero-social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {contact?.socialLinks?.slice(0, 4).map((social, index) => {
                const Icon = socialIconMap[social.platform] || socialIconMap[social.icon?.toLowerCase()] || Github;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon"
                    whileHover={{ scale: 1.1, y: -3 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.platform || 'Social Link'}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <div className="image-container">
              <div className="image-glow"></div>
              <div className="image-border">
                <img
                  src={hero?.profileImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face'}
                  alt={hero?.name || 'Profile'}
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face';
                  }}
                />
              </div>
              {/* Floating elements */}
              <motion.div
                className="floating-badge badge-1"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <span>⚛️ React</span>
              </motion.div>
              <motion.div
                className="floating-badge badge-2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity }}
              >
                <span>💚 Node.js</span>
              </motion.div>
              <motion.div
                className="floating-badge badge-3"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2.8, repeat: Infinity }}
              >
                <span>🔥 Firebase</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          className="scroll-indicator"
          onClick={scrollToContent}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ 
            opacity: { delay: 1 },
            y: { duration: 1.5, repeat: Infinity }
          }}
        >
          <span>Scroll</span>
          <ChevronDown size={20} />
        </motion.button>
      </div>
    </section>
  );
};

export default HeroSection;
