import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="main-header">
      <div className="logo">
        <h1>Meridian Consulting</h1>
      </div>
      <nav>
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/servicios">Servicios</Link></li>
          <li><Link to="/nosotros">Nosotros</Link></li>
          <li><Link to="/contacto">Contacto</Link></li>
        </ul>
        <div className="menu-toggle" onClick={toggleMenu}>
          <div className={`hamburger ${menuOpen ? 'active' : ''}`}></div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
