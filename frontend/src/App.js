import React, { useEffect, lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import './styles/styles.css';

// Componentes que se cargan inmediatamente (críticos)
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import WhatsAppButton from './components/WhatsAppButton';
import ChatFallback from './components/ChatFallback';
import LoadingSpinner from './components/LoadingSpinner';

// Code Splitting: Lazy loading de páginas
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Innovation = lazy(() => import('./pages/Innovation'));
const Blog = lazy(() => import('./components/Blog'));
const BlogDetail = lazy(() => import('./pages/BlogDetail'));
const Login = lazy(() => import('./pages/Login'));
const AdminBlog = lazy(() => import('./pages/AdminBlog'));
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const Thanks = lazy(() => import('./pages/Thanks'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              <Route path="/gracias" element={<Thanks />} />
              <Route path="/" element={<Home />} />
              <Route path="/servicios" element={<Services />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="/innovacion" element={<Innovation />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogDetail />} /> 
              <Route path="/terminos" element={<Terms />} />
              <Route path="/privacidad" element={<Privacy />} />
              <Route path="/login" element={<Login />} />
              <Route 
                path="/admin/blog" 
                element={
                  <ProtectedRoute>
                    <AdminBlog />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />

        {/* ✅ Botón flotante de WhatsApp, siempre visible */}
        <WhatsAppButton />
        
        {/* ✅ Fallback de chat cuando Tawk.to está bloqueado */}
        <ChatFallback />
      </div>
    </Router>
  );
}

export default App;
