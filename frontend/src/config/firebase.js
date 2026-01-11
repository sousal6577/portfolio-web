// ============================================================================
// FIREBASE CONFIG - Apenas para Autenticação (Client-Side)
// ============================================================================
// NOTA: O frontend NÃO acessa o Firebase Database diretamente.
// Toda comunicação com o banco de dados é feita através do Backend API.
// Este arquivo existe apenas para autenticação de usuários.
// ============================================================================

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Configuração pública do Firebase (somente para auth)
const firebaseConfig = {
  apiKey: "AIzaSyDemoKeyForAuthOnly", // Será substituído pela API Key real
  authDomain: "portifolio-pessoal-bb80a.firebaseapp.com",
  projectId: "portifolio-pessoal-bb80a",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export default app;
