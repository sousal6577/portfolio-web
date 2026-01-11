// ============================================================================
// WHATSAPP BUTTON - Botão flutuante do WhatsApp
// ============================================================================
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { usePortfolio } from '../../context/PortfolioContext';
import './WhatsAppButton.css';

const WhatsAppButton = () => {
  const { portfolioData } = usePortfolio();
  const { settings } = portfolioData;

  const handleClick = () => {
    const phone = settings?.whatsappNumber?.replace(/\D/g, '') || '5511999999999';
    const message = encodeURIComponent(settings?.whatsappMessage || 'Olá! Vi seu portfólio e gostaria de conversar.');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <motion.button
      className="whatsapp-button"
      onClick={handleClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1, type: 'spring', stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Contato via WhatsApp"
    >
      <div className="whatsapp-pulse"></div>
      <MessageCircle size={28} />
      <span className="whatsapp-tooltip">Fale conosco!</span>
    </motion.button>
  );
};

export default WhatsAppButton;
