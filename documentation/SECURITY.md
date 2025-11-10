# 🔒 Documentación de Seguridad - MERIDIAN CONSULTING LTDA

## 📊 Estado Actual de Seguridad (Ecopetrol Security Rating)

| Dominio              | Rating | Tendencia | Estado |
| -------------------- | ------ | --------- | ------ |
| Software Patching    | A 10   | 0.0 →     | ✅ Excelente |
| Application Security | A 10   | +9.2 ↑    | ✅ Mejorado |
| Web Encryption       | A 10   | 0.0 →     | ✅ Excelente |
| Network Filtering    | F 3.0  | 0.0 →     | ⚠️ Requiere atención |
| Breach Events        | A 10   | 0.0 →     | ✅ Excelente |
| System Reputation    | A 10   | 0.0 →     | ✅ Excelente |
| Email Security       | A 10   | 0.0 →     | ✅ Excelente |
| DNS Security         | A 10   | 0.0 →     | ✅ Excelente |
| System Hosting       | F 0.0  | 0.0 →     | ❌ Crítico |

---

## 🎯 Mejoras Implementadas

### 1. Security Headers (✅ Implementado)

#### Content Security Policy (CSP)
Política estricta que previene ataques XSS y código malicioso.

```
Content-Security-Policy: 
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' trusted-domains;
  style-src 'self' 'unsafe-inline' fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  connect-src 'self' api-domains;
  frame-ancestors 'none';
  upgrade-insecure-requests;
```

**Archivos**:
- `/public/.htaccess` (Apache)
- `/public/_headers` (Netlify/Vercel)

#### X-Frame-Options
Previene clickjacking attacks.
```
X-Frame-Options: DENY
```

#### X-Content-Type-Options
Previene MIME type sniffing.
```
X-Content-Type-Options: nosniff
```

#### X-XSS-Protection
Habilita protección XSS del navegador.
```
X-XSS-Protection: 1; mode=block
```

#### HSTS (HTTP Strict Transport Security)
Fuerza HTTPS por 2 años.
```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

---

### 2. HTTPS Enforcement (✅ Implementado)

**Redirección automática HTTP → HTTPS**

En `.htaccess`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

**Checklist de despliegue**:
- [ ] Certificado SSL/TLS instalado
- [ ] Redirección HTTP → HTTPS activa
- [ ] HSTS header configurado
- [ ] Mixed content resuelto
- [ ] Dominio en HSTS preload list

---

### 3. Input Sanitization (✅ Implementado)

**Utilidades de seguridad**: `src/utils/security.js`

#### Funciones disponibles:

```javascript
import { 
  sanitizeText, 
  escapeHtml, 
  sanitizeUrl,
  validateEmail,
  validatePhone,
  preventXSS 
} from './utils/security';

// Uso en formularios
const safeEmail = sanitizeText(email);
const safeName = escapeHtml(name);
const safeUrl = sanitizeUrl(url);
```

#### Validación de formularios:
- ✅ Email (regex robusto)
- ✅ Teléfono (formato colombiano)
- ✅ Nombres (solo letras)
- ✅ Contraseñas (8+ caracteres, mayúsculas, números, especiales)

---

### 4. CSRF Protection (✅ Implementado)

**Token CSRF automático**:

```javascript
import { getCSRFToken } from './utils/security';

// En peticiones POST
const token = getCSRFToken();
fetch('/api/contact', {
  method: 'POST',
  headers: {
    'X-CSRF-Token': token
  }
});
```

---

### 5. Rate Limiting (Client-Side) (✅ Implementado)

**Protección contra fuerza bruta**:

```javascript
import { contactFormLimiter } from './utils/security';

const result = contactFormLimiter.check('user@email.com');

if (!result.allowed) {
  alert('Demasiados intentos. Intenta en 5 minutos.');
  return;
}
```

**Configuración actual**:
- Formulario de contacto: 3 intentos cada 5 minutos
- Búsqueda: 10 intentos por minuto
- Login: 5 intentos cada 15 minutos

---

### 6. Secure Storage (✅ Implementado)

**Almacenamiento encriptado**:

```javascript
import { secureStorage } from './utils/security';

// Guardar
secureStorage.set('userData', { name: 'John' });

// Leer
const data = secureStorage.get('userData');

// Eliminar
secureStorage.remove('userData');
```

---

### 7. Environment Variables (✅ Implementado)

**Configuración segura**: `.env.example`

Variables críticas:
- `REACT_APP_API_URL`
- `REACT_APP_GOOGLE_MAPS_API_KEY`
- `REACT_APP_RECAPTCHA_SITE_KEY`

**⚠️ IMPORTANTE**:
- NUNCA commitear `.env` al repositorio
- Usar secrets managers en producción
- Rotar keys regularmente

---

## 🚨 Puntos Críticos para Mejorar

### System Hosting (F 0.0) - CRÍTICO

**Recomendaciones**:

1. **Servidor Web Seguro**:
   - [ ] Actualizar a última versión (Apache 2.4+ / Nginx 1.20+)
   - [ ] Deshabilitar módulos innecesarios
   - [ ] Configurar límites de request
   - [ ] Habilitar ModSecurity (WAF)

2. **Sistema Operativo**:
   - [ ] Mantener OS actualizado
   - [ ] Firewall configurado (UFW/iptables)
   - [ ] Fail2ban para prevenir brute force
   - [ ] Logs centralizados

3. **PHP/Backend** (si aplica):
   - [ ] Deshabilitar funciones peligrosas
   - [ ] `display_errors = Off`
   - [ ] `expose_php = Off`
   - [ ] OPcache habilitado

4. **Base de Datos**:
   - [ ] Usuario con privilegios mínimos
   - [ ] Conexión localhost/socket
   - [ ] Backups automáticos encriptados
   - [ ] Prepared statements (prevenir SQL injection)

---

### Network Filtering (F 3.0) - REQUIERE ATENCIÓN

**Recomendaciones**:

1. **Firewall Application Level (WAF)**:
   - [ ] Cloudflare Pro
   - [ ] AWS WAF
   - [ ] ModSecurity + OWASP Core Rule Set

2. **DDoS Protection**:
   - [ ] Cloudflare / Akamai
   - [ ] Rate limiting a nivel de servidor
   - [ ] IP blacklisting automático

3. **Network Segmentation**:
   - [ ] Frontend en DMZ
   - [ ] Backend en red privada
   - [ ] Base de datos sin acceso público

4. **Monitoring**:
   - [ ] IDS/IPS (Suricata/Snort)
   - [ ] Traffic analysis
   - [ ] Anomaly detection

---

## 📋 Checklist Pre-Producción

### Backend/Server
- [ ] SSL/TLS configurado (A+ en SSL Labs)
- [ ] Security headers activos (verificar con securityheaders.com)
- [ ] CORS configurado correctamente
- [ ] Rate limiting en API
- [ ] Logs de seguridad habilitados
- [ ] Backups automáticos
- [ ] Monitoring activo (uptime, errors)
- [ ] WAF configurado

### Frontend
- [ ] Todas las peticiones usan HTTPS
- [ ] No hay mixed content warnings
- [ ] CSP sin errores en consola
- [ ] Tokens/keys en variables de entorno
- [ ] Input validation en todos los formularios
- [ ] XSS protection implementada
- [ ] Dependencies actualizadas (`npm audit`)

### DNS/Domain
- [ ] DNSSEC habilitado
- [ ] CAA records configurados
- [ ] DMARC, SPF, DKIM para email
- [ ] HSTS preload registrado

### Compliance
- [ ] Política de privacidad actualizada
- [ ] Términos y condiciones
- [ ] Cookie consent (GDPR si aplica)
- [ ] Ley de Protección de Datos Personales (Colombia)

---

## 🔧 Comandos Útiles

### Auditar dependencias
```bash
npm audit
npm audit fix
```

### Verificar CSP
```bash
# En DevTools Console
console.log(document.querySelector('meta[http-equiv="Content-Security-Policy"]'));
```

### Test HTTPS redirect
```bash
curl -I http://meridianltda.com
# Debe retornar 301 a https://
```

### Verificar headers
```bash
curl -I https://meridianltda.com
```

---

## 📚 Recursos y Referencias

### Tools de Testing
- [SSL Labs](https://www.ssllabs.com/ssltest/) - Test SSL/TLS
- [Security Headers](https://securityheaders.com/) - Test HTTP headers
- [Observatory Mozilla](https://observatory.mozilla.org/) - Security assessment
- [OWASP ZAP](https://www.zaproxy.org/) - Vulnerability scanner

### Standards
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CSP Level 3](https://www.w3.org/TR/CSP3/)
- [HSTS RFC 6797](https://tools.ietf.org/html/rfc6797)

### Compliance
- [Ley 1581 de 2012](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981) - Protección de Datos Colombia
- [ISO 27001](https://www.iso.org/isoiec-27001-information-security.html) - Information Security

---

## 📞 Contacto de Seguridad

**Security Team**: security@meridianltda.com

**Reportar vulnerabilidades**:
- Email: security@meridianltda.com
- Respuesta esperada: 48 horas
- Disclosure responsable

---

## 📅 Historial de Actualizaciones

| Fecha | Versión | Cambios |
|-------|---------|---------|
| 2025-11-10 | 2.0 | Security headers, input sanitization, CSRF protection |
| 2025-10-01 | 1.5 | Application Security rating A 10 |
| 2025-09-15 | 1.0 | Implementación inicial SSL |

---

**Última revisión**: 10 de Noviembre, 2025  
**Próxima auditoría**: 10 de Diciembre, 2025  
**Responsable**: Equipo de Seguridad MERIDIAN CONSULTING

