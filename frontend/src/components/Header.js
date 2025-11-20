import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/img/logo_meridian.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  useEffect(() => {
    if (menuOpen) {
      // Guardar la posición actual del scroll
      const scrollY = window.scrollY;
      
      // Bloquear scroll en body y html
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflow = 'hidden';
      
      // Prevenir scroll con touch en móvil, pero permitir scroll dentro del menú
      const preventTouchMove = (e) => {
        // Verificar si el evento viene del menú lateral
        const navLinks = document.querySelector('.nav-links.active');
        if (navLinks && navLinks.contains(e.target)) {
          // Permitir scroll dentro del menú
          return;
        }
        // Bloquear scroll en el resto de la página
        e.preventDefault();
      };
      
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      
      return () => {
        // Restaurar scroll
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflow = '';
        
        // Restaurar posición del scroll
        window.scrollTo(0, scrollY);
        
        // Remover listener
        document.removeEventListener('touchmove', preventTouchMove);
      };
    } else {
      // Asegurar que el scroll esté habilitado cuando el menú está cerrado
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflow = '';
    }
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

  // Agregar clase al body cuando el menú está abierto
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    }
    return () => {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    };
  }, [menuOpen]);

  return (
    <header className={`main-header ${menuOpen ? 'menu-open' : ''}`} role="banner">
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
                <li role="none"><a href="https://carnet.meridianltda.com/" target="_blank" rel="noopener noreferrer" role="menuitem">Carnets Virtuales</a></li>
              </ul>
            </li>
          </ul>

          {/* Botón hamburguesa */}
          <button 
            className={`menu-toggle ${menuOpen ? 'hidden' : ''}`}
            onClick={toggleMenu}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
          >
            <div className="hamburger"></div>
          </button>

          {/* Botón de cierre para móvil - en el header */}
          <button 
            className={`mobile-close-button ${menuOpen ? 'active' : ''}`}
            onClick={closeMenu}
            aria-label="Cerrar menú de navegación"
          >
            <span className="close-icon">×</span>
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
