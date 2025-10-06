import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  // ✅ Cargar Tawk.to solo en producción
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      const s1 = document.createElement("script");
      s1.src = "https://embed.tawk.to/68b89398d642b5192517b96b/1j48g12lv";
      s1.async = true;
      s1.charset = "UTF-8";
      s1.setAttribute("crossorigin", "anonymous");
      document.body.appendChild(s1);
    }
  }, []); // ← este useEffect está fuera de cualquier función, correcto

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/backend/index.php?route=login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave }),
      });

      const data = await response.json();

      if (data.status === "success") {
        localStorage.setItem("isLogged", "true");
        onLoginSuccess(true);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Error al conectar con el servidor 😕");
    }
  };

  return (
    <div className="login-container">
      <h2>🔐 Ingreso administrador</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={(e) => setUsuario(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={clave}
          onChange={(e) => setClave(e.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {error && <p className="error-text">{error}</p>}
    </div>
  );
};

export default Login;
