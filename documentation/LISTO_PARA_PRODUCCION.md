# ✅ LISTO PARA SUBIR A PRODUCCIÓN
**MERIDIAN CONSULTING LTDA**

---

## 🎉 Configuración Completada

### ✅ Email Configurado
```
📥 Notificaciones llegarán a: info@meridian.com.co
📤 Correos se enviarán desde: auxiliarit@meridian.com.co
🔑 Contraseña: Med.db.2025$
🌐 Servidor SMTP: smtpout.secureserver.net (GoDaddy)
```

### ✅ URLs Configuradas
```
Desarrollo: http://localhost/Web/backend
Producción: https://meridianltda.com/backend
```

---

## 🚀 PASOS PARA SUBIR A PRODUCCIÓN

### 1️⃣ Cambiar a Modo Producción

Edita `frontend/src/config/api.js` - **Línea 4**:
```javascript
const ENVIRONMENT = 'production'; // ✅ Cambiar de 'development' a 'production'
```

### 2️⃣ Hacer Build de Producción

```bash
cd frontend
npm run build
```

Esto crea la carpeta `build/` con todos los archivos optimizados.

### 3️⃣ Subir Archivos al Servidor

#### Estructura en el servidor:
```
/public_html/ (o /htdocs/)
├── index.html                 ← De build/
├── static/                    ← De build/
│   ├── css/
│   ├── js/
│   └── media/
├── manifest.json              ← De build/
├── robots.txt                 ← De build/
├── sitemap.xml                ← De build/
├── pdf/                       ← De build/
├── service-worker.js          ← De build/
├── .htaccess                  ← Configurar para React Router
│
└── backend/                   ← Carpeta completa
    ├── config/
    │   └── email-config.php   ✅ Ya configurado
    ├── controllers/
    │   └── EmailController.php
    ├── utils/
    │   └── email-sender.php
    └── logs/                  ⚠️ Crear con permisos
        ├── email-log.txt
        └── rate-limit.json
```

### 4️⃣ Crear Carpeta de Logs

**Por SSH o Terminal de cPanel:**
```bash
mkdir -p backend/logs
chmod 755 backend/logs
touch backend/logs/email-log.txt
touch backend/logs/rate-limit.json
chmod 644 backend/logs/*.txt
chmod 644 backend/logs/*.json
```

**O por File Manager de cPanel:**
1. Navega a `/public_html/backend/`
2. Crea carpeta `logs`
3. Click derecho en `logs` → Permissions → `755`
4. Crea archivos: `email-log.txt` y `rate-limit.json`

### 5️⃣ Configurar .htaccess para React Router

Crea o edita `/public_html/.htaccess`:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  
  # No reescribir archivos que existen
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteCond %{REQUEST_FILENAME} !-l
  
  # No reescribir rutas del backend
  RewriteCond %{REQUEST_URI} !^/backend/
  
  # Redirigir todo a index.html
  RewriteRule . /index.html [L]
</IfModule>

# Habilitar CORS para el backend
<FilesMatch "\.(php)$">
  <IfModule mod_headers.c>
    Header set Access-Control-Allow-Origin "*"
    Header set Access-Control-Allow-Methods "GET, POST, OPTIONS"
    Header set Access-Control-Allow-Headers "Content-Type, Authorization"
  </IfModule>
</FilesMatch>
```

### 6️⃣ Verificar Permisos

```bash
# Backend
chmod 755 backend/
chmod 644 backend/config/email-config.php
chmod 644 backend/controllers/EmailController.php
chmod 644 backend/utils/email-sender.php
chmod 755 backend/logs/

# Frontend (si es necesario)
chmod 644 index.html
chmod 755 static/
```

---

## 🧪 TESTING EN PRODUCCIÓN

### Test 1: Verificar que el sitio carga
1. Visita `https://meridianltda.com`
2. Verifica que cargue correctamente
3. Navega a diferentes páginas

### Test 2: Probar el Formulario de Contacto
1. Ve a `https://meridianltda.com/contacto`
2. Llena el formulario con datos reales:
   ```
   Nombre: Test Usuario
   Email: tu-email-personal@gmail.com
   Teléfono: 3001234567
   Empresa: Test Company
   Servicio: Consultoría General
   Mensaje: Este es un mensaje de prueba
   ```
3. Click en "Enviar Mensaje"

### Test 3: Verificar Emails
Deberías recibir **2 emails**:

**Email 1 - A tu email personal:**
```
De: MERIDIAN CONSULTING LTDA <info@meridianltda.com>
Para: tu-email-personal@gmail.com
Asunto: ✅ Confirmación de Mensaje Recibido
```

**Email 2 - A info@meridian.com.co:**
```
De: MERIDIAN CONSULTING LTDA <info@meridianltda.com>
Para: info@meridian.com.co
Asunto: 📧 Nuevo Mensaje de Contacto - Test Usuario
Reply-To: tu-email-personal@gmail.com
```

### Test 4: Verificar Reply-To
1. Abre el email recibido en `info@meridian.com.co`
2. Click en "Responder"
3. El destinatario debe ser: `tu-email-personal@gmail.com`

### Test 5: Verificar Logs
```bash
# Por SSH o Terminal cPanel
cat backend/logs/email-log.txt
# Debe mostrar el registro del envío
```

---

## 🐛 TROUBLESHOOTING

### Problema: "No se envían los emails"

**Solución 1:** Verifica los logs
```bash
tail -f backend/logs/email-log.txt
```

**Solución 2:** Verifica que la contraseña sea correcta
```php
// backend/config/email-config.php - Línea 23
define('SMTP_PASSWORD', 'Med.db.2025$'); // ✅ Verificar
```

**Solución 3:** Prueba con puerto 587
```php
define('SMTP_PORT', 587); // Cambiar de 465 a 587
define('SMTP_SECURE', 'tls'); // Cambiar de 'ssl' a 'tls'
```

### Problema: "Error 404 al enviar formulario"

**Solución:** Verifica la URL
```bash
# Debe ser accesible:
https://meridianltda.com/backend/controllers/EmailController.php
```

### Problema: "CORS Error"

**Solución:** Ya está configurado en `EmailController.php`, pero verifica:
```php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
```

---

## 📊 MONITOREO POST-DESPLIEGUE

### Semana 1:
- ✅ Revisar logs diariamente
- ✅ Probar formulario 2 veces al día
- ✅ Verificar que lleguen todos los emails

### Después:
- ✅ Revisar logs semanalmente
- ✅ Backup mensual de `email-log.txt`
- ✅ Limpiar logs antiguos (> 30 días)

---

## 🔐 SEGURIDAD

### ⚠️ IMPORTANTE:
1. ✅ Nunca subas el archivo `.env` a Git
2. ✅ Mantén las contraseñas seguras
3. ✅ Revisa logs regularmente
4. ✅ Cambia contraseñas cada 3 meses
5. ✅ Haz backup de la configuración

### Archivo .gitignore:
```
# Ya está configurado en backend/.gitignore
.env
logs/*.txt
logs/*.json
```

---

## ✅ CHECKLIST FINAL DE DESPLIEGUE

- [✅] Email SMTP configurado (auxiliarit@meridian.com.co)
- [✅] Email de notificaciones configurado (info@meridian.com.co)
- [✅] Contraseña guardada de forma segura
- [ ] Modo producción activado en `api.js`
- [ ] Build generado (`npm run build`)
- [ ] Archivos subidos al servidor
- [ ] Carpeta `logs/` creada con permisos
- [ ] `.htaccess` configurado para React Router
- [ ] Permisos de archivos verificados
- [ ] Test de formulario exitoso
- [ ] Emails de confirmación llegando
- [ ] Emails de notificación llegando
- [ ] Reply-To funcionando correctamente
- [ ] Logs registrando correctamente
- [ ] Sin errores en consola del navegador
- [ ] SSL/HTTPS activo

---

## 📞 CONTACTO DE SOPORTE

Si algo falla:

1. **Revisa logs:** `backend/logs/email-log.txt`
2. **Revisa consola del navegador:** F12 → Console
3. **Contacta a GoDaddy:** Si hay problema con SMTP
4. **Revisa documentación:** `EMAIL_SETUP_GUIDE.md`

---

## 🎉 ¡ÉXITO!

Una vez que todo funcione:

1. ✅ Documenta la configuración
2. ✅ Guarda credenciales en lugar seguro
3. ✅ Configura monitoreo
4. ✅ Celebra! 🎊

---

**Fecha de configuración:** 10 de Noviembre, 2025  
**Sistema:** Formulario de Contacto con PHP + React  
**Email SMTP:** auxiliarit@meridian.com.co  
**Hosting:** GoDaddy (smtpout.secureserver.net)  
**Estado:** ✅ LISTO PARA PRODUCCIÓN

