import React, { useState } from "react";
import { API_URL } from "../config/api";
import { useNavigate } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const [usuario, setUsuario] = useState("");
  const [clave, setClave] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/index.php?route=login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, clave }),
      });

      // Si la respuesta no es OK, intentar leer el error
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error en el servidor (${response.status}): ${errorText.substring(0, 100)}`);
      }

      let data;
      try {
        const text = await response.text();
        if (!text) {
          throw new Error("Respuesta vacía del servidor");
        }
        data = JSON.parse(text);
      } catch (parseError) {
        throw new Error("Error en la respuesta del servidor. Formato inválido.");
      }

      if (data.status === "success") {
        // Guardar datos de autenticación con timestamp
        const loginTime = new Date().getTime().toString();
        localStorage.setItem("isLogged", "true");
        localStorage.setItem("usuario", usuario);
        localStorage.setItem("loginTime", loginTime);
        // Redirigir al panel de administración del blog después del login exitoso
        navigate("/admin/blog");
      } else {
        setError(data.message || "Usuario o contraseña incorrectos");
      }
    } catch (err) {
      setError(err.message || "Error al conectar con el servidor. Por favor, verifica tu conexión.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div>
        <h2>Ingreso Administrador</h2>
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
          <button type="submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
        </form>
        {error && <p className="error-text">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
