// ============================================================================
// MODA STYLE - Sistema para Loja de Roupas
// ============================================================================
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, ShoppingBag, Search, Heart, Star, Filter,
  Grid, List, ChevronRight, Tag, Truck, Shield, CreditCard,
  Plus, Minus, X, SlidersHorizontal, Check
} from 'lucide-react';
import './ModaStyle.css';

const categories = [
  { id: 'all', name: 'Todos', icon: '👗' },
  { id: 'vestidos', name: 'Vestidos', icon: '👗' },
  { id: 'blusas', name: 'Blusas', icon: '👚' },
  { id: 'calcas', name: 'Calças', icon: '👖' },
  { id: 'saias', name: 'Saias', icon: '🩱' },
  { id: 'acessorios', name: 'Acessórios', icon: '👜' }
];

const products = [
  { id: 1, name: 'Vestido Floral Verão', price: 189.90, originalPrice: 249.90, image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=400&h=500&fit=crop', category: 'vestidos', rating: 4.9, reviews: 128, sizes: ['P', 'M', 'G'], colors: ['Rosa', 'Azul', 'Verde'], new: true },
  { id: 2, name: 'Blusa Cropped Elegante', price: 89.90, originalPrice: null, image: 'https://images.unsplash.com/photo-1564257631407-4deb1f99d992?w=400&h=500&fit=crop', category: 'blusas', rating: 4.7, reviews: 84, sizes: ['P', 'M', 'G', 'GG'], colors: ['Branco', 'Preto'], new: false },
  { id: 3, name: 'Calça Jeans Premium', price: 229.90, originalPrice: 299.90, image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=400&h=500&fit=crop', category: 'calcas', rating: 4.8, reviews: 256, sizes: ['36', '38', '40', '42', '44'], colors: ['Azul Escuro', 'Azul Claro'], new: false },
  { id: 4, name: 'Saia Midi Plissada', price: 149.90, originalPrice: null, image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aebd?w=400&h=500&fit=crop', category: 'saias', rating: 4.6, reviews: 67, sizes: ['P', 'M', 'G'], colors: ['Preto', 'Bege', 'Bordô'], new: true },
  { id: 5, name: 'Bolsa Couro Luxo', price: 399.90, originalPrice: 499.90, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=500&fit=crop', category: 'acessorios', rating: 4.9, reviews: 312, sizes: ['Único'], colors: ['Caramelo', 'Preto', 'Nude'], new: false },
  { id: 6, name: 'Vestido Longo Festa', price: 459.90, originalPrice: 599.90, image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=400&h=500&fit=crop', category: 'vestidos', rating: 4.8, reviews: 89, sizes: ['P', 'M', 'G', 'GG'], colors: ['Vermelho', 'Preto', 'Azul Marinho'], new: false },
  { id: 7, name: 'Blusa Social Cetim', price: 129.90, originalPrice: null, image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?w=400&h=500&fit=crop', category: 'blusas', rating: 4.5, reviews: 143, sizes: ['P', 'M', 'G'], colors: ['Champagne', 'Branco', 'Rosa'], new: true },
  { id: 8, name: 'Calça Alfaiataria', price: 269.90, originalPrice: 329.90, image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', category: 'calcas', rating: 4.7, reviews: 198, sizes: ['36', '38', '40', '42'], colors: ['Preto', 'Cinza', 'Marinho'], new: false }
];

const features = [
  { icon: Truck, title: 'Frete Grátis', desc: 'Acima de R$ 299' },
  { icon: Shield, title: 'Compra Segura', desc: '100% Protegido' },
  { icon: CreditCard, title: 'Parcele em 10x', desc: 'Sem juros' },
  { icon: Tag, title: 'Descontos', desc: 'Até 50% OFF' }
];

const stats = [
  { value: '10K+', label: 'Clientes Felizes' },
  { value: '500+', label: 'Produtos' },
  { value: '4.9', label: 'Avaliação' },
  { value: '24h', label: 'Entrega Express' }
];

const ModaStyle = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [favorites, setFavorites] = useState([]);
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
      setCart([...cart, { ...product, quantity: 1, selectedSize: product.sizes[0], selectedColor: product.colors[0] }]);
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

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const scrollToDemo = () => {
    document.getElementById('moda-demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Helmet>
        <title>Moda Style - Sistema para Loja de Roupas | Lucas Sousa</title>
        <meta name="description" content="Sistema completo para lojas de roupas com catálogo, carrinho, favoritos e checkout integrado." />
      </Helmet>

      <div className="moda-page">
        {/* Header */}
        <header className="moda-header">
          <div className="moda-header-content">
            <Link to="/projetos" className="moda-back-btn">
              <ArrowLeft size={20} />
            </Link>
            <div className="moda-logo">
              <span className="moda-logo-icon">👗</span>
              <span>Moda<strong>Style</strong></span>
            </div>
            <div className="moda-search">
              <Search size={18} />
              <input 
                type="text" 
                placeholder="Buscar produtos..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="moda-header-actions">
              <button className="moda-icon-btn">
                <Heart size={22} />
                {favorites.length > 0 && <span className="moda-badge">{favorites.length}</span>}
              </button>
              <button className="moda-icon-btn" onClick={() => setShowCart(true)}>
                <ShoppingBag size={22} />
                {cartCount > 0 && <span className="moda-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="moda-hero">
          <div className="moda-hero-bg">
            <img src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=800&fit=crop" alt="Moda" />
            <div className="moda-hero-overlay"></div>
          </div>
          <div className="moda-hero-content">
            <motion.div 
              className="moda-hero-text"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <span className="moda-promo-badge">🔥 Até 50% OFF</span>
              <h1>Nova Coleção<br />Primavera/Verão</h1>
              <p>Descubra as últimas tendências em moda feminina com estilo e elegância</p>
              <div className="moda-hero-buttons">
                <button className="moda-btn-primary" onClick={scrollToDemo}>
                  Ver Coleção
                  <ChevronRight size={18} />
                </button>
                <Link to="/contato" className="moda-btn-secondary">
                  Fale Conosco
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Strip */}
        <section className="moda-features-strip">
          <div className="moda-container">
            <div className="moda-features-grid">
              {features.map((f, idx) => (
                <div key={idx} className="moda-feature-item">
                  <f.icon size={24} />
                  <div>
                    <strong>{f.title}</strong>
                    <span>{f.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Catálogo */}
        <section className="moda-catalog" id="moda-demo">
          <div className="moda-container">
            <div className="moda-section-header">
              <h2>✨ Nossos Produtos</h2>
              <p>Peças exclusivas selecionadas para você</p>
            </div>

            {/* Filtros */}
            <div className="moda-filters">
              <div className="moda-categories">
                {categories.map(cat => (
                  <button 
                    key={cat.id}
                    className={`moda-cat-btn ${activeCategory === cat.id ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>
              <div className="moda-view-options">
                <button className="moda-filter-btn">
                  <SlidersHorizontal size={18} />
                  Filtros
                </button>
                <div className="moda-view-toggle">
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
            </div>

            {/* Products Grid */}
            <div className={`moda-products-grid ${viewMode}`}>
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                  <motion.div 
                    key={product.id}
                    className="moda-product-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.05 }}
                    layout
                  >
                    <div className="moda-product-image">
                      <img src={product.image} alt={product.name} />
                      {product.new && <span className="moda-new-badge">Novo</span>}
                      {product.originalPrice && (
                        <span className="moda-sale-badge">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                      <button 
                        className={`moda-fav-btn ${favorites.includes(product.id) ? 'active' : ''}`}
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart size={18} fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button 
                        className="moda-quick-add"
                        onClick={() => addToCart(product)}
                      >
                        <ShoppingBag size={18} />
                        Adicionar
                      </button>
                    </div>
                    <div className="moda-product-info">
                      <div className="moda-product-rating">
                        <Star size={14} fill="#f59e0b" color="#f59e0b" />
                        <span>{product.rating}</span>
                        <span className="moda-reviews">({product.reviews})</span>
                      </div>
                      <h3>{product.name}</h3>
                      <div className="moda-product-sizes">
                        {product.sizes.slice(0, 4).map((size, i) => (
                          <span key={i} className="moda-size">{size}</span>
                        ))}
                        {product.sizes.length > 4 && <span className="moda-size-more">+{product.sizes.length - 4}</span>}
                      </div>
                      <div className="moda-product-price">
                        {product.originalPrice && (
                          <span className="moda-price-original">R$ {product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="moda-price-current">R$ {product.price.toFixed(2)}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="moda-stats">
          <div className="moda-container">
            <div className="moda-stats-grid">
              {stats.map((stat, idx) => (
                <motion.div 
                  key={idx}
                  className="moda-stat-card"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="moda-stat-value">{stat.value}</span>
                  <span className="moda-stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="moda-cta">
          <div className="moda-container">
            <motion.div 
              className="moda-cta-content"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="moda-cta-text">
                <h2>Quer uma loja assim para seu negócio?</h2>
                <p>Transforme sua loja com uma plataforma moderna e completa</p>
              </div>
              <div className="moda-cta-buttons">
                <Link to="/contato" className="moda-cta-primary">
                  Solicitar Orçamento
                </Link>
                <Link to="/projetos" className="moda-cta-secondary">
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
                className="moda-cart-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowCart(false)}
              />
              <motion.div 
                className="moda-cart-sidebar"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
              >
                <div className="moda-cart-header">
                  <h3>🛍️ Sacola ({cartCount})</h3>
                  <button onClick={() => setShowCart(false)}>
                    <X size={24} />
                  </button>
                </div>
                <div className="moda-cart-items">
                  {cart.length === 0 ? (
                    <div className="moda-cart-empty">
                      <ShoppingBag size={48} />
                      <p>Sua sacola está vazia</p>
                    </div>
                  ) : (
                    cart.map(item => (
                      <div key={item.id} className="moda-cart-item">
                        <img src={item.image} alt={item.name} />
                        <div className="moda-cart-item-info">
                          <h4>{item.name}</h4>
                          <p className="moda-cart-item-details">
                            {item.selectedSize} • {item.selectedColor}
                          </p>
                          <span className="moda-cart-item-price">
                            R$ {(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="moda-cart-item-actions">
                          <div className="moda-qty-control">
                            <button onClick={() => updateCartItem(item.id, -1)}>
                              <Minus size={14} />
                            </button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateCartItem(item.id, 1)}>
                              <Plus size={14} />
                            </button>
                          </div>
                          <button 
                            className="moda-remove-btn"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <X size={16} />
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
                {cart.length > 0 && (
                  <div className="moda-cart-footer">
                    <div className="moda-cart-subtotal">
                      <span>Subtotal</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="moda-cart-total">
                      <span>Total</span>
                      <span>R$ {cartTotal.toFixed(2)}</span>
                    </div>
                    <button className="moda-checkout-btn">
                      <Check size={18} />
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

export default ModaStyle;
