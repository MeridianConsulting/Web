import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar el formulario
    console.log('Formulario enviado:', formData);
    alert('Gracias por contactarnos. Nos comunicaremos pronto.');
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <div className="contact-container">
      <h1>Contáctenos</h1>
      
      <div className="contact-content">
        <div className="contact-info">
          <h3>Información de Contacto</h3>
          <p><strong>Dirección:</strong> Calle Principal #123, Bogotá, Colombia</p>
          <p><strong>Teléfono:</strong> +57 (1) 123-4567</p>
          <p><strong>Email:</strong> info@meridianconsulting.com.co</p>
          <p><strong>Horario:</strong> Lunes a Viernes, 8:00 AM - 6:00 PM</p>
        </div>
        
        <div className="contact-form">
          <h3>Envíenos un mensaje</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Nombre completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="company">Empresa</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="5"
                required
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">Enviar mensaje</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact; 