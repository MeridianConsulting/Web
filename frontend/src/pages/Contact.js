import React from 'react';
import whatsappIcon from '../assets/img/whatsapp-icon.png';
import StaticMap from '../components/StaticMap';

const Contact = () => {
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
          

          {/* Mapa con punto fijo */}
          <div className="map-container" style={{ marginTop: '20px' }}>
            <StaticMap />
          </div>
        </div>

        {/* Columna derecha */}
        <div className="contact-form">
          <h3>Envíenos un mensaje</h3>
          <form
            action="https://formsubmit.co/info@meridian.com.co"
            method="POST"
          >
            {/* Paso 3: configuración de redirección y captchas */}
            <input type="hidden" name="_next" value="http://localhost:3000/gracias" />

            <input type="hidden" name="_captcha" value="false" />

            {/* ✅ Paso 4: establecer asunto del correo */}
            <input type="hidden" name="_subject" value="Nuevo mensaje desde el formulario de MERIDIAN" />

            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input type="text" id="name" name="name" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input type="email" id="email" name="email" required />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <select id="subject" name="subject" required>
                <option value="">Seleccione un asunto</option>
                <option value="Laboral">Laboral</option>
                <option value="Comercial">Comercial</option>
                <option value="Contable-financiero">Contable-financiero</option>
                <option value="HSEQ">Temas HSEQ</option>
                <option value="Otros temas">Otros temas</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <input type="text" id="company" name="company" />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea id="message" name="message" rows="5" required></textarea>
            </div>

            <button type="submit" className="submit-button">Enviar</button>
          </form>
        </div>
      </div>


    </div>
  );
};

export default Contact;
