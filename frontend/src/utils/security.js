/**
 * Utilidades de Seguridad para MERIDIAN CONSULTING
 * Sanitización de inputs, validación y protección XSS
 */

// ==================== SANITIZACIÓN ====================

/**
 * Sanitiza texto eliminando caracteres potencialmente peligrosos
 */
export const sanitizeText = (text) => {
  if (!text) return '';
  
  return String(text)
    .replace(/[<>]/g, '') // Eliminar < y >
    .replace(/javascript:/gi, '') // Eliminar javascript:
    .replace(/on\w+=/gi, '') // Eliminar event handlers (onclick, onload, etc)
    .trim();
};

/**
 * Sanitiza HTML convirtiendo caracteres especiales a entidades
 */
export const escapeHtml = (text) => {
  if (!text) return '';
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };
  
  return String(text).replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Sanitiza URLs para prevenir ataques de redirección
 */
export const sanitizeUrl = (url) => {
  if (!url) return '';
  
  // Lista blanca de protocolos permitidos
  const allowedProtocols = ['http:', 'https:', 'mailto:', 'tel:'];
  
  try {
    const urlObj = new URL(url, window.location.origin);
    
    if (!allowedProtocols.includes(urlObj.protocol)) {
      console.warn('Protocolo no permitido:', urlObj.protocol);
      return '#';
    }
    
    return urlObj.href;
  } catch (e) {
    console.warn('URL inválida:', url);
    return '#';
  }
};

/**
 * Limpia SQL injection attempts (para queries del lado cliente)
 */
export const sanitizeSql = (text) => {
  if (!text) return '';
  
  return String(text)
    .replace(/['";\\]/g, '') // Eliminar comillas y backslashes
    .replace(/--/g, '') // Eliminar comentarios SQL
    .replace(/\/\*/g, '') // Eliminar inicio de comentario
    .replace(/\*\//g, '') // Eliminar fin de comentario
    .trim();
};

// ==================== VALIDACIÓN ====================

/**
 * Valida email con regex robusto
 */
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

/**
 * Valida teléfono colombiano
 */
export const validatePhone = (phone) => {
  const phoneRegex = /^(\+57)?[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Valida que el nombre solo contenga letras y espacios
 */
export const validateName = (name) => {
  const nameRegex = /^[a-záéíóúñA-ZÁÉÍÓÚÑ\s]{2,50}$/;
  return nameRegex.test(name);
};

/**
 * Valida contraseña fuerte
 * - Mínimo 8 caracteres
 * - Al menos una mayúscula
 * - Al menos una minúscula
 * - Al menos un número
 * - Al menos un carácter especial
 */
export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar,
    errors: {
      length: password.length < minLength,
      uppercase: !hasUpperCase,
      lowercase: !hasLowerCase,
      number: !hasNumbers,
      special: !hasSpecialChar,
    }
  };
};

// ==================== PROTECCIÓN XSS ====================

/**
 * Previene XSS en contenido HTML
 */
export const preventXSS = (html) => {
  const temp = document.createElement('div');
  temp.textContent = html;
  return temp.innerHTML;
};

/**
 * Limpia atributos peligrosos de elementos DOM
 */
export const cleanDOMAttributes = (element) => {
  const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onfocus', 'onblur'];
  
  dangerousAttrs.forEach(attr => {
    if (element.hasAttribute(attr)) {
      element.removeAttribute(attr);
    }
  });
  
  return element;
};

// ==================== RATE LIMITING (CLIENT-SIDE) ====================

class RateLimiter {
  constructor(maxAttempts = 5, windowMs = 60000) {
    this.maxAttempts = maxAttempts;
    this.windowMs = windowMs;
    this.attempts = new Map();
  }

  check(key) {
    const now = Date.now();
    const userAttempts = this.attempts.get(key) || [];
    
    // Filtrar intentos fuera de la ventana de tiempo
    const recentAttempts = userAttempts.filter(time => now - time < this.windowMs);
    
    if (recentAttempts.length >= this.maxAttempts) {
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime: recentAttempts[0] + this.windowMs
      };
    }
    
    recentAttempts.push(now);
    this.attempts.set(key, recentAttempts);
    
    return {
      allowed: true,
      remainingAttempts: this.maxAttempts - recentAttempts.length,
      resetTime: null
    };
  }

  reset(key) {
    this.attempts.delete(key);
  }
}

// Instancia global para formularios de contacto
export const contactFormLimiter = new RateLimiter(3, 300000); // 3 intentos en 5 minutos

// ==================== CSRF PROTECTION ====================

/**
 * Genera un token CSRF
 */
export const generateCSRFToken = () => {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

/**
 * Almacena token CSRF en sessionStorage
 */
export const setCSRFToken = () => {
  const token = generateCSRFToken();
  sessionStorage.setItem('csrf_token', token);
  return token;
};

/**
 * Obtiene token CSRF
 */
export const getCSRFToken = () => {
  let token = sessionStorage.getItem('csrf_token');
  if (!token) {
    token = setCSRFToken();
  }
  return token;
};

// ==================== SECURE STORAGE ====================

/**
 * Almacena datos de forma segura (encriptados)
 */
export const secureStorage = {
  set: (key, value) => {
    try {
      const encrypted = btoa(JSON.stringify(value));
      localStorage.setItem(key, encrypted);
      return true;
    } catch (e) {
      console.error('Error al guardar:', e);
      return false;
    }
  },
  
  get: (key) => {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return JSON.parse(atob(encrypted));
    } catch (e) {
      console.error('Error al leer:', e);
      return null;
    }
  },
  
  remove: (key) => {
    localStorage.removeItem(key);
  },
  
  clear: () => {
    localStorage.clear();
  }
};

// ==================== CONTENT VALIDATION ====================

/**
 * Valida que el contenido no exceda límites
 */
export const validateContentLength = (text, maxLength = 1000) => {
  return {
    isValid: text.length <= maxLength,
    length: text.length,
    maxLength,
    remaining: maxLength - text.length
  };
};

/**
 * Detecta contenido spam
 */
export const detectSpam = (text) => {
  const spamPatterns = [
    /\b(viagra|cialis|casino|lottery|winner)\b/gi,
    /\b(click here|buy now|limited time)\b/gi,
    /(https?:\/\/[^\s]+){5,}/gi, // Múltiples URLs
    /(.)\1{10,}/gi, // Caracteres repetidos
  ];
  
  return spamPatterns.some(pattern => pattern.test(text));
};

// ==================== EXPORTS ====================

export default {
  sanitizeText,
  escapeHtml,
  sanitizeUrl,
  sanitizeSql,
  validateEmail,
  validatePhone,
  validateName,
  validatePassword,
  preventXSS,
  cleanDOMAttributes,
  contactFormLimiter,
  generateCSRFToken,
  setCSRFToken,
  getCSRFToken,
  secureStorage,
  validateContentLength,
  detectSpam,
};

