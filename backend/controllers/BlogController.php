<?php
require_once __DIR__ . "/../config/db.php";

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
            
            $sql = "SELECT * FROM blog ORDER BY id DESC";
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
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
                exit;
            }
            
            $sql = "SELECT * FROM blog WHERE id = ?";
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
                    "message" => "Todos los campos son obligatorios",
                    "debug" => [
                        "titulo" => $titulo,
                        "autor" => $autor,
                        "cargo" => $cargo,
                        "area" => $area,
                        "contenido" => $contenido
                    ]
                ]);
                exit;
            }
            
            // Validar longitud de campos según la estructura de la BD
            if (strlen($titulo) > 50) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El título no puede exceder 50 caracteres"]);
                exit;
            }
            
            if (strlen($nombre) > 35) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El nombre no puede exceder 35 caracteres"]);
                exit;
            }
            
            if (strlen($cargo) > 30) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El cargo no puede exceder 30 caracteres"]);
                exit;
            }
            
            if (strlen($area) > 30) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El área no puede exceder 30 caracteres"]);
                exit;
            }
            
            if (strlen($noticia) > 120) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "La noticia no puede exceder 120 caracteres"]);
                exit;
            }
            
            // Procesar imagen si existe
            $imagen_path = null;
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $imagen = $_FILES['imagen'];
                
                // Validar tipo de archivo
                $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!in_array($imagen['type'], $allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "Tipo de archivo no permitido"]);
                    exit;
                }
                
                // Validar tamaño (5MB máximo)
                $maxSize = 5 * 1024 * 1024;
                if ($imagen['size'] > $maxSize) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "El archivo es demasiado grande (máximo 5MB)"]);
                    exit;
                }
                
                // Generar nombre único para el archivo
                $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
                $fileName = uniqid('blog_', true) . '.' . $extension;
                $filePath = $this->uploadDir . $fileName;
                
                // Mover archivo
                if (move_uploaded_file($imagen['tmp_name'], $filePath)) {
                    $imagen_path = 'uploads/' . $fileName;
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
            $sql = "INSERT INTO blog (titulo, autor, cargo, area, contenido, imagen_path, fecha_creacion, fecha_actualizada) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            
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
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
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
            
            // Validar longitud de campos según la estructura de la BD (blog.sql)
            if (strlen($titulo) > 200) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El título no puede exceder 200 caracteres"]);
                exit;
            }
            
            if (strlen($autor) > 100) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El autor no puede exceder 100 caracteres"]);
                exit;
            }
            
            if (strlen($cargo) > 100) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El cargo no puede exceder 100 caracteres"]);
                exit;
            }
            
            if (strlen($area) > 100) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El área no puede exceder 100 caracteres"]);
                exit;
            }
            
            // contenido es TEXT, no tiene límite de caracteres en varchar, pero validamos un límite razonable
            if (strlen($contenido) > 65535) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "El contenido es demasiado largo"]);
                exit;
            }
            
            // Procesar nueva imagen si existe
            $imagen_path = $imagen_existente;
            
            if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
                $imagen = $_FILES['imagen'];
                
                // Validar tipo de archivo
                $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
                if (!in_array($imagen['type'], $allowedTypes)) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "Tipo de archivo no permitido"]);
                    exit;
                }
                
                // Validar tamaño (5MB máximo)
                $maxSize = 5 * 1024 * 1024;
                if ($imagen['size'] > $maxSize) {
                    http_response_code(400);
                    echo json_encode(["status" => "error", "message" => "El archivo es demasiado grande (máximo 5MB)"]);
                    exit;
                }
                
                // Eliminar imagen anterior si existe
                if ($imagen_existente) {
                    $oldFilePath = __DIR__ . "/../" . $imagen_existente;
                    if (file_exists($oldFilePath)) {
                        unlink($oldFilePath);
                    }
                }
                
                // Generar nombre único para el archivo
                $extension = pathinfo($imagen['name'], PATHINFO_EXTENSION);
                $fileName = uniqid('blog_', true) . '.' . $extension;
                $filePath = $this->uploadDir . $fileName;
                
                // Mover archivo
                if (move_uploaded_file($imagen['tmp_name'], $filePath)) {
                    $imagen_path = 'uploads/' . $fileName;
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
            
            if (!$id) {
                http_response_code(400);
                echo json_encode(["status" => "error", "message" => "ID no proporcionado"]);
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
}
?>

