import React, { useState, useRef, useEffect } from 'react';
import whatsappIcon from '../assets/img/whatsapp-icon.png';
import StaticMap from '../components/StaticMap';
import toast from '../utils/toast';
import { API_URL } from '../config/api';

const Contact = () => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const errorTimeouts = useRef({});
  const [startTime] = useState(Date.now() / 1000);

  const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

  const phoneOk = (v) => /^(\+57)?[3][0-9]{9}$/.test(v.replace(/\s/g, ''));

  const validate = (form) => {
    const e = {};
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const company = form.company.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();

    if (!name || name.length < 3) e.name = 'El nombre debe tener al menos 3 caracteres.';
    if (!email) e.email = 'El correo es obligatorio.';
    else if (!emailOk(email)) e.email = 'Ingresa un correo válido (ej. usuario@dominio.com).';
    if (!phone) e.phone = 'El teléfono es obligatorio.';
    else if (!phoneOk(phone)) e.phone = 'Ingresa un número colombiano válido (ej. 3001234567).';
    if (!service) e.service = 'Selecciona un servicio de interés.';
    if (!message || message.length < 10) e.message = 'El mensaje debe tener al menos 10 caracteres.';

    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const e = validate(form);
    setErrors(e);

    const hasErrors = Object.keys(e).length > 0;
    if (hasErrors) {
      // Mostrar toast de error
      toast.error('Por favor corrige los errores del formulario');
      
      // Enfocar y desplazar al primer error
      const firstKey = Object.keys(e)[0];
      const firstField = form[firstKey];
      if (firstField && firstField.focus) {
        firstField.focus();
        firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Preparar datos para enviar
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      company: form.company.value.trim() || 'No especificada',
      service: form.service.value,
      message: form.message.value.trim(),
      start_time: startTime,
      website: form.website?.value || '' // Honeypot
    };

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/controllers/EmailController.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        toast.success(data.message || '¡Mensaje enviado exitosamente!');
        form.reset();
        
        // Redirigir a página de agradecimiento después de 2 segundos
        setTimeout(() => {
          window.location.href = '/gracias';
        }, 2000);
      } else {
        throw new Error(data.message || 'Error al enviar el mensaje');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.message || 'Error al enviar el mensaje. Por favor intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Auto-eliminar errores después de 2 segundos
  useEffect(() => {
    // Limpiar timeouts anteriores
    Object.values(errorTimeouts.current).forEach(timeout => {
      if (timeout) clearTimeout(timeout);
    });
    errorTimeouts.current = {};

    // Crear nuevos timeouts para cada error
    Object.keys(errors).forEach(key => {
      errorTimeouts.current[key] = setTimeout(() => {
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors[key];
          return newErrors;
        });
        delete errorTimeouts.current[key];
      }, 2000);
    });

    // Limpiar timeouts al desmontar
    return () => {
      Object.values(errorTimeouts.current).forEach(timeout => {
        if (timeout) clearTimeout(timeout);
      });
    };
  }, [errors]);

  // Validación por campo (onInput/onBlur) para ir limpiando errores
  const clearError = (key) => {
    // Limpiar el timeout si existe
    if (errorTimeouts.current[key]) {
      clearTimeout(errorTimeouts.current[key]);
      delete errorTimeouts.current[key];
    }
    setErrors((s) => {
      const n = { ...s };
      delete n[key];
      return n;
    });
  };

  return (
    <div className="contact-container">
      <h1>Contáctenos</h1>

      <div className="contact-content">
        {/* Columna izquierda */}
        <div className="contact-info">
          <p><i className="fas fa-map-marker-alt"></i> <strong>Dirección:</strong> Cl. 67 #7 - 35, Bogotá</p>
          <p><i className="fas fa-phone-alt"></i> <strong>Teléfono:</strong> +57 (1) 123-4567</p>
          <p><i className="fas fa-envelope"></i> <strong>Email:</strong> info@meridian.com.co</p>
          <p><i className="fas fa-clock"></i> <strong>Horario:</strong> Lunes a Viernes, 7:30 AM - 5:00 PM</p>

          <div className="map-container">
            <StaticMap />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="contact-form">
          <h3>Envíenos un mensaje</h3>

          <form
            ref={formRef}
            noValidate
            onSubmit={handleSubmit}
          >

            {/* Nombre */}
            <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Escriba su nombre completo"
                onInput={() => clearError('name')}
                onBlur={(e) => {
                  if (!e.target.value.trim()) setErrors((s) => ({ ...s, name: 'Por favor ingresa tu nombre completo.' }));
                }}
              />
              {errors.name && <span className="error-bubble">{errors.name}</span>}
            </div>

            {/* Email */}
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="ejemplo@correo.com"
                onInput={() => clearError('email')}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (!v) setErrors((s) => ({ ...s, email: 'El correo es obligatorio.' }));
                  else if (!emailOk(v)) setErrors((s) => ({ ...s, email: 'Ingresa un correo válido (ej. usuario@dominio.com).' }));
                }}
              />
              {errors.email && <span className="error-bubble">{errors.email}</span>}
            </div>

            {/* Teléfono */}
            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="phone">Teléfono</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                placeholder="Ej. 3001234567"
                onInput={() => clearError('phone')}
                onBlur={(e) => {
                  const v = e.target.value.trim();
                  if (!v) setErrors((s) => ({ ...s, phone: 'El teléfono es obligatorio.' }));
                  else if (!phoneOk(v)) setErrors((s) => ({ ...s, phone: 'Ingresa un número colombiano válido (ej. 3001234567).' }));
                }}
              />
              {errors.phone && <span className="error-bubble">{errors.phone}</span>}
            </div>

            {/* Empresa (opcional) */}
            <div className="form-group">
              <label htmlFor="company">Empresa (opcional)</label>
              <input
                type="text"
                id="company"
                name="company"
                placeholder="Ingrese el nombre de su empresa"
              />
            </div>

            {/* Servicio de interés */}
            <div className={`form-group ${errors.service ? 'has-error' : ''}`}>
              <label htmlFor="service">Servicio de Interés</label>
              <select
                id="service"
                name="service"
                onChange={() => clearError('service')}
                onBlur={(e) => {
                  if (!e.target.value) setErrors((s) => ({ ...s, service: 'Selecciona un servicio.' }));
                }}
                defaultValue=""
              >
                <option value="" disabled hidden>Seleccione un servicio...</option>
                <option value="Geología del Petróleo">Geología del Petróleo</option>
                <option value="Ingeniería de Petróleos">Ingeniería de Petróleos</option>
                <option value="Company Man">Company Man</option>
                <option value="Minería">Minería</option>
                <option value="Gestión Ambiental">Gestión Ambiental</option>
                <option value="Control Técnico de Operaciones">Control Técnico de Operaciones</option>
                <option value="Consultoría General">Consultoría General</option>
                <option value="Otro">Otro</option>
              </select>
              {errors.service && <span className="error-bubble">{errors.service}</span>}
            </div>

            {/* Campo honeypot (oculto) */}
            <input
              type="text"
              name="website"
              style={{ display: 'none' }}
              tabIndex="-1"
              autoComplete="off"
            />

            {/* Mensaje */}
            <div className={`form-group ${errors.message ? 'has-error' : ''}`}>
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Escriba su mensaje aquí..."
                onInput={() => clearError('message')}
                onBlur={(e) => {
                  if (!e.target.value.trim()) setErrors((s) => ({ ...s, message: 'Cuéntanos brevemente tu mensaje.' }));
                }}
              />
              {errors.message && <span className="error-bubble">{errors.message}</span>}
            </div>

            <button 
              type="submit" 
              className="submit-button btn-ripple" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner spinner-small" style={{marginRight: '8px'}}></span>
                  Enviando...
                </>
              ) : (
                'Enviar Mensaje'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
