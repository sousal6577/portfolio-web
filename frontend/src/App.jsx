// ============================================================================
// APP.JSX - Main Application Component
// ============================================================================
import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Context Providers
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';

// Core Components
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import WhatsAppButton from './components/WhatsAppButton/WhatsAppButton';
import Loader from './components/Loader/Loader';

// Styles
import './styles/globals.css';
import './styles/app.css';

// Lazy Load Pages
const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const AboutPage = lazy(() => import('./pages/AboutPage/AboutPage'));
const ProjectsPage = lazy(() => import('./pages/ProjectsPage/ProjectsPage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage/ServicesPage'));
const ContactPage = lazy(() => import('./pages/ContactPage/ContactPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const AdminPage = lazy(() => import('./pages/AdminPage/AdminPage'));

// Project Demo Pages
const FitProAcademy = lazy(() => import('./pages/projects/FitProAcademy/FitProAcademy'));
const CMMSIndustrial = lazy(() => import('./pages/projects/CMMSIndustrial/CMMSIndustrial'));
const NexusShop = lazy(() => import('./pages/projects/NexusShop/NexusShop'));
const DataVizAnalytics = lazy(() => import('./pages/projects/DataVizAnalytics/DataVizAnalytics'));
const TaskFlow = lazy(() => import('./pages/projects/TaskFlow/TaskFlow'));
const HealthTrack = lazy(() => import('./pages/projects/HealthTrack/HealthTrack'));
const SweetDelights = lazy(() => import('./pages/projects/SweetDelights/SweetDelights'));
const JurisConsult = lazy(() => import('./pages/projects/JurisConsult/JurisConsult'));
const MercadoFresh = lazy(() => import('./pages/projects/MercadoFresh/MercadoFresh'));
const ContaFacil = lazy(() => import('./pages/projects/ContaFacil/ContaFacil'));
const ModaStyle = lazy(() => import('./pages/projects/ModaStyle/ModaStyle'));

// Layout Component
const Layout = ({ children, showHeader = true, showFooter = true }) => {
  return (
    <div className="app">
      {showHeader && <Header />}
      <main className="app-main">
        {children}
      </main>
      {showFooter && <Footer />}
      <WhatsAppButton />
    </div>
  );
};

// Public Layout
const PublicLayout = ({ children }) => (
  <Layout showHeader={true} showFooter={true}>
    {children}
  </Layout>
);

// Admin Layout (sem header/footer padrão)
const AdminLayout = ({ children }) => (
  <Layout showHeader={false} showFooter={false}>
    {children}
  </Layout>
);

// Auth Layout (sem header/footer)
const AuthLayout = ({ children }) => (
  <div className="app">
    <main className="app-main">
      {children}
    </main>
  </div>
);

// Main App Component
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AuthProvider>
          <PortfolioProvider>
            <Router>
              <Suspense fallback={<Loader />}>
                <Routes>
                  {/* Public Routes */}
                  <Route 
                    path="/" 
                    element={
                      <PublicLayout>
                        <HomePage />
                      </PublicLayout>
                    } 
                  />
                  <Route 
                    path="/sobre" 
                    element={
                      <PublicLayout>
                        <AboutPage />
                      </PublicLayout>
                    } 
                  />
                  <Route 
                    path="/projetos" 
                    element={
                      <PublicLayout>
                        <ProjectsPage />
                      </PublicLayout>
                    } 
                  />
                  
                  {/* Project Demo Routes */}
                  <Route 
                    path="/projetos/fitpro-academy" 
                    element={<FitProAcademy />} 
                  />
                  <Route 
                    path="/projetos/cmms-industrial" 
                    element={<CMMSIndustrial />} 
                  />
                  <Route 
                    path="/projetos/nexusshop" 
                    element={<NexusShop />} 
                  />
                  <Route 
                    path="/projetos/dataviz-analytics" 
                    element={<DataVizAnalytics />} 
                  />
                  <Route 
                    path="/projetos/taskflow" 
                    element={<TaskFlow />} 
                  />
                  <Route 
                    path="/projetos/healthtrack" 
                    element={<HealthTrack />} 
                  />
                  <Route 
                    path="/projetos/sweet-delights" 
                    element={<SweetDelights />} 
                  />
                  <Route 
                    path="/projetos/jurisconsult" 
                    element={<JurisConsult />} 
                  />
                  <Route 
                    path="/projetos/mercado-fresh" 
                    element={<MercadoFresh />} 
                  />
                  <Route 
                    path="/projetos/conta-facil" 
                    element={<ContaFacil />} 
                  />
                  <Route 
                    path="/projetos/moda-style" 
                    element={<ModaStyle />} 
                  />
                  
                  <Route 
                    path="/servicos" 
                    element={
                      <PublicLayout>
                        <ServicesPage />
                      </PublicLayout>
                    } 
                  />
                  <Route 
                    path="/contato" 
                    element={
                      <PublicLayout>
                        <ContactPage />
                      </PublicLayout>
                    } 
                  />

                  {/* Auth Routes */}
                  <Route 
                    path="/login" 
                    element={
                      <AuthLayout>
                        <LoginPage />
                      </AuthLayout>
                    } 
                  />

                  {/* Admin Routes */}
                  <Route 
                    path="/admin/*" 
                    element={
                      <AdminLayout>
                        <AdminPage />
                      </AdminLayout>
                    } 
                  />

                  {/* 404 - Redirect to Home */}
                  <Route 
                    path="*" 
                    element={
                      <PublicLayout>
                        <HomePage />
                      </PublicLayout>
                    } 
                  />
                </Routes>
              </Suspense>
            </Router>
          </PortfolioProvider>
        </AuthProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
