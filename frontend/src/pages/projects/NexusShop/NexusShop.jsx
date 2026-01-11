// ============================================================================
// NEXUSSHOP E-COMMERCE - Plataforma de E-commerce
// Página demonstrativa completa e funcional
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, CreditCard, Package, Truck, Star, Heart,
  ChevronRight, Play, ArrowRight, Menu, X, Search,
  Filter, Grid, List, Plus, Minus, Check, ShoppingBag,
  User, Bell, Tag, Percent, TrendingUp, BarChart3, Eye
} from 'lucide-react';
import './NexusShop.css';

// Mock Data
const mockProducts = [
  { id: 1, name: 'iPhone 15 Pro Max', price: 9499.00, originalPrice: 10999.00, image: '📱', category: 'Eletrônicos', rating: 4.9, reviews: 1247, badge: 'Mais Vendido' },
  { id: 2, name: 'MacBook Pro M3', price: 18999.00, originalPrice: 21999.00, image: '💻', category: 'Eletrônicos', rating: 4.8, reviews: 856, badge: 'Novo' },
  { id: 3, name: 'Sony WH-1000XM5', price: 2299.00, originalPrice: 2799.00, image: '🎧', category: 'Eletrônicos', rating: 4.7, reviews: 2134 },
  { id: 4, name: 'Nike Air Max 270', price: 699.00, originalPrice: 899.00, image: '👟', category: 'Esportes', rating: 4.6, reviews: 3421, badge: '-22%' },
  { id: 5, name: 'Apple Watch Ultra 2', price: 8999.00, originalPrice: 9999.00, image: '⌚', category: 'Eletrônicos', rating: 4.9, reviews: 678 },
  { id: 6, name: 'Câmera Sony A7 IV', price: 15999.00, originalPrice: 17999.00, image: '📷', category: 'Eletrônicos', rating: 4.8, reviews: 234 },
];

const mockCategories = [
  { name: 'Eletrônicos', icon: '📱', count: 1234 },
  { name: 'Moda', icon: '👔', count: 2567 },
  { name: 'Casa', icon: '🏠', count: 890 },
  { name: 'Esportes', icon: '⚽', count: 456 },
  { name: 'Beleza', icon: '💄', count: 789 },
  { name: 'Games', icon: '🎮', count: 345 },
];

const mockStats = [
  { label: 'Produtos', value: '50.000+', icon: Package, color: '#6366f1' },
  { label: 'Vendas/Mês', value: 'R$ 2M+', icon: TrendingUp, color: '#10b981' },
  { label: 'Clientes', value: '100K+', icon: User, color: '#f59e0b' },
  { label: 'Conversão', value: '4.2%', icon: BarChart3, color: '#ec4899' },
];

const features = [
  {
    icon: ShoppingCart,
    title: 'Carrinho Inteligente',
    description: 'Recuperação de carrinho abandonado, sugestões personalizadas e checkout otimizado.'
  },
  {
    icon: CreditCard,
    title: 'Múltiplos Pagamentos',
    description: 'PIX, cartões, boleto, carteiras digitais e parcelamento em até 12x sem juros.'
  },
  {
    icon: Truck,
    title: 'Logística Integrada',
    description: 'Cálculo de frete em tempo real, rastreamento e integração com transportadoras.'
  },
  {
    icon: Tag,
    title: 'Gestão de Promoções',
    description: 'Cupons, descontos progressivos, flash sales e programa de fidelidade.'
  },
  {
    icon: BarChart3,
    title: 'Analytics Avançado',
    description: 'Dashboard com métricas de vendas, conversão, ticket médio e comportamento.'
  },
  {
    icon: Package,
    title: 'Gestão de Estoque',
    description: 'Controle de inventário, alertas de reposição e gestão multi-armazém.'
  }
];

const NexusShop = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, delta) => {
    setCartItems(cartItems.map(item => {
      if (item.id === productId) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const scrollToDemo = () => {
    const demoSection = document.getElementById('nexus-demo');
    if (demoSection) {
      demoSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const filteredProducts = mockProducts.filter(p => 
    (activeCategory === 'all' || p.category === activeCategory) &&
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet>
        <title>NexusShop E-commerce - Plataforma de Vendas Online | Lucas Sousa</title>
        <meta name="description" content="Plataforma completa de e-commerce com gestão de produtos, carrinho inteligente e múltiplos pagamentos." />
      </Helmet>

      <div className="nexus-page">
        {/* Hero Section */}
        <section className="nexus-hero">
          <div className="nexus-hero-bg">
            <div className="nexus-hero-gradient"></div>
            <div className="nexus-hero-shapes">
              <div className="nexus-shape nexus-shape-1"></div>
              <div className="nexus-shape nexus-shape-2"></div>
              <div className="nexus-shape nexus-shape-3"></div>
            </div>
          </div>
          
          <div className="nexus-hero-content">
            <motion.div 
              className="nexus-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="nexus-badge">
                <ShoppingBag size={16} />
                E-commerce Platform
              </span>
              <h1>NexusShop</h1>
              <p className="nexus-tagline">
                A plataforma de e-commerce mais completa do mercado
              </p>
              <p className="nexus-description">
                Venda online com uma loja poderosa, intuitiva e escalável. 
                Gestão completa de produtos, pedidos, clientes e pagamentos em um só lugar.
              </p>
              
              <div className="nexus-hero-stats">
                {mockStats.map((stat, idx) => (
                  <div key={idx} className="nexus-stat-item">
                    <span className="nexus-stat-value">{stat.value}</span>
                    <span className="nexus-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>

              <div className="nexus-hero-buttons">
                <button className="nexus-btn-primary" onClick={scrollToDemo}>
                  <Play size={18} />
                  Ver Demo
                </button>
                <Link to="/contato" className="nexus-btn-secondary">
                  Criar Minha Loja
                  <ArrowRight size={18} />
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="nexus-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="nexus-store-preview">
                <div className="nexus-preview-header">
                  <div className="nexus-preview-brand">
                    <ShoppingBag size={20} />
                    <span>NexusShop</span>
                  </div>
                  <div className="nexus-preview-cart">
                    <ShoppingCart size={18} />
                    <span className="nexus-cart-badge">3</span>
                  </div>
                </div>
                <div className="nexus-preview-products">
                  {mockProducts.slice(0, 3).map((product, idx) => (
                    <motion.div 
                      key={product.id}
                      className="nexus-mini-product"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.1 }}
                    >
                      <span className="nexus-mini-image">{product.image}</span>
                      <div className="nexus-mini-info">
                        <span className="nexus-mini-name">{product.name.split(' ').slice(0, 2).join(' ')}</span>
                        <span className="nexus-mini-price">R$ {product.price.toLocaleString()}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="nexus-features">
          <div className="nexus-container">
            <motion.div 
              className="nexus-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="nexus-section-tag">Recursos</span>
              <h2>Tudo para vender online</h2>
              <p>Funcionalidades completas para criar uma loja virtual de sucesso</p>
            </motion.div>

            <div className="nexus-features-grid">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="nexus-feature-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <div className="nexus-feature-icon">
                    <feature.icon size={24} />
                  </div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Store Demo */}
        <section id="nexus-demo" className="nexus-demo-section">
          <div className="nexus-container">
            <motion.div 
              className="nexus-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="nexus-section-tag">Demo Interativa</span>
              <h2>Experimente a loja</h2>
              <p>Navegue pela loja como um cliente real</p>
            </motion.div>

            <motion.div 
              className="nexus-store-demo"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {/* Store Header */}
              <div className="nexus-store-header">
                <div className="nexus-store-brand">
                  <ShoppingBag size={24} />
                  <span>NexusShop</span>
                </div>

                <div className="nexus-store-search">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Buscar produtos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="nexus-store-actions">
                  <button className="nexus-icon-btn">
                    <Heart size={20} />
                  </button>
                  <button 
                    className="nexus-cart-btn"
                    onClick={() => setShowCart(!showCart)}
                  >
                    <ShoppingCart size={20} />
                    {cartCount > 0 && (
                      <span className="nexus-cart-count">{cartCount}</span>
                    )}
                  </button>
                </div>
              </div>

              {/* Categories */}
              <div className="nexus-categories">
                <button 
                  className={`nexus-category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                  onClick={() => setActiveCategory('all')}
                >
                  Todos
                </button>
                {mockCategories.slice(0, 4).map(cat => (
                  <button 
                    key={cat.name}
                    className={`nexus-category-btn ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    {cat.icon} {cat.name}
                  </button>
                ))}
              </div>

              {/* Store Content */}
              <div className="nexus-store-content">
                {/* Products Grid */}
                <div className="nexus-products-area">
                  <div className="nexus-products-header">
                    <span>{filteredProducts.length} produtos encontrados</span>
                    <div className="nexus-view-modes">
                      <button 
                        className={`nexus-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                      >
                        <Grid size={18} />
                      </button>
                      <button 
                        className={`nexus-view-btn ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                      >
                        <List size={18} />
                      </button>
                    </div>
                  </div>

                  <div className={`nexus-products-grid ${viewMode}`}>
                    {filteredProducts.map((product) => (
                      <motion.div 
                        key={product.id}
                        className="nexus-product-card"
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        whileHover={{ y: -5 }}
                      >
                        {product.badge && (
                          <span className="nexus-product-badge">{product.badge}</span>
                        )}
                        <button className="nexus-wishlist-btn">
                          <Heart size={18} />
                        </button>
                        <div className="nexus-product-image">
                          <span>{product.image}</span>
                        </div>
                        <div className="nexus-product-info">
                          <span className="nexus-product-category">{product.category}</span>
                          <h3>{product.name}</h3>
                          <div className="nexus-product-rating">
                            <Star size={14} fill="#f59e0b" stroke="#f59e0b" />
                            <span>{product.rating}</span>
                            <span className="nexus-reviews">({product.reviews})</span>
                          </div>
                          <div className="nexus-product-prices">
                            <span className="nexus-current-price">R$ {product.price.toLocaleString()}</span>
                            {product.originalPrice && (
                              <span className="nexus-original-price">R$ {product.originalPrice.toLocaleString()}</span>
                            )}
                          </div>
                          <button 
                            className="nexus-add-cart-btn"
                            onClick={() => addToCart(product)}
                          >
                            <ShoppingCart size={16} />
                            Adicionar
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Cart Sidebar */}
                <AnimatePresence>
                  {showCart && (
                    <motion.div 
                      className="nexus-cart-sidebar"
                      initial={{ x: '100%' }}
                      animate={{ x: 0 }}
                      exit={{ x: '100%' }}
                      transition={{ type: 'tween' }}
                    >
                      <div className="nexus-cart-header">
                        <h3>
                          <ShoppingCart size={20} />
                          Carrinho ({cartCount})
                        </h3>
                        <button onClick={() => setShowCart(false)}>
                          <X size={20} />
                        </button>
                      </div>

                      <div className="nexus-cart-items">
                        {cartItems.length === 0 ? (
                          <div className="nexus-cart-empty">
                            <ShoppingBag size={48} />
                            <p>Seu carrinho está vazio</p>
                          </div>
                        ) : (
                          cartItems.map(item => (
                            <div key={item.id} className="nexus-cart-item">
                              <span className="nexus-cart-item-image">{item.image}</span>
                              <div className="nexus-cart-item-info">
                                <span className="nexus-cart-item-name">{item.name}</span>
                                <span className="nexus-cart-item-price">R$ {item.price.toLocaleString()}</span>
                              </div>
                              <div className="nexus-cart-item-qty">
                                <button onClick={() => updateQuantity(item.id, -1)}>
                                  <Minus size={14} />
                                </button>
                                <span>{item.quantity}</span>
                                <button onClick={() => updateQuantity(item.id, 1)}>
                                  <Plus size={14} />
                                </button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      {cartItems.length > 0 && (
                        <div className="nexus-cart-footer">
                          <div className="nexus-cart-total">
                            <span>Total:</span>
                            <span className="nexus-total-value">R$ {cartTotal.toLocaleString()}</span>
                          </div>
                          <button className="nexus-checkout-btn">
                            Finalizar Compra
                            <ArrowRight size={18} />
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Admin Preview */}
        <section className="nexus-admin-preview">
          <div className="nexus-container">
            <motion.div 
              className="nexus-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="nexus-section-tag">Painel Admin</span>
              <h2>Gestão completa do negócio</h2>
              <p>Dashboard administrativo com todas as métricas importantes</p>
            </motion.div>

            <motion.div 
              className="nexus-admin-dashboard"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="nexus-admin-stats">
                {[
                  { label: 'Vendas Hoje', value: 'R$ 12.450', change: '+15%', icon: CreditCard },
                  { label: 'Pedidos', value: '47', change: '+8%', icon: Package },
                  { label: 'Visitantes', value: '1.234', change: '+23%', icon: Eye },
                  { label: 'Conversão', value: '3.8%', change: '+0.5%', icon: TrendingUp },
                ].map((stat, idx) => (
                  <motion.div 
                    key={idx}
                    className="nexus-admin-stat"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="nexus-admin-stat-icon">
                      <stat.icon size={24} />
                    </div>
                    <div className="nexus-admin-stat-info">
                      <span className="nexus-admin-stat-label">{stat.label}</span>
                      <span className="nexus-admin-stat-value">{stat.value}</span>
                      <span className="nexus-admin-stat-change positive">{stat.change}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="nexus-admin-charts">
                <div className="nexus-chart-card">
                  <h3>Vendas dos Últimos 7 Dias</h3>
                  <div className="nexus-sales-chart">
                    {['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'].map((day, idx) => (
                      <div key={day} className="nexus-chart-column">
                        <motion.div 
                          className="nexus-chart-bar"
                          initial={{ height: 0 }}
                          whileInView={{ height: `${[45, 60, 35, 80, 65, 90, 50][idx]}%` }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                        />
                        <span>{day}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="nexus-recent-orders">
                  <h3>Pedidos Recentes</h3>
                  <div className="nexus-orders-list">
                    {[
                      { id: '#12847', customer: 'João Silva', value: 'R$ 459,90', status: 'Enviado' },
                      { id: '#12846', customer: 'Maria Santos', value: 'R$ 1.299,00', status: 'Pago' },
                      { id: '#12845', customer: 'Pedro Costa', value: 'R$ 89,90', status: 'Pendente' },
                    ].map((order, idx) => (
                      <div key={idx} className="nexus-order-item">
                        <div className="nexus-order-main">
                          <span className="nexus-order-id">{order.id}</span>
                          <span className="nexus-order-customer">{order.customer}</span>
                        </div>
                        <span className="nexus-order-value">{order.value}</span>
                        <span className={`nexus-order-status ${order.status.toLowerCase()}`}>{order.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Tech Stack */}
        <section className="nexus-tech">
          <div className="nexus-container">
            <motion.div 
              className="nexus-section-header"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="nexus-section-tag">Tecnologias</span>
              <h2>Stack de desenvolvimento</h2>
            </motion.div>

            <div className="nexus-tech-grid">
              {['Next.js', 'React', 'Prisma', 'PostgreSQL', 'Stripe', 'Redis', 'AWS S3', 'Vercel'].map((tech, idx) => (
                <motion.div 
                  key={tech}
                  className="nexus-tech-item"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ scale: 1.1 }}
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="nexus-cta">
          <div className="nexus-container">
            <motion.div 
              className="nexus-cta-content"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2>Pronto para vender online?</h2>
              <p>Entre em contato e vamos criar a loja perfeita para o seu negócio.</p>
              <div className="nexus-cta-buttons">
                <Link to="/contato" className="nexus-btn-primary">
                  Criar Minha Loja
                  <ArrowRight size={18} />
                </Link>
                <Link to="/projetos" className="nexus-btn-secondary">
                  Ver Outros Projetos
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back Link */}
        <div className="nexus-back-link">
          <Link to="/projetos">
            <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
            Voltar para Projetos
          </Link>
        </div>
      </div>
    </>
  );
};

export default NexusShop;
