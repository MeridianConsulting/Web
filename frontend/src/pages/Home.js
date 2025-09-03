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

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  

  const heroSlides = [
    {
      image: heroImage1,
      title: "Consultoría en Hidrocarburos y Minería",
      subtitle: "Más de 22 años de experiencia a tu servicio",
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
              <span className="hero-stat__number">22+</span>
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
                  <img src={logoNumero2} alt="Logo Numero 2" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero3} alt="Logo Numero 3" />
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
                 <div className="client-logo">
                  <img src={logoNumero1} alt="Logo Numero 1" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero2} alt="Logo Numero 2" />
                </div>
                <div className="client-logo">
                  <img src={logoNumero3} alt="Logo Numero 3" />
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
              <Link to="/servicios/geociencia" className="service-card__link"></Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="200">
              <div className="service-card__icon">
                <i className="service-icon oil-icon"></i>
              </div>
              <h3 className="service-card__title">Ingeniería de Petróleos</h3>
              <p className="service-card__description">
                Optimización de procesos de perforación y producción para maximizar el rendimiento.
              </p>
              <Link to="/servicios/petroleos" className="service-card__link"></Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="250">
              <div className="service-card__icon">
                <i className="service-icon mining-icon"></i>
              </div>
              <h3 className="service-card__title">Consultoría para Minería</h3>
              <p className="service-card__description">
                Planificación y supervisión de operaciones mineras con enfoque en sostenibilidad.
              </p>
              <Link to="/servicios/mineria" className="service-card__link"></Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="300">
              <div className="service-card__icon">
                <i className="service-icon data-icon"></i>
              </div>
              <h3 className="service-card__title">Gestión de Información Técnica</h3>
              <p className="service-card__description">
                Manejo y análisis de datos geofísicos y de producción para toma de decisiones.
              </p>
              <Link to="/servicios/datos" className="service-card__link"></Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="350">
              <div className="service-card__icon">
                <i className="service-icon energy-icon"></i>
              </div>
              <h3 className="service-card__title">Bioenergía y Renovables</h3>
              <p className="service-card__description">
                Desarrollo de proyectos de biocombustibles y energías limpias para un futuro sostenible.
              </p>
              <Link to="/servicios/bioenergia" className="service-card__link"></Link>
            </div>

            <div className="service-card" data-aos="fade-up" data-aos-delay="400">
              <div className="service-card__icon">
                <i className="service-icon env-icon"></i>
              </div>
              <h3 className="service-card__title">Gestión Ambiental</h3>
              <p className="service-card__description">
                Análisis de impacto ambiental y desarrollo de estrategias de mitigación efectivas.
              </p>
              <Link to="/servicios/ambiental" className="service-card__link"></Link>
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
                <span className="stat-item__number">18+</span>
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

      {/* Sección de Mujeres que Inspiran */}
      
<section className="inspiradoras">
  <div className="contenedor">
    <h2>Mujeres que Inspiran</h2>

    <p className="descripcion">
      “Celebramos la fuerza, la visión y el legado de estas mujeres, cuyo liderazgo transforma realidades, abre caminos y deja una huella imborrable en nuestra comunidad.”
    </p>

    {/* Apartado Coordinadoras */}
    <h1>COORDINADORAS</h1>
    <div className="cards">
      <div className="card">
        <img src={CEO1} alt="Nora Moreno"/>
        <h3>Nora Moreno</h3>
        <p>“Lidera con visión y equilibrio la gestión de los recursos.”</p>
      </div>
      <div className="card">
        <img src={CEO2} alt="Ana Gamez" />
        <h3>Ana Gamez</h3>
        <p>“Organiza y optimiza procesos clave para el buen funcionamiento.”</p>
      </div>
      <div className="card">
        <img src={CEO3} alt="Eliana Alarcón" />
        <h3>Eliana Alarcón</h3>
        <p>“Aporta orden y eficiencia a cada tarea diaria.”</p>      
      </div>
      <div className="cards">
      <div className="card">
        <img src={CEO4} alt="Paola Gil" />
        <h3>Paola Gil</h3>
        <p>“Apoya con precisión y constancia cada proceso operativo.”</p>      
      </div>
      <div className="card">
        <img src={CEO5} alt="Lin Zambrano" />
        <h3>Lin Zambrano</h3>
        <p>“Impulsa el avance de los proyectos con enfoque y detalle.”</p>      
      </div>
         <div className="cards">
      <div className="card">
        <img src={CEO6} alt="Zandra Mayorga" />
        <h3>Zandra Mayorga</h3>
        <p>“Cuida y mantiene los espacios con compromiso y dedicación.”</p>      
      </div>
    </div>
    </div>
    </div>

    {/* Apartado Medios */}
    <h1>MEDIOS</h1>
    <div className="cards">
      <div className="card">
        <img src={CEO4} alt="Paola Gil" />
        <h3>Paola Gil</h3>
        <p>“Apoya con precisión y constancia cada proceso operativo.”</p>      
      </div>
      <div className="card">
        <img src={CEO5} alt="Lin Zambrano" />
        <h3>Lin Zambrano</h3>
        <p>“Impulsa el avance de los proyectos con enfoque y detalle.”</p>      
      </div>
    </div>

    {/* Apartado Asistentes */}
    <h1>ASISTENTES</h1>
    <div className="cards">
      <div className="card">
        <img src={CEO6} alt="Zandra Mayorga" />
        <h3>Zandra Mayorga</h3>
        <p>“Cuida y mantiene los espacios con compromiso y dedicación.”</p>      
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


    </div>
  );
};


export default Home; 