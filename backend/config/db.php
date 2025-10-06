<?php
$server = "localhost";
$username = "root";
$password = "";
$db = "meridian";

$conexion = new mysqli($server, $username, $password, $db);

if ($conexion->connect_errno) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Error de conexión a la base de datos"]);
    exit();
}
?>
