/**
 * Información de la empresa - MERIDIAN CONSULTING LTDA
 * Valores centralizados para uso en toda la aplicación
 */

// Año de fundación
export const FOUNDATION_YEAR = 2002;

/**
 * Calcula los años de experiencia desde el año de fundación
 * @returns {number} Años de experiencia
 */
export const getYearsOfExperience = () => {
  const currentYear = new Date().getFullYear();
  return currentYear - FOUNDATION_YEAR;
};

/**
 * Obtiene el texto formateado de años de experiencia
 * @param {boolean} includePlus - Si incluye el símbolo "+" (ej: "23+" o "23")
 * @returns {string} Texto formateado
 */
export const getYearsOfExperienceText = (includePlus = true) => {
  const years = getYearsOfExperience();
  return includePlus ? `${years}+` : `${years}`;
};

/**
 * Obtiene el texto completo "X años de experiencia"
 * @param {boolean} includePlus - Si incluye el símbolo "+"
 * @returns {string} Texto completo
 */
export const getYearsOfExperienceFullText = (includePlus = true) => {
  const years = getYearsOfExperience();
  const yearsText = includePlus ? `${years}+` : `${years}`;
  return `${yearsText} años de experiencia`;
};

/**
 * Obtiene el texto "Más de X años de experiencia"
 * @returns {string} Texto completo
 */
export const getMoreThanYearsText = () => {
  const years = getYearsOfExperience();
  return `Más de ${years} años de experiencia`;
};

export default {
  FOUNDATION_YEAR,
  getYearsOfExperience,
  getYearsOfExperienceText,
  getYearsOfExperienceFullText,
  getMoreThanYearsText,
};

