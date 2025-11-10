<?php
/**
 * Configuración de Email
 * MERIDIAN CONSULTING LTDA
 */

// Configuración del remitente
define('EMAIL_FROM', 'info@meridianltda.com'); // Email que aparecerá como remitente
define('EMAIL_FROM_NAME', 'MERIDIAN CONSULTING LTDA');

// Emails de destino
define('EMAIL_ADMIN', 'desarrolloit@meridian.com.co'); // Email donde RECIBIRÁS las notificaciones
define('EMAIL_ADMIN_CC', ''); // Email en copia (opcional)

// Configuración SMTP (PRODUCCIÓN - GoDaddy)
define('USE_SMTP', true); // ✅ Activado para producción

// Configuración SMTP de GoDaddy (Credenciales de auxiliarit)
define('SMTP_HOST', 'smtpout.secureserver.net'); // Servidor SMTP de GoDaddy
define('SMTP_PORT', 465); // Puerto SSL
define('SMTP_SECURE', 'ssl'); // SSL
define('SMTP_USERNAME', 'auxiliarit@meridian.com.co'); // Cuenta que ENVÍA los correos
define('SMTP_PASSWORD', 'Med.db.2025$'); // Contraseña de auxiliarit
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

