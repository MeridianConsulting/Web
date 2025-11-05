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
import logoNumero1 from '../assets/img/Numero1.png';
import logoNumero2 from '../assets/img/Numero1.png';
import logoNumero3 from '../assets/img/Numero1.png';
import logoNumero4 from '../assets/img/Numero4.png';
import logoNumero5 from '../assets/img/Numero5.png';
import logoNumero6 from '../assets/img/Numero6.png';
import logoNumero7 from '../assets/img/Numero7.png';
// Imágenes para testimonios (usando las disponibles)
import testimonial1 from '../assets/img/channels4_profile.jpg';
import testimonial2 from '../assets/img/Image.jpg';
import testimonial3 from '../assets/img/unnamed.png';
// Iconos de redes sociales
import iconFacebook from '../assets/img/facebook_white.png';
import iconLinkedin from '../assets/img/linkedin_white.png';
import iconTwitter from '../assets/img/twitter_white.png';
import CEO1 from '../assets/img/CEO1.png';
import CEO2 from '../assets/img/CEO2.png';
import CEO3 from '../assets/img/CEO3.png';
import CEO4 from '../assets/img/CEO4.png';
import CEO5 from '../assets/img/CEO5.png';
import CEO6 from '../assets/img/CEO6.png';

// ✅ Importar estilos
import "../styles/styles.css";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  

  const heroSlides = [
    {
      image: heroImage1,
      title: "Consultoría en Hidrocarburos y Minería",
      subtitle: "Más de 23 años de experiencia a tu servicio",
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
      subtitle: "Más de 230 proyectos exitosos en 15 países",
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
          
        
          
          <div className="hero-slider__stats">
            <div className="hero-stat">
              <span className="hero-stat__number">23+</span>
              <span className="hero-stat__text">Años de experiencia</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">230+</span>
              <span className="hero-stat__text">Proyectos completados</span>
            </div>
            <div className="hero-stat">
              <span className="hero-stat__number">15+</span>
              <span className="hero-stat__text">Operaciones Con Municipios de Colombia</span>
            </div>
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
                <div className="client-logo">
                  <img src={logoNumero1} alt="Logo Numero 1" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero4} alt="Logo Numero 4" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero5} alt="Logo Numero 5" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero6} alt="Logo Numero 6" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero7} alt="Logo Numero 7" />
                </div>
                
                {/* Duplicados para el efecto de desplazamiento continuo (solo una copia) */}
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
                <div className="client-logo">
                  <img src={logoNumero1} alt="Logo Numero 1" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero4} alt="Logo Numero 4" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero5} alt="Logo Numero 5" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero6} alt="Logo Numero 6" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero7} alt="Logo Numero 7" />
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
{/* ==================== NUESTROS SERVICIOS ==================== */}
<section className="services" aria-label="Nuestros servicios">
  <div className="services-container">
    <h2 className="services-title">Nuestros Servicios</h2>
    <p className="services-subtitle">Soluciones integrales para la industria</p>

    <div className="services-grid">
      <div className="service-card">
        <div className="service-icon">🗺️</div>
        <h3 className="service-title">Consultoría Geo-científica</h3>
        <p className="service-description">
          Estudios geológicos especializados y modelado de reservorios para optimizar la exploración.
        </p>
      </div>

      <div className="service-card">
        <div className="service-icon">⚙️</div>
        <h3 className="service-title">Ingeniería de Petróleos</h3>
        <p className="service-description">
          Optimización de procesos de perforación y producción para maximizar el rendimiento.
        </p>
      </div>

      <div className="service-card">
        <div className="service-icon">⛏️</div>
        <h3 className="service-title">Consultoría para Minería</h3>
        <p className="service-description">
          Planificación y supervisión de operaciones mineras con enfoque en sostenibilidad.
        </p>
      </div>

      <div className="service-card">
        <div className="service-icon">📊</div>
        <h3 className="service-title">Gestión de Información Técnica</h3>
        <p className="service-description">
          Manejo y análisis de datos geofísicos y de producción para toma de decisiones.
        </p>
      </div>

      <div className="service-card">
        <div className="service-icon">🌱</div>
        <h3 className="service-title">Bioenergía y Renovables</h3>
        <p className="service-description">
          Desarrollo de proyectos de biocombustibles y energías limpias para un futuro sostenible.
        </p>
      </div>

      <div className="service-card">
        <div className="service-icon">🌍</div>
        <h3 className="service-title">Gestión Ambiental</h3>
        <p className="service-description">
          Análisis de impacto ambiental y desarrollo de estrategias de mitigación efectivas.
        </p>
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
                Con más de 18 años de experiencia en el mercado y más de 230 contratos verificados, 
                somos líderes en consultoría para la industria de hidrocarburos y minería en Colombia 
                y el mercado internacional.
              </p>
              <p className="about__description">
                Nuestro equipo de profesionales cuenta con un promedio de 25 años de trayectoria en el sector, 
                garantizando soluciones de la más alta calidad para su empresa.
              </p>
    <section className="certificados" aria-label="Certificados de calidad">
        <div className="container">
          <h2 className="section-title">Certificaciones</h2>
           <div className="certificados__grid">
             <a href="/pdf/ISO_9001.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--pdf">
                ISO 9001
            </a>
            <a href="/pdf/ISO_14001.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--pdf">
                ISO 14001
              </a>
            <a href="/pdf/ISO_45001.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--pdf">
                ISO 45001
            </a>
            <a href="/pdf/CertificadoRUC.pdf" target="_blank" rel="noopener noreferrer" className="btn btn--pdf">
                Certificado RUC
            </a>
          </div>
        </div>
      </section>


            </div>
            <div className="about__stats" data-aos="fade-left" data-aos-delay="200">
              <div className="stat-item">
                <span className="stat-item__number">22+</span>
                <span className="stat-item__text">Años de experiencia</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">230+</span>
                <span className="stat-item__text">Contratos completados</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">2+</span>
                <span className="stat-item__text">Contamos con mas de 2 sedes</span>
              </div>
              <div className="stat-item">
                <span className="stat-item__number">15+</span>
                <span className="stat-item__text">Países con operaciones</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de Preguntas frecuentes */}
      <section className="testimonials" aria-label="Testimonios de clientes">
      {/* ==================== PREGUNTAS FRECUENTES ==================== */}
<section className="faq">
  <h2>Preguntas Frecuentes</h2>
  <div className="faq-list">

    {/* Preguntas originales */}
    <div className="faq-item">
      <h3 className="faq-question">¿Qué servicios ofrece Meridian Consulting Ltda.?</h3>
      <p className="faq-answer">
        Ofrecemos consultoría geo-científica, ingeniería de petróleos, minería sostenible, 
        gestión de información técnica, bioenergía, renovables y gestión ambiental.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Dónde se encuentra ubicada la empresa?</h3>
      <p className="faq-answer">
        Nuestra oficina principal está ubicada en Bogotá, Colombia, pero prestamos 
        servicios a nivel nacional e internacional.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Cómo puedo solicitar una cotización?</h3>
      <p className="faq-answer">
        Puedes hacerlo a través del formulario de contacto en nuestra página web o 
        escribirnos directamente a nuestro WhatsApp corporativo.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Trabajan con empresas internacionales?</h3>
      <p className="faq-answer">
      Sí, tenemos experiencia con clientes internacionales en proyectos de exploración, sísmica, interpretación, minería y energías renovables entre otros.
      </p>
    </div>

    {/* Nuevas preguntas */}
    <div className="faq-item">
      <h3 className="faq-question">¿Qué experiencia tiene Meridian Consulting LTDA en el sector energético?</h3>
      <p className="faq-answer">
      Contamos con más de 22 años de experiencia en consultoría geo-científica, ingeniería de petróleos y minería sostenible, trabajando con empresas líderes del sector.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Atienden proyectos en zonas rurales o de difícil acceso?</h3>
      <p className="faq-answer">
        Sí, disponemos de equipos técnicos especializados para brindar soporte en proyectos 
        ubicados en áreas rurales o de difícil acceso.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Ofrecen servicios de capacitación o formación?</h3>
      <p className="faq-answer">
       Sí, brindamos capacitaciones y entrenamientos técnicos a equipos de trabajo en temas relacionados con geociencias, ingeniería, Energías renovables, operaciones de pozo y gestión ambiental.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Pueden adaptar sus servicios a las necesidades específicas de mi empresa?</h3>
      <p className="faq-answer">
   Por supuesto, cada proyecto se diseña a la medida de los requerimientos del cliente, asegurando soluciones personalizadas y la aplicación de la lecciones aprendidas.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Qué tecnologías utilizan en sus consultorías?</h3>
      <p className="faq-answer">
       Utilizamos software especializado en modelado de reservorios, análisis geofísico, interpretación y procesamiento de datos, gestión de datos, Sistemas de Información geográfica, bases de datos y sistemas innovadores de monitoreo ambiental.
      </p>
    </div>

    <div className="faq-item">
      <h3 className="faq-question">¿Cuál es el proceso para iniciar un proyecto con ustedes?</h3>
      <p className="faq-answer">
        El proceso inicia con una reunión de diagnóstico, luego se diseña la propuesta técnica y finalmente se establece un plan de trabajo conjunto.
      </p>
    </div>
  </div>
</section>

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


    </div>
  );
};


export default Home; 