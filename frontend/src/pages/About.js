// StatsSection.jsx
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Zoom, Slide } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css";
import CEO1 from '../assets/img/CEO1.png';
import CEO2 from '../assets/img/CEO2.png';
import CEO3 from '../assets/img/CEO3.png';
import CEO4 from '../assets/img/CEO4.png';
import CEO5 from '../assets/img/CEO5.png';
import CEO6 from '../assets/img/CEO6.png';


const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
    AOS.init({ duration: 1000 });

    // ==== Contador animado ====
    const counters = document.querySelectorAll(".counter");
    const speed = 100; // Ajusta la velocidad

    const animateCount = (counter) => {
      const target = +counter.getAttribute("data-target");
      const updateCount = () => {
        const current = +counter.innerText;
        const increment = Math.ceil(target / speed);

        if (current < target) {
          counter.innerText = current + increment;
          setTimeout(updateCount, 30);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    };

    // Observer para activar cuando se vean
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

    counters.forEach((counter) => {
      observer.observe(counter);
    });
  }, []);

  return (
    <div className="about-page">
      {/* HERO */}
      <section className="about-section">
        <div className="about-container">
          <h2 className="about-title">Sobre Nosotros</h2>
          <p className="about-description">
            En <strong>Meridian Consulting Ltda</strong>, somos una empresa comprometida en brindar soluciones
            efectivas e innovadoras a nuestros clientes. Nuestro equipo de profesionales trabaja con
            pasión, responsabilidad y excelencia, asegurando resultados que generan confianza y
            contribuyen al desarrollo sostenible de las organizaciones.
          </p>
        </div>

        <div className="values-container">
          <h2 className="values-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <span className="value-icon">🤝</span>
              <h3>Compromiso</h3>
              <p>Trabajamos con dedicación para cumplir y superar las expectativas de nuestros clientes.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">⭐</span>
              <h3>Excelencia</h3>
              <p>Buscamos la mejora continua y la calidad en cada uno de nuestros procesos.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🔎</span>
              <h3>Transparencia</h3>
              <p>Actuamos con honestidad, claridad y responsabilidad en nuestras acciones.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">💡</span>
              <h3>Innovación</h3>
              <p>Aplicamos soluciones creativas y eficientes para afrontar los retos del sector.</p>
            </div>
            <div className="value-card">
              <span className="value-icon">🌍</span>
              <h3>Responsabilidad</h3>
              <p>Cuidamos el impacto de nuestras acciones en las personas y el medio ambiente.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="about-intro-section">
        <Zoom triggerOnce>
          <h2>Nosotros</h2>
          <p>
            MERIDIAN CONSULTING LTDA fue fundada en 2003 por geólogos con amplia experiencia en la industria minero-energética. 
            Desde entonces hemos desarrollado más de 200 contratos exitosos, respaldados por un sistema integrado de gestión de calidad, 
            asegurando excelencia, disciplina técnica y mejora continua.
          </p>
        </Zoom>
      </section>

      {/* STATS con contador */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <h2 className="counter" data-target="+200">0</h2>
            <p>Contratos exitosos</p>
          </div>
          <div className="stat-card">
            <h2 className="counter" data-target="+18">0</h2>
            <p>Años de experiencia</p>
          </div>
          <div className="stat-card">
            <h2 className="counter" data-target="30">0</h2>
            <p>Clientes destacados</p>
          </div>
        </div>
      </section>

      {/* MISIÓN Y VISIÓN */}
      <section className="values-section">
        <h2>Misión y Visión</h2>
        <div className="values-grid">
          <Slide direction="left" triggerOnce>
            <motion.div
              whileHover={{ scale: 1.05, rotate: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="value-card"
            >
              <h3>Misión</h3>
              <p>
                En MERIDIAN CONSULTING LTDA contribuimos al fortalecimiento del sector energético y ambiental, 
                mediante servicios especializados en geología, ingeniería de petróleos, energías renovables y 
                control técnico de operaciones. Promovemos excelencia, ética, disciplina técnica y responsabilidad, 
                generando valor a nuestros clientes y apoyándonos en un equipo humano altamente capacitado.
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
                Para el año 2030, ser un referente nacional en consultoría especializada para el sector minero-energético, 
                destacándonos por excelencia operativa y financiera, innovación tecnológica, compromiso ético y capacidad de 
                adaptación a retos técnicos, sociales y ambientales. Generaremos alianzas estratégicas de alto valor y 
                contribuiremos al crecimiento sostenible de las comunidades.
              </p>
            </motion.div>
          </Slide>
        </div>
      </section>

      {/* LÍNEA DE TIEMPO */}
      <section className="timeline-section">
        <h2>Nuestra Historia</h2>
        <div className="timeline">
          <Slide direction="up" cascade damping={0.2} triggerOnce>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2003</h4>
                <p>Fundación de MERIDIAN CONSULTING LTDA.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2005 - 2010</h4>
                <p>Consolidación con compañías petroleras nacionales e internacionales.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2011 - 2015</h4>
                <p>Expansión hacia la industria minera con contratos estratégicos.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2016 - 2020</h4>
                <p>Implementación del sistema de gestión de calidad y +200 contratos exitosos.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-content">
                <h4>2021 - Actualidad</h4>
                <p>Consolidación como referente y enfoque hacia energías renovables.</p>
              </div>
            </div>
          </Slide>
        </div>
      </section>
       {/* Sección de Mujeres que Inspiran */}
            
      <section className="inspiradoras">
        <div className="contenedor">
          <h2>Mujeres que Inspiran</h2>
      
          <p className="descripcion">
           “Estas mujeres, con liderazgo y compromiso, inspiran, transforman y dejan un legado de resiliencia y visión para las futuras generaciones.”
          </p>
      
          {/* Apartado Coordinadoras */}
          <div className="cards">
            <div className="card">
              <img src={CEO1} alt="Nora Moreno"/>
              <h3>Nora Moreno</h3>
              <p>“Liderando con visión y organización.”</p>
            </div>
            <div className="card">
              <img src={CEO2} alt="Ana Gamez" />
              <h3>Ana Gamez</h3>
              <p>“Precisión y experiencia en cada cifra.”</p>
            </div>
            <div className="card">
              <img src={CEO3} alt="Eliana Alarcón" />
              <h3>Eliana Alarcón</h3>
              <p>“Impulsando ideas que generan resultados.”</p>      
            </div>
            <div className="cards">
            <div className="card">
              <img src={CEO4} alt="Paola Gil" />
              <h3>Paola Gil</h3>
              <p>“Coordinación eficiente, proyectos exitosos.”</p>      
            </div>
            <div className="card">
              <img src={CEO5} alt="Lin Zambrano" />
              <h3>Lin Zambrano</h3>
              <p>“Garantizando transparencia y confianza.”</p>      
            </div>
               <div className="cards">
            <div className="card">
              <img src={CEO6} alt="Zandra Mayorga" />
              <h3>Zandra Mayorga</h3>
              <p>“Orden y control en cada balance.”</p>      
            </div>
          </div>
          </div>
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
              <Link to="/contacto" className="btn btn--accent btn--large btn--premium">
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
