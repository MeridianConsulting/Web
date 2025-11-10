const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directorio de imágenes
const imagesDir = path.join(__dirname, '../src/assets/img');
const outputDir = path.join(__dirname, '../src/assets/img/optimized');

// Crear directorio de salida si no existe
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Extensiones de imagen soportadas
const imageExtensions = ['.jpg', '.jpeg', '.png'];

// Función para optimizar una imagen
async function optimizeImage(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  
  if (!imageExtensions.includes(ext)) {
    return;
  }

  const baseName = path.basename(fileName, ext);
  const webpPath = path.join(outputDir, `${baseName}.webp`);
  
  try {
    // Convertir a WebP con compresión
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    // Obtener tamaños
    const originalSize = fs.statSync(filePath).size;
    const webpSize = fs.statSync(webpPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(2);
    
    console.log(`✓ ${fileName} → ${baseName}.webp (${savings}% más pequeño)`);
    
    // Crear versiones responsive (opcional)
    const responsiveSizes = [400, 800, 1200];
    
    for (const size of responsiveSizes) {
      const responsivePath = path.join(outputDir, `${baseName}-${size}w.webp`);
      await sharp(filePath)
        .resize(size, null, { withoutEnlargement: true })
        .webp({ quality: 85 })
        .toFile(responsivePath);
    }
    
  } catch (error) {
    console.error(`✗ Error optimizando ${fileName}:`, error.message);
  }
}

// Procesar todas las imágenes
async function processAllImages() {
  console.log('🔄 Iniciando optimización de imágenes...\n');
  
  const files = fs.readdirSync(imagesDir);
  
  for (const file of files) {
    const filePath = path.join(imagesDir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isFile()) {
      await optimizeImage(filePath, file);
    }
  }
  
  console.log('\n✅ Optimización completada!');
  console.log(`📁 Imágenes optimizadas guardadas en: ${outputDir}`);
}

// Ejecutar
processAllImages().catch(console.error);

