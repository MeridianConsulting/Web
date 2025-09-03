import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';

import Header from './components/Header';
import Footer from './components/Footer';
import Blog from './components/Blog'; // ✅ Importación correcta
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Thanks from './pages/Thanks';

function App() {
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
            <Route path="/blog" element={<Blog />} /> {/* ✅ Aquí renderizamos el blog */}
            <Route path="*" element={<NotFound />} /> {/* Ruta para todo lo que no existe */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
