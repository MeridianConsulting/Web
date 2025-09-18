import React from "react";
import "./Innovation.css";   // Importa los estilos

const Innovation = () => {
  return (
    <div className="innovation-page">
      {/* Hero */}
      <section className="innovation-hero">
        <h1>Innovación para un Futuro Competitivo</h1>
        <p>
          En <strong>MERIDIAN CONSULTING</strong> estamos desarrollando el 
          <strong> Proyecto de Investigación Geotermia Paipa-Iza</strong>, 
          que busca evaluar el potencial geotérmico integrando inteligencia artificial,
          modelamiento computacional y soluciones sostenibles para Colombia.
        </p>
        <a href="/contacto" className="cta-btn">
          🚀 Quiero Innovar
        </a>
      </section>

      {/* Objetivo General */}
      <section className="innovation-goal">
        <h2>Objetivo General</h2>
        <p>
          Evaluar el potencial geotérmico del complejo Paipa-Iza, integrando análisis 
          geológicos, geoquímicos, geofísicos y modelamiento computacional con técnicas 
          de inteligencia artificial y aprendizaje automático, para diseñar una solución 
          energética sostenible y técnicamente viable en Colombia.
        </p>
      </section>

<section className="innovation-components" data-aos="fade-up">
  <h2>Componentes Estratégicos</h2>
  <table className="innovation-table">
    <thead>
      <tr>
        <th>Eje</th>
        <th>Descripción</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>1. Información base</td>
        <td>Revisión bibliográfica, adquisición de datos del SGC, caracterización de rocas y aguas termales.</td>
      </tr>
      <tr>
        <td>2. Modelos predictivos IA</td>
        <td>Aplicación de Machine Learning (Random Forest, SVM, CNN, etc.) sobre datos geoquímicos, geofísicos y sensores remotos.</td>
      </tr>
      <tr>
        <td>3. Simulación geoquímica</td>
        <td>Uso de plugins en CMG, modelado roca-fluido, calibración con datos reales y proyecciones 3D.</td>
      </tr>
      <tr>
        <td>4. Diseño conceptual</td>
        <td>Diseño de sistemas de aprovechamiento y modelación termoquímica del ciclo de generación de energía.</td>
      </tr>
      <tr>
        <td>5. Proyección y apropiación</td>
        <td>Indicadores de impacto, planes de adopción y validación con la comunidad.</td>
      </tr>
      <tr>
        <td>6. Entregables científicos</td>
        <td>Artículos indexados, libro, manual técnico y aplicación web.</td>
      </tr>
    </tbody>
  </table>
</section>
      {/* Aliados Estratégicos */}
      <section className="innovation-allies">
        <h2>Aliados Estratégicos</h2>
        <ul>
          <li><strong>Meridian:</strong> Desarrollo de plugins, modelamiento avanzado.</li>
          <li><strong>Universidad de América:</strong> Formación e investigación aplicada.</li>
          <li><strong>Fundación Uniagraria:</strong> Desarrollo académico, formación de talento.</li>
          <li><strong>Fidecodex:</strong> Gestión de recursos.</li>
          <li><strong>ANH y MinCiencias:</strong> Cofinanciación y supervisión técnica.</li>
        </ul>
      </section>

      {/* Tecnologías Clave */}
      <section className="innovation-tech">
        <h2>Tecnologías Clave Aplicadas</h2>
        <ul>
          <li>Azure Machine Learning Studio</li>
          <li>Python / Scala + Databricks</li>
          <li>CMG con plugins propios de geoquímica y deposición mineral</li>
          <li>Sensores térmicos + drones + cámaras multiespectrales</li>
          <li>SQL Server y MongoDB (estructurado / no estructurado)</li>
          <li>Streamlit para visualización de resultados IA</li>
        </ul>
      </section>

      {/* CTA Final */}
      <section className="innovation-cta">
        <h2>¿Listo para innovar?</h2>
        <p>
          Conversemos y construyamos juntos las soluciones que tu empresa necesita 
          para destacar en el futuro.
        </p>
        <a href="/contacto" className="cta-btn">Contáctanos</a>
      </section>
    </div>
  );
};

export default Innovation;
