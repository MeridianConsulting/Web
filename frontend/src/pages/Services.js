import React from 'react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const services = [
    {
      title: 'Consultoría en Exploración',
      description: 'Servicios especializados en exploración de yacimientos petrolíferos y análisis geológico.',
      icon: '🔍',
      url: 'https://example.com/exploracion'
    },
    {
      title: 'Evaluación de Proyectos',
      description: 'Análisis y evaluación de viabilidad técnica y económica de proyectos de hidrocarburos.',
      icon: '📊',
      url: 'https://example.com/proyectos'
    },
    
    {
      title: 'Gestión ambiental en proyectos energéticos',
      description: 'Estrategias para optimizar la producción y extracción de petróleo y gas natural.',
      icon: '⚙️',
      url: '/pdf/Brochure_actualizado.pdf' // ✅ Apunta al archivo que ya tienes
    },

    {
      title: 'Gestión Ambiental',
      description: 'Soluciones para la gestión ambiental y cumplimiento normativo en proyectos energéticos.',
      icon: '🌿',
      url: 'https://example.com/ambiental'
    }
  ];

  return (
    <div className="services-container">
      <h1 data-aos="fade-down">Nuestros Servicios</h1>
      <p className="services-intro" data-aos="fade-up" data-aos-delay="100">
        En Meridian Consulting LTDA ofrecemos soluciones integrales para la industria petrolera y de hidrocarburos en Colombia.
      </p>

      <div className="services-grid">
        {services.map((service, index) => (
          <div
            key={index}
            className="service-card"
            data-aos="zoom-in-up"
            data-aos-delay={index * 100}
            data-aos-duration="800"
          >
            <div className="service-card__icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href={service.url} target="_blank" rel="noopener noreferrer" className="service-btn">
              Haz clic aquí
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
