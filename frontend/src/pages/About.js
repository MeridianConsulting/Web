// About.jsx
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Zoom, Slide } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css";
import { FaHandshake, FaAward, FaEye, FaLightbulb, FaGlobeAmericas, FaShieldAlt } from "react-icons/fa";
import LazyImage from "../components/LazyImage";
import SEO from "../components/SEO";
import { FOUNDATION_YEAR, getMoreThanYearsText, getYearsOfExperienceText, getYearsOfExperience } from "../utils/companyInfo";

import CEO1 from "../assets/img/CEO1.png";
import CEO2 from "../assets/img/CEO2.png";
import CEO3 from "../assets/img/CEO3.png";
import CEO4 from "../assets/img/CEO4.png";
import CEO5 from "../assets/img/CEO5.png";
import CEO6 from "../assets/img/CEO6.png";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });

    // ==== Contador animado ====
    const counters = document.querySelectorAll(".counter");
    const speed = 100;

    const animateCount = (counter) => {
      const target = parseInt(counter.getAttribute("data-target"));
      let current = 0;

      const updateCount = () => {
        const increment = Math.ceil(target / speed);
        if (current < target) {
          current += increment;
          counter.innerText = current > target ? target : current;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    };

    // Observer para activar el conteo cuando sean visibles
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCount(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    counters.forEach((counter) => observer.observe(counter));
  }, []);

  // Schema.org AboutPage
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Sobre Nosotros - MERIDIAN CONSULTING",
    "description": `Conoce la historia, misión, visión y valores de MERIDIAN CONSULTING LTDA. ${getMoreThanYearsText()} en consultoría especializada.`,
    "mainEntity": {
      "@type": "Organization",
      "name": "MERIDIAN CONSULTING LTDA",
      "foundingDate": `${FOUNDATION_YEAR}`,
      "numberOfEmployees": "30+",
      "slogan": "Excelencia en consultoría minero-energética"
    }
  };

  return (
    <div className="about-page">
      <SEO 
        title="Nosotros"
        description={`MERIDIAN CONSULTING LTDA - ${getMoreThanYearsText()} en consultoría especializada. Conoce nuestra misión, visión, valores y el equipo que impulsa la excelencia.`}
        keywords="sobre meridian, empresa consultoría, historia empresa, valores corporativos, equipo profesional, Colombia"
        url="/nosotros"
        schemaData={aboutSchema}
      />
      
      {/* HERO */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title">Sobre Nosotros</h2>
          <p className="about-description">
            En <strong>MERIDIAN CONSULTING LTDA</strong> somos una empresa
            comprometida con brindar soluciones efectivas e innovadoras a
            nuestros clientes. Nuestro equipo trabaja con pasión, responsabilidad
            y excelencia, asegurando resultados que generan confianza y aportan al
            desarrollo sostenible de las organizaciones.
          </p>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="values-section">
        
        <div className="values-grid">
          <Slide direction="left" triggerOnce>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="value-card"
            >
              <h3>Misión</h3>
              <p>
              En MERIDIAN CONSULTING LTDA. contribuimos al fortalecimiento 
              del sector energético y ambiental, mediante servicios especializados
              en geología, ingeniería de petróleos, energías renovables  y ejecución
              y control técnico de operaciones, en todas sus etapas. trabajamos con 
              excelencia, ética, disciplina técnica y responsabilidad, adaptándonos 
              a diversos entornos sociales y operativos, y generando valor a nuestros 
              clientes al cumplir sus objetivos con eficiencia y confidencialidad.
              nos apoyamos en un equipo humano altamente capacitado, promoviendo 
              su bienestar y desarrollo, en una cultura de innovación, mejora continua, 
              sostenibilidad y seguridad, que nos permite entregar soluciones confiables 
              y de alto impacto.
              </p>
            </motion.div>
          </Slide>

          <Slide direction="right" triggerOnce>
            <motion.div
              whileHover={{ scale: 1.05, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="value-card"
            >
              <h3>Visión</h3>
              <p>
                Para el año 2030, MERIDIAN CONSULTING LTDA. se consolidará 
                como un referente nacional en consultoría especializada para
                el sector minero energético, destacándose por su excelencia 
                operativa y financiera, innovación tecnologica, compromiso ético, 
                y capacidad de adaptación a los retos técnicos, sociales y 
                ambientales del país. seremos reconocidos por cumplir con precisión 
                y oportunidad los objetivos de nuestros clientes, generando alianzas
                estratégicas de alto valor, promoviendo el desarrollo de nuestro 
                talento humano y contribuyendo al crecimiento sostenible de las 
                comunidades y sectores donde operamos.
              </p>
            </motion.div>
          </Slide>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro-section">
        <Zoom triggerOnce>
          <h2>Nosotros</h2>
          <p>
            MERIDIAN CONSULTING LTDA fue fundada en {FOUNDATION_YEAR} por geólogos con amplia
            experiencia en la industria minero-energética. Desde entonces hemos
            desarrollado más de 200 contratos exitosos, respaldados por un sistema
            integrado de gestión de calidad que garantiza excelencia y mejora
            continua.
          </p>
        </Zoom>
      </section>

      {/* STATS con contador */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h2 className="counter" data-target="200">0</h2>
            <p>Contratos exitosos</p>
          </div>
          <div className="stat-card">
            <h2 className="counter" data-target={getYearsOfExperience().toString()}>{getYearsOfExperience()}</h2>
            <p>Años de experiencia</p>
          </div>
          <div className="stat-card">
            <h2 className="counter" data-target="30">0</h2>
            <p>Clientes destacados</p>
          </div>
        </div>
      </section>

      {/* VALORES */}
      <section className="values-container">
        <h2 className="values-title">Valores Corporativos</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">
              <FaHandshake />
            </span>
            <h3>Compromiso</h3>
            <p>
              Nos dedicamos con entrega y constancia a alcanzar los objetivos de
              la empresa y nuestros clientes.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">
              <FaAward />
            </span>
            <h3>Excelencia</h3>
            <p>
              Hacemos nuestro trabajo con calidad y buscamos siempre mejorar para
              superar las expectativas.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">
              <FaEye />
            </span>
            <h3>Transparencia</h3>
            <p>
              Actuamos con claridad y honestidad, generando confianza en todo lo
              que hacemos.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">
              <FaLightbulb />
            </span>
            <h3>Innovación</h3>
            <p>
              Buscamos nuevas ideas y tecnologías para mejorar nuestros servicios
              y procesos.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">
              <FaGlobeAmericas />
            </span>
            <h3>Responsabilidad</h3>
            <p>
              Cumplimos nuestros compromisos y cuidamos el impacto de nuestras
              decisiones.
            </p>
          </div>
        </div>
      </section>


      <section className="valores-section" data-aos="fade-up">
  <h2 className="titulo-valores">Principios</h2>

  <div className="burbujas-fondo"></div>

  <div className="valores-grid">
    <div className="valor-card" data-aos="zoom-in">
      <h3>1. Integridad</h3>
      <p>
        Actuamos de forma ética y coherente, respetando las normas y principios
        en todo momento y nos esforzamos por cumplir y superar las expectativas
        de nuestros clientes, ofreciendo servicios consistentes, eficaces y confiables.
      </p>
    </div>

    <div className="valor-card" data-aos="zoom-in">
      <h3>2. Sostenibilidad</h3>
      <p>
        Tomamos decisiones que cuidan el medio ambiente, a las personas y el futuro
        de la organización, promoviendo un equilibrio entre el desarrollo económico,
        social y ambiental.
      </p>
    </div>

    <div className="valor-card" data-aos="zoom-in">
      <h3>3. Respeto</h3>
      <p>
        Tratamos a todas las personas con dignidad y promovemos un ambiente justo
        y colaborativo.
      </p>
    </div>

    <div className="valor-card" data-aos="zoom-in">
      <h3>4. Aprendizaje Continuo</h3>
      <p>
        Siempre estamos aprendiendo para mejorar y adaptarnos a los cambios.
      </p>
    </div>

    <div className="valor-card" data-aos="zoom-in">
      <h3>5. Evaluación Continua del Riesgo</h3>
      <p>
        Analizamos constantemente los riesgos para prevenir errores y tomar mejores
        decisiones, promoviendo ambientes de trabajo seguros, con responsabilidad
        compartida y prevención activa de incidentes.
      </p>
    </div>
  </div>
</section>



      {/* LÍNEA DE TIEMPO */}
      <section className="timeline-section">
        <h2>Asi comenzo Meridian... </h2>
        <div className="timeline">
          <Slide direction="up" triggerOnce>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>{FOUNDATION_YEAR}</h4>
                <p>Se funda la empresa en {FOUNDATION_YEAR}. Nuestro primer cliente es PETROTESTING COLOMBIA LTDA., a quien generamos su banco de Información Técnica, desarrollando tareas de escaneo, digitalización, desarrollo de bases de datos en Oracle y carga de información en aplicativos de consulta de datos geocientíficos. Inicio de la línea de negocio: Manejo estratégico de información petrolera y petrofísica.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2004</h4>
                <p>Con la experiencia en manejo de datos técnicos de hidrocarburos, se incursiona en la prestación de servicios Archivísticos de Administración de Correspondencia y Administración de Archivos de gestión y Central, prestación de servicios archivísticos de Gestión de depósitos, Administración de Archivo Central y reprografía para Ecopetrol. Inicio de la relación con Ecopetrol en servicios de soporte documental y gestión normativa.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2005</h4>
                <p>Inicio de línea Interventoría técnica, social y ambiental, con Hollywell Resources S.A., prestando servicios de Planes de Manejo Ambiental (PMA), auditorías socioambientales, ejecución de compensaciones e inversiones del 1% en el Bloque Buganvilles (Tolima) - Ingreso al sector ambiental petrolero.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2005</h4>
                <p>Elaboración del Plan de Manejo Ambiental, cartografía temática, Inventoría integral (HSEQ, Social, Administrativa, Jurídica y Técnica) durante las diferentes etapas de la perforación exploratoria de pozos de hidrocarburos en Bloque de exploración Petrolera Buganvilles (Departamento del Tolima).</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2005</h4>
                <p>Soporte a compañías Mineras en Colombia para la elaboración de PMA, Programas de trabajos y obras, Reconocimiento y diagnóstico geológico y minero del proyecto, generación de sistemas SIG para el manejo de información minera, catastral y geológica.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2005</h4>
                <p>Prestación de los servicios Archivísticos de Administración de Correspondencia y Administración de Archivos, servicios archivísticos de Gestión de depósitos, Administración de Archivo Central y reprografía para ECOPETROL S.A.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2006</h4>
                <p>Proyecto para realizar un diagnóstico de la información disponible en DIMAR y con base en él, diseñar un sistema integrado de gestión de información Marina para Colombia, según contrato No. C-0258-05, Convenio 001-2005-DIMAR.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2007</h4>
                <p>AMETEX S.A. - Inicio oficial de la línea Company Man (supervisión de operaciones de perforación y completamiento). Iniciamos los servicios de prestación de servicios en pozo (supervisión de operaciones de pozo, soporte a producción, manejo de Fluidos, etc) prestando soporte a la compañía HALLIBURTON LATIN AMERICA SERVICES.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2008</h4>
                <p>Iniciamos la prestación de Servicios de Supervisión en Pozo para las Operaciones de perforación y completamiento de Hocol S.A. - Iniciamos procesos de soporte a Carson Helicopters Inc en la adquisición de datos Aero gravimétricos y Aero Magnetométricos en Colombia - Consolidación nacional como proveedor de supervisión técnica de pozos.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2008-2009</h4>
                <p>Desarrollamos para Ecopetrol contrato de Consultoría para la gestión Integral (administrativa, técnica y HSEQ) de servicios de la superintendencia de operaciones central (SOC) - Iniciamos la prestación de servicios de Geoquímica y Geomicrobiología.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2010</h4>
                <p>Participamos en la Campaña de Colombia para la toma de datos multiespectrales en el país.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2011</h4>
                <p>Adelantamos para FONADE y El Servicio Geológico Colombiano tareas de Cartografía geológica en planchas del Vichada y en áreas de minería de Boyacá.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2011</h4>
                <p>Representantes en Colombia de la compañía Minera de Colombia en contratación de obras de perforación en el Valle de Aburrá y desarrollo del banco de datos para Repsol Exploración Colombia S.A. En 2012 desarrollamos procesos de Interventoría Técnica Administrativa y financiera integral de núcleos de los pozos perforados en las cuencas de Tumaco y Cauca Patía.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2012</h4>
                <p>Para la ANH realizamos el Análisis de la calidad de la imagen de las líneas sísmicas, reprocesamiento, interpretación sísmo-estratigráfica y estructural de la secuencia mesozoica-cenozoica de la cuenca del valle inferior del Magdalena Norte - Se hace para la ANH la Descripción de núcleos geológicos (Análisis sedimentológico y estratigráfico, generación de insumos técnicos para evaluación de prospectos de hidrocarburos) cuando resultó licitación de Bloques Ronda Colombia (bloques Sandstone) - Inicio de las líneas investigación geofísica avanzada, prestamos servicios de reprocesamiento y procesamiento sísmico, análisis sísmo-estratigráfico para proyectos institucionales y privados.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2013</h4>
                <p>Con HOCOL S.A. se prestan Servicios de Consultoría técnica para diferentes actividades en el bloque Caño Sur. Apoyo directo en operaciones técnicas de campo para Ecopetrol, mediante contratos de Supervisión técnica de operaciones de reacondicionamiento (workover).</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2013-2014</h4>
                <p>Con Hocol se adelantan servicios de Consultoría de pozos exploratorios y actividades de Ecopetrol. Se continúan desarrollando tareas de soporte a Hocol en sus actividades de exploración y perforación de pozos - Se da la evolución del servicio Company Man hacia ingeniería integral de pozos, incluyendo Inducción, flujo, modelamiento de presión nodal, reporte de tiempos real y post perforación - Inicio del enfoque multidisciplinario en pozos.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2015</h4>
                <p>Se hace la Administración del Banco de Información Petrolera (BIP), con tareas de Digitalización, estructuración, preservación y estandarización de información sísmica y geológica - Hito: Responsabilidad nacional en el manejo del conocimiento geocientífico.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2016</h4>
                <p>Se adelantan tareas de cartografía geológica en títulos mineros de la empresa CEMENTOS ARGOS S.A., calculando las reservas para certificaciones en bolsas de Valores.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2016</h4>
                <p>Se adelantan Obras civiles, materiales y mano de obra para obras de construcción y Estabilización de taludes en predios del Municipio de Gachetá - Se continúan los servicios de cálculo de reservas y análisis de títulos mineros para Cementos Argos S.A.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2018</h4>
                <p>Prestación de Servicios Especializados de Direccionamiento, Interventoría y Supervisión de Actividades de Perforación y Workover a Pozos De Hidrocarburos, para Grupo C&C Energía (Barbados) Sucursal Colombia y Pacific Stratus Energy Colombia Corp. Sucursal Colombia.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2018</h4>
                <p>Inicio del Servicio especializado de direccionamiento, Interventoría y supervisión de actividades de perforación y workover a pozos de hidrocarburos. Para Frontera Energy Colombia, Sucursal Colombia, Promienerales Colombia Sucursal Colombia - contrato vigente actualmente - Se inician tareas de Verificación y captura de información geográfica y atributiva de la gestión de derechos inmobiliarios de Ecopetrol y se continúan desarrollando tareas de Modelo Geológico 3D y Minero en Bloques Argos - Iniciamos el apoyo a la Vicepresidencia de Desarrollo de Ecopetrol con las actividades de Servicios para la Caracterización y Gestión del Yacimiento, Construcción de Escenarios de Subsuelo, Planeación Integrada del Desarrollo, Integración y Análisis de Oportunidades de Desarrollo y el Análisis de las actividades y Acciones del Plan Integrado de Desarrollo. En las Disciplinas de Geología, Petrofísica, Ingeniería de Yacimientos, Fluidos, Ingeniería De Pozos y Producción, Facilidades y Data Analítica.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2019</h4>
                <p>Se firma un segundo contrato con Ecopetrol para el apoyo a la Vicepresidencia de Desarrollo de Ecopetrol con el soporte en las actividades de: Servicio para La Caracterización y Gestión del Yacimiento, Construcción de Escenarios de Subsuelo, Planeación Integrada del Desarrollo. En Las Disciplinas De (Geología, Petrofísica, Ingeniería de Yacimientos, Fluidos, Ingeniería De Pozos y Producción, Facilidades y Data Analítica) contrato vigente actualmente.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2020</h4>
                <p>Continuamos con el soporte integral en Yacimientos para la Vicepresidencia de Desarrollo de Ecopetrol, consolidando nuestra experiencia en múltiples disciplinas técnicas.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2021</h4>
                <p>Continuamos con procesos de soporte Integral en Yacimientos, desarrollando 23 ordenes de servicios para los proyectos en el país de la Vicepresidencia de Desarrollo de Ecopetrol.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2021</h4>
                <p>Se firma con Ecopetrol S.A. el CONTRATO Marco "SERVICIOS DE SUPERVISIÓN INTEGRAL DE OPERACIONES DE POZOS PARA ECOPETROL S.A. Y/O SU GRUPO EMPRESARIAL" ., el cual culmina en Agosto de 2025 prestando servicios para las áreas del Valle medio y Magdalena, Casanare, llanos orientales.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2023</h4>
                <p>Se desarrolla para la ANH la Evaluación de prospectividad gasífera en cuencas colombianas, Inicio formal del proyecto técnico en cuencas subexploradas - Se desarrollan Servicios especializados de direccionamiento, Interventoría y supervisión de actividades de perforación y workover a pozos de hidrocarburos para el cliente Petróleo Subterráneo.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2024</h4>
                <p>Se amplían vigencias y recursos para los contratos con las empresas Ecopetrol S.A. Frontera Energy Colombia, Meta Petroleum Colombia y Petróleos Sudamericanos. Dentro de la convocatoria 951 de 2024, de Minciencias, Iniciamos el proyecto de Investigación "Evaluación integral del potencial geotérmico del complejo Paipa-Iza" con la Fundación Universidad América y Suizandina. Entidad encargada de las operaciones de Ingeniería. Planeación y supervisión del Pozo de reconocimiento ambiental Paipa T-1. Prototipado e intervenciones en pozo, bajo contrato marco duración de 5 años con la Ecopetrol S.A. en las operaciones a nivel nacional. Servicios clave (Ingeniería de diseño y ejecución de pozos, Asistencia técnica en campo, Gestión técnica de proveedores, Reportes técnicos operacionales y de cambio/manejo de riesgo, Adquisición y validación de datos y datos técnicos de parámetros de perforación/limpieza de pozo e integridad de revestimiento cementación, Implementación, verificación y control de buenas prácticas operacionales (estándares y procedimientos técnicos), Seguimiento en tiempo real de las operaciones aplicando tecnología de punta).</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2025</h4>
                <p>Continuamos con el proceso operativo de ingeniería y supervisión en campo, ejecutando proyectos estratégicos para nuestros clientes principales en las diferentes regiones del país.</p>
              </div>
            </div>
          </Slide>
        </div>
      </section>

      {/* MUJERES QUE INSPIRAN */}
      <section className="inspiradoras">
        <div className="contenedor">
          <h2>Mujeres que Inspiran</h2>
          <p className="descripcion">
            “Estas mujeres, con liderazgo y compromiso, inspiran, transforman y dejan un legado de resiliencia y visión para las futuras generaciones.”
          </p>
          <div className="cards">
            {[CEO1, CEO2, CEO3, CEO4, CEO5, CEO6].map((img, index) => (
              <div key={index} className="card">
                <LazyImage src={img} alt={`CEO ${index + 1}`} />
                <h3>{["Nora Moreno","Ana Gamez","Eliana Alarcón","Paola Gil","Lin Zambrano","Zandra Mayorga"][index]}</h3>
                <p>
                  {[
                    "Liderando con visión y organización.",
                    "Precisión y experiencia en cada cifra.",
                    "Impulsando ideas que generan resultados.",
                    "Coordinación eficiente, proyectos exitosos.",
                    "Garantizando transparencia y confianza.",
                    "Orden y control en cada balance."
                  ][index]}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta premium-cta" aria-label="Llamada a la acción">
        <div className="container">
          <Zoom triggerOnce>
            <div className="cta__content">
              <h2 className="Informacion">¿Quieres conocer más sobre nosotros?</h2>
              <p className="cta__text premium-text p-contacto">
                Nuestro equipo está listo para responder todas tus preguntas.
              </p>
              <Link
                to="/contacto"
                className="btn btn--accent btn--large btn--premium"
              >
                Contáctanos
              </Link>
            </div>
          </Zoom>
        </div>
      </section>
    </div>
  );
};

export default About;
