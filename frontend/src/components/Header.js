import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo_meridian.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : 'auto';
    return () => (document.body.style.overflow = 'auto');
  }, [menuOpen]);

  const toggleMenu = () => {
    setMenuOpen(prev => {
      const next = !prev;
      if (!next) setOpenDropdown(null);
      return next;
    });
  };
  const closeMenu = () => {
    setMenuOpen(false);
    setOpenDropdown(null);
  };

  const toggleDropdown = (name, e) => {
    e.preventDefault();
    setOpenDropdown(prev => (prev === name ? null : name));
  };

  return (
    <header className="main-header" role="banner">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={closeMenu} aria-label="Ir a página de inicio">
            <img className="navbar-logo" src={logo} alt="Logo de Meridian Consulting" />
          </Link>
        </div>

        <nav role="navigation" aria-label="Navegación principal">
          <ul className={`nav-links ${menuOpen ? 'active' : ''}`} role="menubar">
            <li role="none"><Link to="/" onClick={closeMenu} role="menuitem">Inicio</Link></li>
            <li role="none"><Link to="/servicios" onClick={closeMenu} role="menuitem">Servicios</Link></li>
            <li role="none"><Link to="/nosotros" onClick={closeMenu} role="menuitem">Nosotros</Link></li>
            <li role="none"><Link to="/innovacion" onClick={closeMenu} role="menuitem">Innovación</Link></li>
            <li role="none"><Link to="/blog" onClick={closeMenu} role="menuitem">Blog</Link></li>

            {/* Nuevo menú desplegable de CONTACTO */}
            <li className={`nav-dropdown ${openDropdown === 'contacto' ? 'open' : ''}`} role="none">
              <button 
                className="dropdown-toggle"
                onClick={e => toggleDropdown('contacto', e)}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'contacto'}
              >
                <span className="dropdown-text">Atención Al Usuario</span>
                <span className="dropdown-arrow">▾</span>
              </button>
              <ul className="dropdown-content" role="menu" aria-label="Menú de atención al usuario">
                <li>
                  <a
                    href="/pdf/Linea_Etica.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Línea De Ética
                  </a>
                </li>

                <li>
                  <a href="https://forms.cloud.microsoft/r/EyTp2eXh32" target="_blank" rel="noopener noreferrer">
                    Radica Tus PQR
                  </a>
                </li>
                <li>
                  <Link to="/contacto" onClick={closeMenu}>
                    ¡Contáctanos!
                  </Link>
                </li>
              </ul>
            </li>

            {/* Menú desplegable de OTROS SERVICIOS */}
            <li className={`nav-dropdown ${openDropdown === 'otros' ? 'open' : ''}`} role="none">
              <button 
                className="dropdown-toggle"
                onClick={e => toggleDropdown('otros', e)}
                role="menuitem"
                aria-haspopup="true"
                aria-expanded={openDropdown === 'otros'}
              >
                <span className="dropdown-text">Otros Servicios</span>
                <span className="dropdown-arrow">▾</span>
              </button>
              <ul className="dropdown-content" role="menu" aria-label="Menú de otros servicios">
                <li role="none"><a href="https://servicedesk.meridianltda.com/front/ticket.php" target="_blank" rel="noopener noreferrer" role="menuitem">GLPI</a></li>
                <li role="none"><a href="https://hseq.meridianltda.com" target="_blank" rel="noopener noreferrer" role="menuitem">Reportes HSEQ</a></li>
                <li role="none"><a href="https://evaluacion.meridianltda.com" target="_blank" rel="noopener noreferrer" role="menuitem">Evaluación De Desempeño</a></li>
                <li role="none"><a href="http://carnet.meridian.com/" target="_blank" rel="noopener noreferrer" role="menuitem">Carnets Virtuales</a></li>
              </ul>
            </li>
          </ul>

          {/* Botón hamburguesa */}
          <button 
            className="menu-toggle" 
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
            aria-expanded={menuOpen}
            aria-controls="nav-links"
          >
            <div className={`hamburger ${menuOpen ? 'active' : ''}`}></div>
          </button>

          {/* Fondo del overlay al abrir menú */}
          <div 
            className={`menu-overlay ${menuOpen ? 'active' : ''}`} 
            onClick={closeMenu}
            aria-hidden="true"
          ></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
