<?php
require_once __DIR__ . "/../config/db.php";

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

            $data = json_decode(file_get_contents("php://input"), true);
            $usuario = $data["usuario"] ?? "";
            $clave = $data["clave"] ?? "";

            if (empty($usuario) || empty($clave)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Usuario y contraseña son requeridos"
                ]);
                exit;
            }

            $sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
            $stmt = $conexion->prepare($sql);
            
            if (!$stmt) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al preparar la consulta SQL",
                    "sql_error" => $conexion->error
                ]);
                exit;
            }
            
            $stmt->bind_param("ss", $usuario, $clave);
            $stmt->execute();
            $resultado = $stmt->get_result();

            if ($resultado->num_rows > 0) {
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
