// ============================================================================
// AUTH CONTEXT - Autenticação via Backend API
// ============================================================================
import { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth,
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail
} from 'firebase/auth';
import { authAPI } from '../services/api';

// Configuração do Firebase (apenas para autenticação client-side)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "portifolio-pessoal-bb80a.firebaseapp.com",
  projectId: "portifolio-pessoal-bb80a",
};

// Inicializar Firebase App
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar token salvo ao inicializar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const savedUser = localStorage.getItem('authUser');
      
      if (token && savedUser) {
        try {
          // Verificar se o token ainda é válido
          const response = await authAPI.verify();
          if (response.valid) {
            setUser(JSON.parse(savedUser));
          } else {
            // Token inválido, limpar
            localStorage.removeItem('authToken');
            localStorage.removeItem('authUser');
          }
        } catch (error) {
          // Token expirado ou inválido
          localStorage.removeItem('authToken');
          localStorage.removeItem('authUser');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      // 1. Autenticar com Firebase Auth (client-side)
      const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
      
      // 2. Obter o ID Token do Firebase
      const idToken = await result.user.getIdToken();
      
      // 3. Enviar para nosso backend e receber JWT
      const response = await authAPI.login(idToken);
      
      if (response.success) {
        // Salvar token e usuário
        localStorage.setItem('authToken', response.token);
        localStorage.setItem('authUser', JSON.stringify(response.user));
        setUser(response.user);
        
        return { success: true, user: response.user };
      }
      
      return { success: false, error: 'Erro ao autenticar' };
    } catch (error) {
      let message = 'Erro ao fazer login';
      
      switch (error.code) {
        case 'auth/invalid-email':
          message = 'E-mail inválido';
          break;
        case 'auth/user-disabled':
          message = 'Usuário desativado';
          break;
        case 'auth/user-not-found':
          message = 'Usuário não encontrado';
          break;
        case 'auth/wrong-password':
          message = 'Senha incorreta';
          break;
        case 'auth/invalid-credential':
          message = 'Credenciais inválidas';
          break;
        case 'auth/too-many-requests':
          message = 'Muitas tentativas. Tente novamente mais tarde';
          break;
        default:
          message = error.message || 'Erro desconhecido';
      }
      
      return { success: false, error: message };
    }
  };

  const logout = async () => {
    try {
      // Logout do Firebase
      await signOut(firebaseAuth);
      
      // Notificar backend
      try {
        await authAPI.logout();
      } catch (e) {
        // Ignorar erro do backend no logout
      }
      
      // Limpar dados locais
      localStorage.removeItem('authToken');
      localStorage.removeItem('authUser');
      setUser(null);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(firebaseAuth, email);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // Obter token para requisições autenticadas
  const getToken = () => {
    return localStorage.getItem('authToken');
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      logout,
      resetPassword,
      getToken,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
