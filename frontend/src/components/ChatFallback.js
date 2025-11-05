import React, { useState, useEffect } from "react";
import WhatsAppButton from "./WhatsAppButton";

const ChatFallback = () => {
  const [tawkBlocked, setTawkBlocked] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    // Función para activar el fallback
    const activateFallback = () => {
      setTawkBlocked(true);
      setShowFallback(true);
    };

    // Listener simple para eventos personalizados de Tawk.to
    const handleTawkBlocked = () => {
      activateFallback();
    };
    
    window.addEventListener('tawk-blocked', handleTawkBlocked);

    // Verificación simple y única después de 5 segundos
    const checkTawk = setTimeout(() => {
      if (typeof window.Tawk_API === 'undefined' || 
          !window.Tawk_API.isWidgetLoaded) {
        activateFallback();
      }
    }, 5000);

    // Limpiar listeners y timeout
    return () => {
      clearTimeout(checkTawk);
      window.removeEventListener('tawk-blocked', handleTawkBlocked);
    };
  }, []);

  // Si Tawk.to está bloqueado, mostrar el botón de WhatsApp
  if (tawkBlocked && showFallback) {
    return (
      <div className="chat-fallback">
        <WhatsAppButton />
      </div>
    );
  }

  return null;
};

export default ChatFallback;
