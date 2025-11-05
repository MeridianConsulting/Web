import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Blog.css";

const Blog = () => {
  const navigate = useNavigate();
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
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        return "Hoy";
      } else if (diffDays === 2) {
        return "Ayer";
      } else if (diffDays <= 7) {
        return `Hace ${diffDays - 1} días`;
      } else {
        return date.toLocaleDateString("es-ES", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      }
    } catch (e) {
      return dateString;
    }
  };

  // Obtener posts que ya fueron likeados desde localStorage
  const getLikedPosts = () => {
    try {
      const liked = localStorage.getItem('blog_liked_posts');
      return liked ? JSON.parse(liked) : [];
    } catch (error) {
      console.error("Error al leer likes de localStorage:", error);
      return [];
    }
  };

  // Guardar un post como likeado en localStorage
  const saveLikedPost = (id) => {
    try {
      const liked = getLikedPosts();
      if (!liked.includes(id)) {
        liked.push(id);
        localStorage.setItem('blog_liked_posts', JSON.stringify(liked));
      }
    } catch (error) {
      console.error("Error al guardar like en localStorage:", error);
    }
  };

  // Verificar si un post ya fue likeado
  const isPostLiked = (id) => {
    return getLikedPosts().includes(id);
  };

  const handleLike = async (id) => {
    // Verificar si ya se le dio like desde esta computadora
    if (isPostLiked(id)) {
      alert("Ya has dado like a esta publicación");
      return;
    }

    // Actualizar UI inmediatamente (optimistic update)
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === id ? { ...p, likes: (p.likes || 0) + 1 } : p
      )
    );
    
    // Guardar en localStorage inmediatamente
    saveLikedPost(id);
    
    // Guardar en backend
    try {
      const response = await fetch(
        `http://localhost/Web/backend/index.php?route=blog&action=like&id=${id}`,
        { method: "POST" }
      );
      
      if (!response.ok) {
        throw new Error("Error al guardar el like");
      }
      
      const data = await response.json();
      
      if (data.status === "success") {
        // Actualizar con el valor real del servidor
        setPosts((prevPosts) =>
          prevPosts.map((p) =>
            p.id === id ? { ...p, likes: data.likes } : p
          )
        );
      }
    } catch (error) {
      console.error("Error al guardar like:", error);
      // Revertir el cambio si falla (tanto en UI como en localStorage)
      setPosts((prevPosts) =>
        prevPosts.map((p) =>
          p.id === id ? { ...p, likes: Math.max(0, (p.likes || 0) - 1) } : p
        )
      );
      // Remover del localStorage si falló
      try {
        const liked = getLikedPosts();
        const updated = liked.filter(postId => postId !== id);
        localStorage.setItem('blog_liked_posts', JSON.stringify(updated));
      } catch (e) {
        console.error("Error al revertir like en localStorage:", e);
      }
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
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.id} className="blog-post-card">
              {post.imagen_path && (
                <div className="blog-post-image-container">
                  <img
                    src={`http://localhost/Web/backend/${post.imagen_path}`}
                    alt={post.titulo}
                    className="blog-post-image"
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />
                </div>
              )}
              <div className="blog-post-body">
                {post.area && (
                  <div className="blog-post-category">{post.area}</div>
                )}
                <h2 className="blog-post-headline">{post.titulo}</h2>
                <p className="blog-post-excerpt">{truncateContent(post.contenido, 200)}</p>
                
                <a
                  href={`/blog/${post.id}`}
                  className="blog-post-readmore"
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/blog/${post.id}`);
                  }}
                >
                  Ver más →
                </a>

                <div className="blog-post-actions">
                  <button
                    className={`like-button ${isPostLiked(post.id) ? 'liked' : ''}`}
                    onClick={() => handleLike(post.id)}
                    disabled={isPostLiked(post.id)}
                    aria-label={isPostLiked(post.id) ? "Ya has dado like" : "Me gusta"}
                  >
                    👍 {post.likes || 0}
                  </button>
                </div>

                <div className="blog-post-byline">
                  <div className="blog-post-author-info">
                    <span className="blog-post-author-name">{post.autor}</span>
                    {post.cargo && (
                      <span className="blog-post-author-title">{post.cargo}</span>
                    )}
                  </div>
                  <div className="blog-post-date">
                    {formatDate(post.fecha_creacion || post.fecha_actualizada)}
                  </div>
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
