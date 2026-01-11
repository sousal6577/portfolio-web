// ============================================================================
// API SERVICE - Comunicação com o Backend usando Axios
// ============================================================================
import axios from 'axios';

// Detectar se está rodando no Codespaces
const getApiUrl = () => {
  // Se tiver variável de ambiente, usar ela
  if (import.meta.env.VITE_API_URL) {
    console.log('📌 Usando VITE_API_URL:', import.meta.env.VITE_API_URL);
    return import.meta.env.VITE_API_URL;
  }
  
  // Se estiver no Codespaces, construir a URL automaticamente
  if (typeof window !== 'undefined' && window.location.hostname.includes('app.github.dev')) {
    // Pegar a URL base do Codespaces e trocar a porta
    const currentUrl = window.location.origin;
    console.log('📍 Codespaces detectado. URL atual:', currentUrl);
    
    // Extrair e substituir a porta
    const backendUrl = currentUrl.replace(/-5173\./, '-3030.').replace(/-5174\./, '-3030.').replace(/-5175\./, '-3030.');
    const apiUrl = `${backendUrl}/api`;
    
    console.log('🔄 URL da API gerada para Codespaces:', apiUrl);
    return apiUrl;
  }
  
  // Fallback para localhost
  console.log('🏠 Usando localhost');
  return 'http://localhost:3030/api';
};

const API_URL = getApiUrl();

console.log('🔗 API URL Final:', API_URL);

// Configurar instância do axios
const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Interceptor para adicionar token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratamento de erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('❌ API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    }
    return Promise.reject(error);
  }
);

// ============================================================================
// AUTH API
// ============================================================================
export const authAPI = {
  // Login com Firebase ID Token
  login: async (idToken) => {
    const response = await api.post('/auth/login', { idToken });
    return response.data;
  },

  // Verificar se o token é válido
  verify: async () => {
    const response = await api.get('/auth/verify');
    return response.data;
  },

  // Logout
  logout: async () => {
    const response = await api.post('/auth/logout');
    return response.data;
  },

  // Reset de senha
  resetPassword: async (email) => {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  },
};

// ============================================================================
// PORTFOLIO API
// ============================================================================
export const portfolioAPI = {
  // Buscar todos os dados do portfolio
  getAll: async () => {
    const response = await api.get('/portfolio');
    return response.data;
  },

  // Buscar uma seção específica
  getSection: async (section) => {
    const response = await api.get(`/portfolio/${section}`);
    return response.data;
  },

  // Atualizar todos os dados
  updateAll: async (data) => {
    const response = await api.put('/portfolio', data);
    return response.data;
  },

  // Atualizar uma seção específica
  updateSection: async (section, data) => {
    const response = await api.put(`/portfolio/${section}`, data);
    return response.data;
  },

  // Inicializar portfolio com dados padrão
  init: async (data) => {
    const response = await api.post('/portfolio/init', data);
    return response.data;
  },
};

// ============================================================================
// PROJECTS API
// ============================================================================
export const projectsAPI = {
  // Adicionar projeto
  add: async (project) => {
    const response = await api.post('/portfolio/projects/add', project);
    return response.data;
  },

  // Remover projeto
  remove: async (id) => {
    const response = await api.delete(`/portfolio/projects/${id}`);
    return response.data;
  },
};

// ============================================================================
// TESTIMONIALS API
// ============================================================================
export const testimonialsAPI = {
  // Adicionar depoimento
  add: async (testimonial) => {
    const response = await api.post('/portfolio/testimonials/add', testimonial);
    return response.data;
  },

  // Remover depoimento
  remove: async (id) => {
    const response = await api.delete(`/portfolio/testimonials/${id}`);
    return response.data;
  },
};

// ============================================================================
// CONTACT API
// ============================================================================
export const contactAPI = {
  // Enviar mensagem de contato
  sendMessage: async (messageData) => {
    const response = await api.post('/portfolio/contact/message', messageData);
    return response.data;
  },

  // Buscar mensagens (admin)
  getMessages: async () => {
    const response = await api.get('/portfolio/admin/messages');
    return response.data;
  },

  // Remover mensagem (admin)
  removeMessage: async (id) => {
    const response = await api.delete(`/portfolio/admin/messages/${id}`);
    return response.data;
  },
};

// ============================================================================
// HEALTH CHECK
// ============================================================================
export const healthAPI = {
  check: async () => {
    const response = await api.get('/health');
    return response.data;
  },
};

// Export default com todos os serviços
export default {
  auth: authAPI,
  portfolio: portfolioAPI,
  projects: projectsAPI,
  testimonials: testimonialsAPI,
  contact: contactAPI,
  health: healthAPI,
};
