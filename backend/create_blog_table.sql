-- Crear tabla blog si no existe
CREATE TABLE IF NOT EXISTS `blog` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(200) NOT NULL,
  `autor` varchar(100) NOT NULL,
  `cargo` varchar(100) NOT NULL,
  `area` varchar(100) NOT NULL,
  `contenido` text NOT NULL,
  `imagen_path` varchar(255) DEFAULT NULL,
  `fecha_creacion` datetime NOT NULL,
  `fecha_actualizada` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

