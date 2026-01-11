// ============================================================================
// AUTH ROUTES - API endpoints for authentication
// ============================================================================
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-secret-key-2026';
const JWT_EXPIRES_IN = '7d';

// ============================================================================
// LOGIN - Verifica credenciais via Firebase e retorna JWT
// ============================================================================
router.post('/login', async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ error: 'Token de autenticação não fornecido' });
    }

    // Verificar o ID Token do Firebase
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    
    // Criar um JWT próprio para a sessão
    const sessionToken = jwt.sign(
      { 
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      success: true,
      token: sessionToken,
      user: {
        uid: decodedToken.uid,
        email: decodedToken.email,
        name: decodedToken.name || decodedToken.email
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ error: 'Falha na autenticação', details: error.message });
  }
});

// ============================================================================
// VERIFY TOKEN - Verifica se o token JWT é válido
// ============================================================================
router.get('/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ valid: false, error: 'Token não fornecido' });
    }

    const token = authHeader.split('Bearer ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    res.json({
      valid: true,
      user: {
        uid: decoded.uid,
        email: decoded.email,
        name: decoded.name
      }
    });

  } catch (error) {
    res.status(401).json({ valid: false, error: 'Token inválido ou expirado' });
  }
});

// ============================================================================
// LOGOUT - Invalida a sessão (client-side)
// ============================================================================
router.post('/logout', (req, res) => {
  // O logout real acontece no client (removendo o token)
  // Aqui apenas confirmamos a ação
  res.json({ success: true, message: 'Logout realizado com sucesso' });
});

// ============================================================================
// CREATE USER - Cria um novo usuário admin (protegido)
// ============================================================================
router.post('/create-admin', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Não autorizado' });
    }

    const token = authHeader.split('Bearer ')[1];
    jwt.verify(token, JWT_SECRET); // Verifica se está logado

    const { email, password, displayName } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    // Criar usuário no Firebase Auth
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || email.split('@')[0]
    });

    res.json({
      success: true,
      user: {
        uid: userRecord.uid,
        email: userRecord.email,
        displayName: userRecord.displayName
      }
    });

  } catch (error) {
    console.error('Create admin error:', error);
    res.status(500).json({ error: 'Erro ao criar usuário', details: error.message });
  }
});

// ============================================================================
// RESET PASSWORD - Envia email de reset de senha
// ============================================================================
router.post('/reset-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: 'Email é obrigatório' });
    }

    // Firebase Admin não tem método direto para reset password
    // Retornamos sucesso e o client usa o SDK do cliente
    res.json({ 
      success: true, 
      message: 'Se o email existir, um link de recuperação será enviado' 
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ error: 'Erro ao processar solicitação' });
  }
});

module.exports = router;
