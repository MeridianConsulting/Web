import React, { useState, useEffect } from "react";
import "./Services.css";
import {
  FaSearch,
  FaProjectDiagram,
  FaLeaf,
  FaGlobe,
  FaStar,
  FaFilter,
  FaDownload,
  FaPhone,
  FaInfoCircle,
  FaCertificate,
  FaNewspaper,
  FaWhatsapp,
  FaCalendarAlt,
  FaLightbulb
} from "react-icons/fa";

const Services = () => {
  // ===== Noticias reales =====
  const news = [
    {
      title: "🌍 Nueva regulación ambiental en Colombia 2025",
      link: "https://www.minambiente.gov.co/"
    },
    {
      title: "💡 Innovación en exploración petrolera",
      link: "https://www.energiahoy.com/"
    },
    {
      title: "⚡ Proyectos sostenibles de energía en LATAM",
      link: "https://www.bnamericas.com/es/"
    }
  ];

  // ===== Tips dinámicos =====
  const tips = [
    "💡 Aprovecha la asesoría gratuita en línea con nuestros expertos.",
    "📌 Descarga guías técnicas desde el apartado de recursos.",
    "⚡ Participa en los webinars mensuales sobre energía.",
    "🌍 Revisa nuestras certificaciones internacionales."
  ];
  const [currentTip, setCurrentTip] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTip((prev) => (prev + 1) % tips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [tips.length]);

  // ===== Servicios =====
  const services = [
    {
      number: "01",
      title: "Consultoría en Exploración",
      description:
        "Servicios especializados en exploración de yacimientos petrolíferos y análisis geológico.",
      icon: <FaSearch />,
      badge: "Premium",
      url: "https://www.energiahoy.com/"
    },
    {
      number: "02",
      title: "Evaluación de Proyectos",
      description:
        "Análisis de viabilidad técnica y económica de proyectos de hidrocarburos.",
      icon: <FaProjectDiagram />,
      badge: "Nuevo",
      url: "https://www.bnamericas.com/es/"
    },
    {
      number: "03",
      title: "Gestión de Producción",
      description:
        "Estrategias para optimizar la producción y extracción de petróleo y gas natural.",
      icon: <FaGlobe />,
      badge: "Recomendado",
      url: "https://www.revistapetroleoenergia.com/"
    },
    {
      number: "04",
      title: "Gestión Ambiental",
      description:
        "Soluciones para la gestión ambiental y cumplimiento normativo en proyectos energéticos.",
      icon: <FaLeaf />,
      badge: "Básico",
      url: "https://www.minambiente.gov.co/"
    }
  ];

  return (
    <div className="services-layout">
      {/* Sidebar izquierda */}
      <aside className="sidebar left" data-aos="fade-right">
        <h3><FaStar /> Menú rápido</h3>
        <ul>
          {services.map((s, i) => (
            <li key={i}>
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.number}. {s.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Tips dinámicos */}
        <div className="sidebar-tip">
          <FaLightbulb /> {tips[currentTip]}
        </div>

        {/* Calendario */}
        <div className="sidebar-section">
          <h4><FaCalendarAlt /> Próximos eventos</h4>
          <ul>
            <li>📅 Webinar: Energía Sostenible - 15 Sept</li>
            <li>📅 Conferencia: Exploración Avanzada - 30 Sept</li>
            <li>📅 Taller: Gestión Ambiental - 12 Oct</li>
          </ul>
        </div>
      </aside>

      {/* Contenido central */}
      <main className="services-container">
        <h1 data-aos="fade-down">Nuestros Servicios</h1>
        <p className="services-intro" data-aos="fade-up" data-aos-delay="100">
          En <strong>Meridian Consulting LTDA</strong> ofrecemos soluciones
          integrales para la industria petrolera y de hidrocarburos en Colombia.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card"
              data-aos="zoom-in"
              data-aos-delay={index * 200}
            >
              <div className="service-number">{service.number}</div>
              <div className="service-icon">{service.icon}</div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <span className="service-badge">{service.badge}</span>
              <a
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="service-btn"
              >
                Descubrir
              </a>
            </div>
          ))}
        </div>
      </main>

      {/* Sidebar derecha */}
      <aside className="sidebar right" data-aos="fade-left">
        <h3><FaDownload /> Recursos</h3>
        <ul>
          <li>
            <a href="/pdf/Brochure_actualizado.pdf" target="_blank" rel="noreferrer">
              📄 Descargar Brochure
            </a>
          </li>
          <li><a href="/contacto"><FaPhone /> Contáctanos</a></li>
          <li><a href="/nosotros"><FaInfoCircle /> Sobre Nosotros</a></li>
          <li><a href="/certificaciones"><FaCertificate /> Certificaciones</a></li>
        </ul>

        {/* Noticias */}
        <div className="sidebar-news">
          <h4><FaNewspaper /> Noticias</h4>
          <ul>
            {news.map((n, i) => (
              <li key={i}>
                <a href={n.link} target="_blank" rel="noreferrer">{n.title}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA WhatsApp */}
        <div className="sidebar-cta">
          <h4>🚀 Habla con un experto</h4>
          <p>Agenda una llamada y obtén asesoría gratuita.</p>
          <a
            href="https://wa.me/573138174050"
            target="_blank"
            rel="noopener noreferrer"
            className="cta-btn"
          >
            <FaWhatsapp /> WhatsApp
          </a>
        </div>
      </aside>
    </div>
  );
};

export default Services;
