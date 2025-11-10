<?php
// Desactivar errores que puedan interferir con JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

// ==========================================
// 🔧 CONFIGURACIÓN CORS - DEBE IR AL PRINCIPIO
// ==========================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

// ==========================================
// 🛡️ HEADERS DE SEGURIDAD
// ==========================================
// Prevenir clickjacking
header("X-Frame-Options: DENY");
// Prevenir MIME type sniffing
header("X-Content-Type-Options: nosniff");
// Habilitar protección XSS del navegador
header("X-XSS-Protection: 1; mode=block");
// Content Security Policy
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;");
// Política de referrer
header("Referrer-Policy: strict-origin-when-cross-origin");
// Prevenir que el navegador adivine el tipo MIME
header("X-Permitted-Cross-Domain-Policies: none");

// Si la solicitud es OPTIONS (preflight), responder 200 sin ejecutar más código
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ==========================================
// 🚫 NUNCA debe haber echo, var_dump, o espacios antes de aquí
// ==========================================

// Conexión a la base de datos
require_once __DIR__ . "/config/db.php";

// Cargar funciones de seguridad
require_once __DIR__ . "/config/security.php";

// Función para cargar controladores
function cargarControlador($nombre) {
    $archivo = __DIR__ . "/controllers/" . $nombre . ".php";
    
    // Log de depuración
    error_log("Intentando cargar: " . $archivo);
    error_log("Archivo existe: " . (file_exists($archivo) ? 'SI' : 'NO'));
    error_log("__DIR__: " . __DIR__);
    error_log("Archivos en controllers: " . print_r(scandir(__DIR__ . "/controllers"), true));
    
    if (file_exists($archivo)) {
        require_once $archivo;
        if (class_exists($nombre)) {
            return new $nombre();
        } else {
            http_response_code(500);
            echo json_encode([
                "status" => "error", 
                "message" => "Clase '$nombre' no encontrada en el archivo",
                "debug" => [
                    "archivo" => $archivo,
                    "archivo_existe" => file_exists($archivo)
                ]
            ]);
            exit;
        }
    } else {
        http_response_code(404);
        echo json_encode([
            "status" => "error", 
            "message" => "Controlador '$nombre' no encontrado",
            "debug" => [
                "archivo_buscado" => $archivo,
                "directorio_base" => __DIR__,
                "archivos_en_controllers" => file_exists(__DIR__ . "/controllers") ? scandir(__DIR__ . "/controllers") : "Directorio no existe"
            ]
        ]);
        exit;
    }
}

// Router
$route = $_GET['route'] ?? '';
$method = $_SERVER['REQUEST_METHOD'];

switch ($route) {
    case 'login':
        $controller = cargarControlador("UserController");
        $controller->login();
        break;

    case 'email':
    case 'contact':
        // Ruta para el formulario de contacto
        require_once __DIR__ . "/controllers/EmailController.php";
        break;

    case 'blog':
        try {
            $controller = cargarControlador("BlogController");
            $action = $_GET['action'] ?? '';
            
            switch ($action) {
                case 'getAll':
                case 'list':
                    $controller->getAll();
                    break;
                    
                case 'get':
                case 'getById':
                    $controller->getById();
                    break;
                    
                case 'create':
                case 'add':
                    $controller->create();
                    break;
                    
                case 'update':
                case 'edit':
                    $controller->update();
                    break;
                    
                case 'delete':
                case 'remove':
                    $controller->delete();
                    break;
                    
                case 'like':
                    $controller->like();
                    break;
                    
                default:
                    http_response_code(400);
                    echo json_encode([
                        "status" => "error",
                        "message" => "Acción no válida",
                        "acciones_disponibles" => ["getAll", "getById", "create", "update", "delete", "like"]
                    ]);
                    exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error en el controlador: " . $e->getMessage()
            ]);
            exit;
        }
        break;

    default:
        echo json_encode([
            "status" => "error",
            "message" => "Ruta no válida o vacía",
            "rutas_disponibles" => ["login", "blog"]
        ]);
        break;
}
?>
