// ============================================================================
// HEADER COMPONENT - Navegação principal
// ============================================================================
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, Sun, Moon, Home, User, Briefcase, 
  Code2, MessageSquare, Settings
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { usePortfolio } from '../../context/PortfolioContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { portfolioData } = usePortfolio();
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/sobre', label: 'Sobre', icon: User },
    { path: '/projetos', label: 'Projetos', icon: Code2 },
    { path: '/servicos', label: 'Serviços', icon: Briefcase },
    { path: '/contato', label: 'Contato', icon: MessageSquare },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="logo-content"
          >
            <span className="logo-icon">{'</>'}</span>
            <span className="logo-text">{portfolioData?.settings?.siteName || 'Portfolio'}</span>
          </motion.div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-desktop">
          {navLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link 
                  to={link.path}
                  className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                >
                  <Icon size={16} />
                  <span>{link.label}</span>
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Theme Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="theme-toggle"
            aria-label="Alternar tema"
          >
            <AnimatePresence mode="wait">
              {theme === 'dark' ? (
                <motion.div
                  key="sun"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Sun size={20} />
                </motion.div>
              ) : (
                <motion.div
                  key="moon"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Moon size={20} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Admin Link */}
          {isAuthenticated && (
            <Link to="/admin" className="admin-link">
              <Settings size={20} />
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            className="nav-mobile"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="nav-mobile-content">
              {navLinks.map((link, index) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link 
                      to={link.path}
                      className={`nav-link-mobile ${location.pathname === link.path ? 'active' : ''}`}
                    >
                      <Icon size={20} />
                      <span>{link.label}</span>
                    </Link>
                  </motion.div>
                );
              })}
              {isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: navLinks.length * 0.05 }}
                >
                  <Link to="/admin" className="nav-link-mobile admin">
                    <Settings size={20} />
                    <span>Admin</span>
                  </Link>
                </motion.div>
              )}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
