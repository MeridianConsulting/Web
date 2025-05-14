import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Importar imágenes y logos
import heroImage1 from '../assets/img/fondo.jpeg';
import heroImage2 from '../assets/img/fondo2.png';
import heroImage3 from '../assets/img/fondo3.png';
// Importar todos los logos de clientes disponibles
import logoEcopetrol from '../assets/img/Logo_Ecopetrol.png';
import logoRepsol from '../assets/img/Repsol_2012_logo.png';
import logoFrontera from '../assets/img/FRONTERA-ENERGY-LOGO.png';
import logoHalliburton from '../assets/img/halliburton-logo.png';
import logoVale from '../assets/img/Vale-Colombia-Ltda-300x300.webp';
import logoArgos from '../assets/img/logo_Argos.webp';
import logoPacific from '../assets/img/PACIFIC.png';
import logoPacificRubiales from '../assets/img/Pacific Rubiales.png';
import logoHocol from '../assets/img/Hocol.webp';
import logoEnergyCompany from '../assets/img/Energy.gif';
import logoPetrominerales from '../assets/img/petrominerales.jpeg';
import logoEnergold from '../assets/img/Energold Drilling.png';
import logoColumbus from '../assets/img/Columbus.webp';
import logoPetrobras from '../assets/img/Petrobras.webp';
// Imágenes para testimonios (usando las disponibles)
import testimonial1 from '../assets/img/channels4_profile.jpg';
import testimonial2 from '../assets/img/Image.jpg';
import testimonial3 from '../assets/img/unnamed.png';
// Iconos de redes sociales
import iconFacebook from '../assets/img/facebook_white.png';
import iconLinkedin from '../assets/img/linkedin_white.png';
import iconTwitter from '../assets/img/twitter_white.png';
import ceoImage1 from '../assets/img/CEO1.jpg'; 
import ceoImage2 from '../assets/img/CEO2.jpg'; 
import ceoImage3 from '../assets/img/CEO3.jpg'; 

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const heroSlides = [
    {
      image: heroImage1,
      title: "Consultoría en Hidrocarburos y Minería",
      subtitle: "18 años de experiencia a tu servicio",
      cta: "Conoce Más",
      link: "/servicios"
    },
    {
      image: heroImage2,
      title: "Soluciones Integrales y Sostenibles",
      subtitle: "Optimizando recursos con responsabilidad ambiental",
      cta: "Nuestros Servicios",
      link: "/servicios"
    },
    {
      image: heroImage3,
      title: "Experiencia y Profesionalismo",
      subtitle: "Más de 200 proyectos exitosos en 15 países",
      cta: "Contáctanos",
      link: "/contacto"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === heroSlides.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? heroSlides.length - 1 : prevSlide - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setAutoplay(false);
    setTimeout(() => setAutoplay(true), 10000);
  };

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, 7000);
    }
    return () => clearInterval(interval);
  }, [autoplay, currentSlide]);

  // Efecto para detectar el scroll y aplicar clase al header
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector('.main-header');
      if (window.scrollY > 50) {
        setScrolled(true);
        header?.classList.add('scrolled');
      } else {
        setScrolled(false);
        header?.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-container">
      {/* Hero Slider Section */}
      <section className="hero-slider" aria-label="Presentación principal">
        <div className="hero-slider__container">
          {heroSlides.map((slide, index) => (
            <div 
              key={index} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="hero-slide__overlay"></div>
              <div className="hero-slide__content">
                <h1 className="hero-slide__title">{slide.title}</h1>
                <p className="hero-slide__subtitle">{slide.subtitle}</p>
                <div className="hero-slide__cta">
                  <Link to={slide.link} className="btn btn--primary btn--large">
                    {slide.cta}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          <div className="hero-slider__controls">
            <button 
              className="hero-slider__arrow hero-slider__arrow--prev" 
              onClick={prevSlide}
              aria-label="Slide anterior"
            >
              <span>&#10094;</span>
            </button>
            <div className="hero-slider__dots">
              {heroSlides.map((_, index) => (
                <button 
                  key={index} 
                  className={`hero-slider__dot ${index === currentSlide ? 'active' : ''}`} 
                  onClick={() => goToSlide(index)}
                  aria-label={`Ir a slide ${index + 1}`}
                  style={{ display: index === currentSlide ? 'block' : 'none' }}
                />
              ))}
            </div>
            <button 
              className="hero-slider__arrow hero-slider__arrow--next" 
              onClick={nextSlide}
              aria-label="Siguiente slide"
            >
              <span>&#10095;</span>
            </button>
          </div>
          
          <div className="hero-slider__scroll-indicator">
            <div className="scroll-icon"></div>
            <span>Desplaza para descubrir</span>
          </div>
          
          <div className="hero-slider__stats">
            <div className="hero-stat">
              <span className="hero-stat__number">18+</span>
              <span className="hero-stat__text">Años de experiencia</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">200+</span>
              <span className="hero-stat__text">Proyectos completados</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">15+</span>
              <span className="hero-stat__text">Países con operaciones</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="services" aria-label="Nuestros servicios">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Nuestros Servicios</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Soluciones integrales para la industria</p>
          
          <div className="services__grid">
            <div className="service-card" data-aos="fade-up" data-aos-delay="150">
              <div className="service-card__icon">
                <i className="service-icon geo-icon"></i>
              </div>
              <h3 className="service-card__title">Consultoría Geo-científica</h3>
              <p className="service-card__description">
                Estudios geológicos especializados y modelado de reservorios para optimizar la exploración.
              </p>
              <Link to="/servicios/geociencia" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="service-card__icon">
                <i className="service-icon oil-icon"></i>
              </div>
              <h3 className="service-card__title">Ingeniería de Petróleos</h3>
              <p className="service-card__description">
                Optimización de procesos de perforación y producción para maximizar el rendimiento.
              </p>
              <Link to="/servicios/petroleos" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="250">
              <div className="service-card__icon">
                <i className="service-icon mining-icon"></i>
              </div>
              <h3 className="service-card__title">Consultoría para Minería</h3>
              <p className="service-card__description">
                Planificación y supervisión de operaciones mineras con enfoque en sostenibilidad.
              </p>
              <Link to="/servicios/mineria" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card__icon">
                <i className="service-icon data-icon"></i>
              </div>
              <h3 className="service-card__title">Gestión de Información Técnica</h3>
              <p className="service-card__description">
                Manejo y análisis de datos geofísicos y de producción para toma de decisiones.
              </p>
              <Link to="/servicios/datos" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="350">
              <div className="service-card__icon">
                <i className="service-icon energy-icon"></i>
              </div>
              <h3 className="service-card__title">Bioenergía y Renovables</h3>
              <p className="service-card__description">
                Desarrollo de proyectos de biocombustibles y energías limpias para un futuro sostenible.
              </p>
              <Link to="/servicios/bioenergia" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="400">
              <div className="service-card__icon">
                <i className="service-icon env-icon"></i>
              </div>
              <h3 className="service-card__title">Gestión Ambiental</h3>
              <p className="service-card__description">
                Análisis de impacto ambiental y desarrollo de estrategias de mitigación efectivas.
              </p>
              <Link to="/servicios/ambiental" className="service-card__link">Más información</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Acerca de Nosotros */}
      <section className="about" aria-label="Acerca de nosotros">
        <div className="container">
          <div className="about__content">
            <div className="about__text" data-aos="fade-right">
              <h2 className="section-title">Meridian Consulting LTDA</h2>
              <p className="about__description">
                Con más de 18 años de experiencia en el mercado y más de 200 contratos verificados, 
                somos líderes en consultoría para la industria de hidrocarburos y minería en Colombia 
                y el mercado internacional.
              </p>
              <p className="about__description">
                Nuestro equipo de profesionales cuenta con un promedio de 25 años de trayectoria en el sector, 
                garantizando soluciones de la más alta calidad para su empresa.
              </p>
              <div className="about__certifications">
                <span className="certification">ISO 9001</span>
                <span className="certification">ISO 14001</span>
                <span className="certification">ISO 45001</span>
                <span className="certification">RUC 2024</span>
              </div>
              <Link to="/nosotros" className="btn btn--secondary">Conoce Nuestra Historia</Link>
            </div>
            <div className="about__stats" data-aos="fade-left" data-aos-delay="200">
              <div className="stat-item">
                <span className="stat-item__number">18+</span>
                <span className="stat-item__text">Años de experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">200+</span>
                <span className="stat-item__text">Contratos completados</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">25+</span>
                <span className="stat-item__text">Años de experiencia promedio</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">15+</span>
                <span className="stat-item__text">Países con operaciones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="testimonials" aria-label="Testimonios de clientes">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Lo que dicen nuestros clientes</h2>
          <div className="testimonials__grid">
            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="100">
              <div className="testimonial-card__content">
                <p className="testimonial-card__quote">
                  "Meridian Consulting ha sido un socio invaluable en nuestros proyectos de exploración. 
                  Su experiencia y profesionalismo han superado nuestras expectativas."
                </p>
                <div className="testimonial-card__author">
                  <img src={testimonial1} alt="Foto de Carlos Ramírez" className="testimonial-card__image" />
                  <div className="testimonial-card__info">
                    <h4 className="testimonial-card__name">Carlos Ramírez</h4>
                    <p className="testimonial-card__position">Director de Operaciones, Ecopetrol</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-card__content">
                <p className="testimonial-card__quote">
                  "El equipo de Meridian demostró un conocimiento excepcional en la optimización de 
                  nuestros procesos de extracción, lo que resultó en un aumento significativo de la productividad."
                </p>
                <div className="testimonial-card__author">
                  <img src={testimonial2} alt="Foto de Ana Martínez" className="testimonial-card__image" />
                  <div className="testimonial-card__info">
                    <h4 className="testimonial-card__name">Ana Martínez</h4>
                    <p className="testimonial-card__position">Gerente de Proyectos, Repsol</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-card__content">
                <p className="testimonial-card__quote">
                  "Su enfoque en la sostenibilidad ambiental mientras maximizan los resultados 
                  operativos es exactamente lo que buscábamos en un consultor."
                </p>
                <div className="testimonial-card__author">
                  <img src={testimonial3} alt="Foto de Miguel Sánchez" className="testimonial-card__image" />
                  <div className="testimonial-card__info">
                    <h4 className="testimonial-card__name">Miguel Sánchez</h4>
                    <p className="testimonial-card__position">Director Técnico, Vale</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección Equipo Directivo */}
      <section className="executive-team" aria-label="Nuestro equipo directivo">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Nuestro Equipo Directivo</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">Liderazgo y experiencia al servicio de nuestros clientes</p>
          
          <div className="executive-team__grid">
            <div className="executive-card" data-aos="fade-up" data-aos-delay="150">
              <div className="executive-card__image">
                <img src={ceoImage1} alt="William Augusto Franco - Gerente General" />
              </div>
              <div className="executive-card__content">
                <h3 className="executive-card__name">William Augusto Franco</h3>
                <p className="executive-card__position">Gerente General</p>
                <p className="executive-card__id">79613401</p>
                <div className="executive-card__social">
                  <a href="#" aria-label="LinkedIn de William Augusto Franco">
                    <img src={iconLinkedin} alt="LinkedIn" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="executive-card" data-aos="fade-up" data-aos-delay="250">
              <div className="executive-card__image">
                <img src={ceoImage2} alt="César Augusto Urrego - Subgerente" />
              </div>
              <div className="executive-card__content">
                <h3 className="executive-card__name">César Augusto Urrego</h3>
                <p className="executive-card__position">Subgerente</p>
                <p className="executive-card__id">79490148</p>
                <div className="executive-card__social">
                  <a href="#" aria-label="LinkedIn de César Augusto Urrego">
                    <img src={iconLinkedin} alt="LinkedIn" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>

            <div className="executive-card" data-aos="fade-up" data-aos-delay="350">
              <div className="executive-card__image">
                <img src={ceoImage3} alt="Nora Gisell Moreno Moreno - Gerente Administrativa Y Financiera" />
              </div>
              <div className="executive-card__content">
                <h3 className="executive-card__name">Nora Gisell Moreno Moreno</h3>
                <p className="executive-card__position">Gerente Administrativa Y Financiera</p>
                <p className="executive-card__id">52030991</p>
                <div className="executive-card__social">
                  <a href="#" aria-label="LinkedIn de Nora Gisell Moreno Moreno">
                    <img src={iconLinkedin} alt="LinkedIn" className="social-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección CTA (Call to Action) */}
      <section className="cta" aria-label="Llamada a la acción">
        <div className="container">
          <div className="cta__content" data-aos="zoom-in">
            <h2 className="cta__title">¿Listo para optimizar tu proyecto?</h2>
            <p className="cta__text">
              Nuestro equipo de expertos está preparado para ayudarte a alcanzar tus objetivos.
            </p>
            <Link to="/contacto" className="btn btn--accent btn--large">Contáctanos</Link>
          </div>
        </div>
      </section>

      {/* Sección de Clientes */}
      <section className="clients" aria-label="Nuestros clientes">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Confían en nosotros</h2>
          <div className="clients-marquee-container" data-aos="fade-up" data-aos-delay="100">
            <div className="clients-marquee">
              <div className="clients-marquee__content">
                <div className="client-logo">
                  <img src={logoEcopetrol} alt="Logo Ecopetrol" />
                </div>
                <div className="client-logo">
                  <img src={logoRepsol} alt="Logo Repsol" />
                </div>
                <div className="client-logo">
                  <img src={logoFrontera} alt="Logo Frontera" />
                </div>
                <div className="client-logo">
                  <img src={logoHalliburton} alt="Logo Halliburton" />
                </div>
                <div className="client-logo">
                  <img src={logoVale} alt="Logo Vale" />
                </div>
                <div className="client-logo">
                  <img src={logoArgos} alt="Logo Argos" />
                </div>
                <div className="client-logo">
                  <img src={logoPacific} alt="Logo Pacific" />
                </div>
                <div className="client-logo">
                  <img src={logoPacificRubiales} alt="Logo Pacific Rubiales" />
                </div>
                <div className="client-logo">
                  <img src={logoHocol} alt="Logo Hocol" />
                </div>
                <div className="client-logo">
                  <img src={logoEnergyCompany} alt="Logo Energy Company" />
                </div>
                <div className="client-logo">
                  <img src={logoPetrominerales} alt="Logo Petrominerales" />
                </div>
                <div className="client-logo">
                  <img src={logoEnergold} alt="Logo Energold Drilling" />
                </div>
                <div className="client-logo">
                  <img src={logoColumbus} alt="Logo Columbus" />
                </div>
                <div className="client-logo">
                  <img src={logoPetrobras} alt="Logo Petrobras" />
                </div>
                
                {/* Duplicados para el efecto de desplazamiento continuo */}
                <div className="client-logo">
                  <img src={logoEcopetrol} alt="Logo Ecopetrol" />
                </div>
                <div className="client-logo">
                  <img src={logoRepsol} alt="Logo Repsol" />
                </div>
                <div className="client-logo">
                  <img src={logoFrontera} alt="Logo Frontera" />
                </div>
                <div className="client-logo">
                  <img src={logoHalliburton} alt="Logo Halliburton" />
                </div>
                <div className="client-logo">
                  <img src={logoVale} alt="Logo Vale" />
                </div>
                <div className="client-logo">
                  <img src={logoArgos} alt="Logo Argos" />
                </div>
                <div className="client-logo">
                  <img src={logoPacific} alt="Logo Pacific" />
                </div>
                <div className="client-logo">
                  <img src={logoPacificRubiales} alt="Logo Pacific Rubiales" />
                </div>
                <div className="client-logo">
                  <img src={logoHocol} alt="Logo Hocol" />
                </div>
                <div className="client-logo">
                  <img src={logoEnergyCompany} alt="Logo Energy Company" />
                </div>
                <div className="client-logo">
                  <img src={logoPetrominerales} alt="Logo Petrominerales" />
                </div>
                <div className="client-logo">
                  <img src={logoEnergold} alt="Logo Energold Drilling" />
                </div>
                <div className="client-logo">
                  <img src={logoColumbus} alt="Logo Columbus" />
                </div>
                <div className="client-logo">
                  <img src={logoPetrobras} alt="Logo Petrobras" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 