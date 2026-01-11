// ============================================================================
// PORTFOLIO CONTEXT - Gerenciamento de dados do portfólio via API
// ============================================================================
import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { portfolioAPI } from '../services/api';

const PortfolioContext = createContext();

// Dados padrão do portfólio
const defaultPortfolioData = {
  // Configurações gerais
  settings: {
    siteName: "Lucas Sousa",
    siteTitle: "Desenvolvedor Full Stack",
    siteDescription: "Especialista em criar soluções digitais inovadoras e experiências web excepcionais",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    whatsappNumber: "5511999999999",
    whatsappMessage: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.",
    email: "contato@lucassousa.dev",
    phone: "+55 (11) 99999-9999",
    address: "São Paulo, SP - Brasil",
    sliderEnabled: true,
    animationsEnabled: true,
    animationType: "fade-up", // fade-up, fade-in, slide-left, slide-right, zoom-in
  },

  // Hero Section
  hero: {
    enabled: true,
    title: "Olá, eu sou",
    name: "Lucas Sousa",
    subtitle: "Desenvolvedor Full Stack",
    description: "Transformo ideias em realidade digital. Especializado em criar aplicações web modernas, escaláveis e com experiências excepcionais.",
    ctaText: "Ver Projetos",
    ctaLink: "#projetos",
    secondaryCtaText: "Entrar em Contato",
    secondaryCtaLink: "#contato",
    backgroundImage: "",
    profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    showParticles: true,
    showTypingEffect: true,
    typingTexts: ["Full Stack Developer", "UI/UX Designer", "Problem Solver", "Tech Enthusiast"]
  },

  // Sobre mim
  about: {
    enabled: true,
    title: "Sobre Mim",
    subtitle: "Conheça um pouco da minha história",
    description: `Sou um desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência criando soluções digitais inovadoras. 

Minha jornada começou com curiosidade sobre como as coisas funcionam na internet, e hoje transformo essa paixão em produtos que impactam milhares de pessoas.

Acredito que a tecnologia deve ser uma ponte para resolver problemas reais, e é isso que me motiva a acordar todos os dias e escrever código com propósito.`,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&h=400&fit=crop",
    stats: [
      { number: "50+", label: "Projetos Entregues" },
      { number: "5+", label: "Anos de Experiência" },
      { number: "30+", label: "Clientes Satisfeitos" },
      { number: "100%", label: "Dedicação" }
    ],
    resumeLink: "/resume.pdf"
  },

  // Skills/Habilidades
  skills: {
    enabled: true,
    title: "Habilidades",
    subtitle: "Tecnologias e ferramentas que domino",
    categories: [
      {
        id: "frontend",
        name: "Frontend",
        icon: "Monitor",
        skills: [
          { name: "React.js", level: 95, icon: "⚛️" },
          { name: "Next.js", level: 90, icon: "▲" },
          { name: "TypeScript", level: 88, icon: "📘" },
          { name: "Tailwind CSS", level: 92, icon: "🎨" },
          { name: "Vue.js", level: 75, icon: "💚" }
        ]
      },
      {
        id: "backend",
        name: "Backend",
        icon: "Server",
        skills: [
          { name: "Node.js", level: 90, icon: "💚" },
          { name: "Python", level: 85, icon: "🐍" },
          { name: "Express.js", level: 88, icon: "⚡" },
          { name: "PostgreSQL", level: 82, icon: "🐘" },
          { name: "MongoDB", level: 85, icon: "🍃" }
        ]
      },
      {
        id: "tools",
        name: "Ferramentas",
        icon: "Wrench",
        skills: [
          { name: "Git/GitHub", level: 92, icon: "🔀" },
          { name: "Docker", level: 80, icon: "🐳" },
          { name: "AWS", level: 75, icon: "☁️" },
          { name: "Firebase", level: 88, icon: "🔥" },
          { name: "Figma", level: 78, icon: "🎨" }
        ]
      }
    ]
  },

  // Projetos
  projects: {
    enabled: true,
    title: "Projetos",
    subtitle: "Alguns dos meus trabalhos recentes",
    items: [
      {
        id: "fitpro",
        title: "FitPro Academy",
        description: "Sistema completo para academias com gestão de alunos, treinos personalizados, acompanhamento de progresso e integração com wearables.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "MongoDB", "Firebase"],
        liveUrl: "/projetos/fitpro-academy",
        featured: true,
        category: "web"
      },
      {
        id: "cmms",
        title: "CMMS Industrial",
        description: "Sistema de manutenção industrial com ordens de serviço, gestão de ativos, preventivas programadas e dashboard analítico.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL", "Docker"],
        liveUrl: "/projetos/cmms-industrial",
        featured: true,
        category: "web"
      },
      {
        id: "nexusshop",
        title: "NexusShop E-commerce",
        description: "Plataforma completa de e-commerce com catálogo inteligente, carrinho, checkout e painel administrativo.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "Stripe", "MongoDB"],
        liveUrl: "/projetos/nexusshop",
        featured: true,
        category: "web"
      },
      {
        id: "dataviz",
        title: "DataViz Analytics",
        description: "Dashboard de análise de dados com visualizações interativas, gráficos em tempo real e exportação de relatórios.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        tags: ["React", "D3.js", "Python", "FastAPI"],
        liveUrl: "/projetos/dataviz-analytics",
        featured: false,
        category: "data"
      },
      {
        id: "taskflow",
        title: "TaskFlow",
        description: "Aplicativo de gestão de tarefas e projetos com Kanban, timeline, colaboração em equipe e relatórios de produtividade.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        tags: ["React", "Firebase", "Framer Motion"],
        liveUrl: "/projetos/taskflow",
        featured: false,
        category: "web"
      },
      {
        id: "healthtrack",
        title: "HealthTrack",
        description: "Sistema de saúde com agendamento de consultas, prontuário eletrônico, telemedicina e acompanhamento de pacientes.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL", "WebRTC"],
        liveUrl: "/projetos/healthtrack",
        featured: false,
        category: "web"
      },
      {
        id: "sweetdelights",
        title: "Sweet Delights",
        description: "Sistema para confeitarias e docerias com catálogo de produtos, pedidos online, carrinho e gestão de encomendas.",
        image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "MongoDB", "Stripe"],
        liveUrl: "/projetos/sweet-delights",
        featured: true,
        category: "web"
      },
      {
        id: "jurisconsult",
        title: "JurisConsult",
        description: "Sistema jurídico completo para escritórios de advocacia com gestão de processos, clientes, prazos e documentos.",
        image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL", "Docker"],
        liveUrl: "/projetos/jurisconsult",
        featured: true,
        category: "web"
      },
      {
        id: "mercadofresh",
        title: "Mercado Fresh",
        description: "Sistema para supermercados com catálogo digital, carrinho inteligente, ofertas do dia e delivery integrado.",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "MongoDB", "Redis"],
        liveUrl: "/projetos/mercado-fresh",
        featured: true,
        category: "web"
      },
      {
        id: "contafacil",
        title: "ContaFácil",
        description: "Sistema para escritórios de contabilidade com gestão de clientes, obrigações fiscais, folha de pagamento e relatórios.",
        image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "PostgreSQL", "Charts"],
        liveUrl: "/projetos/conta-facil",
        featured: true,
        category: "web"
      },
      {
        id: "modastyle",
        title: "Moda Style",
        description: "Sistema para lojas de roupas e acessórios com catálogo, carrinho, favoritos, seleção de tamanhos e checkout.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
        tags: ["React", "Node.js", "Stripe", "MongoDB"],
        liveUrl: "/projetos/moda-style",
        featured: true,
        category: "web"
      }
    ],
    categories: [
      { id: "all", name: "Todos" },
      { id: "web", name: "Web" },
      { id: "mobile", name: "Mobile" },
      { id: "data", name: "Data" }
    ]
  },

  // Experiência
  experience: {
    enabled: true,
    title: "Experiência",
    subtitle: "Minha trajetória profissional",
    items: [
      {
        id: "1",
        company: "Tech Solutions Brasil",
        position: "Senior Full Stack Developer",
        period: "2022 - Presente",
        description: "Liderança técnica de equipe de 5 desenvolvedores. Arquitetura de sistemas escaláveis e implementação de CI/CD.",
        technologies: ["React", "Node.js", "AWS", "Docker"],
        logo: "🏢"
      },
      {
        id: "2",
        company: "Startup XYZ",
        position: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Desenvolvimento de MVP para startup de fintech. Integração com APIs de pagamento e sistemas bancários.",
        technologies: ["Vue.js", "Python", "PostgreSQL", "Redis"],
        logo: "🚀"
      },
      {
        id: "3",
        company: "Agência Digital ABC",
        position: "Frontend Developer",
        period: "2018 - 2020",
        description: "Desenvolvimento de sites e aplicações web para diversos clientes. Foco em performance e SEO.",
        technologies: ["JavaScript", "React", "SASS", "WordPress"],
        logo: "💼"
      }
    ]
  },

  // Depoimentos/Testimonials
  testimonials: {
    enabled: true,
    title: "Depoimentos",
    subtitle: "O que meus clientes dizem",
    items: [
      {
        id: "1",
        name: "Maria Silva",
        position: "CEO",
        company: "Tech Startup",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
        content: "Lucas entregou um projeto excepcional que superou todas as nossas expectativas. Sua atenção aos detalhes e comunicação clara fizeram toda a diferença.",
        rating: 5
      },
      {
        id: "2",
        name: "João Santos",
        position: "Diretor de TI",
        company: "Empresa XYZ",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
        content: "Profissional extremamente competente e dedicado. O sistema que ele desenvolveu para nossa empresa otimizou nossos processos em 40%.",
        rating: 5
      },
      {
        id: "3",
        name: "Ana Oliveira",
        position: "Product Manager",
        company: "Fintech Brasil",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        content: "Trabalhamos juntos em um projeto complexo e Lucas mostrou grande capacidade técnica e de resolução de problemas. Recomendo fortemente!",
        rating: 5
      },
      {
        id: "4",
        name: "Carlos Mendes",
        position: "Founder",
        company: "E-commerce Plus",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
        content: "O e-commerce desenvolvido pelo Lucas aumentou nossas vendas em 150% no primeiro trimestre. Investimento que valeu cada centavo!",
        rating: 5
      }
    ]
  },

  // Serviços
  services: {
    enabled: true,
    title: "Serviços",
    subtitle: "Como posso ajudar seu negócio",
    items: [
      {
        id: "1",
        icon: "Code2",
        title: "Desenvolvimento Web",
        description: "Sites e aplicações web modernas, responsivas e otimizadas para performance e SEO.",
        features: ["Sites Institucionais", "E-commerce", "Landing Pages", "Blogs"]
      },
      {
        id: "2",
        icon: "Smartphone",
        title: "Apps Mobile",
        description: "Aplicativos mobile nativos e híbridos para iOS e Android com experiência excepcional.",
        features: ["React Native", "Flutter", "PWA", "Integração API"]
      },
      {
        id: "3",
        icon: "Database",
        title: "Backend & APIs",
        description: "Sistemas backend robustos, APIs RESTful e microsserviços escaláveis.",
        features: ["Node.js", "Python", "APIs REST", "GraphQL"]
      },
      {
        id: "4",
        icon: "Palette",
        title: "UI/UX Design",
        description: "Design de interfaces modernas e experiências de usuário que convertem.",
        features: ["Wireframes", "Protótipos", "Design System", "User Research"]
      }
    ]
  },

  // Contato
  contact: {
    enabled: true,
    title: "Contato",
    subtitle: "Vamos trabalhar juntos?",
    description: "Estou sempre aberto a novos projetos e oportunidades. Entre em contato e vamos transformar sua ideia em realidade!",
    formEnabled: true,
    mapEnabled: false,
    mapLocation: { lat: -23.5505, lng: -46.6333 },
    socialLinks: [
      { platform: "github", url: "https://github.com/lucassousa", icon: "Github" },
      { platform: "linkedin", url: "https://linkedin.com/in/lucassousa", icon: "Linkedin" },
      { platform: "twitter", url: "https://twitter.com/lucassousa", icon: "Twitter" },
      { platform: "instagram", url: "https://instagram.com/lucassousa", icon: "Instagram" }
    ]
  },

  // Seções customizadas
  customSections: [],

  // Ordem das seções
  sectionOrder: ["hero", "about", "skills", "services", "projects", "experience", "testimonials", "contact"],

  // SEO
  seo: {
    metaTitle: "Lucas Sousa | Desenvolvedor Full Stack",
    metaDescription: "Desenvolvedor Full Stack especializado em React, Node.js e soluções digitais inovadoras. Transformo ideias em realidade digital.",
    metaKeywords: "desenvolvedor, full stack, react, node.js, web, mobile, frontend, backend",
    ogImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&h=630&fit=crop",
    googleAnalyticsId: "",
    facebookPixelId: ""
  }
};

export const PortfolioProvider = ({ children }) => {
  const [portfolioData, setPortfolioData] = useState(defaultPortfolioData);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [lastFetch, setLastFetch] = useState(null);

  // Função para buscar dados do backend
  const fetchPortfolioData = useCallback(async () => {
    try {
      const data = await portfolioAPI.getAll();
      if (data) {
        setPortfolioData(prev => ({ ...prev, ...data }));
        setLastFetch(Date.now());
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
      // Se falhar, usa os dados padrão
    } finally {
      setLoading(false);
    }
  }, []);

  // Carregar dados do backend na inicialização
  useEffect(() => {
    fetchPortfolioData();
  }, [fetchPortfolioData]);

  // Atualizar uma seção específica no backend
  const updatePortfolioData = async (path, data) => {
    try {
      await portfolioAPI.updateSection(path, data);
      // Atualizar estado local
      setPortfolioData(prev => ({
        ...prev,
        [path]: data
      }));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      return false;
    }
  };

  // Atualizar múltiplos dados
  const updateMultiplePaths = async (updates) => {
    try {
      await portfolioAPI.updateAll(updates);
      // Atualizar estado local
      setPortfolioData(prev => ({ ...prev, ...updates }));
      return true;
    } catch (error) {
      console.error('Erro ao atualizar dados:', error);
      return false;
    }
  };

  // Recarregar dados do servidor
  const refreshData = () => {
    setLoading(true);
    fetchPortfolioData();
  };

  // Inicializar dados padrão no servidor
  const initializeData = async () => {
    try {
      await portfolioAPI.init(defaultPortfolioData);
      setPortfolioData(defaultPortfolioData);
      return true;
    } catch (error) {
      console.error('Erro ao inicializar dados:', error);
      return false;
    }
  };

  return (
    <PortfolioContext.Provider value={{
      portfolioData,
      setPortfolioData,
      updatePortfolioData,
      updateMultiplePaths,
      refreshData,
      initializeData,
      loading,
      isAdmin,
      setIsAdmin,
      defaultPortfolioData
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

export { defaultPortfolioData };
