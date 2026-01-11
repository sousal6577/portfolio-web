#!/usr/bin/env node
// ============================================================================
// SEED DATABASE - Popular banco com dados iniciais do portfólio
// ============================================================================
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const admin = require('firebase-admin');
const path = require('path');

// Firebase Admin initialization
const serviceAccount = require(path.resolve(__dirname, '../serviceAccountKey.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL
  });
}

const db = admin.database();

// ============================================================================
// DADOS COMPLETOS DO PORTFÓLIO
// ============================================================================
const portfolioData = {
  settings: {
    siteName: "Lucas Sousa",
    siteTagline: "Desenvolvedor Full Stack",
    logo: "/logo.svg",
    favicon: "/favicon.ico",
    primaryColor: "#6366f1",
    secondaryColor: "#8b5cf6",
    accentColor: "#06b6d4",
    whatsappNumber: "5511999999999",
    whatsappMessage: "Olá! Vi seu portfólio e gostaria de conversar sobre um projeto.",
    showWhatsAppButton: true,
    enableAnimations: true,
    enableDarkMode: true,
    defaultTheme: "dark"
  },

  seo: {
    title: "Lucas Sousa | Desenvolvedor Full Stack",
    description: "Desenvolvedor Full Stack especializado em React, Node.js e soluções web modernas. Transformando ideias em experiências digitais extraordinárias.",
    keywords: "desenvolvedor, full stack, react, node.js, javascript, typescript, web, mobile, portfolio",
    author: "Lucas Sousa",
    ogImage: "/og-image.jpg",
    twitterHandle: "@lucassousa"
  },

  hero: {
    enabled: true,
    greeting: "Olá, eu sou",
    name: "Lucas Sousa",
    title: "Desenvolvedor Full Stack",
    subtitle: "Transformo ideias em experiências digitais extraordinárias",
    description: "Especialista em criar aplicações web e mobile modernas, escaláveis e com foco na experiência do usuário.",
    showTypingEffect: true,
    typingTexts: [
      "Desenvolvedor Full Stack",
      "Especialista em React",
      "Arquiteto de Software",
      "Entusiasta de UI/UX"
    ],
    ctaPrimary: {
      text: "Ver Projetos",
      link: "/projetos"
    },
    ctaSecondary: {
      text: "Baixar CV",
      link: "/cv.pdf"
    },
    socialLinks: [
      { name: "Github", url: "https://github.com/lucassousa", icon: "Github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/lucassousa", icon: "Linkedin" }
    ],
    backgroundImage: null,
    showScrollIndicator: true
  },

  about: {
    enabled: true,
    title: "Sobre Mim",
    subtitle: "Conheça minha história",
    description: "Sou um desenvolvedor apaixonado por tecnologia com mais de 5 anos de experiência criando soluções digitais inovadoras. Minha jornada começou com curiosidade por entender como as coisas funcionam e evoluiu para uma carreira dedicada a construir produtos que fazem a diferença.",
    longDescription: "Ao longo da minha carreira, tive a oportunidade de trabalhar em projetos desafiadores que me permitiram desenvolver habilidades técnicas sólidas e uma visão estratégica para resolver problemas complexos. Acredito que a tecnologia deve ser uma ferramenta para simplificar a vida das pessoas.",
    image: "/about-image.jpg",
    stats: [
      { number: "50+", label: "Projetos Entregues", icon: "Rocket" },
      { number: "5+", label: "Anos de Experiência", icon: "Award" },
      { number: "30+", label: "Clientes Satisfeitos", icon: "Users" },
      { number: "1000+", label: "Commits no GitHub", icon: "Coffee" }
    ],
    resumeUrl: "/cv.pdf"
  },

  skills: {
    enabled: true,
    title: "Habilidades",
    subtitle: "Tecnologias que domino",
    description: "Stack completa para desenvolvimento de aplicações modernas",
    categories: [
      {
        name: "Frontend",
        icon: "Monitor",
        skills: [
          { name: "React", level: 95 },
          { name: "TypeScript", level: 90 },
          { name: "Next.js", level: 85 },
          { name: "Vue.js", level: 80 },
          { name: "Tailwind CSS", level: 95 },
          { name: "HTML/CSS", level: 98 }
        ]
      },
      {
        name: "Backend",
        icon: "Server",
        skills: [
          { name: "Node.js", level: 90 },
          { name: "Python", level: 85 },
          { name: "Express.js", level: 92 },
          { name: "PostgreSQL", level: 85 },
          { name: "MongoDB", level: 88 },
          { name: "Firebase", level: 90 }
        ]
      },
      {
        name: "Ferramentas",
        icon: "Wrench",
        skills: [
          { name: "Git/GitHub", level: 95 },
          { name: "Docker", level: 80 },
          { name: "AWS", level: 75 },
          { name: "Figma", level: 85 },
          { name: "VS Code", level: 98 },
          { name: "Linux", level: 82 }
        ]
      }
    ]
  },

  services: {
    enabled: true,
    title: "Serviços",
    subtitle: "O que posso fazer por você",
    description: "Soluções completas para suas necessidades digitais",
    items: [
      {
        id: "1",
        title: "Desenvolvimento Web",
        description: "Criação de sites e aplicações web responsivas, rápidas e otimizadas para SEO.",
        icon: "Code2",
        features: ["React/Next.js", "APIs REST", "Performance", "SEO"]
      },
      {
        id: "2",
        title: "Aplicativos Mobile",
        description: "Desenvolvimento de apps nativos e híbridos para iOS e Android.",
        icon: "Smartphone",
        features: ["React Native", "Flutter", "PWA", "App Store"]
      },
      {
        id: "3",
        title: "Backend & APIs",
        description: "Arquitetura de sistemas robustos, escaláveis e seguros.",
        icon: "Database",
        features: ["Node.js", "Python", "Microservices", "Cloud"]
      },
      {
        id: "4",
        title: "UI/UX Design",
        description: "Design de interfaces intuitivas e experiências de usuário memoráveis.",
        icon: "Palette",
        features: ["Figma", "Prototipagem", "Design System", "Acessibilidade"]
      }
    ]
  },

  projects: {
    enabled: true,
    title: "Projetos",
    subtitle: "Trabalhos Recentes",
    description: "Uma seleção dos meus melhores trabalhos",
    categories: ["all", "web", "mobile", "backend", "fullstack"],
    items: [
      {
        id: "fitpro-academy",
        title: "FitPro Academy",
        description: "Plataforma completa para academias com gestão de alunos, treinos personalizados, agendamento de aulas e acompanhamento de evolução física.",
        longDescription: "Sistema SaaS completo para gestão de academias e personal trainers. Inclui dashboard administrativo, app para alunos, sistema de treinos personalizados com vídeos, integração com wearables e relatórios de evolução.",
        image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop",
        category: "fullstack",
        technologies: ["React", "Node.js", "MongoDB", "React Native", "Socket.io"],
        tags: ["React", "Node.js", "MongoDB", "React Native", "Socket.io"],
        liveUrl: "/projetos/fitpro-academy",
        featured: true,
        stats: {
          users: "5000+",
          rating: "4.9",
          uptime: "99.9%"
        }
      },
      {
        id: "cmms-industrial",
        title: "CMMS Industrial",
        description: "Sistema de gestão de manutenção industrial com IoT, monitoramento em tempo real e manutenção preditiva usando Machine Learning.",
        longDescription: "Plataforma enterprise para gestão de manutenção industrial. Integração com sensores IoT, dashboards em tempo real, sistema de ordens de serviço, gestão de inventário de peças e algoritmos de manutenção preditiva.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
        category: "fullstack",
        technologies: ["React", "Python", "PostgreSQL", "TensorFlow", "MQTT", "Docker"],
        tags: ["React", "Python", "PostgreSQL", "TensorFlow", "MQTT", "Docker"],
        liveUrl: "/projetos/cmms-industrial",
        featured: true,
        stats: {
          machines: "500+",
          efficiency: "+35%",
          downtime: "-60%"
        }
      },
      {
        id: "nexusshop",
        title: "Nexus Shop",
        description: "E-commerce moderno com checkout otimizado, gestão de estoque em tempo real e integração com múltiplos gateways de pagamento.",
        longDescription: "Plataforma e-commerce completa com painel administrativo, gestão de produtos e categorias, sistema de cupons, carrinho inteligente, múltiplas formas de pagamento e integração com correios.",
        image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop",
        category: "web",
        technologies: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Prisma"],
        tags: ["Next.js", "Stripe", "PostgreSQL", "Redis", "Prisma"],
        liveUrl: "/projetos/nexusshop",
        featured: true,
        stats: {
          products: "10000+",
          orders: "50k/mês",
          conversion: "4.5%"
        }
      },
      {
        id: "dataviz-analytics",
        title: "DataViz Analytics",
        description: "Dashboard de analytics com visualizações interativas, relatórios personalizados e insights gerados por IA.",
        longDescription: "Plataforma de Business Intelligence com dashboards customizáveis, gráficos interativos, relatórios automatizados, alertas inteligentes e integração com múltiplas fontes de dados.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
        category: "web",
        technologies: ["React", "D3.js", "Python", "FastAPI", "ClickHouse"],
        tags: ["React", "D3.js", "Python", "FastAPI", "ClickHouse"],
        liveUrl: "/projetos/dataviz-analytics",
        featured: true,
        stats: {
          dataPoints: "1B+",
          reports: "500+",
          users: "2000+"
        }
      },
      {
        id: "taskflow",
        title: "TaskFlow",
        description: "Aplicativo de gestão de tarefas e projetos com colaboração em tempo real e metodologias ágeis integradas.",
        longDescription: "App de produtividade com Kanban, Pomodoro, gestão de projetos, colaboração em equipe, integração com calendário e notificações inteligentes.",
        image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop",
        category: "mobile",
        technologies: ["React Native", "Firebase", "Node.js", "WebSocket"],
        tags: ["React Native", "Firebase", "Node.js", "WebSocket"],
        liveUrl: "/projetos/taskflow",
        featured: false,
        stats: {
          downloads: "100k+",
          rating: "4.8",
          tasks: "1M+"
        }
      },
      {
        id: "healthtrack",
        title: "HealthTrack API",
        description: "API de saúde com integração a dispositivos wearables, análise de dados de saúde e recomendações personalizadas.",
        longDescription: "Backend robusto para aplicações de saúde com integração a Apple Health, Google Fit, dispositivos Fitbit e Garmin. Análise de padrões de sono, atividade física e nutrição.",
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
        category: "backend",
        technologies: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "Docker"],
        tags: ["Node.js", "GraphQL", "PostgreSQL", "Redis", "Docker"],
        liveUrl: "/projetos/healthtrack",
        featured: false,
        stats: {
          requests: "10M/dia",
          integrations: "15+",
          accuracy: "98%"
        }
      }
    ]
  },

  experience: {
    enabled: true,
    title: "Experiência",
    subtitle: "Minha jornada profissional",
    items: [
      {
        id: "1",
        company: "TechCorp Solutions",
        role: "Senior Full Stack Developer",
        period: "2022 - Presente",
        description: "Liderança técnica de equipe de 5 desenvolvedores. Arquitetura de microsserviços e implementação de CI/CD. Redução de 40% no tempo de deploy.",
        technologies: ["React", "Node.js", "AWS", "Docker", "Kubernetes"]
      },
      {
        id: "2",
        company: "StartupXYZ",
        role: "Full Stack Developer",
        period: "2020 - 2022",
        description: "Desenvolvimento de MVP que captou R$2M em investimento. Implementação de sistema de pagamentos processando R$500k/mês.",
        technologies: ["Vue.js", "Python", "PostgreSQL", "Stripe"]
      },
      {
        id: "3",
        company: "Digital Agency",
        role: "Frontend Developer",
        period: "2018 - 2020",
        description: "Criação de +30 websites responsivos para clientes de diversos setores. Foco em performance e acessibilidade.",
        technologies: ["React", "SASS", "WordPress", "Figma"]
      }
    ]
  },

  testimonials: {
    enabled: true,
    title: "Depoimentos",
    subtitle: "O que dizem sobre meu trabalho",
    autoPlay: true,
    autoPlayInterval: 5000,
    items: [
      {
        id: "1",
        name: "Maria Silva",
        role: "CEO",
        company: "TechStart",
        content: "Lucas entregou muito além das expectativas. Sua capacidade técnica aliada à visão de negócio fez toda a diferença no nosso projeto.",
        rating: 5,
        image: "/testimonials/maria.jpg"
      },
      {
        id: "2",
        name: "João Santos",
        role: "CTO",
        company: "InnovateTech",
        content: "Profissional excepcional! Código limpo, entregas no prazo e excelente comunicação. Recomendo fortemente.",
        rating: 5,
        image: "/testimonials/joao.jpg"
      },
      {
        id: "3",
        name: "Ana Oliveira",
        role: "Product Manager",
        company: "DigitalCorp",
        content: "Trabalhamos juntos em um projeto complexo e Lucas mostrou domínio técnico impressionante e proatividade.",
        rating: 5,
        image: "/testimonials/ana.jpg"
      }
    ]
  },

  contact: {
    enabled: true,
    title: "Contato",
    subtitle: "Vamos conversar",
    description: "Estou sempre aberto a novos projetos e oportunidades. Entre em contato!",
    email: "lgcdsousa@gmail.com",
    phone: "+55 11 99999-9999",
    location: "São Paulo, Brasil",
    showMap: true,
    mapCoordinates: {
      lat: -23.5505,
      lng: -46.6333
    },
    socialLinks: [
      { name: "GitHub", url: "https://github.com/lucassousa", icon: "Github" },
      { name: "LinkedIn", url: "https://linkedin.com/in/lucassousa", icon: "Linkedin" },
      { name: "Twitter", url: "https://twitter.com/lucassousa", icon: "Twitter" },
      { name: "Instagram", url: "https://instagram.com/lucassousa", icon: "Instagram" }
    ],
    formEnabled: true
  }
};

// ============================================================================
// SEED FUNCTION
// ============================================================================
async function seedDatabase() {
  console.log('🌱 Iniciando seed do banco de dados...\n');

  try {
    // Check current data
    const snapshot = await db.ref('portfolio').once('value');
    const currentData = snapshot.val();

    if (currentData) {
      console.log('⚠️  Já existem dados no banco. Deseja sobrescrever? (Sim por padrão)');
    }

    // Save portfolio data
    await db.ref('portfolio').set(portfolioData);
    console.log('✅ Dados do portfólio salvos com sucesso!');

    // Create messages node
    await db.ref('messages').set({
      _placeholder: {
        message: "Node criado para armazenar mensagens de contato",
        createdAt: new Date().toISOString()
      }
    });
    console.log('✅ Node de mensagens criado!');

    // Create analytics node
    await db.ref('analytics').set({
      pageViews: 0,
      uniqueVisitors: 0,
      lastUpdated: new Date().toISOString()
    });
    console.log('✅ Node de analytics criado!');

    console.log('\n========================================');
    console.log('🎉 BANCO POPULADO COM SUCESSO!');
    console.log('========================================');
    console.log(`📊 Seções criadas: ${Object.keys(portfolioData).length}`);
    console.log(`📁 Projetos: ${portfolioData.projects.items.length}`);
    console.log(`💼 Experiências: ${portfolioData.experience.items.length}`);
    console.log(`⭐ Depoimentos: ${portfolioData.testimonials.items.length}`);
    console.log('========================================\n');

  } catch (error) {
    console.error('❌ Erro ao popular banco:', error.message);
    throw error;
  }
}

// Run
seedDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
