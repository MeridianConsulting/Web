// About.jsx
import React, { useEffect } from "react";
import "aos/dist/aos.css";
import AOS from "aos";
import { Zoom, Slide } from "react-awesome-reveal";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./About.css";

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

  return (
    <div className="about-page">
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
                En MERIDIAN CONSULTING LTDA. contribuimos al fortalecimiento del
                sector energético y ambiental mediante servicios especializados en
                geología, ingeniería de petróleos, energías renovables y control
                técnico de operaciones. Trabajamos con excelencia, ética y
                disciplina técnica, generando valor a nuestros clientes mediante un
                equipo humano altamente capacitado y comprometido con la innovación,
                sostenibilidad y seguridad.
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
                Para el año 2030, MERIDIAN CONSULTING LTDA. será un referente
                nacional en consultoría especializada para el sector minero
                energético, destacándose por su excelencia operativa, innovación
                tecnológica y compromiso ético. Seremos reconocidos por cumplir con
                precisión los objetivos de nuestros clientes, generando alianzas
                estratégicas que impulsen el desarrollo sostenible.
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
            MERIDIAN CONSULTING LTDA fue fundada en 2003 por geólogos con amplia
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
            <h2 className="counter" data-target="23">0</h2>
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
        <h2 className="values-title">Nuestros Valores</h2>
        <div className="values-grid">
          <div className="value-card">
            <span className="value-icon">🤝</span>
            <h3>Compromiso</h3>
            <p>
              Nos dedicamos con entrega y constancia a alcanzar los objetivos de
              la empresa y nuestros clientes.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">⭐</span>
            <h3>Excelencia</h3>
            <p>
              Hacemos nuestro trabajo con calidad y buscamos siempre mejorar para
              superar las expectativas.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">🔎</span>
            <h3>Transparencia</h3>
            <p>
              Actuamos con claridad y honestidad, generando confianza en todo lo
              que hacemos.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">💡</span>
            <h3>Innovación</h3>
            <p>
              Buscamos nuevas ideas y tecnologías para mejorar nuestros servicios
              y procesos.
            </p>
          </div>
          <div className="value-card">
            <span className="value-icon">🌍</span>
            <h3>Responsabilidad</h3>
            <p>
              Cumplimos nuestros compromisos y cuidamos el impacto de nuestras
              decisiones.
            </p>
          </div>
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
                <p>Implementación del sistema de gestión de calidad y más de 200 contratos exitosos.</p>
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
                <img src={img} alt={`CEO ${index + 1}`} />
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
