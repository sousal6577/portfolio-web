// ============================================================================
// PORTFOLIO ROUTES - API endpoints for portfolio data management
// ============================================================================
const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');

// Obter referência do database
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
    console.error('Auth error:', error);
    return res.status(403).json({ error: 'Token inválido ou expirado' });
  }
};

// ============================================================================
// PUBLIC ROUTES - Não requerem autenticação
// ============================================================================

/**
 * GET /api/portfolio
 * Retorna todos os dados do portfólio
 */
router.get('/', async (req, res) => {
  try {
    const snapshot = await db.ref('portfolio').once('value');
    const data = snapshot.val();
    
    if (!data) {
      return res.status(404).json({ error: 'Dados do portfólio não encontrados' });
    }
    
    res.json(data);
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    res.status(500).json({ error: 'Erro ao buscar dados do portfólio' });
  }
});

/**
 * GET /api/portfolio/:section
 * Retorna uma seção específica do portfólio
 */
router.get('/:section', async (req, res) => {
  const { section } = req.params;
  const validSections = ['settings', 'hero', 'about', 'skills', 'projects', 'services', 'testimonials', 'experience', 'contact', 'seo'];
  
  if (!validSections.includes(section)) {
    return res.status(400).json({ error: 'Seção inválida' });
  }

  try {
    const snapshot = await db.ref(`portfolio/${section}`).once('value');
    const data = snapshot.val();
    
    if (!data) {
      return res.status(404).json({ error: 'Seção não encontrada' });
    }
    
    res.json(data);
  } catch (error) {
    console.error(`Error fetching ${section}:`, error);
    res.status(500).json({ error: `Erro ao buscar seção ${section}` });
  }
});

// ============================================================================
// PROTECTED ROUTES - Requerem autenticação
// ============================================================================

/**
 * PUT /api/portfolio
 * Atualiza todos os dados do portfólio
 */
router.put('/', verifyAuth, async (req, res) => {
  try {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    await db.ref('portfolio').update(data);
    
    res.json({ success: true, message: 'Portfólio atualizado com sucesso' });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ error: 'Erro ao atualizar portfólio' });
  }
});

/**
 * PUT /api/portfolio/:section
 * Atualiza uma seção específica do portfólio
 */
router.put('/:section', verifyAuth, async (req, res) => {
  const { section } = req.params;
  const validSections = ['settings', 'hero', 'about', 'skills', 'projects', 'services', 'testimonials', 'experience', 'contact', 'seo'];
  
  if (!validSections.includes(section)) {
    return res.status(400).json({ error: 'Seção inválida' });
  }

  try {
    const data = req.body;
    
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ error: 'Dados inválidos' });
    }

    await db.ref(`portfolio/${section}`).set(data);
    
    res.json({ success: true, message: `Seção ${section} atualizada com sucesso` });
  } catch (error) {
    console.error(`Error updating ${section}:`, error);
    res.status(500).json({ error: `Erro ao atualizar seção ${section}` });
  }
});

/**
 * POST /api/portfolio/projects
 * Adiciona um novo projeto
 */
router.post('/projects/add', verifyAuth, async (req, res) => {
  try {
    const project = req.body;
    
    if (!project.title) {
      return res.status(400).json({ error: 'Título do projeto é obrigatório' });
    }

    const projectRef = db.ref('portfolio/projects/items').push();
    const projectWithId = { ...project, id: projectRef.key };
    
    await projectRef.set(projectWithId);
    
    res.json({ success: true, project: projectWithId });
  } catch (error) {
    console.error('Error adding project:', error);
    res.status(500).json({ error: 'Erro ao adicionar projeto' });
  }
});

/**
 * DELETE /api/portfolio/projects/:id
 * Remove um projeto
 */
router.delete('/projects/:id', verifyAuth, async (req, res) => {
  const { id } = req.params;

  try {
    // Encontrar e remover o projeto pelo ID
    const snapshot = await db.ref('portfolio/projects/items').once('value');
    const items = snapshot.val();
    
    if (!items) {
      return res.status(404).json({ error: 'Nenhum projeto encontrado' });
    }

    // Encontrar a key do projeto
    let projectKey = null;
    Object.entries(items).forEach(([key, value]) => {
      if (value.id === id) {
        projectKey = key;
      }
    });

    if (!projectKey) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    await db.ref(`portfolio/projects/items/${projectKey}`).remove();
    
    res.json({ success: true, message: 'Projeto removido com sucesso' });
  } catch (error) {
    console.error('Error deleting project:', error);
    res.status(500).json({ error: 'Erro ao remover projeto' });
  }
});

/**
 * POST /api/portfolio/testimonials
 * Adiciona um novo depoimento
 */
router.post('/testimonials/add', verifyAuth, async (req, res) => {
  try {
    const testimonial = req.body;
    
    if (!testimonial.name || !testimonial.content) {
      return res.status(400).json({ error: 'Nome e depoimento são obrigatórios' });
    }

    const testimonialRef = db.ref('portfolio/testimonials/items').push();
    const testimonialWithId = { ...testimonial, id: testimonialRef.key };
    
    await testimonialRef.set(testimonialWithId);
    
    res.json({ success: true, testimonial: testimonialWithId });
  } catch (error) {
    console.error('Error adding testimonial:', error);
    res.status(500).json({ error: 'Erro ao adicionar depoimento' });
  }
});

/**
 * DELETE /api/portfolio/testimonials/:id
 * Remove um depoimento
 */
router.delete('/testimonials/:id', verifyAuth, async (req, res) => {
  const { id } = req.params;

  try {
    const snapshot = await db.ref('portfolio/testimonials/items').once('value');
    const items = snapshot.val();
    
    if (!items) {
      return res.status(404).json({ error: 'Nenhum depoimento encontrado' });
    }

    let itemKey = null;
    Object.entries(items).forEach(([key, value]) => {
      if (value.id === id) {
        itemKey = key;
      }
    });

    if (!itemKey) {
      return res.status(404).json({ error: 'Depoimento não encontrado' });
    }

    await db.ref(`portfolio/testimonials/items/${itemKey}`).remove();
    
    res.json({ success: true, message: 'Depoimento removido com sucesso' });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    res.status(500).json({ error: 'Erro ao remover depoimento' });
  }
});

/**
 * POST /api/portfolio/contact
 * Recebe mensagens do formulário de contato
 */
router.post('/contact/message', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Nome, email e mensagem são obrigatórios' });
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const messageRef = db.ref('messages').push();
    const messageData = {
      id: messageRef.key,
      name,
      email,
      subject: subject || 'Sem assunto',
      message,
      read: false,
      createdAt: new Date().toISOString()
    };
    
    await messageRef.set(messageData);
    
    res.json({ success: true, message: 'Mensagem enviada com sucesso' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'Erro ao enviar mensagem' });
  }
});

/**
 * GET /api/portfolio/messages
 * Lista todas as mensagens recebidas (protegido)
 */
router.get('/admin/messages', verifyAuth, async (req, res) => {
  try {
    const snapshot = await db.ref('messages').orderByChild('createdAt').once('value');
    const messages = [];
    
    snapshot.forEach((child) => {
      messages.unshift({ ...child.val(), key: child.key });
    });
    
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Erro ao buscar mensagens' });
  }
});

/**
 * DELETE /api/portfolio/messages/:id
 * Remove uma mensagem
 */
router.delete('/admin/messages/:id', verifyAuth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.ref(`messages/${id}`).remove();
    res.json({ success: true, message: 'Mensagem removida com sucesso' });
  } catch (error) {
    console.error('Error deleting message:', error);
    res.status(500).json({ error: 'Erro ao remover mensagem' });
  }
});

/**
 * POST /api/portfolio/init
 * Inicializa o portfólio com dados padrão (usar apenas uma vez)
 */
router.post('/init', verifyAuth, async (req, res) => {
  try {
    const defaultData = req.body;
    
    // Verificar se já existe dados
    const snapshot = await db.ref('portfolio').once('value');
    if (snapshot.exists()) {
      return res.status(400).json({ error: 'Portfólio já foi inicializado' });
    }

    await db.ref('portfolio').set(defaultData);
    
    res.json({ success: true, message: 'Portfólio inicializado com sucesso' });
  } catch (error) {
    console.error('Error initializing portfolio:', error);
    res.status(500).json({ error: 'Erro ao inicializar portfólio' });
  }
});

module.exports = router;
