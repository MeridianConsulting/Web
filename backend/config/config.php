<?php
/**
 * Configuración del entorno
 * Cambia 'ENVIRONMENT' a 'production' cuando subas a cPanel
 */

// Entorno: 'development' o 'production'
// IMPORTANTE: Cambia a 'production' cuando subas a cPanel
define('ENVIRONMENT', 'production'); // Cambia a 'production' para cPanel

// URLs base según el entorno
if (ENVIRONMENT === 'production') {
    // Configuración para producción (cPanel)
    define('BASE_URL', 'https://meridianltda.com');
    define('API_URL', 'https://meridianltda.com/backend');
} else {
    // Configuración para desarrollo local
    define('BASE_URL', 'http://localhost:3000');
    define('API_URL', 'http://localhost/Web/backend');
}

// Configuración de base de datos
if (ENVIRONMENT === 'production') {
    // Credenciales para cPanel
    define('DB_HOST', 'localhost');
    define('DB_USER', 'meridian');
    define('DB_PASS', '1*mxs7&QeBhq');
    define('DB_NAME', 'meridian'); // Ajusta si el nombre de la BD es diferente
} else {
    // Credenciales para desarrollo local
    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASS', '');
    define('DB_NAME', 'meridian');
}

?>

