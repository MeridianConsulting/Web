import React from 'react';

const About = () => {
  return (
    <div className="about-container">
      <h1>Sobre Nosotros</h1>
      
      <section className="about-intro">
        <h2>Meridian Consulting LTDA</h2>
        <p>
          Somos una empresa colombiana líder en consultoría especializada para la industria
          petrolera y de hidrocarburos. Con más de 15 años de experiencia en el sector,
          ofrecemos soluciones innovadoras y sostenibles que ayudan a nuestros clientes
          a maximizar su potencial y enfrentar los desafíos del mercado energético.
        </p>
      </section>
      
      <section className="about-mission-vision">
        <div className="mission">
          <h3>Misión</h3>
          <p>
            Proporcionar servicios de consultoría de alta calidad que generen valor
            a nuestros clientes a través de soluciones prácticas, eficientes y 
            sostenibles para la industria energética en Colombia.
          </p>
        </div>
        
        <div className="vision">
          <h3>Visión</h3>
          <p>
            Ser reconocidos como la empresa de consultoría líder en el sector petrolero
            de Colombia, distinguida por la excelencia técnica, innovación y compromiso
            con el desarrollo sostenible.
          </p>
        </div>
      </section>
      
      <section className="about-values">
        <h3>Nuestros Valores</h3>
        <ul>
          <li><strong>Excelencia técnica:</strong> Nos esforzamos por la calidad y precisión en cada proyecto.</li>
          <li><strong>Integridad:</strong> Actuamos con honestidad y ética en todas nuestras interacciones.</li>
          <li><strong>Innovación:</strong> Buscamos constantemente nuevas soluciones y mejores prácticas.</li>
          <li><strong>Sostenibilidad:</strong> Promovemos el equilibrio entre desarrollo energético y protección ambiental.</li>
          <li><strong>Compromiso:</strong> Dedicamos nuestro mejor esfuerzo al éxito de cada cliente.</li>
        </ul>
      </section>
    </div>
  );
};

export default About; 