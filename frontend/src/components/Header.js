import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo_meridian.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu}>
            <img className="navbar-logo" src={logo} alt="Meridian Consulting" />
          </Link>
        </div>

        <nav>
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
            <li><Link to="/" onClick={closeMenu}>Inicio</Link></li>
            <li><Link to="/servicios" onClick={closeMenu}>Servicios</Link></li>
            <li><Link to="/nosotros" onClick={closeMenu}>Nosotros</Link></li>
            <li><Link to="/innovacion" onClick={closeMenu}>Innovación</Link></li>
            <li><Link to="/contacto" onClick={closeMenu}>Contacto</Link></li>
            <li><Link to="/blog" onClick={closeMenu}>Blog</Link></li>

            <li className="nav-dropdown">
              <button 
                className="dropdown-toggle" 
                onClick={e => e.preventDefault()}
              >
                Otros Servicios ▾
              </button>
              <ul className="dropdown-content">
                <li><a href="https://servicedesk.meridianltda.com/front/ticket.php" target="_blank" rel="noopener noreferrer">GLPI</a></li>
                <li><a href="https://hseq.meridianltda.com" target="_blank" rel="noopener noreferrer">Reportes HSEQ</a></li>
                <li><a href="https://evaluacion.meridianltda.com" target="_blank" rel="noopener noreferrer">Evaluación De Desempeño</a></li>
              </ul>
            </li>
          </ul>

          <div className="menu-toggle" onClick={toggleMenu}>
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}></div>
          </div>
          <div 
            className={`menu-overlay ${menuOpen ? 'active' : ''}`} 
            onClick={closeMenu}>
          </div>
        </nav>
      </div>
    </header>
  );
}; // 👈 ESTA LLAVE FALTABA AQUÍ

export default Header;
