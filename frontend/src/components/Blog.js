import React, { useState, useEffect } from "react";
import "./Blog.css";

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    author: "",
    role: "",
    department: "",
    content: "",
    image: ""
  });
  const [editingPostId, setEditingPostId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    author: "",
    role: "",
    department: "",
    content: "",
    image: ""
  });

  // Cargar posts desde localStorage
  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
    setPosts(storedPosts);
  }, []);

  // Guardar posts en localStorage
  useEffect(() => {
    localStorage.setItem("blogPosts", JSON.stringify(posts));
  }, [posts]);

  // Manejo de inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  // Manejo de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewPost({ ...newPost, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.title || !newPost.author || !newPost.role || !newPost.department || !newPost.content) return;

    const post = {
      ...newPost,
      id: Date.now(),
      date: new Date().toLocaleDateString()
    };

    setPosts([post, ...posts]);
    setNewPost({ title: "", author: "", role: "", department: "", content: "", image: "" });
  };

  // Eliminar noticia
  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
  };

  // Editar noticia
  const handleEdit = (post) => {
    setEditingPostId(post.id);
    setEditData({
      title: post.title,
      author: post.author,
      role: post.role,
      department: post.department,
      content: post.content,
      image: post.image
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleEditImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({ ...editData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedPosts = posts.map((post) =>
      post.id === editingPostId ? { ...post, ...editData } : post
    );
    setPosts(updatedPosts);
    setEditingPostId(null);
  };

  return (
    <section className="blog-container">
      <h2 className="blog-title">📰 Noticias y Blog</h2>
      <p className="blog-subtitle">Comparte y descubre las últimas novedades</p>

      {/* Formulario para nuevas noticias */}
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Título de la noticia"
          required
        />
        <input
          type="text"
          name="author"
          value={newPost.author}
          onChange={handleChange}
          placeholder="Tu nombre"
          required
        />
        <input
          type="text"
          name="role"
          value={newPost.role}
          onChange={handleChange}
          placeholder="Cargo (Ej: Gerente, Analista...)"
          required
        />
        <input
          type="text"
          name="department"
          value={newPost.department}
          onChange={handleChange}
          placeholder="Área o departamento"
          required
        />
        <textarea
          name="content"
          value={newPost.content}
          onChange={handleChange}
          placeholder="Escribe tu noticia..."
          rows="4"
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button type="submit">📢 Publicar noticia</button>
      </form>

      {/* Noticias publicadas */}
      <div className="blog-posts">
        {posts.length === 0 ? (
          <p className="no-posts">Aún no hay noticias publicadas.</p>
        ) : (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              {editingPostId === post.id ? (
                <form className="edit-form" onSubmit={handleEditSubmit}>
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="author"
                    value={editData.author}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="role"
                    value={editData.role}
                    onChange={handleEditChange}
                    required
                  />
                  <input
                    type="text"
                    name="department"
                    value={editData.department}
                    onChange={handleEditChange}
                    required
                  />
                  <textarea
                    name="content"
                    value={editData.content}
                    onChange={handleEditChange}
                    rows="4"
                    required
                  />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                  />
                  <button type="submit">💾 Guardar</button>
                  <button type="button" onClick={() => setEditingPostId(null)}>
                    ❌ Cancelar
                  </button>
                </form>
              ) : (
                <>
                  {post.image && <img src={post.image} alt={post.title} className="post-image" />}
                  <h3>{post.title}</h3>
                  <p className="post-meta">
                    ✍️ {post.author} — {post.role} en {post.department} • {post.date}
                  </p>
                  <p>{post.content}</p>
                  <div className="post-actions">
                    <button onClick={() => handleEdit(post)}>✏️ Editar</button>
                    <button onClick={() => handleDelete(post.id)}>🗑️ Eliminar</button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Blog;
