import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API_URL, getImageUrl } from "../config/api";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPost();
  }, [id]);

  const loadPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `${API_URL}/index.php?route=blog&action=getById&id=${id}`
      );

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("El servidor devolvió un formato no válido");
      }

      const data = await response.json();

      if (data.status === "success") {
        setPost(data.data);
      } else {
        setError(data.message || "Noticia no encontrada");
      }
    } catch (error) {
      setError("Error al cargar la noticia. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateString;
    }
  };

  if (loading) {
    return (
      <section className="blog-detail-container">
        <div className="blog-detail-loading">
          <p>Cargando noticia...</p>
        </div>
      </section>
    );
  }

  if (error || !post) {
    return (
      <section className="blog-detail-container">
        <div className="blog-detail-error">
          <p>{error || "Noticia no encontrada"}</p>
          <button onClick={() => navigate("/blog")} className="back-button">
            Volver al blog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="blog-detail-container">
      <button onClick={() => navigate("/blog")} className="back-button">
        ← Volver al blog
      </button>

      <article className="blog-detail-article">
        {post.imagen_path && (
          <div className="blog-detail-image">
            <img
              src={getImageUrl(post.imagen_path)}
              alt={post.titulo}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
        )}

        <div className="blog-detail-header">
          {post.area && (
            <div className="blog-detail-category">{post.area}</div>
          )}
          <h1 className="blog-detail-title">{post.titulo}</h1>
          <div className="blog-detail-meta">
            <div className="blog-detail-author">
              <span className="author-name">{post.autor}</span>
              {post.cargo && (
                <span className="author-title">{post.cargo}</span>
              )}
            </div>
            {(post.fecha_creacion || post.fecha_actualizada) && (
              <div className="blog-detail-date">
                {formatDate(post.fecha_creacion || post.fecha_actualizada)}
              </div>
            )}
          </div>
        </div>

        <div className="blog-detail-content">
          <div className="blog-detail-text">
            {post.contenido.split("\n").map((paragraph, index) => {
              if (paragraph.trim() === "") return <br key={index} />;
              return (
                <p key={index}>{paragraph}</p>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
};

export default BlogDetail;

