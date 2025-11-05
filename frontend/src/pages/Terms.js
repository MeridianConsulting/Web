import React from 'react';

const Terms = () => {
  return (
    <div className="terms-container" style={{ padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#004aad', marginBottom: '30px', textAlign: 'center' }}>
        Términos de Uso
      </h1>
      
      <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>1. Aceptación de los Términos</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Al acceder y utilizar el sitio web de Meridian Consulting Ltda., usted acepta estar sujeto a estos términos y condiciones de uso. 
            Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro sitio web.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>2. Uso del Sitio Web</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            El contenido de este sitio web es solo para fines informativos. Usted puede ver, descargar e imprimir contenido del sitio web 
            únicamente para uso personal y no comercial, siempre que respete los derechos de autor y otras restricciones de propiedad.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>3. Propiedad Intelectual</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Todo el contenido del sitio web, incluyendo textos, gráficos, logos, imágenes y software, es propiedad de Meridian Consulting Ltda. 
            y está protegido por las leyes de derechos de autor y otras leyes de propiedad intelectual.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>4. Limitación de Responsabilidad</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Meridian Consulting Ltda. no será responsable de ningún daño directo, indirecto, incidental, especial o consecuente que resulte 
            del uso o la imposibilidad de usar este sitio web o su contenido.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>5. Modificaciones</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entrarán en vigor inmediatamente después 
            de su publicación en el sitio web. Le recomendamos revisar periódicamente estos términos.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>6. Contacto</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Si tiene preguntas sobre estos términos de uso, puede contactarnos en:
          </p>
          <p style={{ lineHeight: '1.8', color: '#555' }}>
            <strong>Email:</strong> info@meridian.com.co<br />
            <strong>Teléfono:</strong> +57 (1) 123-4567<br />
            <strong>Dirección:</strong> Cl. 67 #7 - 35, Bogotá, Colombia
          </p>
        </section>

        <div style={{ marginTop: '40px', padding: '20px', background: '#f8f9fa', borderRadius: '8px', textAlign: 'center' }}>
          <p style={{ margin: 0, color: '#888', fontSize: '0.9rem' }}>
            Última actualización: {new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;

