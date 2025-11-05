import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "../pages/Services.css";
import { FaSearch, FaLeaf, FaProjectDiagram, FaGlobe, FaTimes } from "react-icons/fa";
import bg from "../assets/img/bg-meridian.jpg.png"; // tu imagen generada

const PROJECTS = [
  {
    id: "company",
    title: "Company Man",
    short:
      "Proyecto insignia de control operativo en perforación y re-acondicionamiento de pozos.",
    long:
      "Company Man es nuestro servicio integral de control operativo de pozos: supervisión, optimización de procesos de perforación y re-acondicionamiento. Incluye planificación, control de calidad y protocolos de seguridad para operaciones eficientes.",
    stats: [
      { label: "Pozos intervenidos", value: "+20" },
      { label: "Reducción de costos", value: "≈15%" },
      { label: "Horas de soporte", value: "+3.400" },
    ],
  },
  {
    id: "frontera",
    title: "Frontera",
    short:
      "Iniciativa que impulsa innovación y sostenibilidad mediante desarrollo tecnológico.",
    long:
      "Frontera promueve la adopción de tecnologías limpias y prácticas sostenibles en operaciones energéticas, integrando análisis de impacto, gestión comunitaria y soluciones de monitoreo ambiental.",
    stats: [
      { label: "Proyectos piloto", value: "+8" },
      { label: "Eficiencia energética", value: "≈12%" },
      { label: "Comunidades beneficiadas", value: "+6" },
    ],
  },
  {
    id: "petro",
    title: "Petroservicios",
    short:
      "Servicio técnico/logístico para operaciones de hidrocarburos con enfoque en seguridad.",
    long: `
      <p>Desde hace 7 años venimos apoyando a la Vicepresidencia de Desarrollo de Ecopetrol con el soporte en las siguientes actividades:</p>

      <ul>
        <li>1️⃣ Servicio para la caracterización y gestión del yacimiento</li>
        <li>2️⃣ Construcción de escenarios de subsuelo</li>
        <li>3️⃣ Planeación integrada del desarrollo</li>
        <li>4️⃣ Integración y análisis de oportunidades de desarrollo, y el análisis de resultados y acciones de mejora al plan integrado de desarrollo</li>
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
      { label: "Operaciones asistidas", value: "+40" },
      { label: "Mejora uptime", value: "≈9%" },
      { label: "Protocolos implementados", value: "+25" },
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

  return (
    <div className="servicios-page">
      {/* Barra de lectura + porcentaje */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <div className="scroll-percent" aria-hidden>
        {Math.round(scrollProgress)}%
      </div>

      {/* HERO */}
      <section
        className="services-hero"
        style={{ backgroundImage: `url(${bg})` }}
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
                <img src={bg} alt={p.title} />
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

            <div className="modal-hero" style={{ backgroundImage: `url(${bg})` }} />

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
                <a className="btn-outline" href="#contacto">
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
