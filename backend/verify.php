<?php
// Archivo de verificación de estructura del backend
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Origin: *");

$baseDir = __DIR__;
$structure = [
    "base_directory" => $baseDir,
    "php_version" => phpversion(),
    "files_in_root" => scandir($baseDir),
    "directories" => [],
    "permissions" => []
];

// Verificar directorios importantes
$dirs = ['config', 'controllers', 'uploads'];
foreach ($dirs as $dir) {
    $path = $baseDir . '/' . $dir;
    $structure["directories"][$dir] = [
        "exists" => file_exists($path),
        "is_dir" => is_dir($path),
        "readable" => is_readable($path),
        "writable" => is_writable($path),
        "files" => file_exists($path) && is_dir($path) ? scandir($path) : []
    ];
}

// Verificar archivos específicos
$files = [
    'index.php',
    'config/config.php',
    'config/db.php',
    'controllers/UserController.php',
    'controllers/BlogController.php'
];

foreach ($files as $file) {
    $path = $baseDir . '/' . $file;
    $structure["permissions"][$file] = [
        "exists" => file_exists($path),
        "readable" => is_readable($path),
        "size" => file_exists($path) ? filesize($path) : 0
    ];
}

// Intentar conectar a la base de datos
try {
    require_once $baseDir . '/config/db.php';
    global $conexion;
    
    if ($conexion && !$conexion->connect_errno) {
        $structure["database"] = [
            "connected" => true,
            "charset" => $conexion->character_set_name(),
            "server_info" => $conexion->server_info
        ];
    } else {
        $structure["database"] = [
            "connected" => false,
            "error" => $conexion ? $conexion->connect_error : "Conexión no inicializada"
        ];
    }
} catch (Exception $e) {
    $structure["database"] = [
        "connected" => false,
        "error" => $e->getMessage()
    ];
}

echo json_encode($structure, JSON_PRETTY_PRINT);
?>

