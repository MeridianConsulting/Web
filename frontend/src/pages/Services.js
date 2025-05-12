import React from 'react';
import ServiceCard from '../components/ServiceCard';

const Services = () => {
  const services = [
    {
      title: 'Consultoría en Exploración',
      description: 'Servicios especializados en exploración de yacimientos petrolíferos y análisis geológico.',
      icon: '🔍'
    },
    {
      title: 'Evaluación de Proyectos',
      description: 'Análisis y evaluación de viabilidad técnica y económica de proyectos de hidrocarburos.',
      icon: '📊'
    },
    {
      title: 'Optimización de Producción',
      description: 'Estrategias para optimizar la producción y extracción de petróleo y gas natural.',
      icon: '⚙️'
    },
    {
      title: 'Gestión Ambiental',
      description: 'Soluciones para la gestión ambiental y cumplimiento normativo en proyectos energéticos.',
      icon: '🌿'
    }
  ];

  return (
    <div className="services-container">
      <h1>Nuestros Servicios</h1>
      <p className="services-intro">
        En Meridian Consulting LTDA ofrecemos soluciones integrales para la industria petrolera y de hidrocarburos en Colombia.
      </p>
      
      <div className="services-grid">
        {services.map((service, index) => (
          <ServiceCard 
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default Services; 