<?php
/**
 * EmailController - Controlador para envío de correos
 * MERIDIAN CONSULTING LTDA
 * 
 * Sistema de envío de correos usando PHPMailer
 * Sin dependencia de APIs externas
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Manejar preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Solo permitir POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'success' => false,
        'message' => 'Método no permitido. Solo se acepta POST.'
    ]);
    exit();
}

require_once __DIR__ . '/../config/email-config.php';
require_once __DIR__ . '/../utils/email-sender.php';

/**
 * Sanitizar entrada de datos
 */
function sanitizeInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
    return $data;
}

/**
 * Validar email
 */
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

/**
 * Validar teléfono colombiano
 */
function isValidPhone($phone) {
    // Formato: 3001234567 o +573001234567
    return preg_match('/^(\+57)?[3][0-9]{9}$/', $phone);
}

/**
 * Detectar spam (honeypot)
 */
function isSpam($data) {
    // Campo honeypot (debe estar vacío)
    if (isset($data['website']) && !empty($data['website'])) {
        return true;
    }
    
    // Verificar tiempo de envío (muy rápido = bot)
    if (isset($data['start_time'])) {
        $elapsedTime = time() - intval($data['start_time']);
        if ($elapsedTime < 3) { // Menos de 3 segundos
            return true;
        }
    }
    
    return false;
}

/**
 * Rate limiting simple
 */
function checkRateLimit($identifier) {
    $rateLimitFile = __DIR__ . '/../logs/rate-limit.json';
    $maxAttempts = 5;
    $timeWindow = 3600; // 1 hora
    
    // Crear archivo si no existe
    if (!file_exists($rateLimitFile)) {
        file_put_contents($rateLimitFile, json_encode([]));
    }
    
    $rateLimits = json_decode(file_get_contents($rateLimitFile), true);
    $now = time();
    
    // Limpiar entradas antiguas
    foreach ($rateLimits as $key => $data) {
        if ($now - $data['last_attempt'] > $timeWindow) {
            unset($rateLimits[$key]);
        }
    }
    
    // Verificar límite
    if (isset($rateLimits[$identifier])) {
        if ($rateLimits[$identifier]['attempts'] >= $maxAttempts) {
            $timeLeft = $timeWindow - ($now - $rateLimits[$identifier]['last_attempt']);
            return [
                'allowed' => false,
                'message' => "Demasiados intentos. Intenta de nuevo en " . ceil($timeLeft / 60) . " minutos.",
                'retry_after' => $timeLeft
            ];
        }
        $rateLimits[$identifier]['attempts']++;
        $rateLimits[$identifier]['last_attempt'] = $now;
    } else {
        $rateLimits[$identifier] = [
            'attempts' => 1,
            'last_attempt' => $now
        ];
    }
    
    file_put_contents($rateLimitFile, json_encode($rateLimits));
    
    return ['allowed' => true];
}

/**
 * Registrar log
 */
function logEmail($data, $success, $error = null) {
    $logFile = __DIR__ . '/../logs/email-log.txt';
    $logEntry = sprintf(
        "[%s] %s - %s (%s) - Status: %s %s\n",
        date('Y-m-d H:i:s'),
        $data['name'] ?? 'Unknown',
        $data['email'] ?? 'Unknown',
        $_SERVER['REMOTE_ADDR'] ?? 'Unknown IP',
        $success ? 'SUCCESS' : 'FAILED',
        $error ? "- Error: $error" : ''
    );
    
    file_put_contents($logFile, $logEntry, FILE_APPEND);
}

// ============================================
// PROCESAR SOLICITUD
// ============================================

try {
    // Leer datos JSON
    $jsonData = file_get_contents('php://input');
    $data = json_decode($jsonData, true);
    
    if (!$data) {
        throw new Exception('Datos inválidos. Verifica el formato JSON.');
    }
    
    // Sanitizar datos
    $name = sanitizeInput($data['name'] ?? '');
    $email = sanitizeInput($data['email'] ?? '');
    $phone = sanitizeInput($data['phone'] ?? '');
    $company = sanitizeInput($data['company'] ?? 'No especificada');
    $service = sanitizeInput($data['service'] ?? 'Consulta general');
    $message = sanitizeInput($data['message'] ?? '');
    
    // Validaciones
    $errors = [];
    
    if (empty($name) || strlen($name) < 3) {
        $errors[] = 'El nombre debe tener al menos 3 caracteres.';
    }
    
    if (empty($email) || !isValidEmail($email)) {
        $errors[] = 'El email no es válido.';
    }
    
    if (empty($phone) || !isValidPhone($phone)) {
        $errors[] = 'El teléfono debe ser un número colombiano válido (10 dígitos comenzando con 3).';
    }
    
    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'El mensaje debe tener al menos 10 caracteres.';
    }
    
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => 'Errores de validación',
            'errors' => $errors
        ]);
        exit();
    }
    
    // Verificar spam
    if (isSpam($data)) {
        logEmail($data, false, 'Spam detectado');
        http_response_code(403);
        echo json_encode([
            'success' => false,
            'message' => 'Solicitud rechazada por seguridad.'
        ]);
        exit();
    }
    
    // Rate limiting
    $identifier = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
    $rateLimitCheck = checkRateLimit($identifier);
    
    if (!$rateLimitCheck['allowed']) {
        http_response_code(429);
        echo json_encode([
            'success' => false,
            'message' => $rateLimitCheck['message'],
            'retry_after' => $rateLimitCheck['retry_after']
        ]);
        exit();
    }
    
    // ============================================
    // ENVIAR CORREO
    // ============================================
    
    $emailSender = new EmailSender();
    
    // Email al cliente (confirmación)
    $clientEmailSent = $emailSender->sendConfirmationEmail([
        'to' => $email,
        'name' => $name
    ]);
    
    // Email al administrador (notificación)
    $adminEmailSent = $emailSender->sendNotificationEmail([
        'name' => $name,
        'email' => $email,
        'phone' => $phone,
        'company' => $company,
        'service' => $service,
        'message' => $message
    ]);
    
    if ($clientEmailSent && $adminEmailSent) {
        logEmail($data, true);
        
        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => '¡Mensaje enviado exitosamente! Te responderemos pronto.'
        ]);
    } else {
        throw new Exception('Error al enviar el correo. Intenta nuevamente.');
    }
    
} catch (Exception $e) {
    logEmail($data ?? [], false, $e->getMessage());
    
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Error al procesar la solicitud: ' . $e->getMessage()
    ]);
}

