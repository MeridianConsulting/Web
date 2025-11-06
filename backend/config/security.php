<?php
/**
 * Funciones de seguridad centralizadas
 * Protección contra inyección SQL, XSS, y otras vulnerabilidades
 */

class Security {
    
    /**
     * Sanitizar string - Prevenir XSS
     * @param string $input
     * @return string
     */
    public static function sanitizeString($input) {
        if (!is_string($input)) {
            return '';
        }
        
        // Remover tags HTML y PHP
        $input = strip_tags($input);
        
        // Convertir caracteres especiales a entidades HTML
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        // Remover caracteres de control excepto saltos de línea y tabulaciones
        $input = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/u', '', $input);
        
        return $input;
    }
    
    /**
     * Sanitizar texto largo (para contenido de blog) - Permite saltos de línea
     * @param string $input
     * @return string
     */
    public static function sanitizeText($input) {
        if (!is_string($input)) {
            return '';
        }
        
        // Remover tags peligrosos pero permitir formato básico
        $input = strip_tags($input);
        
        // Remover scripts inline y event handlers
        $input = preg_replace('/<script\b[^>]*>(.*?)<\/script>/is', '', $input);
        $input = preg_replace('/javascript:/i', '', $input);
        $input = preg_replace('/on\w+\s*=/i', '', $input);
        
        // Convertir caracteres especiales pero preservar saltos de línea
        $input = htmlspecialchars($input, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        
        return $input;
    }
    
    /**
     * Validar y sanitizar entero
     * @param mixed $input
     * @return int|null
     */
    public static function sanitizeInt($input) {
        if (is_null($input) || $input === '') {
            return null;
        }
        
        // Filtrar como entero
        $value = filter_var($input, FILTER_VALIDATE_INT);
        
        return $value !== false ? $value : null;
    }
    
    /**
     * Validar email
     * @param string $email
     * @return string|null
     */
    public static function sanitizeEmail($email) {
        if (!is_string($email)) {
            return null;
        }
        
        $email = filter_var($email, FILTER_SANITIZE_EMAIL);
        $email = filter_var($email, FILTER_VALIDATE_EMAIL);
        
        return $email !== false ? $email : null;
    }
    
    /**
     * Validar URL
     * @param string $url
     * @return string|null
     */
    public static function sanitizeUrl($url) {
        if (!is_string($url)) {
            return null;
        }
        
        $url = filter_var($url, FILTER_SANITIZE_URL);
        $url = filter_var($url, FILTER_VALIDATE_URL);
        
        return $url !== false ? $url : null;
    }
    
    /**
     * Validar longitud de string
     * @param string $input
     * @param int $min
     * @param int $max
     * @return bool
     */
    public static function validateLength($input, $min = 1, $max = PHP_INT_MAX) {
        if (!is_string($input)) {
            return false;
        }
        
        $length = mb_strlen($input, 'UTF-8');
        return $length >= $min && $length <= $max;
    }
    
    /**
     * Generar hash seguro de contraseña
     * @param string $password
     * @return string
     */
    public static function hashPassword($password) {
        // Usar PASSWORD_DEFAULT que actualmente es bcrypt
        return password_hash($password, PASSWORD_DEFAULT);
    }
    
    /**
     * Verificar contraseña contra hash
     * @param string $password
     * @param string $hash
     * @return bool
     */
    public static function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
    
    /**
     * Prevenir SQL Injection adicional - Escapar string para MySQL
     * NOTA: Usar SOLO como capa adicional, SIEMPRE usar prepared statements
     * @param mysqli $conexion
     * @param string $input
     * @return string
     */
    public static function escapeSQL($conexion, $input) {
        if (!is_string($input)) {
            return '';
        }
        
        return $conexion->real_escape_string($input);
    }
    
    /**
     * Validar tipo de archivo
     * @param array $file ($_FILES['field'])
     * @param array $allowedTypes
     * @param int $maxSize en bytes
     * @return array ['valid' => bool, 'error' => string]
     */
    public static function validateFile($file, $allowedTypes = [], $maxSize = 5242880) {
        if (!isset($file['error']) || is_array($file['error'])) {
            return ['valid' => false, 'error' => 'Archivo inválido'];
        }
        
        // Verificar errores de upload
        if ($file['error'] !== UPLOAD_ERR_OK) {
            return ['valid' => false, 'error' => 'Error al subir el archivo'];
        }
        
        // Verificar tamaño
        if ($file['size'] > $maxSize) {
            $maxMB = $maxSize / 1048576;
            return ['valid' => false, 'error' => "Archivo demasiado grande (máximo {$maxMB}MB)"];
        }
        
        // Verificar tipo MIME
        $finfo = new finfo(FILEINFO_MIME_TYPE);
        $mimeType = $finfo->file($file['tmp_name']);
        
        if (!empty($allowedTypes) && !in_array($mimeType, $allowedTypes)) {
            return ['valid' => false, 'error' => 'Tipo de archivo no permitido'];
        }
        
        // Validación adicional para imágenes
        if (strpos($mimeType, 'image/') === 0) {
            $imageInfo = @getimagesize($file['tmp_name']);
            if ($imageInfo === false) {
                return ['valid' => false, 'error' => 'El archivo no es una imagen válida'];
            }
        }
        
        return ['valid' => true, 'error' => null];
    }
    
    /**
     * Generar token CSRF
     * @return string
     */
    public static function generateCSRFToken() {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        return $_SESSION['csrf_token'];
    }
    
    /**
     * Verificar token CSRF
     * @param string $token
     * @return bool
     */
    public static function verifyCSRFToken($token) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (!isset($_SESSION['csrf_token'])) {
            return false;
        }
        
        return hash_equals($_SESSION['csrf_token'], $token);
    }
    
    /**
     * Sanitizar array de datos
     * @param array $data
     * @return array
     */
    public static function sanitizeArray($data) {
        if (!is_array($data)) {
            return [];
        }
        
        $sanitized = [];
        foreach ($data as $key => $value) {
            if (is_string($value)) {
                $sanitized[$key] = self::sanitizeString($value);
            } elseif (is_int($value)) {
                $sanitized[$key] = $value;
            } elseif (is_array($value)) {
                $sanitized[$key] = self::sanitizeArray($value);
            }
        }
        
        return $sanitized;
    }
    
    /**
     * Rate limiting básico - Prevenir ataques de fuerza bruta
     * @param string $identifier (IP o usuario)
     * @param int $maxAttempts
     * @param int $timeWindow en segundos
     * @return bool true si está permitido, false si excedió el límite
     */
    public static function checkRateLimit($identifier, $maxAttempts = 5, $timeWindow = 300) {
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        $key = 'rate_limit_' . md5($identifier);
        $now = time();
        
        if (!isset($_SESSION[$key])) {
            $_SESSION[$key] = ['count' => 1, 'start' => $now];
            return true;
        }
        
        $data = $_SESSION[$key];
        
        // Si pasó el tiempo, reiniciar contador
        if ($now - $data['start'] > $timeWindow) {
            $_SESSION[$key] = ['count' => 1, 'start' => $now];
            return true;
        }
        
        // Incrementar contador
        $_SESSION[$key]['count']++;
        
        // Verificar límite
        return $_SESSION[$key]['count'] <= $maxAttempts;
    }
}
?>

