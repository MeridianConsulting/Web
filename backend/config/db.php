<?php
// Desactivar errores de PHP que puedan interferir con el JSON
error_reporting(E_ALL);
ini_set('display_errors', 0);
ini_set('log_errors', 1);

$server = "localhost";
$username = "root";
$password = "";
$db = "meridian";

$conexion = @new mysqli($server, $username, $password, $db);

// Establecer charset UTF-8 para evitar problemas con caracteres especiales
if ($conexion && !$conexion->connect_errno) {
    $conexion->set_charset("utf8mb4");
}

// Si hay error de conexión, mantener la conexión pero el error será manejado
// en cada método del controlador verificando connect_errno
?>
