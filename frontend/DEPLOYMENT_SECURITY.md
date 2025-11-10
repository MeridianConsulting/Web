# 🚀 Guía de Despliegue Seguro - MERIDIAN CONSULTING

## Para mejorar System Hosting (F 0.0) y Network Filtering (F 3.0)

---

## 🎯 PRIORIDAD CRÍTICA: System Hosting

### Opción 1: Cloudflare + Hosting Moderno (RECOMENDADO)

#### Paso 1: Migrar a Cloudflare
```bash
# Beneficios inmediatos:
✅ WAF (Web Application Firewall) incluido
✅ DDoS protection automático
✅ SSL/TLS gratis con Auto-renew
✅ CDN global (mejor performance)
✅ Network filtering A+
```

**Configuración**:
1. Crear cuenta en Cloudflare
2. Agregar dominio `meridianltda.com`
3. Cambiar nameservers en registrador
4. Activar en Cloudflare:
   - [ ] SSL/TLS: Full (Strict)
   - [ ] Always Use HTTPS: ON
   - [ ] Automatic HTTPS Rewrites: ON
   - [ ] Minimum TLS Version: 1.2
   - [ ] WAF: ON (Managed Rules)
   - [ ] DDoS Protection: ON
   - [ ] Bot Fight Mode: ON

#### Paso 2: Hosting Recomendado

**Opción A: Netlify** (Más fácil)
```bash
# Ventajas:
✅ Deploy automático desde Git
✅ HTTPS automático
✅ CDN global incluido
✅ Headers de seguridad por defecto
✅ Gratis para sitios estáticos

# Despliegue:
1. Conectar repositorio GitHub
2. Build command: npm run build
3. Publish directory: build
4. Copiar contenido de _headers al root
```

**Opción B: Vercel** (Alternativa)
```bash
✅ Similar a Netlify
✅ Optimizado para React
✅ Edge functions disponibles
✅ Analytics incluido
```

**Opción C: AWS + CloudFront** (Enterprise)
```bash
✅ Máxima escalabilidad
✅ Control total
✅ Integración con servicios AWS
⚠️ Requiere conocimientos técnicos
```

---

### Opción 2: Servidor Actual (Apache/cPanel)

Si deben mantener hosting actual, implementar TODO esto:

#### A. Actualización del Servidor

```bash
# 1. Actualizar Apache
sudo apt update
sudo apt upgrade apache2

# 2. Verificar versión (debe ser 2.4+)
apache2 -v

# 3. Habilitar módulos de seguridad
sudo a2enmod headers
sudo a2enmod ssl
sudo a2enmod rewrite
sudo a2enmod security2  # ModSecurity
sudo systemctl restart apache2
```

#### B. Instalar y Configurar ModSecurity (WAF)

```bash
# Instalar ModSecurity
sudo apt install libapache2-mod-security2

# Configurar reglas OWASP
cd /etc/apache2/modsecurity.d
sudo git clone https://github.com/coreruleset/coreruleset.git
cd coreruleset
sudo mv crs-setup.conf.example crs-setup.conf

# Activar en Apache config
sudo nano /etc/apache2/mods-enabled/security2.conf
```

Agregar:
```apache
<IfModule security2_module>
    SecRuleEngine On
    Include /etc/apache2/modsecurity.d/coreruleset/crs-setup.conf
    Include /etc/apache2/modsecurity.d/coreruleset/rules/*.conf
</IfModule>
```

#### C. Configurar Fail2Ban (Prevenir Brute Force)

```bash
# Instalar
sudo apt install fail2ban

# Configurar
sudo nano /etc/fail2ban/jail.local
```

Agregar:
```ini
[apache-auth]
enabled = true
port = http,https
filter = apache-auth
logpath = /var/log/apache2/error.log
maxretry = 3
bantime = 3600

[apache-badbots]
enabled = true
port = http,https
filter = apache-badbots
logpath = /var/log/apache2/access.log
maxretry = 2
bantime = 86400

[apache-noscript]
enabled = true
port = http,https
filter = apache-noscript
logpath = /var/log/apache2/error.log
maxretry = 3
bantime = 3600
```

```bash
# Reiniciar
sudo systemctl restart fail2ban
sudo systemctl enable fail2ban

# Verificar status
sudo fail2ban-client status
```

#### D. Firewall (UFW)

```bash
# Configurar UFW
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw allow 22/tcp  # SSH
sudo ufw allow 80/tcp  # HTTP
sudo ufw allow 443/tcp # HTTPS
sudo ufw enable

# Verificar
sudo ufw status verbose
```

#### E. SSL/TLS con Let's Encrypt

```bash
# Instalar Certbot
sudo apt install certbot python3-certbot-apache

# Obtener certificado
sudo certbot --apache -d meridianltda.com -d www.meridianltda.com

# Auto-renovación (verificar)
sudo certbot renew --dry-run

# Mejorar configuración SSL
sudo nano /etc/apache2/sites-available/meridianltda-le-ssl.conf
```

Agregar cipher suite seguro:
```apache
SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
SSLCipherSuite ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384
SSLHonorCipherOrder on
SSLCompression off
SSLSessionTickets off
```

#### F. Hardening Adicional

```bash
# Ocultar versión de Apache
sudo nano /etc/apache2/conf-available/security.conf
```

Cambiar:
```apache
ServerTokens Prod
ServerSignature Off
TraceEnable Off
```

```bash
sudo a2enconf security
sudo systemctl restart apache2
```

---

## 🌐 Network Filtering

### Implementación Recomendada

#### 1. Cloudflare WAF (Más Efectivo)

**Reglas personalizadas para crear**:

```javascript
// Bloquear países de alto riesgo (ajustar según necesidad)
(ip.geoip.country in {"CN" "RU" "KP"}) and not (http.request.uri.path contains "/api/public")

// Bloquear user agents maliciosos
(http.user_agent contains "scrapy" or 
 http.user_agent contains "nikto" or 
 http.user_agent contains "sqlmap")

// Rate limiting agresivo para formularios
(http.request.uri.path eq "/api/contact" and rate > 5)

// Bloquear SQL injection attempts
(http.request.uri.query contains "union select" or
 http.request.uri.query contains "' or 1=1" or
 http.request.uri.query contains "drop table")
```

#### 2. ModSecurity Rules

Crear `/etc/apache2/modsecurity.d/custom-rules.conf`:

```apache
# Bloquear SQL Injection
SecRule ARGS|ARGS_NAMES|REQUEST_COOKIES|REQUEST_COOKIES_NAMES|REQUEST_BODY|REQUEST_HEADERS|XML:/*|XML://@* \
    "@rx (?i:(?:,|;|\s)+(?:union|select|insert|update|delete|drop|create|alter|exec|script))" \
    "id:1000,phase:2,block,log,msg:'SQL Injection Attempt',severity:CRITICAL"

# Bloquear XSS
SecRule ARGS|ARGS_NAMES|REQUEST_COOKIES|REQUEST_COOKIES_NAMES|REQUEST_BODY|REQUEST_HEADERS|XML:/*|XML://@* \
    "@rx <[\/]?script" \
    "id:1001,phase:2,block,log,msg:'XSS Attempt',severity:CRITICAL"

# Bloquear path traversal
SecRule REQUEST_URI|ARGS|ARGS_NAMES \
    "@rx \.\." \
    "id:1002,phase:1,block,log,msg:'Path Traversal Attempt',severity:WARNING"

# Rate limiting por IP
SecRule IP:RATE_LIMIT "@gt 100" \
    "id:1003,phase:1,block,log,msg:'Rate limit exceeded'"
```

---

## 📊 Verificación Post-Implementación

### Checklist de Validación

```bash
# 1. Test SSL/TLS
curl -I https://meridianltda.com
# Debe retornar 200 con headers de seguridad

# 2. Test security headers
curl -I https://meridianltda.com | grep -i "x-frame\|strict-transport\|content-security"

# 3. Test WAF
curl -X POST "https://meridianltda.com/api/test?id=1' OR 1=1--"
# Debe retornar 403 Forbidden

# 4. Test rate limiting
for i in {1..20}; do curl https://meridianltda.com; done
# Después de X requests debe bloquear

# 5. Verificar firewall
sudo ufw status
sudo fail2ban-client status apache-auth
```

### Herramientas Online

1. **SSL Labs**: https://www.ssllabs.com/ssltest/analyze.html?d=meridianltda.com
   - Objetivo: A+

2. **Security Headers**: https://securityheaders.com/?q=meridianltda.com
   - Objetivo: A+

3. **Mozilla Observatory**: https://observatory.mozilla.org/analyze/meridianltda.com
   - Objetivo: A+

4. **Qualys WAF Test**: https://www.immuniweb.com/websec/
   - Objetivo: A

---

## 🎯 Timeline de Implementación

### Semana 1: Crítico
- [ ] Migrar DNS a Cloudflare
- [ ] Activar WAF y DDoS protection
- [ ] Configurar SSL/TLS (A+ en SSL Labs)
- [ ] Deploy en Netlify/Vercel (o configurar hosting actual)

### Semana 2: Importante
- [ ] Instalar ModSecurity si es hosting propio
- [ ] Configurar Fail2Ban
- [ ] Firewall UFW/iptables
- [ ] Monitoring y alertas

### Semana 3: Optimización
- [ ] Fine-tuning de WAF rules
- [ ] Performance optimization
- [ ] Penetration testing
- [ ] Documentation updates

---

## 💰 Costos Estimados

### Opción Cloud (Recomendada)
```
Cloudflare Free:     $0/mes  ✅ Suficiente para empezar
Cloudflare Pro:     $20/mes  ⭐ Recomendado
Netlify Free:        $0/mes  ✅
Netlify Pro:        $19/mes

TOTAL: $0-39/mes
Rating esperado: System Hosting A, Network Filtering A+
```

### Opción Hosting Actual
```
Let's Encrypt SSL:   $0
ModSecurity:         $0
Fail2Ban:            $0
Mantenimiento:    Tiempo de equipo técnico

TOTAL: $0 (requiere expertise técnico)
Rating esperado: System Hosting B, Network Filtering B+
```

---

## 📞 Soporte

**Problemas de implementación**: security@meridianltda.com

**Consultas Cloudflare**: https://community.cloudflare.com/

**Consultas Apache**: https://httpd.apache.org/docs/

---

**Última actualización**: 10 de Noviembre, 2025  
**Próxima revisión**: Post-implementación  
**Responsable**: DevOps Team MERIDIAN CONSULTING

