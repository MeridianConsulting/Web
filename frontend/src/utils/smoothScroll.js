/**
 * Utilidades de Smooth Scroll para MERIDIAN CONSULTING
 * Navegación suave entre secciones
 */

/**
 * Scroll suave a un elemento
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  
  if (!element) {
    console.warn(`Elemento con id "${elementId}" no encontrado`);
    return;
  }

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth'
  });
};

/**
 * Scroll suave al top de la página
 */
export const scrollToTop = (smooth = true) => {
  window.scrollTo({
    top: 0,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Scroll suave al bottom de la página
 */
export const scrollToBottom = (smooth = true) => {
  window.scrollTo({
    top: document.documentElement.scrollHeight,
    behavior: smooth ? 'smooth' : 'auto'
  });
};

/**
 * Detectar si el elemento está visible en viewport
 */
export const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

/**
 * Observador de intersección para animaciones al scroll
 */
export const createScrollObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
    ...options
  };

  return new IntersectionObserver(callback, defaultOptions);
};

/**
 * Scroll con hash en URL (#section)
 */
export const scrollToHash = (hash, offset = 80) => {
  if (!hash) return;
  
  const elementId = hash.replace('#', '');
  scrollToElement(elementId, offset);
};

/**
 * Manejar scroll automático al cargar página con hash
 */
export const handleInitialScroll = (offset = 80) => {
  // Esperar a que cargue la página
  window.addEventListener('load', () => {
    if (window.location.hash) {
      setTimeout(() => {
        scrollToHash(window.location.hash, offset);
      }, 100);
    }
  });
};

/**
 * Calcular posición de scroll actual
 */
export const getScrollPosition = () => {
  return {
    x: window.pageXOffset || document.documentElement.scrollLeft,
    y: window.pageYOffset || document.documentElement.scrollTop
  };
};

/**
 * Calcular porcentaje de scroll de la página
 */
export const getScrollPercentage = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  return (scrollTop / scrollHeight) * 100;
};

/**
 * Detectar dirección del scroll
 */
let lastScrollTop = 0;
export const getScrollDirection = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const direction = scrollTop > lastScrollTop ? 'down' : 'up';
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  return direction;
};

/**
 * Scroll reveal para elementos
 */
export const initScrollReveal = (selector = '.scroll-reveal', options = {}) => {
  const elements = document.querySelectorAll(selector);
  
  const observer = createScrollObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (options.once) {
          observer.unobserve(entry.target);
        }
      } else if (!options.once) {
        entry.target.classList.remove('revealed');
      }
    });
  }, options);

  elements.forEach(element => observer.observe(element));
  
  return observer;
};

/**
 * Parallax scroll effect
 */
export const parallaxScroll = (element, speed = 0.5) => {
  const scrolled = window.pageYOffset;
  const parallax = element;
  
  if (parallax) {
    const yPos = -(scrolled * speed);
    parallax.style.transform = `translate3d(0, ${yPos}px, 0)`;
  }
};

/**
 * Disable scroll (útil para modales)
 */
export const disableScroll = () => {
  document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${window.innerWidth - document.documentElement.clientWidth}px`;
};

/**
 * Enable scroll
 */
export const enableScroll = () => {
  document.body.style.overflow = '';
  document.body.style.paddingRight = '';
};

/**
 * Hook de React para scroll to top
 * Uso: useScrollToTop();
 */
export const useScrollToTop = () => {
  React.useEffect(() => {
    scrollToTop(false);
  }, []);
};

export default {
  scrollToElement,
  scrollToTop,
  scrollToBottom,
  isElementInViewport,
  createScrollObserver,
  scrollToHash,
  handleInitialScroll,
  getScrollPosition,
  getScrollPercentage,
  getScrollDirection,
  initScrollReveal,
  parallaxScroll,
  disableScroll,
  enableScroll,
};

