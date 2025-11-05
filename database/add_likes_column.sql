-- Script para agregar campo likes a la tabla blog
-- Ejecutar este script en phpMyAdmin o MySQL

ALTER TABLE `blog` 
  ADD COLUMN `likes` INT(11) NOT NULL DEFAULT 0 AFTER `imagen_path`;

