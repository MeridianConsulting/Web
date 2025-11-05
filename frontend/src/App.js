import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import './styles/styles.css';
import Login from './pages/Login';
import AdminBlog from './pages/AdminBlog';
import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog'; 
import BlogDetail from './pages/BlogDetail';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Thanks from './pages/Thanks';
import Innovation from './pages/Innovation';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';

// ✅ Importamos el botón de WhatsApp y el fallback de chat
import WhatsAppButton from './components/WhatsAppButton';
import ChatFallback from './components/ChatFallback';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
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
