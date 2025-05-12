import React from 'react';

const Header = () => {
  return (
    <header className="main-header">
      <div className="logo">
        <h1>Meridian Consulting</h1>
      </div>
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/servicios">Servicios</a></li>
          <li><a href="/nosotros">Nosotros</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header; 