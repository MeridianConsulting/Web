import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlog.css";

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    cargo: "",
    area: "",
    contenido: "",
    imagen: null,
  });

  // Verificar autenticación
  useEffect(() => {
    const isLogged = localStorage.getItem("isLogged");
    if (!isLogged || isLogged !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData({ ...formData, imagen: files[0] || null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isEditing) {
      // Actualizar post existente
      setPosts(
        posts.map((post) =>
          post.id === editingId
            ? {
                ...post,
                ...formData,
                fechaActualizada: new Date().toLocaleDateString("es-CO"),
              }
            : post
        )
      );
      setIsEditing(false);
      setEditingId(null);
    } else {
      // Crear nuevo post
      const newPost = {
        id: Date.now(),
        ...formData,
        fechaCreacion: new Date().toLocaleDateString("es-CO"),
        fechaActualizada: new Date().toLocaleDateString("es-CO"),
      };
      setPosts([...posts, newPost]);
    }

    // Limpiar formulario
    setFormData({
      titulo: "",
      autor: "",
      cargo: "",
      area: "",
      contenido: "",
      imagen: null,
    });
  };

  const handleEdit = (post) => {
    setFormData({
      titulo: post.titulo || "",
      autor: post.autor || "",
      cargo: post.cargo || "",
      area: post.area || "",
      contenido: post.contenido || "",
      imagen: post.imagen || null,
    });
    setIsEditing(true);
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingId(null);
    setFormData({
      titulo: "",
      autor: "",
      cargo: "",
      area: "",
      contenido: "",
      imagen: null,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isLogged");
    localStorage.removeItem("usuario");
    navigate("/login");
  };

  const usuario = localStorage.getItem("usuario") || "Administrador";

  return (
    <div className="admin-blog-container">
      <div className="admin-blog-header">
        <div className="admin-header-content">
          <h1>Panel de Administración - Blog</h1>
          <div className="admin-user-info">
            <span className="admin-user">👤 {usuario}</span>
            <button onClick={handleLogout} className="btn-logout">
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="admin-blog-content">
        {/* Formulario CRUD */}
        <div className="admin-form-section">
          <div className="admin-form-card">
            <h2>{isEditing ? "✏️ Editar Publicación" : "➕ Nueva Publicación"}</h2>
            <form onSubmit={handleSubmit} className="admin-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="titulo">Título de la noticia *</label>
                  <input
                    type="text"
                    id="titulo"
                    name="titulo"
                    value={formData.titulo}
                    onChange={handleInputChange}
                    placeholder="Ej: Nuevo proyecto de energía renovable"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="autor">Tu nombre *</label>
                  <input
                    type="text"
                    id="autor"
                    name="autor"
                    value={formData.autor}
                    onChange={handleInputChange}
                    placeholder="Ej: Juan Pérez"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="cargo">Cargo *</label>
                  <input
                    type="text"
                    id="cargo"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleInputChange}
                    placeholder="Ej: Gerente, Analista..."
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="area">Área o departamento *</label>
                  <input
                    type="text"
                    id="area"
                    name="area"
                    value={formData.area}
                    onChange={handleInputChange}
                    placeholder="Ej: Ingeniería, HSEQ..."
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="contenido">Escribe tu noticia *</label>
                  <textarea
                    id="contenido"
                    name="contenido"
                    value={formData.contenido}
                    onChange={handleInputChange}
                    placeholder="Escribe el contenido de la noticia aquí..."
                    rows="8"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group full-width">
                  <label htmlFor="imagen">Imagen (opcional)</label>
                  <input
                    type="file"
                    id="imagen"
                    name="imagen"
                    accept="image/*"
                    onChange={handleInputChange}
                  />
                  {formData.imagen && (
                    <p className="file-name">
                      📎 {formData.imagen.name || "Imagen seleccionada"}
                    </p>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit">
                  {isEditing ? "💾 Guardar Cambios" : "📢 Publicar Noticia"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="btn-cancel"
                  >
                    ❌ Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Lista de publicaciones */}
        <div className="admin-posts-section">
          <div className="admin-posts-header">
            <h2>📰 Publicaciones ({posts.length})</h2>
          </div>

          {posts.length === 0 ? (
            <div className="no-posts-admin">
              <p>📭 No hay publicaciones aún</p>
              <p className="no-posts-hint">
                Crea tu primera publicación usando el formulario de arriba
              </p>
            </div>
          ) : (
            <div className="admin-posts-grid">
              {posts.map((post) => (
                <div key={post.id} className="admin-post-card">
                  <div className="post-card-header">
                    <h3>{post.titulo}</h3>
                    <div className="post-card-actions">
                      <button
                        onClick={() => handleEdit(post)}
                        className="btn-edit"
                        title="Editar"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="btn-delete"
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                  <div className="post-card-meta">
                    <span className="post-author">
                      <strong>Autor:</strong> {post.autor}
                    </span>
                    <span className="post-cargo">
                      <strong>Cargo:</strong> {post.cargo}
                    </span>
                    <span className="post-area">
                      <strong>Área:</strong> {post.area}
                    </span>
                  </div>
                  <div className="post-card-content">
                    <p>
                      {post.contenido.length > 150
                        ? `${post.contenido.substring(0, 150)}...`
                        : post.contenido}
                    </p>
                  </div>
                  {post.imagen && (
                    <div className="post-card-image">
                      <span>📎 {post.imagen.name || "Imagen adjunta"}</span>
                    </div>
                  )}
                  <div className="post-card-footer">
                    <span className="post-date">
                      📅 Creado: {post.fechaCreacion}
                    </span>
                    {post.fechaActualizada && post.fechaActualizada !== post.fechaCreacion && (
                      <span className="post-updated">
                        ✏️ Actualizado: {post.fechaActualizada}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminBlog;

