import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="main-footer" role="contentinfo">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Meridian Consulting LTDA</h3>
          <p>Soluciones integrales para la industria petrolera y de hidrocarburos</p>
        </div>
        <div className="footer-section">
          <h3>Contacto</h3>
          <address>
            <p>Dirección: Cl. 67 #7 - 35, Bogotá, Colombia</p>
            <p>Teléfono: <a href="tel:+5717469090" aria-label="Llamar al teléfono principal">(571) 7469090 Ext 1190</a></p>
            <p>Email: <a href="mailto:info@meridian.com.co" aria-label="Enviar correo electrónico">info@meridian.com.co</a></p>
          </address>
        </div>
        <nav className="footer-section" aria-label="Enlaces rápidos del footer">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/servicios" aria-label="Ir a página de servicios">Servicios</Link></li>
            <li><Link to="/nosotros" aria-label="Ir a página sobre nosotros">Nosotros</Link></li>
            <li><Link to="/contacto" aria-label="Ir a página de contacto">Contacto</Link></li>
            <li><Link to="/login" aria-label="Ir a página de inicio de sesión">Login</Link></li>
          </ul>
        </nav>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Meridian Consulting LTDA. Todos los derechos reservados.</p>
        <nav aria-label="Enlaces legales">
          <Link to="/privacidad" aria-label="Ver política de privacidad">Política de Privacidad</Link>
          {' | '}
          <Link to="/terminos" aria-label="Ver términos de uso">Términos de Uso</Link>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
