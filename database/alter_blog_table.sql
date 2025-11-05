-- Script para modificar la tabla blog y quitar límites de caracteres
-- Ejecutar este script en phpMyAdmin o MySQL

ALTER TABLE `blog` 
  MODIFY `titulo` TEXT NOT NULL,
  MODIFY `autor` TEXT NOT NULL,
  MODIFY `cargo` TEXT NOT NULL,
  MODIFY `area` TEXT NOT NULL,
  MODIFY `contenido` TEXT NOT NULL,
  MODIFY `imagen_path` VARCHAR(255) DEFAULT NULL;

-- Agregar campo para almacenar los likes
ALTER TABLE `blog` 
  ADD COLUMN `likes` INT(11) NOT NULL DEFAULT 0 AFTER `imagen_path`;

