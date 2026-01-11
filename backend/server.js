require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const bodyParser = require('body-parser');
const admin = require('firebase-admin');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3030;

// ============================================================================
// FIREBASE ADMIN INITIALIZATION
// ============================================================================

const serviceAccountPath = path.resolve(__dirname, './serviceAccountKey.json');
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL || 'https://portifolio-pessoal-bb80a-default-rtdb.firebaseio.com'
});

const db = admin.database();
const auth = admin.auth();
console.log('✅ Firebase Admin SDK inicializado');
console.log(`📦 Projeto: ${serviceAccount.project_id}`);

// Export para uso nas rotas
module.exports.db = db;
module.exports.auth = auth;
module.exports.admin = admin;

// ============================================================================
// MIDDLEWARES
// ============================================================================

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());

// CORS configurado para aceitar múltiplas origens
const allowedOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',') 
  : ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'];

app.use(cors({
  origin: function(origin, callback) {
    // Permitir requests sem origin (como mobile apps ou curl)
    if (!origin) return callback(null, true);
    
    // Permitir origens configuradas
    if (allowedOrigins.indexOf(origin) !== -1 || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    
    // Permitir GitHub Codespaces
    if (origin && origin.includes('app.github.dev')) {
      return callback(null, true);
    }
    
    // Em desenvolvimento, permitir todas
    callback(null, true);
  },
  credentials: true
}));

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// ============================================================================
// ROUTES
// ============================================================================

app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    project: 'Portfolio Web',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Auth Routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

// Portfolio Routes
const portfolioRoutes = require('./routes/portfolio');
app.use('/api/portfolio', portfolioRoutes);

// ============================================================================
// SERVE STATIC FILES (PRODUCTION)
// ============================================================================

// Serve frontend build in production
if (process.env.NODE_ENV === 'production') {
  const publicPath = path.join(__dirname, 'public');
  
  // Serve static files
  app.use(express.static(publicPath));
  
  // Handle SPA routing - send index.html for all non-API routes
  app.get('*', (req, res, next) => {
    // Skip API routes
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicPath, 'index.html'));
  });
}

// ============================================================================
// ERROR HANDLING
// ============================================================================

app.use((err, req, res, next) => {
  console.error('❌ Erro:', err);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Erro interno do servidor',
      status: err.status || 500
    }
  });
});

// 404
app.use((req, res) => {
  res.status(404).json({
    error: {
      message: 'Rota não encontrada',
      status: 404
    }
  });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
  console.log('');
  console.log('╔════════════════════════════════════════╗');
  console.log('║                                        ║');
  console.log('║   🚀 PORTFOLIO WEB - BACKEND ONLINE    ║');
  console.log('║                                        ║');
  console.log('╚════════════════════════════════════════╝');
  console.log('');
  console.log(`📡 Servidor: http://localhost:${PORT}`);
  console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔥 Firebase: ${process.env.FIREBASE_PROJECT_ID || 'N/A'}`);
  console.log('');
});

module.exports = app;
