// ============================================================================
// SECTION WRAPPER - Wrapper animado para seções
// ============================================================================
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './SectionWrapper.css';

const animationVariants = {
  'fade-up': {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  'slide-left': {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 }
  },
  'slide-right': {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 }
  },
  'zoom-in': {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  }
};

const SectionWrapper = ({ 
  children, 
  id, 
  className = '', 
  animation = 'fade-up',
  delay = 0,
  ...props 
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const variants = animationVariants[animation] || animationVariants['fade-up'];

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`section ${className}`}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ 
        duration: 0.6, 
        delay,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      {...props}
    >
      {children}
    </motion.section>
  );
};

export default SectionWrapper;
