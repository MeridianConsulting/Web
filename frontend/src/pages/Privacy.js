import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy-container">
      <h1>Política de Privacidad</h1>
      
      <div className="privacy-content">
        <section className="privacy-section">
          <h2>1. Información que Recopilamos</h2>
          <p>
            Meridian Consulting Ltda. recopila información que usted nos proporciona directamente, como cuando completa formularios de contacto, 
            solicita información o se comunica con nosotros. Esta información puede incluir nombre, dirección de correo electrónico, número de teléfono 
            y otra información relevante.
          </p>
        </section>

        <section className="privacy-section">
          <h2>2. Uso de la Información</h2>
          <p>
            Utilizamos la información recopilada para:
          </p>
          <ul>
            <li>Responder a sus consultas y solicitudes</li>
            <li>Proporcionar nuestros servicios</li>
            <li>Mejorar nuestro sitio web y servicios</li>
            <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
          </ul>
        </section>

        <section className="privacy-section">
          <h2>3. Protección de Datos</h2>
          <p>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, 
            alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
          </p>
        </section>

        <section className="privacy-section">
          <h2>4. Compartir Información</h2>
          <p>
            No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros 
            servicios o cuando la ley lo requiera.
          </p>
        </section>

        <section className="privacy-section">
          <h2>5. Sus Derechos</h2>
          <p>
            Usted tiene derecho a acceder, rectificar, eliminar o oponerse al procesamiento de su información personal. Para ejercer estos derechos, 
            puede contactarnos utilizando la información de contacto proporcionada al final de esta política.
          </p>
        </section>

        <section className="privacy-section">
          <h2>6. Cookies</h2>
          <p>
            Nuestro sitio web puede utilizar cookies para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar cookies, 
            aunque esto puede afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section className="privacy-section">
          <h2>7. Cambios a esta Política</h2>
          <p>
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos 
            publicando la nueva política en esta página.
          </p>
        </section>

        <section className="privacy-section">
          <h2>8. Contacto</h2>
          <p>
            Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
          </p>
          <div className="contact-info-box">
            <p><strong>Email:</strong> info@meridian.com.co</p>
            <p><strong>Teléfono:</strong> +57 (1) 123-4567</p>
            <p><strong>Dirección:</strong> Cl. 67 #7 - 35, Bogotá, Colombia</p>
          </div>
        </section>

        <div className="privacy-footer">
          <p>
            Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

