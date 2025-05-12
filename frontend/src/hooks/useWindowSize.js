import { useState, useEffect } from 'react';

const useWindowSize = () => {
  // Estado inicial
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    // Función para actualizar el estado
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    
    // Configurar listener
    window.addEventListener('resize', handleResize);
    
    // Llamar una vez para inicializar
    handleResize();
    
    // Limpiar en el desmontaje
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Array vacío significa que solo se ejecuta una vez al montar y desmontar

  return windowSize;
};

export default useWindowSize; 