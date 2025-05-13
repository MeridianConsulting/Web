import React from 'react';
import { Link } from 'react-router-dom';

// Importar imágenes y logos
import fondo from '../assets/img/fondo.jpeg';
import logoEcopetrol from '../assets/img/Logo_Ecopetrol.png';
import logoRepsol from '../assets/img/Repsol_2012_logo.png';
import logoFrontera from '../assets/img/FRONTERA-ENERGY-LOGO.png';
import logoHalliburton from '../assets/img/halliburton-logo.png';
import logoVale from '../assets/img/Vale-Colombia-Ltda-300x300.webp';
import logoArgos from '../assets/img/logo_Argos.webp';

// Imágenes para testimonios (usando las disponibles)
import testimonial1 from '../assets/img/channels4_profile.jpg';
import testimonial2 from '../assets/img/Image.jpg';
import testimonial3 from '../assets/img/unnamed.png';

// Iconos de redes sociales
import iconFacebook from '../assets/img/facebook_white.png';
import iconLinkedin from '../assets/img/linkedin_white.png';
import iconTwitter from '../assets/img/twitter_white.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Sección Hero */}
      <section className="hero" aria-label="Banner principal">
        <div className="hero__overlay"></div>
        <div className="hero__content">
          <h1 className="hero__title">Consultoría en Hidrocarburos y Minería</h1>
          <p className="hero__subtitle">18 años de experiencia a tu servicio</p>
          <Link to="/servicios" className="btn btn--primary">Conoce Más</Link>
        </div>
      </section>

      {/* Sección de Servicios */}
      <section className="services" aria-label="Nuestros servicios">
        <div className="container">
          <h2 className="section-title">Nuestros Servicios</h2>
          <p className="section-subtitle">Soluciones integrales para la industria</p>
          
          <div className="services__grid">
            <div className="service-card">
              <div className="service-card__icon">
                <i className="service-icon geo-icon"></i>
              </div>
              <h3 className="service-card__title">Consultoría Geo-científica</h3>
              <p className="service-card__description">
                Estudios geológicos especializados y modelado de reservorios para optimizar la exploración.
              </p>
              <Link to="/servicios/geociencia" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card">
              <div className="service-card__icon">
                <i className="service-icon oil-icon"></i>
              </div>
              <h3 className="service-card__title">Ingeniería de Petróleos</h3>
              <p className="service-card__description">
                Optimización de procesos de perforación y producción para maximizar el rendimiento.
              </p>
              <Link to="/servicios/petroleos" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card">
              <div className="service-card__icon">
                <i className="service-icon mining-icon"></i>
              </div>
              <h3 className="service-card__title">Consultoría para Minería</h3>
              <p className="service-card__description">
                Planificación y supervisión de operaciones mineras con enfoque en sostenibilidad.
              </p>
              <Link to="/servicios/mineria" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card">
              <div className="service-card__icon">
                <i className="service-icon data-icon"></i>
              </div>
              <h3 className="service-card__title">Gestión de Información Técnica</h3>
              <p className="service-card__description">
                Manejo y análisis de datos geofísicos y de producción para toma de decisiones.
              </p>
              <Link to="/servicios/datos" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card">
              <div className="service-card__icon">
                <i className="service-icon energy-icon"></i>
              </div>
              <h3 className="service-card__title">Bioenergía y Renovables</h3>
              <p className="service-card__description">
                Desarrollo de proyectos de biocombustibles y energías limpias para un futuro sostenible.
              </p>
              <Link to="/servicios/bioenergia" className="service-card__link">Más información</Link>
            </div>

            <div className="service-card">
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
            <div className="about__text">
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
            <div className="about__stats">
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
          <h2 className="section-title">Lo que dicen nuestros clientes</h2>
          <div className="testimonials__grid">
            <div className="testimonial-card">
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

            <div className="testimonial-card">
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

            <div className="testimonial-card">
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

      {/* Sección CTA (Call to Action) */}
      <section className="cta" aria-label="Llamada a la acción">
        <div className="container">
          <div className="cta__content">
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
          <h2 className="section-title">Confían en nosotros</h2>
          <div className="clients__logos">
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
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 