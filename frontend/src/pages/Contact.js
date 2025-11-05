import React, { useState, useRef, useEffect } from 'react';
import whatsappIcon from '../assets/img/whatsapp-icon.png';
import StaticMap from '../components/StaticMap';

const Contact = () => {
  const [errors, setErrors] = useState({});
  const formRef = useRef(null);
  const errorTimeouts = useRef({});

  const emailOk = (v) => /^\S+@\S+\.\S+$/.test(v);

  const validate = (form) => {
    const e = {};
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const company = form.company.value.trim(); // opcional
    const message = form.message.value.trim();

    if (!name) e.name = 'Por favor ingresa tu nombre completo.';
    if (!email) e.email = 'El correo es obligatorio.';
    else if (!emailOk(email)) e.email = 'Ingresa un correo válido (ej. usuario@dominio.com).';
    if (!subject) e.subject = 'Selecciona un asunto.';
    if (!message) e.message = 'Cuéntanos brevemente tu mensaje.';

    return e;
  };

  const generateEmailTemplate = (form) => {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value;
    const company = form.company.value.trim();
    const message = form.message.value.trim();

    // Obtener el texto del asunto seleccionado
    const subjectText = form.subject.options[form.subject.selectedIndex].text;

    // Crear el asunto del correo
    const emailSubject = `Contacto desde formulario web - ${subjectText}`;

    // Crear el cuerpo del correo con plantilla profesional
    const emailBody = `Estimado equipo de Meridian Consulting Ltda.,

Les escribo a través del formulario de contacto de su sitio web.

--- INFORMACIÓN DE CONTACTO ---
Nombre completo: ${name}
Correo electrónico: ${email}
${company ? `Empresa: ${company}` : ''}

--- ASUNTO ---
${subjectText}

--- MENSAJE ---
${message}

---
Este mensaje fue enviado desde el formulario de contacto de meridian.com.co
Fecha: ${new Date().toLocaleString('es-CO', { dateStyle: 'long', timeStyle: 'short' })}
`;

    // Codificar para URL
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);
    const encodedTo = encodeURIComponent('info@meridian.com.co');

    // Crear el enlace de Gmail Compose
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodedTo}&su=${encodedSubject}&body=${encodedBody}`;

    return gmailLink;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const form = ev.target;
    const e = validate(form);
    setErrors(e);

    const hasErrors = Object.keys(e).length > 0;
    if (hasErrors) {
      // Enfocar y desplazar al primer error
      const firstKey = Object.keys(e)[0];
      const firstField = form[firstKey];
      if (firstField && firstField.focus) {
        firstField.focus();
        firstField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Si no hay errores, generar el enlace de Gmail y abrir Gmail Compose
    const gmailLink = generateEmailTemplate(form);
    window.open(gmailLink, '_blank');
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

            {/* Asunto */}
            <div className={`form-group ${errors.subject ? 'has-error' : ''}`}>
              <label htmlFor="subject">Asunto</label>
              <select
                id="subject"
                name="subject"
                onChange={() => clearError('subject')}
                onBlur={(e) => {
                  if (!e.target.value) setErrors((s) => ({ ...s, subject: 'Selecciona un asunto.' }));
                }}
                defaultValue=""
              >
                <option value="" disabled hidden>Seleccione un asunto...</option>
                <option value="Laboral">Laboral</option>
                <option value="Comercial">Comercial</option>
                <option value="Contable-financiero">Contable-financiero</option>
                <option value="HSEQ">Temas HSEQ</option>
                <option value="Otros temas">Otros temas</option>
              </select>
              {errors.subject && <span className="error-bubble">{errors.subject}</span>}
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

            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
