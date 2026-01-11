// ============================================================================
// CONTACT SECTION - Seção de Contato
// ============================================================================
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  Send, Mail, Phone, MapPin, 
  Github, Linkedin, Twitter, Instagram,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { usePortfolio } from '../../../context/PortfolioContext';
import { contactAPI } from '../../../services/api';
import SectionWrapper from '../../SectionWrapper/SectionWrapper';
import './ContactSection.css';

const iconMap = { Github, Linkedin, Twitter, Instagram };

const ContactSection = () => {
  const { portfolioData } = usePortfolio();
  const { contact, settings } = portfolioData;
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await contactAPI.sendMessage(formData);
      setStatus({
        type: 'success',
        message: 'Mensagem enviada com sucesso! Entrarei em contato em breve.'
      });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'Erro ao enviar mensagem. Tente novamente.'
      });
    } finally {
      setLoading(false);
      setTimeout(() => setStatus({ type: '', message: '' }), 5000);
    }
  };

  if (!contact?.enabled) return null;

  return (
    <SectionWrapper id="contato" className="contact-section">
      <div className="section-container">
        <div className="section-header">
          <span className="section-subtitle">{contact?.subtitle || 'Fale Comigo'}</span>
          <h2 className="section-title">{contact?.title || 'Contato'}</h2>
          <p className="section-description">{contact?.description}</p>
        </div>

        <div className="contact-grid" ref={ref}>
          {/* Contact Info */}
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h3 className="info-title">Vamos conversar!</h3>
            <p className="info-description">
              Estou disponível para projetos freelance, oportunidades de trabalho ou apenas uma conversa sobre tecnologia.
            </p>

            <div className="contact-items">
              <a href={`mailto:${settings?.email}`} className="contact-item">
                <div className="item-icon">
                  <Mail size={22} />
                </div>
                <div className="item-content">
                  <span className="item-label">Email</span>
                  <span className="item-value">{settings?.email}</span>
                </div>
              </a>

              <a href={`tel:${settings?.phone?.replace(/\D/g, '')}`} className="contact-item">
                <div className="item-icon">
                  <Phone size={22} />
                </div>
                <div className="item-content">
                  <span className="item-label">Telefone</span>
                  <span className="item-value">{settings?.phone}</span>
                </div>
              </a>

              <div className="contact-item">
                <div className="item-icon">
                  <MapPin size={22} />
                </div>
                <div className="item-content">
                  <span className="item-label">Localização</span>
                  <span className="item-value">{settings?.address}</span>
                </div>
              </div>
            </div>

            <div className="contact-social">
              <span className="social-label">Me siga nas redes:</span>
              <div className="social-links">
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
                    >
                      <Icon size={20} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          {contact?.formEnabled && (
            <motion.form
              className="contact-form"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: 50 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nome</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="subject">Assunto</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Qual o assunto?"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Mensagem</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Sua mensagem..."
                  rows={5}
                  required
                />
              </div>

              {status.message && (
                <div className={`form-status ${status.type}`}>
                  {status.type === 'success' ? (
                    <CheckCircle size={18} />
                  ) : (
                    <AlertCircle size={18} />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  <>
                    <span>Enviar Mensagem</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </motion.form>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default ContactSection;
