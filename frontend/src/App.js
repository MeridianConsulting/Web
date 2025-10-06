import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from "aos";
import "aos/dist/aos.css";
import './styles/styles.css';
import Login from './pages/Login';

import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog'; 
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Thanks from './pages/Thanks';
import Innovation from './pages/Innovation';

// ✅ Importamos el botón de WhatsApp
import WhatsAppButton from './components/WhatsAppButton';

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
            <Route path="*" element={<NotFound />} /> 
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />

        {/* ✅ Botón flotante de WhatsApp, siempre visible */}
        <WhatsAppButton />
      </div>
    </Router>
  );
}

export default App;
