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
      
      // Bloquear scroll horizontal pero permitir vertical en el body
      document.body.style.overflowX = 'hidden';
      document.body.style.overflowY = 'hidden'; // Bloquear scroll del body principal
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.documentElement.style.overflowX = 'hidden';
      document.documentElement.style.overflowY = 'hidden';
      
      // Prevenir scroll horizontal con touch en móvil, pero permitir scroll vertical dentro del menú
      let touchStartX = null;
      let touchStartY = null;
      
      const handleTouchStart = (e) => {
        if (e.touches && e.touches.length > 0) {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      };
      
      const preventTouchMove = (e) => {
        // Verificar si el evento viene del menú lateral
        const navLinks = document.querySelector('.nav-links.active');
        if (navLinks && navLinks.contains(e.target)) {
          // Permitir scroll vertical dentro del menú, pero bloquear horizontal
          if (e.touches && e.touches.length > 0 && touchStartX !== null && touchStartY !== null) {
            const deltaX = Math.abs(e.touches[0].clientX - touchStartX);
            const deltaY = Math.abs(e.touches[0].clientY - touchStartY);
            
            // Si el movimiento es principalmente horizontal, bloquearlo
            if (deltaX > deltaY && deltaX > 10) {
              e.preventDefault();
            }
            // Si es principalmente vertical, permitir (el menú tiene overflow-y: auto)
          }
          return;
        }
        // Bloquear scroll en el resto de la página
        e.preventDefault();
      };
      
      document.addEventListener('touchstart', handleTouchStart, { passive: true });
      document.addEventListener('touchmove', preventTouchMove, { passive: false });
      
      return () => {
        // Restaurar scroll
        document.body.style.overflowX = '';
        document.body.style.overflowY = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.documentElement.style.overflowX = '';
        document.documentElement.style.overflowY = '';
        
        // Restaurar posición del scroll
        window.scrollTo(0, scrollY);
        
        // Remover listeners
        document.removeEventListener('touchstart', handleTouchStart);
        document.removeEventListener('touchmove', preventTouchMove);
        touchStartX = null;
        touchStartY = null;
      };
    } else {
      // Asegurar que el scroll esté habilitado cuando el menú está cerrado
      document.body.style.overflowX = '';
      document.body.style.overflowY = '';
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.documentElement.style.overflowX = '';
      document.documentElement.style.overflowY = '';
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

  // Agregar clase al body cuando el menú está abierto y detectar clics fuera
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add('menu-open');
      document.documentElement.classList.add('menu-open');
      
      // Detectar clics fuera del menú para cerrarlo
      const handleClickOutside = (e) => {
        const navLinks = document.querySelector('.nav-links.active');
        const menuToggle = document.querySelector('.menu-toggle');
        const mobileCloseButton = document.querySelector('.mobile-close-button');
        
        // Si el clic fue fuera del menú, fuera del botón hamburguesa y fuera del botón de cerrar
        if (navLinks && 
            !navLinks.contains(e.target) && 
            !menuToggle?.contains(e.target) && 
            !mobileCloseButton?.contains(e.target)) {
          closeMenu();
        }
      };
      
      // Agregar listener con un pequeño delay para evitar que se cierre inmediatamente
      setTimeout(() => {
        document.addEventListener('click', handleClickOutside);
      }, 100);
      
      return () => {
        document.body.classList.remove('menu-open');
        document.documentElement.classList.remove('menu-open');
        document.removeEventListener('click', handleClickOutside);
      };
    } else {
      document.body.classList.remove('menu-open');
      document.documentElement.classList.remove('menu-open');
    }
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
          <ul 
            className={`nav-links ${menuOpen ? 'active' : ''}`} 
            role="menubar"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
          >
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
                <li role="none"><a href="https://aapp02.novacloud.com.co/Portal_Meridian_Consulting/Acceso/Login.aspx" target="_blank" rel="noopener noreferrer" role="menuitem">Soy Meridian</a></li>
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

          {/* Fondo del overlay al abrir menú - ahora solo visual, no captura clics */}
          <div 
            className={`menu-overlay ${menuOpen ? 'active' : ''}`} 
            aria-hidden="true"
          ></div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
