<?php
// Archivo de prueba para verificar que PHP funciona correctamente
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST");
header("Access-Control-Allow-Headers: Content-Type");

echo json_encode([
    "status" => "success",
    "message" => "PHP está funcionando correctamente",
    "php_version" => phpversion(),
    "server_software" => $_SERVER['SERVER_SOFTWARE'] ?? 'No disponible',
    "document_root" => $_SERVER['DOCUMENT_ROOT'] ?? 'No disponible',
    "script_filename" => __FILE__,
    "current_dir" => __DIR__,
    "files_in_dir" => scandir(__DIR__),
    "controllers_exist" => file_exists(__DIR__ . "/controllers"),
    "controllers_files" => file_exists(__DIR__ . "/controllers") ? scandir(__DIR__ . "/controllers") : "No existe",
]);
?>

