// ============================================================================
// MESSAGES ROUTES - API endpoints for contact messages
// ============================================================================
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const { dbLogger } = require('../utils/logger');

const db = admin.database();
const JWT_SECRET = process.env.JWT_SECRET || 'portfolio-secret-key-2026';

// Middleware to verify JWT token
const verifyAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    const token = authHeader.split('Bearer ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

// ============================================================================
// PUBLIC ROUTES
// ============================================================================

/**
 * POST /api/messages
 * Envia uma nova mensagem de contato
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validação
    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Campos obrigatórios: name, email, message' 
      });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    // Criar mensagem
    const messageRef = db.ref('messages').push();
    const newMessage = {
      id: messageRef.key,
      name,
      email,
      phone: phone || null,
      subject: subject || 'Contato via Portfólio',
      message,
      read: false,
      archived: false,
      createdAt: new Date().toISOString(),
      ip: req.ip || req.connection.remoteAddress
    };

    await messageRef.set(newMessage);

    dbLogger.success('Nova mensagem de contato recebida', { 
      id: messageRef.key, 
      from: email,
      subject: subject || 'Contato via Portfólio'
    });

    res.status(201).json({ 
      success: true, 
      message: 'Mensagem enviada com sucesso!',
      id: messageRef.key
    });

  } catch (error) {
    dbLogger.error('Erro ao salvar mensagem', { error: error.message });
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

// ============================================================================
// PROTECTED ROUTES
// ============================================================================

/**
 * GET /api/messages
 * Lista todas as mensagens (admin only)
 */
router.get('/', verifyAuth, async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;
    
    let query = db.ref('messages').orderByChild('createdAt').limitToLast(parseInt(limit));
    
    const snapshot = await query.once('value');
    const data = snapshot.val();

    if (!data) {
      return res.json({ messages: [], total: 0 });
    }

    let messages = Object.values(data)
      .filter(m => m.id) // Filter out placeholder
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Filter by status if provided
    if (status === 'unread') {
      messages = messages.filter(m => !m.read);
    } else if (status === 'archived') {
      messages = messages.filter(m => m.archived);
    }

    dbLogger.info(`Listando ${messages.length} mensagens`);

    res.json({ 
      messages, 
      total: messages.length,
      unread: messages.filter(m => !m.read).length
    });

  } catch (error) {
    dbLogger.error('Erro ao listar mensagens', { error: error.message });
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

/**
 * GET /api/messages/:id
 * Busca uma mensagem específica
 */
router.get('/:id', verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    const snapshot = await db.ref(`messages/${id}`).once('value');
    const message = snapshot.val();

    if (!message) {
      return res.status(404).json({ error: 'Mensagem não encontrada' });
    }

    res.json(message);

  } catch (error) {
    dbLogger.error('Erro ao buscar mensagem', { error: error.message });
    res.status(500).json({ error: 'Erro ao buscar mensagem' });
  }
});

/**
 * PATCH /api/messages/:id/read
 * Marca mensagem como lida
 */
router.patch('/:id/read', verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.ref(`messages/${id}`).update({ 
      read: true,
      readAt: new Date().toISOString()
    });

    dbLogger.info(`Mensagem ${id} marcada como lida`);

    res.json({ success: true, message: 'Mensagem marcada como lida' });

  } catch (error) {
    dbLogger.error('Erro ao marcar como lida', { error: error.message });
    res.status(500).json({ error: 'Erro ao atualizar mensagem' });
  }
});

/**
 * PATCH /api/messages/:id/archive
 * Arquiva uma mensagem
 */
router.patch('/:id/archive', verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.ref(`messages/${id}`).update({ 
      archived: true,
      archivedAt: new Date().toISOString()
    });

    dbLogger.info(`Mensagem ${id} arquivada`);

    res.json({ success: true, message: 'Mensagem arquivada' });

  } catch (error) {
    dbLogger.error('Erro ao arquivar', { error: error.message });
    res.status(500).json({ error: 'Erro ao arquivar mensagem' });
  }
});

/**
 * DELETE /api/messages/:id
 * Remove uma mensagem
 */
router.delete('/:id', verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    await db.ref(`messages/${id}`).remove();

    dbLogger.info(`Mensagem ${id} removida`);

    res.json({ success: true, message: 'Mensagem removida' });

  } catch (error) {
    dbLogger.error('Erro ao remover', { error: error.message });
    res.status(500).json({ error: 'Erro ao remover mensagem' });
  }
});

module.exports = router;
