// ============================================================================
// MERCADO FRESH - Sistema para Supermercado
// ============================================================================
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingCart, Search, MapPin, Clock, Truck,
  Star, Heart, Plus, Minus, Filter, Grid, List, Tag,
  Percent, Package, CreditCard, Smartphone, ChevronRight,
  Leaf, Apple, Beef, Milk, Wine, Cookie, Coffee, IceCream,
  ShoppingBag, TrendingUp, Users, BarChart3, Zap
} from 'lucide-react';
import './MercadoFresh.css';

// Categorias
const categories = [
  { id: 'all', name: 'Todos', icon: '🛒', color: '#22c55e' },
  { id: 'frutas', name: 'Frutas', icon: '🍎', color: '#ef4444' },
  { id: 'verduras', name: 'Verduras', icon: '🥬', color: '#22c55e' },
  { id: 'carnes', name: 'Carnes', icon: '🥩', color: '#dc2626' },
  { id: 'laticinios', name: 'Laticínios', icon: '🥛', color: '#3b82f6' },
  { id: 'bebidas', name: 'Bebidas', icon: '🍷', color: '#8b5cf6' },
  { id: 'padaria', name: 'Padaria', icon: '🥖', color: '#f59e0b' },
  { id: 'limpeza', name: 'Limpeza', icon: '🧹', color: '#06b6d4' }
];

// Produtos
const products = [
  { id: 1, name: 'Banana Prata', price: 5.99, unit: 'kg', image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=300&fit=crop', category: 'frutas', rating: 4.8, organic: true, discount: 0 },
  { id: 2, name: 'Maçã Fuji', price: 8.99, unit: 'kg', image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=300&h=300&fit=crop', category: 'frutas', rating: 4.9, organic: false, discount: 15 },
  { id: 3, name: 'Alface Crespa', price: 3.49, unit: 'un', image: 'https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?w=300&h=300&fit=crop', category: 'verduras', rating: 4.7, organic: true, discount: 0 },
  { id: 4, name: 'Tomate Italiano', price: 7.99, unit: 'kg', image: 'https://images.unsplash.com/photo-1546470427-f5a6f4ba1e07?w=300&h=300&fit=crop', category: 'verduras', rating: 4.6, organic: false, discount: 10 },
  { id: 5, name: 'Picanha Bovina', price: 69.90, unit: 'kg', image: 'https://images.unsplash.com/photo-1603048297172-c92544798d5a?w=300&h=300&fit=crop', category: 'carnes', rating: 4.9, organic: false, discount: 0, badge: 'Premium' },
  { id: 6, name: 'Filé de Frango', price: 18.90, unit: 'kg', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=300&h=300&fit=crop', category: 'carnes', rating: 4.7, organic: false, discount: 20 },
  { id: 7, name: 'Leite Integral', price: 5.49, unit: 'L', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=300&h=300&fit=crop', category: 'laticinios', rating: 4.5, organic: false, discount: 0 },
  { id: 8, name: 'Queijo Mussarela', price: 42.90, unit: 'kg', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=300&h=300&fit=crop', category: 'laticinios', rating: 4.8, organic: false, discount: 5 },
  { id: 9, name: 'Coca-Cola 2L', price: 9.99, unit: 'un', image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300&h=300&fit=crop', category: 'bebidas', rating: 4.6, organic: false, discount: 0 },
  { id: 10, name: 'Suco Natural Laranja', price: 12.90, unit: 'L', image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop', category: 'bebidas', rating: 4.9, organic: true, discount: 0, badge: 'Natural' },
  { id: 11, name: 'Pão Francês', price: 15.90, unit: 'kg', image: 'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?w=300&h=300&fit=crop', category: 'padaria', rating: 4.8, organic: false, discount: 0 },
  { id: 12, name: 'Croissant', price: 4.50, unit: 'un', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=300&h=300&fit=crop', category: 'padaria', rating: 4.7, organic: false, discount: 0 }
];

// Ofertas do Dia
const dailyOffers = [
  { product: 'Cerveja Pack 12un', originalPrice: 59.90, price: 44.90, discount: 25, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=400&h=200&fit=crop' },
  { product: 'Azeite Extra Virgem', originalPrice: 45.90, price: 32.90, discount: 28, image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=200&fit=crop' },
  { product: 'Café Premium 500g', originalPrice: 29.90, price: 19.90, discount: 33, image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=200&fit=crop' }
];

const features = [
  { icon: Truck, title: 'Entrega Rápida', desc: 'Receba em até 2 horas' },
  { icon: Leaf, title: 'Produtos Frescos', desc: 'Direto do produtor' },
  { icon: Tag, title: 'Melhores Preços', desc: 'Ofertas todo dia' },
  { icon: CreditCard, title: 'Pague Fácil', desc: 'Cartão, PIX ou dinheiro' }
];

const stats = [
  { value: '50.000+', label: 'Produtos', icon: Package },
  { value: '100K+', label: 'Clientes', icon: Users },
  { value: '4.8', label: 'Avaliação', icon: Star },
  { value: '2h', label: 'Entrega', icon: Truck }
];

const MercadoFresh = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

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

  const cartTotal = cart.reduce((sum, item) => {
    const finalPrice = item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price;
    return sum + (finalPrice * item.quantity);
  }, 0);
  
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToDemo = () => {
    document.getElementById('mercado-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Mercado Fresh - Sistema para Supermercado | Lucas Sousa</title>
        <meta name="description" content="Sistema completo para supermercados com catálogo digital, carrinho inteligente e delivery integrado." />
      </Helmet>

      <div className="mercado-page">
        {/* Header */}
        <header className="mercado-header">
          <div className="mercado-header-content">
            <Link to="/projetos" className="mercado-back-btn">
              <ArrowLeft size={20} />
            </Link>
            <div className="mercado-logo">
              <span className="mercado-logo-icon">🛒</span>
              <span>Mercado<strong>Fresh</strong></span>
            </div>
            <div className="mercado-location">
              <MapPin size={16} />
              <span>São Paulo, SP</span>
            </div>
            <div className="mercado-header-actions">
              <button className="mercado-cart-btn" onClick={() => setShowCart(true)}>
                <ShoppingCart size={22} />
                {cartCount > 0 && <span className="mercado-cart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="mercado-hero">
          <div className="mercado-hero-bg"></div>
          <div className="mercado-hero-content">
            <motion.div 
              className="mercado-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="mercado-badge">
                <Leaf size={16} />
                Fresquinho Todo Dia
              </span>
              <h1>Seu Mercado<br />Online Favorito</h1>
              <p>
                Sistema completo para supermercados: catálogo digital, 
                gestão de estoque, delivery e muito mais.
              </p>
              
              <div className="mercado-hero-features">
                {features.map((f, idx) => (
                  <div key={idx} className="mercado-feature-mini">
                    <f.icon size={20} />
                    <div>
                      <strong>{f.title}</strong>
                      <span>{f.desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mercado-hero-buttons">
                <button className="mercado-btn-primary" onClick={scrollToDemo}>
                  Ver Catálogo
                  <ChevronRight size={18} />
                </button>
                <Link to="/contato" className="mercado-btn-secondary">
                  Conhecer Sistema
                </Link>
              </div>
            </motion.div>

            <motion.div 
              className="mercado-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="mercado-app-preview">
                <div className="mercado-app-header">
                  <span>Mercado Fresh</span>
                  <div className="mercado-app-status">
                    <span className="status-dot"></span>
                    Online
                  </div>
                </div>
                <div className="mercado-app-content">
                  <div className="mercado-app-search">
                    <Search size={16} />
                    <span>Buscar produtos...</span>
                  </div>
                  <div className="mercado-app-categories">
                    {categories.slice(0, 4).map(cat => (
                      <div key={cat.id} className="mercado-app-cat">
                        <span>{cat.icon}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mercado-app-products">
                    {products.slice(0, 2).map(p => (
                      <div key={p.id} className="mercado-app-product">
                        <div className="app-product-img">{p.category === 'frutas' ? '🍎' : '🥬'}</div>
                        <span className="app-product-name">{p.name}</span>
                        <span className="app-product-price">R$ {p.price.toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="mercado-stats">
          <div className="mercado-container">
            <div className="mercado-stats-grid">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="mercado-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <stat.icon size={24} />
                  <span className="mercado-stat-value">{stat.value}</span>
                  <span className="mercado-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Ofertas do Dia */}
        <section className="mercado-offers">
          <div className="mercado-container">
            <div className="mercado-section-header">
              <h2>🔥 Ofertas do Dia</h2>
              <p>Aproveite descontos imperdíveis</p>
            </div>
            <div className="mercado-offers-grid">
              {dailyOffers.map((offer, idx) => (
                <motion.div 
                  key={idx}
                  className="mercado-offer-card"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="mercado-offer-image">
                    <img src={offer.image} alt={offer.product} />
                    <span className="mercado-offer-badge">-{offer.discount}%</span>
                  </div>
                  <div className="mercado-offer-info">
                    <h3>{offer.product}</h3>
                    <div className="mercado-offer-prices">
                      <span className="offer-original">R$ {offer.originalPrice.toFixed(2)}</span>
                      <span className="offer-current">R$ {offer.price.toFixed(2)}</span>
                    </div>
                    <button className="mercado-offer-btn">
                      <ShoppingCart size={16} />
                      Adicionar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo - Catálogo */}
        <section className="mercado-demo" id="mercado-demo">
          <div className="mercado-container">
            <div className="mercado-section-header">
              <h2>🛒 Nosso Catálogo</h2>
              <p>Encontre tudo que você precisa</p>
            </div>

            {/* Filtros */}
            <div className="mercado-filters">
              <div className="mercado-search">
                <Search size={18} />
                <input 
                  type="text" 
                  placeholder="Buscar produtos..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="mercado-categories-filter">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    className={`mercado-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                    style={{ '--cat-color': cat.color }}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
              <div className="mercado-view-toggle">
                <button 
                  className={viewMode === 'grid' ? 'active' : ''}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid size={18} />
                </button>
                <button 
                  className={viewMode === 'list' ? 'active' : ''}
                  onClick={() => setViewMode('list')}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Grid de Produtos */}
            <div className={`mercado-products-grid ${viewMode}`}>
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    className="mercado-product-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.03 }}
                    layout
                  >
                    <div className="mercado-product-image">
                      <img src={product.image} alt={product.name} />
                      {product.discount > 0 && (
                        <span className="mercado-discount-badge">-{product.discount}%</span>
                      )}
                      {product.organic && (
                        <span className="mercado-organic-badge">
                          <Leaf size={12} />
                          Orgânico
                        </span>
                      )}
                      {product.badge && (
                        <span className="mercado-special-badge">{product.badge}</span>
                      )}
                    </div>
                    <div className="mercado-product-info">
                      <div className="mercado-product-rating">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                      </div>
                      <h3>{product.name}</h3>
                      <div className="mercado-product-price">
                        {product.discount > 0 ? (
                          <>
                            <span className="price-original">R$ {product.price.toFixed(2)}</span>
                            <span className="price-current">
                              R$ {(product.price * (1 - product.discount / 100)).toFixed(2)}
                            </span>
                          </>
                        ) : (
                          <span className="price-current">R$ {product.price.toFixed(2)}</span>
                        )}
                        <span className="price-unit">/{product.unit}</span>
                      </div>
                      <button 
                        className="mercado-add-btn"
                        onClick={() => addToCart(product)}
                      >
                        <Plus size={18} />
                        Adicionar
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mercado-cta">
          <div className="mercado-container">
            <motion.div 
              className="mercado-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="mercado-cta-text">
                <h2>Quer um sistema assim para seu mercado?</h2>
                <p>Entre em contato e transforme seu negócio</p>
              </div>
              <div className="mercado-cta-buttons">
                <Link to="/contato" className="mercado-cta-primary">
                  Solicitar Orçamento
                </Link>
                <Link to="/projetos" className="mercado-cta-secondary">
                  Ver Outros Projetos
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
                className="mercado-cart-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCart(false)}
              />
              <motion.div 
                className="mercado-cart-sidebar"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
              >
                <div className="mercado-cart-header">
                  <h3>🛒 Seu Carrinho</h3>
                  <button onClick={() => setShowCart(false)}>✕</button>
                </div>
                <div className="mercado-cart-items">
                  {cart.length === 0 ? (
                    <div className="mercado-cart-empty">
                      <ShoppingBag size={48} />
                      <p>Seu carrinho está vazio</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="mercado-cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="mercado-cart-item-info">
                          <span className="item-name">{item.name}</span>
                          <span className="item-price">
                            R$ {((item.discount > 0 ? item.price * (1 - item.discount / 100) : item.price) * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="mercado-cart-item-qty">
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
                  <div className="mercado-cart-footer">
                    <div className="mercado-cart-total">
                      <span>Total:</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="mercado-checkout-btn">
                      Finalizar Compra
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

export default MercadoFresh;
