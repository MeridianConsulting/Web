import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBlog.css";

const AdminBlog = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    titulo: "",
    autor: "",
    cargo: "",
    area: "",
    contenido: "",
    imagen: null,
    imagen_existente: null,
  });

  // Verificación robusta de autenticación
  useEffect(() => {
    const verifyAuth = () => {
      try {
        // Verificar múltiples condiciones
        const isLogged = localStorage.getItem("isLogged");
        const usuario = localStorage.getItem("usuario");
        const loginTime = localStorage.getItem("loginTime");

        // Verificar que todos los datos existan
        if (!isLogged || isLogged !== "true" || !usuario || !loginTime) {
          // Limpiar datos corruptos
          localStorage.removeItem("isLogged");
          localStorage.removeItem("usuario");
          localStorage.removeItem("loginTime");
          navigate("/login", { replace: true });
          return false;
        }

        // Verificar expiración de sesión (30 minutos)
        const sessionTimeout = 30 * 60 * 1000; // 30 minutos
        const currentTime = new Date().getTime();
        const loginTimestamp = parseInt(loginTime, 10);

        if (isNaN(loginTimestamp) || currentTime - loginTimestamp > sessionTimeout) {
          // Sesión expirada
          localStorage.removeItem("isLogged");
          localStorage.removeItem("usuario");
          localStorage.removeItem("loginTime");
          alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
          navigate("/login", { replace: true });
          return false;
        }

        // Verificar que el usuario no sea una cadena vacía
        if (usuario.trim() === "") {
          localStorage.removeItem("isLogged");
          localStorage.removeItem("usuario");
          localStorage.removeItem("loginTime");
          navigate("/login", { replace: true });
          return false;
        }

        setIsAuthenticated(true);
        setIsChecking(false);
        return true;
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        localStorage.clear();
        navigate("/login", { replace: true });
        return false;
      }
    };

    verifyAuth();

    // Verificar periódicamente cada minuto
    const authInterval = setInterval(() => {
      const isLogged = localStorage.getItem("isLogged");
      const loginTime = localStorage.getItem("loginTime");

      if (isLogged !== "true" || !loginTime) {
        clearInterval(authInterval);
        navigate("/login", { replace: true });
        return;
      }

      const sessionTimeout = 30 * 60 * 1000;
      const currentTime = new Date().getTime();
      const loginTimestamp = parseInt(loginTime, 10);

      if (isNaN(loginTimestamp) || currentTime - loginTimestamp > sessionTimeout) {
        clearInterval(authInterval);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("usuario");
        localStorage.removeItem("loginTime");
        alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
        navigate("/login", { replace: true });
      }
    }, 60000); // Verificar cada minuto

    // Verificar al cambiar el foco de la ventana
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        verifyAuth();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // Verificar antes de que la página se cierre
    const handleBeforeUnload = () => {
      // No hacer nada, solo mantener la sesión activa
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(authInterval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  // Cargar posts al montar el componente
  useEffect(() => {
    if (isAuthenticated) {
      loadPosts();
    }
  }, [isAuthenticated]);

  // Función para cargar posts desde el backend
  const loadPosts = async () => {
    try {
      const response = await fetch("http://localhost/Web/backend/index.php?route=blog&action=getAll");
      
      // Verificar que la respuesta sea JSON
      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        console.error("Respuesta no es JSON:", text.substring(0, 200));
        throw new Error("El servidor devolvió un formato no válido");
      }
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status === "success") {
        setPosts(data.data || []);
      } else {
        console.error("Error:", data.message);
        // Aún así, establecer posts vacío para evitar errores
        setPosts([]);
      }
    } catch (error) {
      console.error("Error cargando posts:", error);
      // Establecer posts vacío para evitar errores en el render
      setPosts([]);
    }
  };

  // Función para sanitizar entrada de texto (prevenir XSS básico)
  const sanitizeInput = (input) => {
    if (typeof input !== "string") return input;
    // Remover scripts y tags peligrosos
    return input
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "")
      .replace(/javascript:/gi, "")
      .replace(/on\w+\s*=/gi, "")
      .trim();
  };

  // Validar tamaño de archivo (máximo 5MB)
  const validateFile = (file) => {
    if (!file) return true;
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    
    if (file.size > maxSize) {
      alert("El archivo es demasiado grande. El tamaño máximo es 5MB.");
      return false;
    }
    
    if (!allowedTypes.includes(file.type)) {
      alert("Tipo de archivo no permitido. Solo se permiten imágenes (JPEG, PNG, GIF, WEBP).");
      return false;
    }
    
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      if (files && files[0] && validateFile(files[0])) {
        setFormData({ ...formData, imagen: files[0] });
      } else {
        e.target.value = ""; // Limpiar el input si el archivo no es válido
        setFormData({ ...formData, imagen: null });
      }
    } else {
      // Sanitizar entrada de texto
      const sanitizedValue = sanitizeInput(value);
      // Limitar longitud de campos según la estructura de la BD
      const maxLengths = {
        titulo: 50,
        autor: 35,
        cargo: 30,
        area: 30,
        contenido: 120,
      };
      
      if (maxLengths[name] && sanitizedValue.length > maxLengths[name]) {
        alert(`El campo ${name} excede el límite de ${maxLengths[name]} caracteres.`);
        return;
      }
      
      setFormData({ ...formData, [name]: sanitizedValue });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Validación adicional antes de enviar
    if (!formData.titulo.trim() || !formData.autor.trim() || !formData.contenido.trim()) {
      alert("Por favor, completa todos los campos obligatorios.");
      setLoading(false);
      return;
    }
    
    // Verificar que la sesión siga activa antes de cualquier acción
    const isLogged = localStorage.getItem("isLogged");
    const loginTime = localStorage.getItem("loginTime");
    
    if (isLogged !== "true" || !loginTime) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      handleLogout();
      setLoading(false);
      return;
    }
    
    // Verificar expiración de sesión
    const sessionTimeout = 30 * 60 * 1000;
    const currentTime = new Date().getTime();
    const loginTimestamp = parseInt(loginTime, 10);
    
    if (isNaN(loginTimestamp) || currentTime - loginTimestamp > sessionTimeout) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      handleLogout();
      setLoading(false);
      return;
    }
    
    try {
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      formDataToSend.append('titulo', formData.titulo);
      formDataToSend.append('autor', formData.autor);
      formDataToSend.append('cargo', formData.cargo);
      formDataToSend.append('area', formData.area);
      formDataToSend.append('contenido', formData.contenido);
      
      if (isEditing) {
        formDataToSend.append('id', editingId);
        if (formData.imagen_existente) {
          formDataToSend.append('imagen_existente', formData.imagen_existente);
        }
        
        if (formData.imagen) {
          formDataToSend.append('imagen', formData.imagen);
        }
        
        // Actualizar post
        const response = await fetch("http://localhost/Web/backend/index.php?route=blog&action=update", {
          method: "POST",
          body: formDataToSend,
        });
        
        const data = await response.json();
        
        if (data.status === "success") {
          alert("Publicación actualizada exitosamente");
          setIsEditing(false);
          setEditingId(null);
          loadPosts(); // Recargar posts
        } else {
          alert("Error: " + (data.message || "Error al actualizar la publicación"));
        }
      } else {
        // Crear nuevo post
        if (formData.imagen) {
          formDataToSend.append('imagen', formData.imagen);
        }
        
        const response = await fetch("http://localhost/Web/backend/index.php?route=blog&action=create", {
          method: "POST",
          body: formDataToSend,
        });
        
        // Verificar que la respuesta sea JSON
        const contentType = response.headers.get("content-type");
        let data;
        
        if (contentType && contentType.includes("application/json")) {
          try {
            data = await response.json();
          } catch (jsonError) {
            const text = await response.text();
            console.error("Error al parsear JSON:", jsonError);
            console.error("Respuesta del servidor:", text);
            alert("Error: El servidor devolvió una respuesta inválida. Ver consola para más detalles.");
            return;
          }
        } else {
          const text = await response.text();
          console.error("Respuesta no es JSON:", text);
          alert("Error: El servidor devolvió un formato no válido. Ver consola para más detalles.");
          return;
        }
        
        if (data.status === "success") {
          alert("Publicación creada exitosamente");
          loadPosts(); // Recargar posts
        } else {
          const errorMsg = data.message || "Error al crear la publicación";
          const errorDetails = data.sql_error ? `\n\nDetalles SQL: ${data.sql_error}` : '';
          const errorInfo = data.error_info ? `\n\nInformación adicional: ${JSON.stringify(data.error_info, null, 2)}` : '';
          alert(`Error: ${errorMsg}${errorDetails}${errorInfo}`);
        }
      }

      // Limpiar formulario
      setFormData({
        titulo: "",
        autor: "",
        cargo: "",
        area: "",
        contenido: "",
        imagen: null,
        imagen_existente: null,
      });
      
      // Limpiar input de archivo
      const fileInput = document.getElementById('imagen');
      if (fileInput) {
        fileInput.value = '';
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al procesar la solicitud. Por favor, intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (post) => {
    setFormData({
      titulo: post.titulo || "",
      autor: post.autor || "",
      cargo: post.cargo || "",
      area: post.area || "",
      contenido: post.contenido || "",
      imagen: null, // No cargar el archivo, solo mostrar la imagen existente
      imagen_existente: post.imagen_path || null,
    });
    setIsEditing(true);
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id) => {
    // Verificar autenticación antes de eliminar
    const isLogged = localStorage.getItem("isLogged");
    const loginTime = localStorage.getItem("loginTime");
    
    if (isLogged !== "true" || !loginTime) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      handleLogout();
      return;
    }
    
    // Verificar expiración de sesión
    const sessionTimeout = 30 * 60 * 1000;
    const currentTime = new Date().getTime();
    const loginTimestamp = parseInt(loginTime, 10);
    
    if (isNaN(loginTimestamp) || currentTime - loginTimestamp > sessionTimeout) {
      alert("Tu sesión ha expirado. Por favor, inicia sesión nuevamente.");
      handleLogout();
      return;
    }
    
    if (!window.confirm("¿Estás seguro de que deseas eliminar esta publicación?")) {
      return;
    }
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', id);
      
      const response = await fetch("http://localhost/Web/backend/index.php?route=blog&action=delete", {
        method: "POST",
        body: formDataToSend,
      });
      
      const data = await response.json();
      
      if (data.status === "success") {
        alert("Publicación eliminada exitosamente");
        loadPosts(); // Recargar posts
      } else {
        alert("Error: " + (data.message || "Error al eliminar la publicación"));
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error al eliminar la publicación. Por favor, intenta nuevamente.");
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
      imagen_existente: null,
    });
  };

  const handleLogout = () => {
    // Limpiar todos los datos de autenticación
    localStorage.removeItem("isLogged");
    localStorage.removeItem("usuario");
    localStorage.removeItem("loginTime");
    navigate("/login", { replace: true });
  };

  // Mostrar loading mientras verifica autenticación
  if (isChecking) {
    return (
      <div className="admin-blog-container">
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
          textAlign: "center"
        }}>
          <div style={{
            padding: "40px",
            background: "#ffffff",
            borderRadius: "16px",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
          }}>
            <div style={{
              fontSize: "1.2rem",
              color: "#004aad",
              fontWeight: "600",
              fontFamily: "var(--font-family-primary)"
            }}>
              Verificando autenticación...
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado, no mostrar nada (ya se redirigió)
  if (!isAuthenticated) {
    return null;
  }

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
                      📎 Nueva imagen: {formData.imagen.name || "Imagen seleccionada"}
                    </p>
                  )}
                  {isEditing && formData.imagen_existente && !formData.imagen && (
                    <p className="file-name" style={{ color: '#666', fontStyle: 'italic' }}>
                      📎 Imagen actual: {formData.imagen_existente.split('/').pop()}
                    </p>
                  )}
                  {isEditing && formData.imagen_existente && (
                    <p style={{ fontSize: '0.85rem', color: '#666', marginTop: '8px' }}>
                      Deja el campo vacío para mantener la imagen actual
                    </p>
                  )}
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-submit" disabled={loading}>
                  {loading ? "⏳ Procesando..." : isEditing ? "💾 Guardar Cambios" : "📢 Publicar Noticia"}
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
                      {post.contenido && post.contenido.length > 100
                        ? `${post.contenido.substring(0, 100).replace(/<[^>]*>/g, "")}...`
                        : post.contenido ? post.contenido.replace(/<[^>]*>/g, "") : ""}
                    </p>
                  </div>
                  {post.imagen_path && (
                    <div className="post-card-image">
                      <span>📎 {post.imagen_path.split('/').pop()}</span>
                      <img 
                        src={`http://localhost/Web/backend/${post.imagen_path}`} 
                        alt={post.titulo}
                        style={{
                          maxWidth: '100%',
                          maxHeight: '200px',
                          marginTop: '10px',
                          borderRadius: '8px',
                          objectFit: 'cover'
                        }}
                      />
                    </div>
                  )}
                  <div className="post-card-footer">
                    <span className="post-date">
                      📝 ID: {post.id}
                    </span>
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

