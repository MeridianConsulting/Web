<?php
require_once __DIR__ . "/../config/db.php";
require_once __DIR__ . "/../config/security.php";

class BlogController {
    private $uploadDir;
    
    public function __construct() {
        // Directorio de uploads
        $this->uploadDir = __DIR__ . "/../uploads/";
        
        // Crear directorio si no existe
        if (!file_exists($this->uploadDir)) {
            mkdir($this->uploadDir, 0777, true);
        }
    }

    // Obtener todos los posts
    public function getAll() {
        global $conexion;
        
        try {
            // Verificar conexión
            if (!$conexion) {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Error de conexión a la base de datos"]);
                exit;
            }
            
            $sql = "SELECT id, titulo, autor, cargo, area, contenido, imagen_path, likes, fecha_creacion, fecha_actualizada FROM blog ORDER BY id DESC";
            $resultado = $conexion->query($sql);
            
            // Verificar si hay error en la consulta
            if (!$resultado) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error en la consulta: " . $conexion->error
                ]);
                exit;
            }
            
            $posts = [];
            while ($row = $resultado->fetch_assoc()) {
                // La BD ya tiene los nombres correctos: autor, contenido, imagen_path
                $posts[] = [
                    'id' => $row['id'],
                    'titulo' => $row['titulo'] ?? '',
                    'autor' => $row['autor'] ?? '',
                    'cargo' => $row['cargo'] ?? '',
                    'area' => $row['area'] ?? '',
                    'contenido' => $row['contenido'] ?? '',
                    'imagen_path' => $row['imagen_path'] ?? '',
                    'likes' => isset($row['likes']) ? (int)$row['likes'] : 0,
                    'fecha_creacion' => $row['fecha_creacion'] ?? null,
                    'fecha_actualizada' => $row['fecha_actualizada'] ?? null,
                ];
            }
            
            echo json_encode([
                "status" => "success",
                "data" => $posts
            ]);
            exit;
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error al obtener posts: " . $e->getMessage()
            ]);
            exit;
        }
    }

    // Obtener un post por ID
    public function getById() {
        global $conexion;
        
        try {
            // Verificar conexión
            if (!$conexion || $conexion->connect_errno) {
                http_response_code(500);
                echo json_encode(["status" => "error", "message" => "Error de conexión a la base de datos"]);
                exit;
            }
            
            $id = $_GET['id'] ?? null;
            
            // Validar y sanitizar ID
            $id = Security::sanitizeInt($id);
            
            if (!$id || $id <= 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID inválido"]);
                exit;
            }
            
            $sql = "SELECT id, titulo, autor, cargo, area, contenido, imagen_path, likes, fecha_creacion, fecha_actualizada FROM blog WHERE id = ?";
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
            
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $resultado = $stmt->get_result();
            
            if ($resultado->num_rows > 0) {
                $row = $resultado->fetch_assoc();
                // La BD ya tiene los nombres correctos: autor, contenido, imagen_path
                $post = [
                    'id' => $row['id'],
                    'titulo' => $row['titulo'],
                    'autor' => $row['autor'],
                    'cargo' => $row['cargo'],
                    'area' => $row['area'],
                    'contenido' => $row['contenido'],
                    'imagen_path' => $row['imagen_path'],
                    'likes' => isset($row['likes']) ? (int)$row['likes'] : 0,
                    'fecha_creacion' => $row['fecha_creacion'] ?? null,
                    'fecha_actualizada' => $row['fecha_actualizada'] ?? null,
                ];
                $stmt->close();
                echo json_encode([
                    "status" => "success",
                    "data" => $post
                ]);
                exit;
            } else {
                $stmt->close();
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Post no encontrado"]);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage()
            ]);
            exit;
        }
    }

    // Crear nuevo post
    public function create() {
        global $conexion;
        
        try {
            // Verificar conexión a la base de datos
            if (!$conexion || $conexion->connect_errno) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error de conexión a la base de datos",
                    "error" => $conexion ? $conexion->connect_error : "Conexión no disponible"
                ]);
                exit;
            }
            
            // Verificar que sea POST
            $method = $_SERVER['REQUEST_METHOD'] ?? '';
            if ($method !== 'POST') {
                http_response_code(405);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Método no permitido. Se requiere POST.",
                    "method_received" => $method
                ]);
                exit;
            }
            
            // Obtener datos del formulario
            $titulo = $_POST['titulo'] ?? '';
            $autor = $_POST['autor'] ?? '';
            $cargo = $_POST['cargo'] ?? '';
            $area = $_POST['area'] ?? '';
            $contenido = $_POST['contenido'] ?? '';
            
            // Validar campos obligatorios
            if (empty($titulo) || empty($autor) || empty($cargo) || empty($area) || empty($contenido)) {
                http_response_code(400);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Todos los campos son obligatorios"
                ]);
                exit;
            }
            
            // Sanitizar entradas - Prevenir XSS e inyección
            $titulo = Security::sanitizeString($titulo);
            $autor = Security::sanitizeString($autor);
            $cargo = Security::sanitizeString($cargo);
            $area = Security::sanitizeString($area);
            $contenido = Security::sanitizeText($contenido); // Permite saltos de línea
            
            // Validar longitudes razonables
            if (!Security::validateLength($titulo, 1, 500)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El título debe tener entre 1 y 500 caracteres"]);
                exit;
            }
            
            if (!Security::validateLength($autor, 1, 200)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El autor debe tener entre 1 y 200 caracteres"]);
                exit;
            }
            
            if (!Security::validateLength($contenido, 10, 100000)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El contenido debe tener entre 10 y 100,000 caracteres"]);
                exit;
            }
            
            // Procesar imagen si existe
            $imagen_path = null;
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $imagen = $_FILES['imagen'];
                
                // Validar archivo con función de seguridad
                $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                $validation = Security::validateFile($imagen, $allowedTypes, 5242880); // 5MB
                
                if (!$validation['valid']) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => $validation['error']]);
                    exit;
                }
                
                // Generar nombre único y seguro para el archivo
                $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));
                // Sanitizar extensión para prevenir path traversal
                $extension = preg_replace('/[^a-z0-9]/', '', $extension);
                $fileName = uniqid('blog_', true) . '.' . $extension;
                $filePath = $this->uploadDir . basename($fileName); // basename previene path traversal
                
                // Mover archivo
                if (move_uploaded_file($imagen['tmp_name'], $filePath)) {
                    $imagen_path = 'uploads/' . basename($fileName);
                } else {
                    http_response_code(500);
                    echo json_encode([
                        "status" => "error", 
                        "message" => "Error al subir la imagen",
                        "debug" => [
                            "tmp_name" => $imagen['tmp_name'],
                            "filePath" => $filePath,
                            "upload_dir_exists" => file_exists($this->uploadDir),
                            "upload_dir_writable" => is_writable($this->uploadDir)
                        ]
                    ]);
                    exit;
                }
            } else {
                // Si no hay imagen, usar cadena vacía (según la estructura de BD que requiere NOT NULL)
                $imagen_path = '';
            }
            
            // Validar longitud de imagen_path
            if (strlen($imagen_path) > 255) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "La ruta de la imagen es demasiado larga"]);
                exit;
            }
            
            // Obtener fecha actual
            $fecha_actual = date('Y-m-d H:i:s');
        
            // Insertar en la base de datos (ajustado a la estructura real de la BD blog.sql)
            $sql = "INSERT INTO blog (titulo, autor, cargo, area, contenido, imagen_path, fecha_creacion, fecha_actualizada, likes) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)";
            
            // Verificar que la tabla existe
            $tableCheck = $conexion->query("SHOW TABLES LIKE 'blog'");
            if ($tableCheck->num_rows === 0) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "La tabla 'blog' no existe en la base de datos"
                ]);
                exit;
            }
            
            $stmt = $conexion->prepare($sql);
            
            if (!$stmt) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al preparar la consulta SQL",
                    "sql_error" => $conexion->error,
                    "sql_query" => $sql,
                    "errno" => $conexion->errno,
                    "error_info" => [
                        "titulo" => $titulo,
                        "autor" => $autor,
                        "cargo" => $cargo,
                        "area" => $area,
                        "contenido" => $contenido,
                        "imagen_path" => $imagen_path
                    ]
                ]);
                exit;
            }
            
            $stmt->bind_param("ssssssss", $titulo, $autor, $cargo, $area, $contenido, $imagen_path, $fecha_actual, $fecha_actual);
            
            if ($stmt->execute()) {
                $newId = $conexion->insert_id;
                $stmt->close();
                echo json_encode([
                    "status" => "success",
                    "message" => "Post creado exitosamente",
                    "data" => ["id" => $newId]
                ]);
                exit;
            } else {
                $error = $stmt->error;
                $stmt->close();
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al crear el post",
                    "sql_error" => $error,
                    "db_error" => $conexion->error
                ]);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine()
            ]);
            exit;
        }
    }

    // Actualizar post
    public function update() {
        global $conexion;
        
        try {
            // Verificar conexión a la base de datos
            if (!$conexion || $conexion->connect_errno) {
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error de conexión a la base de datos",
                    "error" => $conexion ? $conexion->connect_error : "Conexión no disponible"
                ]);
                exit;
            }
            
            // Verificar que sea POST
            $method = $_SERVER['REQUEST_METHOD'] ?? '';
            if ($method !== 'POST') {
                http_response_code(405);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Método no permitido. Se requiere POST.",
                    "method_received" => $method
                ]);
                exit;
            }
        
            $id = $_POST['id'] ?? null;
            
            // Validar y sanitizar ID
            $id = Security::sanitizeInt($id);
            
            if (!$id || $id <= 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID inválido"]);
                exit;
            }
            
            // Obtener datos del formulario
            $titulo = $_POST['titulo'] ?? '';
            $autor = $_POST['autor'] ?? '';
            $cargo = $_POST['cargo'] ?? '';
            $area = $_POST['area'] ?? '';
            $contenido = $_POST['contenido'] ?? '';
            $imagen_existente = $_POST['imagen_existente'] ?? null;
            
            // Validar campos obligatorios
            if (empty($titulo) || empty($autor) || empty($cargo) || empty($area) || empty($contenido)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Todos los campos son obligatorios"]);
                exit;
            }
            
            // Sanitizar entradas
            $titulo = Security::sanitizeString($titulo);
            $autor = Security::sanitizeString($autor);
            $cargo = Security::sanitizeString($cargo);
            $area = Security::sanitizeString($area);
            $contenido = Security::sanitizeText($contenido);
            
            // Validar longitudes
            if (!Security::validateLength($titulo, 1, 500) || 
                !Security::validateLength($autor, 1, 200) ||
                !Security::validateLength($contenido, 10, 100000)) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "Los datos exceden los límites permitidos"]);
                exit;
            }
            
            // Procesar nueva imagen si existe
            $imagen_path = $imagen_existente;
            
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $imagen = $_FILES['imagen'];
                
                // Validar archivo con función de seguridad
                $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                $validation = Security::validateFile($imagen, $allowedTypes, 5242880); // 5MB
                
                if (!$validation['valid']) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => $validation['error']]);
                    exit;
                }
                
                // Eliminar imagen anterior si existe
                if ($imagen_existente) {
                    $oldFilePath = __DIR__ . "/../" . $imagen_existente;
                    if (file_exists($oldFilePath)) {
                        unlink($oldFilePath);
                    }
                }
                
                // Generar nombre único y seguro para el archivo
                $extension = strtolower(pathinfo($imagen['name'], PATHINFO_EXTENSION));
                // Sanitizar extensión para prevenir path traversal
                $extension = preg_replace('/[^a-z0-9]/', '', $extension);
                $fileName = uniqid('blog_', true) . '.' . $extension;
                $filePath = $this->uploadDir . basename($fileName); // basename previene path traversal
                
                // Mover archivo
                if (move_uploaded_file($imagen['tmp_name'], $filePath)) {
                    $imagen_path = 'uploads/' . basename($fileName);
                } else {
                    http_response_code(500);
                    echo json_encode(["status" => "error", "message" => "Error al subir la imagen"]);
                    exit;
                }
            } else {
                // Si no hay nueva imagen, mantener la existente
                $imagen_path = $imagen_existente ? $imagen_existente : '';
            }
            
            // Validar longitud de imagen_path
            if (strlen($imagen_path) > 255) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "La ruta de la imagen es demasiado larga"]);
                exit;
            }
            
            // Obtener fecha actual
            $fecha_actual = date('Y-m-d H:i:s');
            
            // Actualizar en la base de datos (ajustado a la estructura real de la BD blog.sql)
            $sql = "UPDATE blog SET titulo = ?, autor = ?, cargo = ?, area = ?, contenido = ?, imagen_path = ?, fecha_actualizada = ? WHERE id = ?";
            
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
            
            $stmt->bind_param("sssssssi", $titulo, $autor, $cargo, $area, $contenido, $imagen_path, $fecha_actual, $id);
            
            if ($stmt->execute()) {
                $stmt->close();
                echo json_encode([
                    "status" => "success",
                    "message" => "Post actualizado exitosamente"
                ]);
                exit;
            } else {
                $error = $stmt->error;
                $stmt->close();
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al actualizar el post",
                    "sql_error" => $error,
                    "db_error" => $conexion->error
                ]);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine()
            ]);
            exit;
        }
    }

    // Eliminar post
    public function delete() {
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
            
            // Verificar que sea POST o DELETE
            $method = $_SERVER['REQUEST_METHOD'] ?? '';
            if (!in_array($method, ['POST', 'DELETE'])) {
                http_response_code(405);
                echo json_encode(["status" => "error", "message" => "Método no permitido"]);
                exit;
            }
            
            // Obtener ID desde POST o GET según el método
            $id = $_POST['id'] ?? $_GET['id'] ?? null;
            
            // Validar y sanitizar ID
            $id = Security::sanitizeInt($id);
            
            if (!$id || $id <= 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID inválido"]);
                exit;
            }
            
            // Obtener información del post para eliminar la imagen
            $sql = "SELECT imagen_path FROM blog WHERE id = ?";
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
            
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $resultado = $stmt->get_result();
            
            if ($resultado->num_rows > 0) {
                $post = $resultado->fetch_assoc();
                
                // Eliminar imagen si existe
                if ($post['imagen_path'] && !empty($post['imagen_path'])) {
                    $filePath = __DIR__ . "/../" . $post['imagen_path'];
                    if (file_exists($filePath)) {
                        unlink($filePath);
                    }
                }
                
                $stmt->close();
                
                // Eliminar el post de la base de datos
                $sql = "DELETE FROM blog WHERE id = ?";
                $stmt = $conexion->prepare($sql);
                
                if (!$stmt) {
                    http_response_code(500);
                    echo json_encode([
                        "status" => "error", 
                        "message" => "Error al preparar la consulta DELETE",
                        "sql_error" => $conexion->error
                    ]);
                    exit;
                }
                
                $stmt->bind_param("i", $id);
                
                if ($stmt->execute()) {
                    $stmt->close();
                    echo json_encode([
                        "status" => "success",
                        "message" => "Post eliminado exitosamente"
                    ]);
                    exit;
                } else {
                    $error = $stmt->error;
                    $stmt->close();
                    http_response_code(500);
                    echo json_encode([
                        "status" => "error", 
                        "message" => "Error al eliminar el post",
                        "sql_error" => $error
                    ]);
                    exit;
                }
            } else {
                $stmt->close();
                http_response_code(404);
                echo json_encode(["status" => "error", "message" => "Post no encontrado"]);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine()
            ]);
            exit;
        }
    }

    // Incrementar likes de un post
    public function like() {
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
            
            // Obtener ID desde GET o POST
            $id = $_GET['id'] ?? $_POST['id'] ?? null;
            
            // Validar y sanitizar ID
            $id = Security::sanitizeInt($id);
            
            if (!$id || $id <= 0) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID inválido"]);
                exit;
            }
            
            // Incrementar likes
            $sql = "UPDATE blog SET likes = likes + 1 WHERE id = ?";
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
            
            $stmt->bind_param("i", $id);
            
            if ($stmt->execute()) {
                // Obtener el nuevo valor de likes
                $selectSql = "SELECT likes FROM blog WHERE id = ?";
                $selectStmt = $conexion->prepare($selectSql);
                $selectStmt->bind_param("i", $id);
                $selectStmt->execute();
                $result = $selectStmt->get_result();
                $row = $result->fetch_assoc();
                $newLikes = $row['likes'] ?? 0;
                
                $stmt->close();
                $selectStmt->close();
                
                echo json_encode([
                    "status" => "success",
                    "message" => "Like agregado exitosamente",
                    "likes" => (int)$newLikes
                ]);
                exit;
            } else {
                $error = $stmt->error;
                $stmt->close();
                http_response_code(500);
                echo json_encode([
                    "status" => "error", 
                    "message" => "Error al actualizar likes",
                    "sql_error" => $error
                ]);
                exit;
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode([
                "status" => "error",
                "message" => "Error inesperado: " . $e->getMessage(),
                "file" => $e->getFile(),
                "line" => $e->getLine()
            ]);
            exit;
        }
    }
}
?>

