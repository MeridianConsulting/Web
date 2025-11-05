<?php
// ==========================================
// 🔧 CONFIGURACIÓN CORS - DEBE IR AL PRINCIPIO
// ==========================================
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

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

// Función para cargar controladores
function cargarControlador($nombre) {
    $archivo = __DIR__ . "/controllers/" . $nombre . ".php";
    if (file_exists($archivo)) {
        require_once $archivo;
        return new $nombre();
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "Controlador '$nombre' no encontrado"]);
        exit;
    }
}

// Router
$route = $_GET['route'] ?? '';

switch ($route) {
    case 'login':
        $controller = cargarControlador("UserController");
        $controller->login();
        break;

    default:
        echo json_encode([
            "status" => "error",
            "message" => "Ruta no válida o vacía",
            "rutas_disponibles" => ["login"]
        ]);
        break;
}
?>
