import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importar imágenes
import historyBg from '../assets/img/fondo.jpeg';
import missionBg from '../assets/img/fondo2.png';
import visionBg from '../assets/img/fondo3.png';

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-slider about-hero" aria-label="Nuestra Historia">
        <div className="hero-slide active" style={{ backgroundImage: `url(${historyBg})` }}>
          <div className="hero-slide__overlay"></div>
          <div className="hero-slide__content">
            <h1 className="hero-slide__title">Nuestra Historia</h1>
            <p className="hero-slide__subtitle">Más de 18 años de experiencia en la industria minero-energética</p>
          </div>
        </div>
      </section>

{/* Historia Section */}
<section className="premium-section history-section">
  <div className="container">
    <div className="history-card">
      <h2 className="section-title gradient-text">MERIDIAN CONSULTING LTDA</h2>
      <div className="history-text premium-text">
        <p>MERIDIAN CONSULTING LTDA, fue fundada el 20 de febrero de 2003, por geólogos con amplia experiencia en la Industria Minero-energética, quienes mediante la creación de una nueva empresa buscaban prestar servicios diferenciadores dentro de la industria.</p>
        <p>Contamos con más de 200 contratos exitosamente desarrollados (verificables en el RUP), indicadores financieros sanos, y un sistema integrado de gestión de calidad, lo cual asegura procedimientos estándar en el desarrollo de los proyectos y una mejora continua.</p>
      </div>
    </div>
  </div>
</section>


      {/* Clientes Section */}
      <section className="premium-section clients-section">
        <div className="container">
          <h2 className="section-title gradient-text">Nuestros Clientes</h2>
          <div className="clients-grid">
            <div className="clients-column">
              <h3 className="premium-subtitle">Industria Petrolera</h3>
              <p className="premium-text">Contamos con experiencia con la mayor parte de las compañías Petroleras y de servicios en Colombia tales como:</p>
              <p className="premium-text clients-list">Ecopetrol, Repsol, Frontera, Petrominerales, Petrocolombia, ANH, C&C Energy, CREG, Fonade, GazProm Geolograzvedka, Halliburton, Hocol, Hollywell Resources, La luna Oil Company, Lewis Energy Colombia, Lukoil, Merrick & Company, Metapetroleom, Pacific Stratus, Pacific Rubiales, Parex Resources Colombia, Petrobras Colombia, Petroseismic Services, Petrotesting Colombia, R3 Exploración y Producción S.A., Schlumberger, Columbus Energy., etc.</p>
            </div>
            <div className="clients-column">
              <h3 className="premium-subtitle">Industria Minera</h3>
              <p className="premium-text">Así mismo en la industria minera hemos trabajado para empresas como:</p>
              <p className="premium-text clients-list">Vale Colombia Ltda. Argos. SAS, Energold Drilling, Companía Minera Latinoamericana – CMLA, Explotaciones Carboníferas Yerbabuena SAS, Fonade (Para el Servicio Geológico Colombiano), Agregados el Triángulo Ltda, Ingeocc S.A., Geosurvey Ltda, Geoestudios Ltda, Continental de Carbones Ltda, El Zaque S.A., Cosacol S.A.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="mission-vision-section">
        <div className="mission-container" style={{ background: "#ffffff" }}>
          <div className="container">
            <div className="mission-content">
              <h2 className="section-title gradient-text">Misión</h2>
              <div className="premium-card">
                <p className="premium-text">
                  En MERIDIAN CONSULTING LTDA. contribuimos al fortalecimiento del sector energético y ambiental, mediante servicios especializados en geología, ingeniería de petróleos, energías renovables y ejecución y control técnico de operaciones, en todas sus etapas. trabajamos con excelencia, ética, disciplina técnica y responsabilidad, adaptándonos a diversos entornos sociales y operativos, y generando valor a nuestros clientes al cumplir sus objetivos con eficiencia y confidencialidad. nos apoyamos en un equipo humano altamente capacitado, promoviendo su bienestar y desarrollo, en una cultura de innovación, mejora continua, sostenibilidad y seguridad, que nos permite entregar soluciones confiables y de alto impacto.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="vision-container white-bg">
        <div className="container">
          <div className="vision-content">
            <h2 className="section-title gradient-text">Visión</h2>
            <div className="premium-card vision-card">
              <p className="premium-text">
                Para el año 2030, MERIDIAN CONSULTING LTDA. se consolidará como un referente nacional en consultoría especializada para el sector minero energético, destacándose por su excelencia operativa y financiera, innovación tecnologica, compromiso ético, y capacidad de adaptación a los retos técnicos, sociales y ambientales del país. seremos reconocidos por cumplir con precisión y oportunidad los objetivos de nuestros clientes, generando alianzas estratégicas de alto valor, promoviendo el desarrollo de nuestro talento humano y contribuyendo al crecimiento sostenible de las comunidades y sectores donde operamos.
              </p>
              <h3 className="premium-subtitle">Las metas a futuro son:</h3>
              <ul className="vision-goals">
                <li className="premium-text">Mantenerse en el mercado con buenos indicadores financieros que permitan la participación en él, siendo competitivos frente a la industria y con un margen de riesgo moderado.</li>
                <li className="premium-text">Optimizar los costos de la empresa y de los proyectos mediante un seguimiento detallado de los mismos, buscando con ello aumentar la rentabilidad de la empresa.</li>
                <li className="premium-text">Generar nuevas líneas de negocios y fortalecer las existentes, lo cual permite a la empresa diversificar y ser sostenible en el tiempo.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="values-section">
        <div className="container">
          <h2 className="section-title gradient-text">VALORES INSTITUCIONALES</h2>
          <p className="values-intro">
            La labor y el desarrollo de MERIDIAN CONSULTING LTDA se ven orientados por los valores fundamentales que emanan de su misión.
          </p>
          <div className="auto-carousel" id="auto-carousel">
            <div className="carousel-track" id="carousel-track">
              <div className="value-card"><h3>Excelencia</h3><p>Hacemos nuestro trabajo con calidad y buscamos siempre mejorar para superar las expectativas.</p></div>
              <div className="value-card"><h3>Responsabilidad</h3><p>Cumplimos nuestros compromisos con seriedad y cuidamos el impacto de nuestras decisiones.</p></div>
              <div className="value-card"><h3>Compromiso</h3><p>Nos dedicamos con entrega y constancia a alcanzar los objetivos de la empresa y nuestros clientes.</p></div>
              <div className="value-card"><h3>Trasparencia</h3><p>Actuamos con claridad y honestidad, generando confianza en todo lo que hacemos.</p></div>
              <div className="value-card"><h3>Innovación</h3><p>Buscamos nuevas ideas, métodos y tecnologías para mejorar nuestros servicios y procesos.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="premium-section environmental-section">
        <div className="container">
          <h2 className="section-title gradient-text">Principios Institucionales</h2>
          <div className="tree-static">
            <div className="tree"><div className="trunk"></div><div className="leaves"></div></div>
            <div className="tree"><div className="trunk"></div><div className="leaves"></div></div>
            <div className="tree"><div className="trunk"></div><div className="leaves"></div></div>
          </div>

          <div className="premium-card environmental-card">
            <ul className="environmental-principles">
              <li className="premium-text">
                <span className="blue-title">Integridad:</span> Actuamos de forma ética y coherente, respetando las normas y principios en todo momento y nos esforzamos por cumplir y superar las expectativas de nuestros clientes, ofreciendo servicios consistentes, eficaces y confiables.
              </li>
              <li className="premium-text">
                <span className="blue-title">Sostenibilidad:</span> Tomamos decisiones que cuidan el medio ambiente, a las personas y el futuro de la organización, promoviendo un equilibrio entre el desarrollo económico, social y ambiental.
              </li>
              <li className="premium-text">
                <span className="blue-title">Respeto:</span> Tratamos a todas las personas con dignidad y promovemos un ambiente justo y colaborativo.
              </li>
              <li className="premium-text">
                <span className="blue-title">Aprendizaje continuo:</span> Siempre estamos aprendiendo para mejorar y adaptarnos a los cambios.
              </li>
              <li className="premium-text">
                <span className="blue-title">Evaluación continua del riesgo:</span> Analizamos constantemente los riesgos para prevenir errores y tomar mejores decisiones, promoviendo ambientes de trabajo seguros, con responsabilidad compartida y prevención activa de incidentes.
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="cta premium-cta" aria-label="Llamada a la acción">
        <div className="container">
          <div className="cta__content" data-aos="zoom-in">
            <h2 className="Informacion">¿Quieres conocer más sobre nosotros?</h2>
            <p className="cta__text premium-text p-contacto">Nuestro equipo está listo para responder todas tus preguntas.</p>
            <Link to="/contacto" className="btn btn--accent btn--large btn--premium">Contáctanos</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
