# ✅ CHECKLIST DE DESPLIEGUE A PRODUCCIÓN
**MERIDIAN CONSULTING LTDA**

---

## 📋 ANTES DE SUBIR A PRODUCCIÓN

### ✅ 1. Configuración de Backend

#### 1.1. Configurar Email
📁 `backend/config/email-config.php`

```php
// ✅ VERIFICAR ESTOS VALORES:
define('EMAIL_ADMIN', 'desarrolloit@meridian.com.co'); // Email donde recibirás los mensajes
define('EMAIL_FROM', 'info@meridianltda.com'); // Email remitente
define('EMAIL_FROM_NAME', 'MERIDIAN CONSULTING LTDA');
```

#### 1.2. Configurar SMTP (Importante para Producción)
📁 `backend/config/email-config.php`

**Opción A: Gmail** (Para testing/bajo volumen)
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'tu-email@gmail.com');
define('SMTP_PASSWORD', 'xxxx-xxxx-xxxx-xxxx'); // Contraseña de aplicación
```

**Opción B: Servidor de Email del Hosting** (Recomendado)
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'mail.meridianltda.com'); // Servidor SMTP de tu hosting
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'info@meridianltda.com');
define('SMTP_PASSWORD', 'contraseña-del-email');
```

**Opción C: SendGrid/Mailgun** (Profesional - Alta fiabilidad)
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.sendgrid.net');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'apikey');
define('SMTP_PASSWORD', 'SG.xxxxxxxxxxxxxxx'); // API Key
```

#### 1.3. Verificar Permisos de Carpetas
```bash
# En el servidor, dar permisos de escritura:
chmod 755 backend/logs/
chmod 644 backend/logs/*.txt
chmod 644 backend/logs/*.json
```

#### 1.4. Crear Carpeta de Logs
```bash
# Si no existe:
mkdir -p backend/logs
touch backend/logs/email-log.txt
touch backend/logs/rate-limit.json
```

---

### ✅ 2. Configuración de Frontend

#### 2.1. Cambiar Modo a Producción
📁 `frontend/src/config/api.js`

```javascript
const ENVIRONMENT = 'production'; // ✅ Cambiar de 'development' a 'production'
```

#### 2.2. Verificar URLs de Producción
📁 `frontend/src/config/api.js`

```javascript
production: {
  API_URL: 'https://meridianltda.com/backend', // ✅ Verificar URL
  BASE_URL: 'https://meridianltda.com',
}
```

#### 2.3. Build de Producción
```bash
cd frontend
npm run build
```

Esto crea la carpeta `build/` con los archivos optimizados.

---

### ✅ 3. Estructura de Archivos en el Servidor

```
/public_html/ (o /htdocs/)
├── backend/
│   ├── config/
│   │   └── email-config.php      ✅ Configurado
│   ├── controllers/
│   │   └── EmailController.php
│   ├── utils/
│   │   └── email-sender.php
│   ├── logs/                      ✅ Permisos 755
│   │   ├── email-log.txt
│   │   └── rate-limit.json
│   └── .htaccess                  ✅ Configurar si es necesario
│
├── index.html                     ← Del build/
├── static/                        ← Del build/
├── manifest.json                  ← Del build/
├── robots.txt                     ← Del build/
└── .htaccess                      ✅ Configurar para React Router
```

---

### ✅ 4. Configuración del Servidor

#### 4.1. .htaccess en la Raíz (Para React Router)
📁 `/public_html/.htaccess`

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # No reescribir archivos que existen
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  
  # Redirigir todo a index.html
  RewriteRule . /index.html [L]
</IfModule>
```

#### 4.2. CORS en el Backend (Si está en subdomain diferente)
Ya está configurado en `EmailController.php`:
```php
header('Access-Control-Allow-Origin: *'); ✅
```

#### 4.3. HTTPS (SSL Certificate)
- ✅ Asegúrate de que tu hosting tenga SSL instalado
- ✅ Todas las URLs deben ser `https://`

---

### ✅ 5. Testing en Producción

#### 5.1. Test del Formulario
1. Visita `https://meridianltda.com/contacto`
2. Llena el formulario con datos reales
3. Verifica que recibas 2 emails:
   - ✅ Confirmación al email que pusiste
   - ✅ Notificación a `desarrolloit@meridian.com.co`

#### 5.2. Test de Reply-To
1. Abre el email de notificación recibido
2. Haz clic en "Responder"
3. Verifica que el destinatario sea el email del usuario (no info@meridianltda.com)

#### 5.3. Verificar Logs
```bash
# En el servidor:
tail -f /ruta/backend/logs/email-log.txt
```

---

### ✅ 6. Seguridad en Producción

#### 6.1. Ocultar Archivos Sensibles
Crea `.htaccess` en `/backend/`:
```apache
# Denegar acceso a archivos de configuración
<Files "email-config.php">
  Order Allow,Deny
  Deny from all
</Files>

<Files ".env">
  Order Allow,Deny
  Deny from all
</Files>

# Permitir solo EmailController.php
<FilesMatch "EmailController\.php">
  Order Allow,Deny
  Allow from all
</FilesMatch>
```

#### 6.2. Monitoreo de Logs
- ✅ Revisa logs diariamente
- ✅ Configura alertas si hay muchos errores
- ✅ Limpia logs antiguos (más de 30 días)

---

## 🚀 PASOS DE DESPLIEGUE

### Opción A: Despliegue Manual

1. **Hacer build del frontend:**
```bash
cd frontend
npm run build
```

2. **Subir archivos al servidor:**
   - Sube TODO el contenido de `frontend/build/` a la raíz del servidor
   - Sube la carpeta `backend/` completa

3. **Configurar en el servidor:**
   - Edita `backend/config/email-config.php`
   - Crea carpeta `backend/logs/` con permisos
   - Configura `.htaccess` para React Router

4. **Probar:**
   - Visita tu sitio
   - Prueba el formulario de contacto

---

### Opción B: Despliegue con FTP/cPanel

1. **Conectar por FTP:**
   - Host: ftp.meridianltda.com
   - Usuario: tu-usuario
   - Contraseña: tu-contraseña

2. **Subir archivos:**
   ```
   /public_html/
   ├── [archivos del build]
   └── backend/
   ```

3. **Desde cPanel:**
   - File Manager → Editar `email-config.php`
   - Terminal → `chmod 755 backend/logs/`

---

### Opción C: Despliegue con Git (Recomendado)

1. **En el servidor:**
```bash
cd /var/www/html
git pull origin main
cd frontend
npm install
npm run build
cp -r build/* ../public_html/
```

2. **Configurar:**
```bash
nano backend/config/email-config.php
# Editar configuración
chmod 755 backend/logs/
```

---

## 🔍 TROUBLESHOOTING EN PRODUCCIÓN

### Problema 1: "No se envían los emails"

**Solución:**
1. Verifica `backend/logs/email-log.txt`
2. Revisa que SMTP esté configurado correctamente
3. Verifica que el servidor permita envío de correos
4. Prueba con `USE_SMTP = true` y Gmail

### Problema 2: "Error 404 al enviar formulario"

**Solución:**
1. Verifica la URL en `api.js`
2. Asegúrate de que `EmailController.php` esté accesible
3. Verifica permisos: `chmod 644 EmailController.php`

### Problema 3: "CORS Error"

**Solución:**
Ya está configurado en `EmailController.php`, pero verifica:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
```

### Problema 4: "Rate limit exceeded"

**Solución:**
```bash
# Eliminar el rate limit:
rm backend/logs/rate-limit.json
```

---

## 📊 MONITOREO POST-DESPLIEGUE

### Día 1-7:
- ✅ Revisar logs diariamente
- ✅ Probar formulario al menos 2 veces al día
- ✅ Verificar que lleguen los emails

### Después:
- ✅ Revisar logs semanalmente
- ✅ Hacer backup de `email-log.txt` mensualmente
- ✅ Actualizar contraseñas cada 3 meses

---

## 🎯 CHECKLIST FINAL

Antes de considerar el despliegue completado:

- [ ] Build de producción generado (`npm run build`)
- [ ] Archivos subidos al servidor
- [ ] `ENVIRONMENT = 'production'` en `api.js`
- [ ] Email SMTP configurado en `email-config.php`
- [ ] Permisos de carpeta `logs/` configurados (755)
- [ ] `.htaccess` para React Router configurado
- [ ] SSL/HTTPS activo
- [ ] Test de formulario exitoso
- [ ] Emails de confirmación llegando
- [ ] Emails de notificación llegando
- [ ] Reply-To funcionando correctamente
- [ ] Logs registrando correctamente
- [ ] Sin errores en consola del navegador
- [ ] Sin errores en logs del servidor

---

## 📞 SOPORTE

Si algo falla en producción:

1. **Revisa logs primero:**
   ```bash
   tail -f backend/logs/email-log.txt
   ```

2. **Revisa logs del servidor:**
   ```bash
   tail -f /var/log/apache2/error.log  # Apache
   tail -f /var/log/nginx/error.log    # Nginx
   ```

3. **Modo debug temporal:**
   En `EmailController.php`:
   ```php
   error_reporting(E_ALL);
   ini_set('display_errors', 1);
   ```

---

## ✅ DESPLIEGUE COMPLETADO

Una vez que todo funcione:

1. ✅ Desactiva modo debug
2. ✅ Documenta la configuración
3. ✅ Guarda las credenciales en lugar seguro
4. ✅ Configura backups automáticos
5. ✅ Celebra! 🎉

---

**Última actualización**: 10 de Noviembre, 2025  
**Versión**: 1.0  
**Responsable**: DevOps Team MERIDIAN CONSULTING

