// ============================================================================
// LOGIN PAGE - Página de Login para Admin
// ============================================================================
import { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePortfolio } from '../../context/PortfolioContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login, isAuthenticated, loading } = useAuth();
  const { portfolioData } = usePortfolio();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Se já está autenticado, redireciona
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const result = await login(formData.email, formData.password);
    
    if (result.success) {
      navigate('/admin');
    } else {
      setError(result.error);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-bg">
        <div className="login-gradient"></div>
      </div>

      <motion.div
        className="login-container"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="login-card">
          {/* Header */}
          <div className="login-header">
            <div className="login-logo">
              <span>{'</>'}</span>
            </div>
            <h1>Área Administrativa</h1>
            <p>Faça login para gerenciar seu portfólio</p>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit}>
            {error && (
              <motion.div
                className="login-error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <AlertCircle size={18} />
                <span>{error}</span>
              </motion.div>
            )}

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <div className="input-wrapper">
                <Mail size={18} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="seu@email.com"
                  required
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <div className="input-wrapper">
                <Lock size={18} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading-spinner"></span>
              ) : (
                <>
                  <LogIn size={18} />
                  <span>Entrar</span>
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="login-footer">
            <p>
              Problemas com o acesso?{' '}
              <a href={`mailto:${portfolioData?.settings?.email}`}>
                Entre em contato
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
