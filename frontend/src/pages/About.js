import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// Importar imágenes
import historyBg from '../assets/img/fondo.jpeg';
import missionBg from '../assets/img/fondo2.png';
import visionBg from '../assets/img/fondo3.png';
import logoEcopetrol from '../assets/img/Logo_Ecopetrol.png';
import logoRepsol from '../assets/img/Repsol_2012_logo.png';
import logoFrontera from '../assets/img/FRONTERA-ENERGY-LOGO.png';
import logoVale from '../assets/img/Vale-Colombia-Ltda-300x300.webp';
import logoArgos from '../assets/img/logo_Argos.webp';
import logoPacific from '../assets/img/PACIFIC.png';
import logoPacificRubiales from '../assets/img/Pacific Rubiales.png';
import logoHocol from '../assets/img/Hocol.webp';
import logoEnergold from '../assets/img/Energold Drilling.png';
import logoColumbus from '../assets/img/Columbus.webp';

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
          <div className="history-content">
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
              
              <div className="clients-logos">
                <img src={logoEcopetrol} alt="Logo Ecopetrol" className="client-logo-img" />
                <img src={logoRepsol} alt="Logo Repsol" className="client-logo-img" />
                <img src={logoFrontera} alt="Logo Frontera" className="client-logo-img" />
                <img src={logoPacific} alt="Logo Pacific" className="client-logo-img" />
                <img src={logoPacificRubiales} alt="Logo Pacific Rubiales" className="client-logo-img" />
                <img src={logoHocol} alt="Logo Hocol" className="client-logo-img" />
              </div>
            </div>
            
            <div className="clients-column">
              <h3 className="premium-subtitle">Industria Minera</h3>
              <p className="premium-text">Así mismo en la industria minera hemos trabajado para empresas como:</p>
              <p className="premium-text clients-list">Vale Colombia Ltda. Argos. SAS, Energold Drilling, Companía Minera Latinoamericana – CMLA, Explotaciones Carboníferas Yerbabuena SAS, Fonade (Para el Servicio Geológico Colombiano), Agregados el Triángulo Ltda, Ingeocc S.A., Geosurvey Ltda, Geoestudios Ltda, Continental de Carbones Ltda, El Zaque S.A., Cosacol S.A.</p>
              
              <div className="clients-logos">
                <img src={logoVale} alt="Logo Vale" className="client-logo-img" />
                <img src={logoArgos} alt="Logo Argos" className="client-logo-img" />
                <img src={logoEnergold} alt="Logo Energold Drilling" className="client-logo-img" />
                <img src={logoColumbus} alt="Logo Columbus" className="client-logo-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Misión y Visión */}
      <section className="mission-vision-section">
        <div className="mission-container" style={{ backgroundImage: `url(${missionBg})` }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="mission-content">
              <h2 className="section-title gradient-text">Misión</h2>
              <div className="premium-card mission-card">
                <p className="premium-text">MERIDIAN CONSULTING LTDA., mediante la prestación de los servicios relacionados con sus líneas de trabajo, genera bienestar, recursos económicos para sus socios y empleados, para el crecimiento mismo de la empresa y de sus clientes.</p>
                <p className="premium-text">Lo anterior trabajando de manera ética, transparente, aplicando en todas sus actividades criterios de calidad, seguridad, rentabilidad, generación de valor agregado, y en línea con los principios de los Derechos Humanos. Nos apoyamos en un equipo altamente capacitado y en las mejores prácticas y tecnologías para lograr una estructura organizacional eficiente que contribuya al progreso económico, ambiental y social del país.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="vision-container" style={{ backgroundImage: `url(${visionBg})` }}>
          <div className="overlay"></div>
          <div className="container">
            <div className="vision-content">
              <h2 className="section-title gradient-text">Visión</h2>
              <div className="premium-card vision-card">
                <p className="premium-text">Nuestra visión para el 2028, es ratificarnos como un referente local en cuanto a calidad, innovación y eficiencia en la prestación de nuestros servicios, respetando y promoviendo los principios de los Derechos Humanos.</p>
                <p className="premium-text">Buscamos en estos cinco años, mantener nuestra rentabilidad en el mercado nacional a través de la generación de nuevas alianzas estratégicas con empresas afines, la optimización de nuestros costos y procesos, y el desarrollo constante de nuestro talento humano.</p>
                <p className="premium-text">Nos comprometemos a operar de manera responsable y sostenible, minimizando nuestro impacto ambiental y contribuyendo al desarrollo económico del país y la mejora de las condiciones sociales en las comunidades donde operamos.</p>
                
                <h3 className="premium-subtitle">Las metas específicas son:</h3>
                <ul className="vision-goals">
                  <li className="premium-text">Mantenerse en el mercado con buenos indicadores financieros que permitan la participación en él, siendo competitivos frente a la industria y con un margen de riesgo moderado.</li>
                  <li className="premium-text">Optimizar los costos de la empresa y de los proyectos mediante un seguimiento detallado de los mismos, buscando con ello aumentar la rentabilidad de la empresa.</li>
                  <li className="premium-text">Generar nuevas líneas de negocios y fortalecer las existentes, lo cual permite a la empresa diversificar y ser sostenible en el tiempo.</li>
                  <li className="premium-text">Optimizar la presencia de Meridian en los mercados internacionales actuales en forma rentable y buscar entrada a otros mercados internacionales que efectivamente sean rentables y atractivos.</li>
                  <li className="premium-text">Buscar nuevas alianzas estratégicas y fortalecer las alianzas existentes con otras compañías que permitan mayor crecimiento y rentabilidad para todos los asociados.</li>
                  <li className="premium-text">Maximizar las oportunidades que se tienen con los clientes para lograr obtener nuevos contratos.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores Corporativos */}
      <section className="premium-section values-section">
        <div className="container">
          <h2 className="section-title gradient-text">Valores Corporativos</h2>
          <p className="premium-text values-intro">El que hacer y desarrollo de MERIDIAN CONSULTING LTDA., tiene como norte los siguientes valores, emanados de su misión:</p>
          
          <div className="values-grid">
            <div className="premium-card value-card">
              <h3 className="premium-title">Integridad</h3>
              <p className="premium-text">La empresa actúa con honestidad y ética en todas sus acciones, respetando los principios morales y legales.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Transparencia</h3>
              <p className="premium-text">La empresa actúa de manera abierta y honesta en sus operaciones y gestión de recursos, con el objetivo de generar confianza y credibilidad en sus clientes, proveedores, empleados y la sociedad en general.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Honestidad</h3>
              <p className="premium-text">La empresa se guía por la verdad y la transparencia en todas sus acciones, respetando los principios éticos y morales.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Respeto por la dignidad</h3>
              <p className="premium-text">La empresa valora la dignidad de todas las personas, tanto dentro como fuera de la organización, y se esfuerza por fomentar un ambiente de respeto y colaboración.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Responsabilidad social</h3>
              <p className="premium-text">La empresa tiene un compromiso con la sociedad en la que opera y se esfuerza por contribuir al desarrollo sostenible de la misma, a través de acciones y proyectos que promueven el bienestar social y ambiental.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Prevalencia de la calidad</h3>
              <p className="premium-text">La empresa se enfoca en ofrecer servicios de alta calidad, cumpliendo con los estándares más exigentes, para garantizar la satisfacción de sus clientes.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Trabajo productivo</h3>
              <p className="premium-text">La empresa valora el trabajo productivo y eficiente, fomentando un ambiente de trabajo en el que se promueve la excelencia y el desarrollo personal y profesional de sus empleados.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Desempeño de excelencia</h3>
              <p className="premium-text">La empresa busca siempre mejorar su desempeño en todas sus áreas, a través de la innovación, el aprendizaje continuo y la mejora constante.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Espíritu de servicio</h3>
              <p className="premium-text">La empresa tiene un fuerte compromiso con sus clientes y se fuerza por ofrecer un servicio excepcional, buscando siempre superar sus expectativas.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Actitud positiva</h3>
              <p className="premium-text">La empresa fomenta una actitud positiva entre sus empleados, promoviendo un ambiente de trabajo agradable y estimulante, que inspira a la creatividad y la innovación.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Cultura de la evaluación</h3>
              <p className="premium-text">La empresa está comprometida con la evaluación constante de sus procesos y acciones, buscando identificar áreas de mejora y oportunidades para el crecimiento.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Competitividad Internacional</h3>
              <p className="premium-text">La empresa busca ser competitiva a nivel internacional, desarrollando estrategias de negocio que le permitan expandirse y consolidarse en mercados extranjeros.</p>
            </div>
            
            <div className="premium-card value-card">
              <h3 className="premium-title">Respeto a los derechos humanos</h3>
              <p className="premium-text">Meridian se compromete a respetar y promover los derechos humanos en todas sus operaciones y relaciones comerciales.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Principios Ambientales */}
      <section className="premium-section environmental-section">
        <div className="container">
          <h2 className="section-title gradient-text">Principios Ambientales</h2>
          <div className="premium-card environmental-card">
            <p className="premium-text">Es responsabilidad de todo el personal que labore para MERIDIAN CONSULTING LTDA., ceñirse a los principios ambientales establecidos por la empresa.</p>
            <p className="premium-text">La protección al medio ambiente es un componente fundamental para MERIDIAN CONSULTING LTDA., durante el desarrollo de sus operaciones por lo que establecemos los siguientes principios:</p>
            
            <ul className="environmental-principles">
              <li className="premium-text">Hacemos uso razonable de los recursos naturales dispuestos para el desarrollo de nuestras actividades.</li>
              <li className="premium-text">Realizamos esfuerzos tendientes a disminuir la generación de residuos.</li>
              <li className="premium-text">Evitamos durante las operaciones en campo:
                <ul>
                  <li className="premium-text">Propiciar quemas</li>
                  <li className="premium-text">Extraer fauna silvestre</li>
                  <li className="premium-text">Dañar cultivos</li>
                  <li className="premium-text">Generar afectaciones en la propiedad privada</li>
                  <li className="premium-text">Realizar actividades de caza y pesca</li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta premium-cta" aria-label="Llamada a la acción">
        <div className="container">
          <div className="cta__content" data-aos="zoom-in">
            <h2 className="cta__title gradient-text">¿Quieres conocer más sobre nosotros?</h2>
            <p className="cta__text premium-text">
              Nuestro equipo está listo para responder todas tus preguntas.
            </p>
            <Link to="/contacto" className="btn btn--accent btn--large btn--premium">Contáctanos</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About; 