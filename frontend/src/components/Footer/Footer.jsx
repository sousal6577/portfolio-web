// ============================================================================
// FOOTER COMPONENT
// ============================================================================
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Github, Linkedin, Twitter, Instagram, 
  Heart, ArrowUp, Mail, Phone, MapPin
} from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './Footer.css';

const iconMap = {
  Github, Linkedin, Twitter, Instagram
};

const Footer = () => {
  const { portfolioData } = usePortfolio();
  const { settings, contact } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Main Content */}
        <div className="footer-grid">
          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-icon">{'</>'}</span>
              <span className="logo-text">{settings?.siteName || 'Portfolio'}</span>
            </Link>
            <p className="footer-description">
              {settings?.siteDescription || 'Desenvolvedor Full Stack especializado em criar soluções digitais inovadoras.'}
            </p>
            <div className="footer-social">
              {contact?.socialLinks?.map((social, index) => {
                const Icon = iconMap[social.icon] || Github;
                return (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={social.platform}
                  >
                    <Icon size={20} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Links Rápidos</h4>
            <nav>
              <Link to="/">Home</Link>
              <Link to="/sobre">Sobre</Link>
              <Link to="/projetos">Projetos</Link>
              <Link to="/servicos">Serviços</Link>
              <Link to="/contato">Contato</Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contato</h4>
            <div className="contact-items">
              <a href={`mailto:${settings?.email}`} className="contact-item">
                <Mail size={16} />
                <span>{settings?.email || 'contato@email.com'}</span>
              </a>
              <a href={`tel:${settings?.phone?.replace(/\D/g, '')}`} className="contact-item">
                <Phone size={16} />
                <span>{settings?.phone || '+55 (11) 99999-9999'}</span>
              </a>
              <div className="contact-item">
                <MapPin size={16} />
                <span>{settings?.address || 'São Paulo, SP - Brasil'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <p className="copyright">
            © {currentYear} {settings?.siteName || 'Portfolio'}. Todos os direitos reservados.
            <span className="made-with">
              Feito com <Heart size={14} className="heart-icon" /> usando React
            </span>
          </p>
          
          <motion.button
            onClick={scrollToTop}
            className="scroll-top"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Voltar ao topo"
          >
            <ArrowUp size={20} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
