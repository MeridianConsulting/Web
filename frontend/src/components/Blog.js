import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost/Web/backend/index.php?route=blog&action=getAll");
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Respuesta no es JSON:", text.substring(0, 200));
        throw new Error("El servidor devolvió un formato no válido");
      }

      const data = await response.json();

      if (data.status === "success") {
        setPosts(data.data || []);
      } else {
        setError(data.message || "Error al cargar las noticias");
        setPosts([]);
      }
    } catch (error) {
      console.error("Error cargando posts:", error);
      setError("Error al cargar las noticias. Por favor, intenta nuevamente.");
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const truncateContent = (text, maxLength = 150) => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <section className="blog-container">
      <div className="blog-header">
        <h2 className="blog-title">Noticias y Blog</h2>
        <p className="blog-subtitle">Comparte y descubre las últimas novedades</p>
      </div>

      {loading ? (
        <div className="blog-loading">
          <p>Cargando noticias...</p>
        </div>
      ) : error ? (
        <div className="blog-error">
          <p>{error}</p>
        </div>
      ) : posts.length === 0 ? (
        <div className="blog-posts">
          <p className="no-posts">Aún no hay noticias publicadas.</p>
        </div>
      ) : (
        <div className="blog-posts-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-post-card">
              {post.imagen_path && (
                <div className="blog-post-image">
                  <img
                    src={`http://localhost/Web/backend/${post.imagen_path}`}
                    alt={post.titulo}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="blog-post-content">
                <h3 className="blog-post-title">{post.titulo}</h3>
                <div className="blog-post-meta">
                  <span className="blog-post-author">
                    <strong>{post.autor}</strong>
                    {post.cargo && ` - ${post.cargo}`}
                  </span>
                  {post.area && (
                    <span className="blog-post-area">{post.area}</span>
                  )}
                </div>
                <p className="blog-post-text">{truncateContent(post.contenido)}</p>
                <div className="blog-post-footer">
                  <span className="blog-post-id">#{post.id}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default Blog;
