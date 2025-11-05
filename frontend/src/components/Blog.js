import React from "react";
import "./Blog.css";

const Blog = () => {
  return (
    <section className="blog-container">
      <h2 className="blog-title">Noticias y Blog</h2>
      <p className="blog-subtitle">Comparte y descubre las últimas novedades</p>

      {/* Noticias publicadas */}
      <div className="blog-posts">
        <p className="no-posts">Aún no hay noticias publicadas.</p>
      </div>
    </section>
  );
};

export default Blog;
