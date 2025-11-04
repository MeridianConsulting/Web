<?php
require_once __DIR__ . "/../config/db.php";

class UserController {
    public function login() {
        global $conexion;

        $data = json_decode(file_get_contents("php://input"), true);
        $usuario = $data["usuario"] ?? "";
        $clave = $data["clave"] ?? "";

        $sql = "SELECT * FROM usuarios WHERE usuario = ? AND contraseña = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param("ss", $usuario, $clave);
        $stmt->execute();
        $resultado = $stmt->get_result();

        if ($resultado->num_rows > 0) {
            echo json_encode(["status" => "success", "message" => "Inicio de sesión correcto ✅"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Usuario o contraseña incorrectos ❌"]);
        }

        $stmt->close();
    }
}
?>
