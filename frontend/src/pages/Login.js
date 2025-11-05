import React, { useState, useEffect } from "react";
import "./Login.css";

const Login = ({ onLoginSuccess }) => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");

  // Tawk.to se carga desde index.html, no es necesario cargarlo aquí

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost/Web/backend/index.php?route=login", {
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
