// ============================================================================
// TESTIMONIALS SECTION - Seção de Depoimentos
// ============================================================================
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const { portfolioData } = usePortfolio();
  const { testimonials } = portfolioData;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const intervalRef = useRef(null);

  const items = testimonials?.items || [];

  useEffect(() => {
    if (items.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
    }
    return () => clearInterval(intervalRef.current);
  }, [items.length]);

  const goToPrev = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const goToNext = () => {
    clearInterval(intervalRef.current);
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  if (!testimonials?.enabled || !items.length) return null;

  return (
    <SectionWrapper id="depoimentos" className="testimonials-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{testimonials?.subtitle || 'Feedback'}</span>
          <h2 className="section-title">{testimonials?.title || 'Depoimentos'}</h2>
        </div>

        <div className="testimonials-wrapper" ref={ref}>
          {/* Background Quote */}
          <Quote className="bg-quote" size={200} />

          <motion.div
            className="testimonials-slider"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <div 
              className="testimonials-track"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {items.map((testimonial, index) => (
                <div key={testimonial.id} className="testimonial-slide">
                  <div className="testimonial-card">
                    <div className="testimonial-rating">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          fill={i < testimonial.rating ? 'var(--warning)' : 'transparent'}
                          color={i < testimonial.rating ? 'var(--warning)' : 'var(--text-muted)'}
                        />
                      ))}
                    </div>
                    <p className="testimonial-content">"{testimonial.content}"</p>
                    <div className="testimonial-author">
                      <img
                        src={testimonial.avatar || testimonial.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=6366f1&color=fff`}
                        alt={testimonial.name}
                        loading="lazy"
                        onError={(e) => {
                          e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=6366f1&color=fff`;
                        }}
                      />
                      <div className="author-info">
                        <h4 className="author-name">{testimonial.name}</h4>
                        <span className="author-role">
                          {testimonial.position || testimonial.role} - {testimonial.company}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="testimonials-nav">
              <button
                className="nav-btn"
                onClick={goToPrev}
                aria-label="Anterior"
              >
                <ChevronLeft size={24} />
              </button>

              <div className="nav-dots">
                {items.map((_, index) => (
                  <button
                    key={index}
                    className={`nav-dot ${index === currentIndex ? 'active' : ''}`}
                    onClick={() => {
                      clearInterval(intervalRef.current);
                      setCurrentIndex(index);
                    }}
                    aria-label={`Ir para depoimento ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="nav-btn"
                onClick={goToNext}
                aria-label="Próximo"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
