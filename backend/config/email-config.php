<?php
/**
 * Configuración de Email
 * MERIDIAN CONSULTING LTDA
 */

// Configuración del remitente
define('EMAIL_FROM', 'info@meridianltda.com'); // Email que aparecerá como remitente
define('EMAIL_FROM_NAME', 'MERIDIAN CONSULTING LTDA');

// Emails de destino
define('EMAIL_ADMIN', 'desarrolloit@meridian.com.co'); // 👈 CAMBIAR: Email donde recibirás los mensajes
define('EMAIL_ADMIN_CC', ''); // Email en copia (opcional)

// Configuración SMTP (si usas servidor SMTP externo)
// Si estás en localhost, puedes usar mail() directamente
define('USE_SMTP', false); // Cambiar a true si usas SMTP

// Configuración SMTP (solo si USE_SMTP = true)
define('SMTP_HOST', 'smtp.gmail.com'); // o tu servidor SMTP
define('SMTP_PORT', 587); // 587 para TLS, 465 para SSL
define('SMTP_SECURE', 'tls'); // 'tls' o 'ssl'
define('SMTP_USERNAME', 'tu-email@gmail.com');
define('SMTP_PASSWORD', 'tu-contraseña-de-aplicacion');
define('SMTP_AUTH', true);

// Configuración general
define('EMAIL_CHARSET', 'UTF-8');
define('EMAIL_TIMEOUT', 30); // segundos

// Plantillas de email
define('EMAIL_TEMPLATE_PATH', __DIR__ . '/../templates/email/');

// Logs
define('EMAIL_LOG_PATH', __DIR__ . '/../logs/');

// Crear directorios si no existen
if (!file_exists(EMAIL_LOG_PATH)) {
    mkdir(EMAIL_LOG_PATH, 0755, true);
}

if (!file_exists(EMAIL_TEMPLATE_PATH)) {
    mkdir(EMAIL_TEMPLATE_PATH, 0755, true);
}

