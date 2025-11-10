import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../pages/Services.css";
import { FaSearch, FaLeaf, FaProjectDiagram, FaGlobe, FaTimes } from "react-icons/fa";
import LazyImage from "../components/LazyImage";
import SEO from "../components/SEO";
import bg from "../assets/img/bg-meridian.jpg.png"; // tu imagen generada
import fondo5 from "../assets/img/fondo5.png"; // imagen banner hero
import minc2 from "../assets/img/minc_2.jpeg"; // imagen minciencias tarjeta
import minc3 from "../assets/img/minc_3.png"; // imagen minciencias modal
import cw3 from "../assets/img/cw_3.jpeg"; // imagen company man tarjeta
import cw4 from "../assets/img/cw_4.jpeg"; // imagen company man modal

const PROJECTS = [
  {
    id: "company",
    title: "Company Man",
    short:
      "Proyecto insignia de control operativo en perforación y re-acondicionamiento de pozos.",
    long: `
      <p>Desde el 30 de agosto venimos ejecutando para <strong>Ecopetrol S.A.</strong> el Servicio de Ingeniería, Planeación y Supervisión Integral de Pozos en perforación, completamiento e intervenciones a pozo, bajo un contrato marco con duración de <strong>5 años</strong>.</p>

      <p><strong>Servicios especializados que suministramos:</strong></p>
      <ul>
        <li>• Supervisión integral de intervenciones a pozo</li>
        <li>• Planeación de intervenciones a pozo</li>
        <li>• Aseguramiento de calidad de la información en intervenciones a pozo</li>
        <li>• Soporte y seguimiento a la integridad de pozos</li>
        <li>• Soporte y seguimiento al abandono de pozos</li>
        <li>• Soporte y seguimiento de costos asociados a intervenciones</li>
      </ul>

      <p><strong>Disciplinas involucradas en el contrato:</strong></p>
      <ul>
        <li>• Ingeniería de Intervenciones</li>
        <li>• Ingeniería de Petróleo</li>
        <li>• Integridad e Ingeniería de Materiales</li>
        <li>• Ingeniería de Costos</li>
        <li>• Operaciones de Workover & Well Services</li>
        <li>• Data Analytics aplicado a operaciones de pozo</li>
      </ul>
    `,
    stats: [
      { label: "Pozos intervenidos", value: "+20" },
      { label: "Reducción de costos", value: "≈15%" },
      { label: "Horas de soporte", value: "+3.400" },
    ],
  },
  {
    id: "frontera",
    title: "Frontera Energy Colombia Corp.",
    short:
      "Servicios especializados de dirección, interventoría y supervisión de operaciones de pozos.",
    long: `
      <p>Desde <strong>2017</strong> brindamos a <strong>Frontera Energy Colombia Corp.</strong> servicios especializados de dirección, interventoría y supervisión de operaciones de perforación, completamiento y reacondicionamiento (workover) de pozos de hidrocarburos.</p>

      <p>Con más de <strong>ocho años de experiencia continua</strong> apoyando a Frontera Energy, Meridian Consulting se consolida como un aliado técnico confiable en la gestión integral de proyectos de pozos, aplicando las mejores prácticas internacionales de la industria petrolera. Contamos con un equipo de ingenieros y supervisores expertos que aseguran la correcta ejecución de las operaciones bajo los más altos estándares técnicos y de seguridad industrial (HSEQ).</p>

      <p><strong>Nuestras disciplinas integran:</strong></p>
      <ul>
        <li>• <strong>Ingeniería de perforación:</strong> planeación y control de operaciones, análisis de desempeño y optimización de parámetros</li>
        <li>• <strong>Ingeniería de completamiento:</strong> diseño y supervisión de sistemas de terminación de pozos</li>
        <li>• <strong>Workover e intervenciones:</strong> reacondicionamiento, reparación y abandono de pozos, tanto con equipos convencionales como rigless</li>
        <li>• <strong>Fluidos de perforación y cementación:</strong> control de propiedades reológicas, diseño de mezclas y aseguramiento de la integridad del pozo</li>
        <li>• <strong>Pesca, control direccional y servicios de registro:</strong> diagnóstico y solución de contingencias, alineación de trayectorias y caracterización de formaciones</li>
        <li>• <strong>Seguridad industrial (HSEQ):</strong> cumplimiento de las normas internacionales y de la política corporativa de sostenibilidad y prevención de incidentes</li>
      </ul>
    `,
    stats: [
      { label: "Campos/Bloques", value: "13" },
      { label: "Pozos intervenidos", value: "+500" },
      { label: "Años de alianza", value: "8+" },
    ],
  },
  {
    id: "petro",
    title: "Petroservicios",
    short:
      "Servicio técnico/logístico para operaciones de hidrocarburos con enfoque en seguridad.",
    long: `
      <p>Desde hace <strong>7 años</strong> venimos apoyando a la Vicepresidencia de Desarrollo de Ecopetrol con el soporte en las siguientes actividades:</p>

      <ul>
        <li>• Servicio para la caracterización y gestión del yacimiento</li>
        <li>• Construcción de escenarios de subsuelo</li>
        <li>• Planeación integrada del desarrollo</li>
        <li>• Integración y análisis de oportunidades de desarrollo, y el análisis de resultados y acciones de mejora al plan integrado de desarrollo</li>
      </ul>

      <p><strong>Disciplinas involucradas:</strong></p>
      <ul>
        <li>• Geología</li>
        <li>• Petrofísica</li>
        <li>• Ingeniería de Yacimientos</li>
        <li>• Fluidos</li>
        <li>• Ingeniería de Pozos y Producción</li>
        <li>• Facilidades</li>
        <li>• Data Analytics</li>
      </ul>
    `,
    stats: [
      { label: "Años con Ecopetrol", value: "7+" },
      { label: "Disciplinas", value: "7" },
      { label: "Operaciones asistidas", value: "+40" },
    ],
  },
  {
    id: "minciencias",
    title: "MINCIENCIAS - Energía Geotérmica",
    short:
      "Proyecto de investigación para evaluación del potencial geotérmico del complejo Paipa-Iza.",
    long: `
      <p>Dentro de la <strong>convocatoria 951 de 2024</strong> de Minciencias, venimos desarrollando el proyecto de Investigación <strong>"Evaluación integral del potencial geotérmico del complejo Paipa-Iza"</strong> en alianza con la <strong>Fundación Universidad América</strong>, como entidad coejecutora.</p>

      <p>Este proceso de investigación inició el <strong>10 de julio de 2025</strong>, y durante el plazo de <strong>18 meses</strong> desarrollaremos las siguientes tareas especializadas:</p>

      <p><strong>Objetivos del proyecto:</strong></p>
      <ul>
        <li>• Construir un modelo del subsuelo de la zona de estudio, simulando el flujo de calor y masa para la evaluación del comportamiento del sistema geotérmico, estimando su potencial térmico</li>
        <li>• Generación de escenario de desarrollo mediante el diseño conceptual de un pozo geotérmico y la selección de tecnología para el aprovechamiento de calor en superficie</li>
      </ul>

      <p><strong>Alcance:</strong></p>
      <ul>
        <li>• Modelamiento geotérmico avanzado</li>
        <li>• Simulación de flujo de calor y masa</li>
        <li>• Diseño conceptual de pozos geotérmicos</li>
        <li>• Evaluación de tecnologías de aprovechamiento</li>
        <li>• Análisis de sostenibilidad energética</li>
      </ul>
    `,
    stats: [
      { label: "Duración", value: "18 meses" },
      { label: "Inicio", value: "Jul 2025" },
      { label: "Convocatoria", value: "951/2024" },
    ],
  },
];

const Services = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [modalProject, setModalProject] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // bloquea click derecho y selección solo en proyectos (seguridad visual)
  useEffect(() => {
    const proyectosArea = document.querySelector(".proyectos-grid");
    if (!proyectosArea) return;

    const preventContext = (e) => e.preventDefault();
    proyectosArea.addEventListener("contextmenu", preventContext);
    return () => proyectosArea.removeEventListener("contextmenu", preventContext);
  }, []);

  const openModal = (proj) => setModalProject(proj);
  const closeModal = () => setModalProject(null);

  // Schema.org Service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Consultoría Especializada",
    "provider": {
      "@type": "Organization",
      "name": "MERIDIAN CONSULTING LTDA"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Colombia"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Servicios de Consultoría",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoría Geocientífica"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Ingeniería de Petróleos"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Consultoría Ambiental"
          }
        }
      ]
    }
  };

  return (
    <div className="servicios-page">
      <SEO 
        title="Servicios y Proyectos"
        description="Servicios especializados en consultoría geocientífica, ingeniería de petróleos, minería y gestión ambiental. Proyectos destacados con Ecopetrol, Frontera Energy y Minciencias."
        keywords="company man, supervisión de pozos, consultoría petrolera, ingeniería de petróleos, proyectos minería, Colombia"
        url="/servicios"
        schemaData={serviceSchema}
      />
      {/* Barra de lectura + porcentaje */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="scroll-percent" aria-hidden>
        {Math.round(scrollProgress)}%
      </div>

      {/* HERO */}
      <section
        className="services-hero services-hero-solid"
        data-aos="fade-up"
      >
        <div className="overlay">
          <h1>Servicios y Proyectos MERIDIAN</h1>
          <p>Más de 23 años de experiencia impulsando la excelencia</p>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="proyectos-section" data-aos="fade-up">
        <h2 className="section-title">Proyectos Destacados</h2>

        <div className="proyectos-grid" aria-label="Explorador de Proyectos - MERIDIAN">
          {PROJECTS.map((p, i) => (
            <article
              className="proyecto-card"
              key={p.id}
              data-aos="zoom-in"
              data-aos-delay={i * 120}
              role="article"
              aria-labelledby={`proj-${p.id}`}
            >
              <div className="proyecto-media" aria-hidden>
                <LazyImage 
                  src={
                    p.id === "minciencias" ? minc2 : 
                    p.id === "company" ? cw3 : 
                    bg
                  } 
                  alt={p.title} 
                />
              </div>

              <div className="proyecto-body">
                <h3 id={`proj-${p.id}`} className="proj-title">{p.title}</h3>
                <p className="short">{p.short}</p>

                <div className="proyecto-actions">
                  <button
                    className="btn-leer"
                    onClick={() => openModal(p)}
                    aria-haspopup="dialog"
                  >
                    Leer más
                    <span className="arrow">▸</span>
                    <span className="scan" aria-hidden />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="servicios-section" data-aos="fade-up">
        <h2 className="section-title">Nos especializamos en:</h2>

        <div className="especialidades-grid">
          <div className="especialidad" data-aos="fade-up" data-aos-delay="80">
            <div className="icon-box"><FaSearch /></div>
            <h4>Consultoría Geocientífica, Minera y del Petróleo</h4>
            <p>
              Brindamos soluciones integrales en la exploración y evaluación de recursos mineros y de hidrocarburos. Ejecutamos desde la adquisición e interpretación de datos y modelamiento de subsuelo , hasta la administración de proyectos y auditorías técnico-administrativas.
            </p>
          </div>

          <div className="especialidad" data-aos="fade-up" data-aos-delay="160">
            <div className="icon-box"><FaLeaf /></div>
            <h4>Consultoría Ambiental</h4>
            <p>
              Desarrollamos estudios socio-ambientales, incluyendo Estudios de Impacto Ambiental (EIA), Planes de Manejo Ambiental (PMA) y modificación de licencias. Realizamos interventorías , gestión social , tratamiento de residuos y apoyamos proyectos de responsabilidad social.
            </p>
          </div>

          <div className="especialidad" data-aos="fade-up" data-aos-delay="240">
            <div className="icon-box"><FaProjectDiagram /></div>
            <h4>Consultoría en Ingeniería de Petróleos</h4>
            <p>
              Ofrecemos control operativo para la perforación, finalización y re-acondicionamiento de pozos (Company Man). Además, realizamos evaluación de proyectos , ingeniería de yacimientos y auditorías e interventorías especializadas en el sector.
            </p>
          </div>

          <div className="especialidad" data-aos="fade-up" data-aos-delay="320">
            <div className="icon-box"><FaGlobe /></div>
            <h4>Data Management</h4>
            <p>
              Proveemos servicios de gestión documental y archivística, incluyendo outsourcing, almacenamiento y administración de archivos. Aseguramos la preservación de su información mediante digitalización, vectorización e implementación de bases de datos corporativas en línea.
            </p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {modalProject && (
        <div
          className="modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`${modalProject.title} - detalles`}
          onClick={closeModal}
        >
          <div
            className="modal-card"
            onClick={(e) => e.stopPropagation()}
            data-aos="zoom-in"
          >
            <button className="modal-close" onClick={closeModal} aria-label="Cerrar">
              <FaTimes />
            </button>

            <div className="modal-hero" style={{ 
              backgroundImage: `url(${
                modalProject.id === "minciencias" ? minc3 : 
                modalProject.id === "company" ? cw4 : 
                bg
              })` 
            }} />

            <div className="modal-body">
              <h3>{modalProject.title}</h3>

              {/* 🔥 Aquí el cambio importante */}
              <div
                className="modal-desc"
                dangerouslySetInnerHTML={{ __html: modalProject.long }}
              />

              <div className="modal-stats">
                {modalProject.stats.map((s) => (
                  <div key={s.label} className="modal-stat">
                    <div className="stat-value">{s.value}</div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>

              <div className="modal-actions">
                <button className="btn-primary" onClick={closeModal}>
                  Cerrar
                </button>
                <a 
                  className="btn-outline" 
                  href="https://wa.me/573138174050?text=Hola,%20me%20gustaría%20obtener%20más%20información%20sobre%20los%20servicios%20de%20MERIDIAN%20CONSULTING"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar equipo
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
