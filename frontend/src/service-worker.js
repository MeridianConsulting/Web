/* eslint-disable no-restricted-globals */

// Este placeholder es requerido por Workbox
// eslint-disable-next-line no-undef
const manifest = self.__WB_MANIFEST || [];

// Nombre del caché
const CACHE_NAME = 'meridian-consulting-v1';
const urlsToCache = [
  '/',
  '/static/css/main.css',
  '/static/js/main.js',
  '/manifest.json',
  '/favicon.ico',
  ...manifest.map(entry => entry.url)
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Caché abierto');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error('Error en instalación del SW:', error);
      })
  );
});

// Activar Service Worker y limpiar cachés antiguos
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            console.log('Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Estrategia de caché: Network First, fallback a Cache
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // ============================================
  // NO INTERCEPTAR RECURSOS EXTERNOS CRÍTICOS
  // ============================================
  // Permitir que estos recursos se carguen directamente sin interceptar
  const externalDomains = [
    'www.googletagmanager.com',
    'googletagmanager.com',
    'www.google-analytics.com',
    'google-analytics.com',
    'embed.tawk.to',
    'va.tawk.to',
    'tawk.to',
    'fonts.googleapis.com',
    'fonts.gstatic.com',
    'cdnjs.cloudflare.com',
    'unpkg.com'
  ];
  
  // Si es un dominio externo crítico, NO interceptar - dejar pasar directamente
  if (externalDomains.some(domain => url.hostname.includes(domain))) {
    return; // No interceptar, dejar que se cargue normalmente
  }
  
  // NO interceptar POST, PUT, DELETE, etc. (solo GET)
  if (event.request.method !== 'GET') {
    return;
  }
  
  // NO interceptar peticiones a APIs externas
  if (url.origin !== self.location.origin && !url.pathname.startsWith('/static/')) {
    return; // Dejar pasar peticiones externas
  }

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Si la respuesta es válida, clonarla y guardarla en caché
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseToCache = response.clone();

        caches.open(CACHE_NAME)
          .then((cache) => {
            cache.put(event.request, responseToCache);
          });

        return response;
      })
      .catch(() => {
        // Si falla la red, buscar en caché
        return caches.match(event.request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            // Página offline personalizada (opcional)
            if (event.request.mode === 'navigate') {
              return caches.match('/');
            }
          });
      })
  );
});

// Limpiar caché cuando hay mucho almacenamiento
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

