// ============================================================================
// LOADER COMPONENT - Tela de carregamento
// ============================================================================
import { motion } from 'framer-motion';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <div className="loader-content">
          <motion.div
            className="loader-icon"
            animate={{ 
              rotate: 360,
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              rotate: { duration: 2, repeat: Infinity, ease: 'linear' },
              scale: { duration: 1, repeat: Infinity }
            }}
          >
            {'</>'}
          </motion.div>
          <motion.div
            className="loader-bar"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
          <p className="loader-text">Carregando...</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Loader;
