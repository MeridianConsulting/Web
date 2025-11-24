import React, { useEffect } from "react";
import "./Innovation.css";
import SEO from "../components/SEO";

const Innovation = () => {
  useEffect(() => {
    // === Animación de subrayado cuando los h2 entran en vista ===
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-underline");
          }
        });
      },
      { threshold: 0.4 }
    );

    const headings = document.querySelectorAll(".innovation-page h2");
    headings.forEach((h) => observer.observe(h));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="innovation-page" data-aos="fade-up">
      <SEO 
        title="Innovación"
        description="Innovación para un futuro competitivo. Descubre cómo MERIDIAN CONSULTING integra transformación digital, sostenibilidad y tecnologías aplicadas en sus proyectos."
        keywords="innovación, transformación digital, sostenibilidad, tecnologías, Power BI, Microsoft 365, Colombia"
        url="/innovacion"
      />
      
      {/* Hero */}
      <section className="innovation-hero">
        <div className="hero-content">
          <h1>Innovación para un Futuro Competitivo</h1>
          <p>
            En <strong>MERIDIAN CONSULTING LTDA</strong>, la innovación no es
            solo una estrategia, es una cultura que impulsa el cambio, fomenta
            la creatividad y genera ventajas sostenibles para nuestros socios y
            clientes.
          </p>
        </div>
      </section>

      {/* Objetivo */}
      <section className="innovation-goal" data-aos="fade-up">
        <h2>Objetivo de la Innovación</h2>
        <div className="goal-card">
          <p>
            Promover una mentalidad innovadora dentro de la organización,
            impulsando procesos de mejora continua, transformación digital y
            aprovechamiento del talento humano.
          </p>
          <ul>
            <li>Adoptar nuevas tecnologías y metodologías ágiles.</li>
            <li>Fortalecer la capacidad de adaptación al cambio.</li>
            <li>Generar impacto positivo en los resultados empresariales.</li>
          </ul>
        </div>
      </section>

      {/* Componentes */}
      <section className="innovation-components" data-aos="fade-up">
        <h2>Componentes Clave</h2>
        <p>
          La innovación se materializa a través de cuatro ejes estratégicos que
          fortalecen nuestra posición en el mercado:
        </p>
        <div className="table-wrapper">
          <table className="innovation-table">
            <thead>
              <tr>
                <th>Eje</th>
                <th>Descripción</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Cultura Organizacional</td>
                <td>
                  Fomentar espacios donde la creatividad, el aprendizaje y la
                  colaboración sean parte del ADN institucional.
                </td>
              </tr>
              <tr>
                <td>Transformación Digital</td>
                <td>
                  Integración de tecnologías modernas que optimizan procesos y
                  mejoran la toma de decisiones.
                </td>
              </tr>
              <tr>
                <td>Desarrollo del Talento</td>
                <td>
                  Capacitar a nuestros colaboradores para enfrentar los retos de
                  un entorno en constante evolución.
                </td>
              </tr>
              <tr>
                <td>Sostenibilidad e Impacto</td>
                <td>
                  Implementar soluciones innovadoras que aporten al bienestar
                  social y ambiental.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Aliados */}
      <section className="innovation-allies" data-aos="fade-up">
        <h2>Aliados Estratégicos</h2>
        <p>
          La innovación no ocurre de manera aislada. En MERIDIAN CONSULTING
          contamos con aliados que potencian nuestras iniciativas:
        </p>
        <div className="allies-grid">
          <div className="ally-card">
            <strong>Universidades</strong>
            <p>Colaboramos en programas de investigación y desarrollo.</p>
          </div>
          <div className="ally-card">
            <strong>Entidades Gubernamentales</strong>
            <p>Participamos en proyectos de transformación y competitividad.</p>
          </div>
          <div className="ally-card">
            <strong>Empresas Privadas</strong>
            <p>Intercambiamos conocimiento y mejores prácticas.</p>
          </div>
          <div className="ally-card">
            <strong>Redes de Innovación</strong>
            <p>Nos conectamos con ecosistemas de innovación nacionales e internacionales.</p>
          </div>
        </div>
      </section>

      {/* Tecnologías Aplicadas */}
      <section className="innovation-tech" data-aos="fade-up">
        <h2>Tecnologías Aplicadas</h2>
        <p>
          MERIDIAN CONSULTING integra herramientas y plataformas tecnológicas
          que mejoran la gestión del conocimiento, la comunicación interna y la
          eficiencia operativa. Algunas de ellas son:
        </p>
        <div className="tech-grid">
          <div className="tech-card">Power BI</div>
          <div className="tech-card">Microsoft 365</div>
          <div className="tech-card">Tawk.io</div>
          <div className="tech-card">Plataformas CRM</div>
          <div className="tech-card">Google Workspace</div>
          <div className="tech-card">Gestión Documental</div>
          <div className="tech-card">Python</div>
          <div className="tech-card">Simuladores de flujo en medios porosos</div>
          <div className="tech-card">Eclipse</div>
          <div className="tech-card">CMG</div>
          <div className="tech-card">tNavigator</div>
          <div className="tech-card">Desarrollo de software</div>
          <div className="tech-card">Análisis de datos</div>
          <div className="tech-card">Petrel</div>
          <div className="tech-card">Machine Learning</div>
          <div className="tech-card">Bases de datos avanzadas</div>
        </div>
      </section>
    </div>
  );
};

export default Innovation;
