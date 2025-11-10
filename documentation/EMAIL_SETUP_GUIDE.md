# 📧 Guía de Configuración del Sistema de Correos
**MERIDIAN CONSULTING LTDA**

---

## ✅ Sistema Implementado

El formulario de contacto ahora env

ía correos **directamente desde PHP** sin necesidad de APIs externas de Gmail.

### Características:
- ✅ Envío de correos con PHP nativo
- ✅ Confirmación automática al cliente
- ✅ Notificación al administrador
- ✅ Validación y sanitización de datos
- ✅ Protección contra spam (honeypot + rate limiting)
- ✅ Templates HTML profesionales
- ✅ Rate limiting (5 intentos por hora)
- ✅ Logs de envíos
- ✅ Soporte para SMTP (opcional)

---

## 📁 Archivos Creados

```
backend/
├── controllers/
│   └── EmailController.php       # Controlador principal
├── config/
│   └── email-config.php           # Configuración de email
├── utils/
│   └── email-sender.php           # Clase para enviar correos
└── logs/
    ├── email-log.txt              # Log de envíos
    └── rate-limit.json            # Control de rate limiting
```

---

## 🔧 Configuración Inicial

### 1. **Configurar Emails de Destino**

Edita `backend/config/email-config.php`:

```php
// Email donde recibirás los mensajes
define('EMAIL_ADMIN', 'contacto@meridianltda.com');

// Email del remitente
define('EMAIL_FROM', 'info@meridianltda.com');
define('EMAIL_FROM_NAME', 'MERIDIAN CONSULTING LTDA');
```

### 2. **Configurar XAMPP para Enviar Correos**

#### Opción A: Usar Gmail SMTP (Recomendado para desarrollo)

1. Habilita SMTP en `email-config.php`:
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.gmail.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'tu-email@gmail.com');
define('SMTP_PASSWORD', 'tu-contraseña-de-aplicacion');
```

2. **Genera una contraseña de aplicación en Gmail**:
   - Ve a https://myaccount.google.com/security
   - Activa "Verificación en 2 pasos"
   - Ve a "Contraseñas de aplicaciones"
   - Selecciona "Correo" y "Windows Computer"
   - Copia la contraseña generada

3. **Instala PHPMailer**:
```bash
cd backend
composer require phpmailer/phpmailer
```

#### Opción B: Usar mail() nativo de PHP

1. Configura `php.ini` en XAMPP (`C:\xampp\php\php.ini`):
```ini
[mail function]
SMTP = smtp.gmail.com
smtp_port = 587
sendmail_from = tu-email@gmail.com
sendmail_path = "\"C:\xampp\sendmail\sendmail.exe\" -t"
```

2. Configura `sendmail.ini` (`C:\xampp\sendmail\sendmail.ini`):
```ini
[sendmail]
smtp_server=smtp.gmail.com
smtp_port=587
auth_username=tu-email@gmail.com
auth_password=tu-contraseña-de-aplicacion
force_sender=tu-email@gmail.com
```

3. Deja SMTP desactivado en `email-config.php`:
```php
define('USE_SMTP', false);
```

---

## 🚀 Cómo Funciona

### Flujo de Envío:

```
1. Usuario llena el formulario en React
                ↓
2. Se valida en el frontend
                ↓
3. Se envía a EmailController.php
                ↓
4. EmailController valida y sanitiza
                ↓
5. Verifica spam y rate limiting
                ↓
6. EmailSender envía 2 correos:
   - Confirmación al cliente
   - Notificación al administrador
                ↓
7. Retorna respuesta JSON
                ↓
8. React muestra toast y redirige
```

---

## 📧 Tipos de Correos

### 1. **Confirmación al Cliente**

Se envía a: Email del usuario  
Asunto: ✅ Confirmación de Mensaje Recibido - MERIDIAN CONSULTING  
Contenido:
- Saludo personalizado
- Confirmación de recepción
- Tiempo de respuesta esperado
- Contacto de WhatsApp

### 2. **Notificación al Administrador**

Se envía a: EMAIL_ADMIN  
Asunto: 📧 Nuevo Mensaje de Contacto - [Nombre del Usuario]  
Contenido:
- Datos del cliente (nombre, email, teléfono, empresa)
- Servicio de interés
- Mensaje completo
- Botones de acción (responder por email o WhatsApp)

---

## 🛡️ Seguridad Implementada

### 1. **Validación de Datos**
```php
✅ Nombre: mínimo 3 caracteres
✅ Email: formato válido
✅ Teléfono: formato colombiano (3XXXXXXXXX)
✅ Mensaje: mínimo 10 caracteres
```

### 2. **Sanitización**
```php
✅ Eliminación de HTML tags
✅ Escape de caracteres especiales
✅ Trim de espacios en blanco
```

### 3. **Protección contra Spam**

#### Honeypot Field:
```html
<input type="text" name="website" style="display:none" />
```
Si este campo está lleno = Bot detectado

#### Time Check:
Si el formulario se envía en menos de 3 segundos = Bot detectado

### 4. **Rate Limiting**
- Máximo 5 intentos por hora por IP
- Se registra en `logs/rate-limit.json`

### 5. **Logs de Actividad**
Cada envío se registra en `logs/email-log.txt`:
```
[2025-11-10 15:30:00] Juan Pérez - juan@example.com (192.168.1.1) - Status: SUCCESS
```

---

## 🧪 Testing

### 1. **Test Básico (localhost)**

```bash
# Asegúrate de que el servidor esté corriendo
cd C:\xampp\htdocs\Web\backend
php -S localhost:8000
```

### 2. **Test desde React**

```bash
cd frontend
npm start
```

Visita http://localhost:3000/contacto y llena el formulario.

### 3. **Test con Postman/cURL**

```bash
curl -X POST http://localhost/Web/backend/controllers/EmailController.php \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "phone": "3001234567",
    "company": "Test Company",
    "service": "Consultoría General",
    "message": "Este es un mensaje de prueba",
    "start_time": 1699634400
  }'
```

Respuesta esperada:
```json
{
  "success": true,
  "message": "¡Mensaje enviado exitosamente! Te responderemos pronto."
}
```

---

## 🐛 Troubleshooting

### Problema 1: "No se envía el correo"

**Solución**:
1. Verifica la configuración de `email-config.php`
2. Revisa los logs en `logs/email-log.txt`
3. Verifica que XAMPP tenga permisos para enviar correos
4. Prueba con `USE_SMTP = true` y PHPMailer

### Problema 2: "CORS Error"

**Solución**:
El controlador ya tiene headers CORS configurados. Verifica que la URL sea correcta:
```javascript
http://localhost/Web/backend/controllers/EmailController.php
```

### Problema 3: "Rate limit exceeded"

**Solución**:
Espera 1 hora o elimina el archivo `logs/rate-limit.json`

### Problema 4: "Gmail bloquea el envío"

**Solución**:
1. Usa una **contraseña de aplicación** (no tu contraseña normal)
2. Activa "Acceso de apps menos seguras" en Gmail
3. O usa otro servicio SMTP (SendGrid, Mailgun, etc.)

---

## 🚀 Despliegue en Producción

### 1. **Hosting Compartido**

Si tu hosting soporta PHP:
```php
// En email-config.php
define('USE_SMTP', false); // Usar mail() nativo
```

### 2. **VPS/Servidor Dedicado**

Instala y configura un servidor SMTP (Postfix):
```bash
sudo apt-get install postfix
```

### 3. **Servicios SMTP Externos**

Para mayor fiabilidad, usa:
- **SendGrid** (100 emails/día gratis)
- **Mailgun** (5,000 emails/mes gratis)
- **Amazon SES** (muy económico)

Configura en `email-config.php`:
```php
define('USE_SMTP', true);
define('SMTP_HOST', 'smtp.sendgrid.net');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'apikey');
define('SMTP_PASSWORD', 'tu-api-key');
```

---

## 📊 Monitoreo

### Ver logs de envíos:
```bash
tail -f backend/logs/email-log.txt
```

### Ver rate limiting:
```bash
cat backend/logs/rate-limit.json
```

---

## 🔐 Recomendaciones de Seguridad

1. ✅ **Nunca** commits las contraseñas en Git
2. ✅ Usa variables de entorno para credenciales
3. ✅ Limita el rate limiting en producción
4. ✅ Monitorea los logs regularmente
5. ✅ Implementa reCAPTCHA v3 para mayor protección
6. ✅ Usa HTTPS en producción
7. ✅ Configura SPF, DKIM y DMARC en tu dominio

---

## 📚 Recursos Adicionales

- [PHPMailer Documentation](https://github.com/PHPMailer/PHPMailer)
- [SendGrid PHP SDK](https://github.com/sendgrid/sendgrid-php)
- [XAMPP Email Configuration](https://www.apachefriends.org/faq_windows.html)

---

## ✅ Checklist de Configuración

- [ ] Configurar emails en `email-config.php`
- [ ] Elegir método de envío (SMTP o mail())
- [ ] Configurar XAMPP/PHP para enviar correos
- [ ] Instalar PHPMailer (si usa SMTP)
- [ ] Actualizar URL del endpoint en React
- [ ] Probar envío de formulario
- [ ] Verificar recepción de correos
- [ ] Revisar logs de envío
- [ ] Configurar dominio en producción
- [ ] Implementar monitoreo

---

**Última actualización**: 10 de Noviembre, 2025  
**Versión**: 1.0  
**Responsable**: DevOps Team MERIDIAN CONSULTING

