// Configuración de API según el entorno
// Cambia 'ENVIRONMENT' a 'production' cuando subas a producción

const ENVIRONMENT = 'production'; // 'development' o 'production'

const config = {
  development: {
    API_URL: 'http://localhost/Web/backend',
    BASE_URL: 'http://localhost:3000',
  },
  production: {
    API_URL: 'https://meridianltda.com/backend',
    BASE_URL: 'https://meridianltda.com',
  },
};

const currentConfig = config[ENVIRONMENT];

export const API_URL = currentConfig.API_URL;
export const BASE_URL = currentConfig.BASE_URL;

// URL completa para recursos estáticos (imágenes)
export const getImageUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  // Si la ruta ya incluye 'uploads/', simplemente concatenar
  if (path.startsWith('uploads/')) {
    return `${API_URL.replace('/index.php', '')}/${path}`;
  }
  // Si la ruta es relativa, asumir que está en backend/uploads/
  return `${API_URL.replace('/index.php', '')}/${path}`;
};

export default currentConfig;

