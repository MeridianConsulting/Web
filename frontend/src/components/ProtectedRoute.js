import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Verificar localStorage
        const isLogged = localStorage.getItem("isLogged");
        const usuario = localStorage.getItem("usuario");
        const loginTime = localStorage.getItem("loginTime");

        // Verificar que todos los datos necesarios existan
        if (!isLogged || isLogged !== "true" || !usuario || !loginTime) {
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verificar expiración de sesión (30 minutos)
        const sessionTimeout = 30 * 60 * 1000; // 30 minutos en milisegundos
        const currentTime = new Date().getTime();
        const loginTimestamp = parseInt(loginTime, 10);

        if (currentTime - loginTimestamp > sessionTimeout) {
          // Sesión expirada
          localStorage.removeItem("isLogged");
          localStorage.removeItem("usuario");
          localStorage.removeItem("loginTime");
          setIsAuthenticated(false);
          setIsLoading(false);
          return;
        }

        // Verificar con el servidor (opcional pero recomendado)
        // Por ahora validamos solo en el cliente, pero podríamos agregar verificación del servidor
        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        console.error("Error verificando autenticación:", error);
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkAuth();

    // Verificar periódicamente si la sesión sigue activa
    const interval = setInterval(() => {
      const isLogged = localStorage.getItem("isLogged");
      const loginTime = localStorage.getItem("loginTime");
      
      if (isLogged !== "true" || !loginTime) {
        clearInterval(interval);
        navigate("/login");
        return;
      }

      const sessionTimeout = 30 * 60 * 1000;
      const currentTime = new Date().getTime();
      const loginTimestamp = parseInt(loginTime, 10);

      if (currentTime - loginTimestamp > sessionTimeout) {
        clearInterval(interval);
        localStorage.removeItem("isLogged");
        localStorage.removeItem("usuario");
        localStorage.removeItem("loginTime");
        navigate("/login");
      }
    }, 60000); // Verificar cada minuto

    return () => clearInterval(interval);
  }, [navigate]);

  // Mostrar loading mientras verifica
  if (isLoading) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)",
        fontFamily: "var(--font-family-primary)"
      }}>
        <div style={{
          textAlign: "center",
          padding: "40px",
          background: "#ffffff",
          borderRadius: "16px",
          boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)"
        }}>
          <div style={{
            fontSize: "1.2rem",
            color: "#004aad",
            fontWeight: "600"
          }}>
            Verificando autenticación...
          </div>
        </div>
      </div>
    );
  }

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Si está autenticado, renderizar el componente protegido
  return children;
};

export default ProtectedRoute;

