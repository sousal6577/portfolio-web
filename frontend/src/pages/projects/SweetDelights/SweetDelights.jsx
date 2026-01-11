// ============================================================================
// SWEET DELIGHTS - Sistema para Confeitaria/Doceria
// Página demonstrativa completa e funcional
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, Heart, Star, Search, Filter,
  Plus, Minus, ShoppingCart, Clock, MapPin, Phone,
  Calendar, Gift, Truck, CreditCard, ChevronRight,
  Instagram, MessageCircle, Award, Users, TrendingUp,
  Cake, Cookie, IceCream, Coffee
} from 'lucide-react';
import './SweetDelights.css';

// Dados dos Produtos
const products = [
  {
    id: 1,
    name: 'Bolo Red Velvet',
    description: 'Bolo artesanal com cream cheese e frutas vermelhas',
    price: 89.90,
    originalPrice: 110.00,
    image: 'https://images.unsplash.com/photo-1586788680434-30d324b2d46f?w=400&h=400&fit=crop',
    category: 'bolos',
    rating: 4.9,
    reviews: 234,
    badge: 'Mais Vendido',
    preparationTime: '24h'
  },
  {
    id: 2,
    name: 'Brigadeiros Gourmet',
    description: 'Caixa com 12 unidades de sabores variados',
    price: 45.00,
    image: 'https://images.unsplash.com/photo-1606890658317-7d14490b76fd?w=400&h=400&fit=crop',
    category: 'doces',
    rating: 4.8,
    reviews: 567,
    badge: 'Favorito',
    preparationTime: '4h'
  },
  {
    id: 3,
    name: 'Torta de Limão Siciliano',
    description: 'Massa crocante com creme de limão e merengue italiano',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=400&h=400&fit=crop',
    category: 'tortas',
    rating: 4.7,
    reviews: 189,
    preparationTime: '12h'
  },
  {
    id: 4,
    name: 'Macarons Franceses',
    description: 'Caixa com 6 macarons de sabores especiais',
    price: 38.00,
    image: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=400&h=400&fit=crop',
    category: 'doces',
    rating: 4.9,
    reviews: 312,
    badge: 'Premium',
    preparationTime: '6h'
  },
  {
    id: 5,
    name: 'Cupcakes Decorados',
    description: 'Kit com 6 cupcakes temáticos personalizados',
    price: 55.00,
    image: 'https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?w=400&h=400&fit=crop',
    category: 'cupcakes',
    rating: 4.8,
    reviews: 423,
    preparationTime: '8h'
  },
  {
    id: 6,
    name: 'Cheesecake de Frutas',
    description: 'Cheesecake cremoso com calda de frutas vermelhas',
    price: 68.00,
    originalPrice: 85.00,
    image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop',
    category: 'tortas',
    rating: 4.9,
    reviews: 267,
    badge: '-20%',
    preparationTime: '24h'
  },
  {
    id: 7,
    name: 'Pão de Mel Recheado',
    description: 'Pão de mel com doce de leite coberto com chocolate',
    price: 32.00,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop',
    category: 'doces',
    rating: 4.6,
    reviews: 178,
    preparationTime: '4h'
  },
  {
    id: 8,
    name: 'Bolo de Chocolate Belga',
    description: 'Três camadas de chocolate com ganache e morangos',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop',
    category: 'bolos',
    rating: 5.0,
    reviews: 445,
    badge: '5 Estrelas',
    preparationTime: '48h'
  }
];

const categories = [
  { id: 'all', name: 'Todos', icon: '🍰', count: 8 },
  { id: 'bolos', name: 'Bolos', icon: '🎂', count: 2 },
  { id: 'tortas', name: 'Tortas', icon: '🥧', count: 2 },
  { id: 'doces', name: 'Doces', icon: '🍬', count: 3 },
  { id: 'cupcakes', name: 'Cupcakes', icon: '🧁', count: 1 }
];

const features = [
  { icon: Cake, title: 'Receitas Artesanais', description: 'Ingredientes selecionados e receitas exclusivas da casa' },
  { icon: Clock, title: 'Feito na Hora', description: 'Produção diária para garantir frescor e qualidade' },
  { icon: Truck, title: 'Entrega Especial', description: 'Embalagem térmica para manter a perfeição' },
  { icon: Gift, title: 'Personalização', description: 'Decorações e sabores personalizados para seu evento' }
];

const stats = [
  { value: '5.000+', label: 'Clientes Satisfeitos', icon: Users },
  { value: '15.000+', label: 'Pedidos Entregues', icon: ShoppingBag },
  { value: '4.9', label: 'Avaliação Média', icon: Star },
  { value: '98%', label: 'Taxa de Recompra', icon: TrendingUp }
];

const testimonials = [
  {
    name: 'Maria Silva',
    role: 'Cliente VIP',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    content: 'Os bolos são simplesmente divinos! Encomendei para o aniversário da minha filha e todos amaram.',
    rating: 5
  },
  {
    name: 'João Santos',
    role: 'Cliente desde 2022',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
    content: 'Melhor confeitaria da cidade! Os brigadeiros gourmet são viciantes.',
    rating: 5
  },
  {
    name: 'Ana Oliveira',
    role: 'Organizadora de Eventos',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
    content: 'Parceria perfeita para meus eventos. Qualidade impecável e entrega sempre pontual.',
    rating: 5
  }
];

const SweetDelights = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [animatedStats, setAnimatedStats] = useState({});

  // Animação dos números
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setAnimatedStats(prev => ({ ...prev, visible: true }));
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.getElementById('sweet-stats');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);

  const filteredProducts = products.filter(p => 
    (activeCategory === 'all' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateCartItem = (id, delta) => {
    setCart(cart.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToDemo = () => {
    document.getElementById('sweet-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Sweet Delights - Sistema para Confeitaria | Lucas Sousa</title>
        <meta name="description" content="Sistema completo para confeitarias e docerias com cardápio digital, pedidos online e gestão de encomendas." />
      </Helmet>

      <div className="sweet-page">
        {/* Header */}
        <header className="sweet-header">
          <div className="sweet-header-content">
            <Link to="/projetos" className="sweet-back-btn">
              <ArrowLeft size={20} />
            </Link>
            <div className="sweet-logo">
              <span className="sweet-logo-icon">🧁</span>
              <span>Sweet Delights</span>
            </div>
            <div className="sweet-header-actions">
              <button className="sweet-icon-btn" onClick={() => setShowCart(true)}>
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="sweet-cart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </header>

        {/* Hero Section */}
        <section className="sweet-hero">
          <div className="sweet-hero-bg">
            <div className="sweet-hero-gradient"></div>
            <div className="sweet-hero-pattern"></div>
          </div>
          
          <div className="sweet-hero-content">
            <motion.div 
              className="sweet-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="sweet-badge">
                <Award size={16} />
                Confeitaria Artesanal
              </span>
              <h1>Doces que Encantam</h1>
              <p className="sweet-tagline">Transforme momentos especiais em memórias deliciosas</p>
              <p className="sweet-description">
                Sistema completo para confeitarias: cardápio digital interativo, 
                gestão de encomendas, controle de produção e delivery integrado.
              </p>
              
              <div className="sweet-hero-buttons">
                <button className="sweet-btn-primary" onClick={scrollToDemo}>
                  Ver Cardápio
                  <ChevronRight size={18} />
                </button>
                <Link to="/contato" className="sweet-btn-secondary">
                  <MessageCircle size={18} />
                  Fazer Encomenda
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="sweet-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="sweet-showcase">
                <img 
                  src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&h=500&fit=crop" 
                  alt="Bolo decorado"
                  className="sweet-showcase-main"
                />
                <motion.div 
                  className="sweet-floating-card sweet-float-1"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <span className="sweet-float-icon">⭐</span>
                  <span>4.9 Avaliação</span>
                </motion.div>
                <motion.div 
                  className="sweet-floating-card sweet-float-2"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <span className="sweet-float-icon">🎂</span>
                  <span>+500 Receitas</span>
                </motion.div>
                <motion.div 
                  className="sweet-floating-card sweet-float-3"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.8, repeat: Infinity }}
                >
                  <span className="sweet-float-icon">🚀</span>
                  <span>Entrega Rápida</span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="sweet-stats" id="sweet-stats">
          <div className="sweet-container">
            <div className="sweet-stats-grid">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="sweet-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <stat.icon className="sweet-stat-icon" size={28} />
                  <span className="sweet-stat-value">{stat.value}</span>
                  <span className="sweet-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="sweet-features">
          <div className="sweet-container">
            <motion.div 
              className="sweet-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Por que escolher a Sweet Delights?</h2>
              <p>Qualidade artesanal em cada detalhe</p>
            </motion.div>
            
            <div className="sweet-features-grid">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="sweet-feature-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="sweet-feature-icon">
                    <feature.icon size={28} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo - Cardápio */}
        <section className="sweet-demo" id="sweet-demo">
          <div className="sweet-container">
            <motion.div 
              className="sweet-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>🍰 Nosso Cardápio</h2>
              <p>Escolha suas delícias favoritas</p>
            </motion.div>

            {/* Filtros */}
            <div className="sweet-filters">
              <div className="sweet-search">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar doces..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="sweet-categories">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    className={`sweet-category-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className="sweet-products-grid">
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    className="sweet-product-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: idx * 0.05 }}
                    layout
                  >
                    <div className="sweet-product-image">
                      <img src={product.image} alt={product.name} />
                      {product.badge && (
                        <span className="sweet-product-badge">{product.badge}</span>
                      )}
                      <button 
                        className={`sweet-favorite-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart size={18} fill={favorites.includes(product.id) ? '#ef4444' : 'none'} />
                      </button>
                    </div>
                    <div className="sweet-product-info">
                      <div className="sweet-product-rating">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                        <span className="sweet-reviews">({product.reviews})</span>
                      </div>
                      <h3 className="sweet-product-name">{product.name}</h3>
                      <p className="sweet-product-desc">{product.description}</p>
                      <div className="sweet-product-time">
                        <Clock size={14} />
                        <span>Preparo: {product.preparationTime}</span>
                      </div>
                      <div className="sweet-product-footer">
                        <div className="sweet-product-price">
                          <span className="sweet-price-current">
                            R$ {product.price.toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="sweet-price-original">
                              R$ {product.originalPrice.toFixed(2)}
                            </span>
                          )}
                        </div>
                        <button 
                          className="sweet-add-btn"
                          onClick={() => addToCart(product)}
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="sweet-testimonials">
          <div className="sweet-container">
            <motion.div 
              className="sweet-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>💬 O que dizem nossos clientes</h2>
              <p>Avaliações reais de quem já provou</p>
            </motion.div>

            <div className="sweet-testimonials-grid">
              {testimonials.map((t, idx) => (
                <motion.div 
                  key={idx}
                  className="sweet-testimonial-card"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="sweet-testimonial-rating">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#f59e0b" color="#f59e0b" />
                    ))}
                  </div>
                  <p className="sweet-testimonial-content">"{t.content}"</p>
                  <div className="sweet-testimonial-author">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <span className="sweet-author-name">{t.name}</span>
                      <span className="sweet-author-role">{t.role}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="sweet-cta">
          <div className="sweet-container">
            <motion.div 
              className="sweet-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Pronto para adoçar seus momentos?</h2>
              <p>Entre em contato e faça sua encomenda especial</p>
              <div className="sweet-cta-buttons">
                <a href="https://wa.me/5511999999999" className="sweet-btn-whatsapp">
                  <MessageCircle size={20} />
                  Pedir pelo WhatsApp
                </a>
                <Link to="/contato" className="sweet-btn-outline">
                  Ver mais projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Cart Sidebar */}
        <AnimatePresence>
          {showCart && (
            <>
              <motion.div 
                className="sweet-cart-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCart(false)}
              />
              <motion.div 
                className="sweet-cart-sidebar"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
              >
                <div className="sweet-cart-header">
                  <h3>🛒 Seu Pedido</h3>
                  <button onClick={() => setShowCart(false)}>✕</button>
                </div>
                <div className="sweet-cart-items">
                  {cart.length === 0 ? (
                    <div className="sweet-cart-empty">
                      <span>🧁</span>
                      <p>Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="sweet-cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="sweet-cart-item-info">
                          <span className="sweet-cart-item-name">{item.name}</span>
                          <span className="sweet-cart-item-price">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="sweet-cart-item-qty">
                          <button onClick={() => updateCartItem(item.id, -1)}>
                            <Minus size={14} />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateCartItem(item.id, 1)}>
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="sweet-cart-footer">
                    <div className="sweet-cart-total">
                      <span>Total:</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="sweet-checkout-btn">
                      <CreditCard size={18} />
                      Finalizar Pedido
                    </button>
                  </div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default SweetDelights;
