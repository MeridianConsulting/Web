<?php
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../config/security.php";

class UserController {
    public function login() {
        global $conexion;

        try {
            // Verificar conexión a la base de datos
            if (!$conexion || $conexion->connect_errno) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error de conexión a la base de datos"
                ]);
                exit;
            }

            // Rate limiting - Prevenir ataques de fuerza bruta
            $clientIP = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
            if (!Security::checkRateLimit($clientIP, 5, 300)) {
                http_response_code(429); // Too Many Requests
                echo json_encode([
                    "status" => "error",
                    "message" => "Demasiados intentos. Por favor, espera 5 minutos antes de intentar nuevamente."
                ]);
                exit;
            }

            $data = json_decode(file_get_contents("php://input"), true);
            $usuario = $data["usuario"] ?? "";
            $clave = $data["clave"] ?? "";

            // Validación básica
            if (empty($usuario) || empty($clave)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Usuario y contraseña son requeridos"
                ]);
                exit;
            }

            // Sanitizar entradas
            $usuario = Security::sanitizeString($usuario);
            $clave = Security::sanitizeString($clave);

            // Validar longitud
            if (!Security::validateLength($usuario, 3, 50)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Usuario inválido"
                ]);
                exit;
            }

            if (!Security::validateLength($clave, 4, 100)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error",
                    "message" => "Contraseña inválida"
                ]);
                exit;
            }

            // Usar prepared statement para prevenir SQL injection
            $sql = "SELECT id, usuario, contraseña FROM usuarios WHERE usuario = ? LIMIT 1";
            $stmt = $conexion->prepare($sql);
            
            if (!$stmt) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al preparar la consulta SQL"
                ]);
                exit;
            }
            
            $stmt->bind_param("s", $usuario);
            $stmt->execute();
            $resultado = $stmt->get_result();

            if ($resultado->num_rows > 0) {
                $user = $resultado->fetch_assoc();
                
                // Verificar contraseña
                // NOTA: Si las contraseñas están en texto plano (antiguo), compara directamente
                // Si están hasheadas (recomendado), usa Security::verifyPassword()
                $passwordMatch = false;
                
                // Intentar verificar como hash primero
                if (strlen($user['contraseña']) > 50) {
                    // Probablemente es un hash
                    $passwordMatch = Security::verifyPassword($clave, $user['contraseña']);
                } else {
                    // Texto plano (menos seguro, pero compatible con sistema actual)
                    $passwordMatch = ($clave === $user['contraseña']);
                }
                
                if ($passwordMatch) {
                    echo json_encode([
                        "status" => "success", 
                        "message" => "Inicio de sesión correcto ✅"
                    ]);
                } else {
                    http_response_code(401);
                    echo json_encode([
                        "status" => "error", 
                        "message" => "Usuario o contraseña incorrectos ❌"
                    ]);
                }
            } else {
                http_response_code(401);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Usuario o contraseña incorrectos ❌"
                ]);
            }

            $stmt->close();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage()
            ]);
            exit;
        }
    }
}
?>

