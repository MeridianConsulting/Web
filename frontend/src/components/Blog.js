import React from 'react';
import { Link } from 'react-router-dom';


const Blog = () => {
  return (
    <section className="blog-section">
      <div className="container">
        <h2 className="blog-title">Últimas publicaciones del Blog</h2>
        <div className="blog-grid">
          <article className="blog-card">
            <img src="https://via.placeholder.com/400x200" alt="Blog 1" />
            <div className="blog-content">
              <h3>¿Qué es la consultoría ambiental?</h3>
              <p>Descubre cómo las empresas pueden mejorar su sostenibilidad y cumplir la normativa.</p>
              <Link to="/blog/consultoria-ambiental" className="read-more">Leer más</Link>
            </div>
          </article>

          <article className="blog-card">
            <img src="https://via.placeholder.com/400x200" alt="Blog 2" />
            <div className="blog-content">
              <h3>Optimización de producción energética</h3>
              <p>Estrategias clave para mejorar la eficiencia y reducir costos.</p>
              <Link to="/blog/produccion-energetica" className="read-more">Leer más</Link>
            </div>
          </article>

          <article className="blog-card">
            <img src="https://via.placeholder.com/400x200" alt="Blog 3" />
            <div className="blog-content">
              <h3>Importancia del HSEQ en el sector industrial</h3>
              <p>Conoce cómo se gestiona la salud, seguridad y calidad en proyectos industriales.</p>
              <Link to="/blog/hseq-industrial" className="read-more">Leer más</Link>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Blog;
