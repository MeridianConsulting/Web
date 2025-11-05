import React from 'react';

const Terms = () => {
  return (
    <div className="terms-container">
      <h1>Términos de Uso</h1>
      
      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Aceptación de los Términos</h2>
          <p>
            Al acceder y utilizar el sitio web de Meridian Consulting Ltda., usted acepta estar sujeto a estos términos y condiciones de uso. 
            Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Uso del Sitio Web</h2>
          <p>
            El contenido de este sitio web es solo para fines informativos. Usted puede ver, descargar e imprimir contenido del sitio web 
            únicamente para uso personal y no comercial, siempre que respete los derechos de autor y otras restricciones de propiedad.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Propiedad Intelectual</h2>
          <p>
            Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de Meridian Consulting Ltda. 
            y está protegido por las leyes de derechos de autor y otras leyes de propiedad intelectual.
          </p>
        </section>

        <section className="terms-section">
          <h2>4. Limitación de Responsabilidad</h2>
          <p>
            Meridian Consulting Ltda. no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte 
            del uso o la imposibilidad de usar este sitio web o su contenido.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Modificaciones</h2>
          <p>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después 
            de su publicación en el sitio web. Le recomendamos revisar periódicamente estos términos.
          </p>
        </section>

        <section className="terms-section">
          <h2>6. Contacto</h2>
          <p>
            Si tiene preguntas sobre estos términos de uso, puede contactarnos en:
          </p>
          <div className="contact-info-box">
            <p><strong>Email:</strong> info@meridian.com.co</p>
            <p><strong>Teléfono:</strong> +57 (1) 123-4567</p>
            <p><strong>Dirección:</strong> Cl. 67 #7 - 35, Bogotá, Colombia</p>
          </div>
        </section>

        <div className="terms-footer">
          <p>
            Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

