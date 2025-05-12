import React from 'react';

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Meridian Consulting LTDA</h3>
          <p>Soluciones integrales para la industria petrolera y de hidrocarburos</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <p>Dirección: Calle Principal #123, Bogotá, Colombia</p>
          <p>Teléfono: +57 (1) 123-4567</p>
          <p>Email: info@meridianconsulting.com.co</p>
        </div>
        <div className="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><a href="/servicios">Servicios</a></li>
            <li><a href="/nosotros">Nosotros</a></li>
            <li><a href="/contacto">Contacto</a></li>
            <li><a href="/proyectos">Proyectos</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Meridian Consulting LTDA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer; 