import React from 'react';

const Privacy = () => {
  return (
    <div className="privacy-container" style={{ padding: '60px 5%', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#004aad', marginBottom: '30px', textAlign: 'center' }}>
        Política de Privacidad
      </h1>
      
      <div style={{ background: '#fff', padding: '40px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>1. Información que Recopilamos</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Meridian Consulting Ltda. recopila información que usted nos proporciona directamente, como cuando completa formularios de contacto, 
            solicita información o se comunica con nosotros. Esta información puede incluir nombre, dirección de correo electrónico, número de teléfono 
            y otra información relevante.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>2. Uso de la Información</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Utilizamos la información recopilada para:
          </p>
          <ul style={{ lineHeight: '1.8', color: '#555', paddingLeft: '20px' }}>
            <li>Responder a sus consultas y solicitudes</li>
            <li>Proporcionar nuestros servicios</li>
            <li>Mejorar nuestro sitio web y servicios</li>
            <li>Enviar comunicaciones relacionadas con nuestros servicios</li>
          </ul>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>3. Protección de Datos</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Implementamos medidas de seguridad técnicas y organizativas para proteger su información personal contra acceso no autorizado, 
            alteración, divulgación o destrucción. Sin embargo, ningún método de transmisión por Internet es 100% seguro.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>4. Compartir Información</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            No vendemos, alquilamos ni compartimos su información personal con terceros, excepto cuando sea necesario para proporcionar nuestros 
            servicios o cuando la ley lo requiera.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>5. Sus Derechos</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Usted tiene derecho a acceder, rectificar, eliminar o oponerse al procesamiento de su información personal. Para ejercer estos derechos, 
            puede contactarnos utilizando la información de contacto proporcionada al final de esta política.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>6. Cookies</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Nuestro sitio web puede utilizar cookies para mejorar su experiencia de navegación. Puede configurar su navegador para rechazar cookies, 
            aunque esto puede afectar algunas funcionalidades del sitio.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>7. Cambios a esta Política</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos 
            publicando la nueva política en esta página.
          </p>
        </section>

        <section style={{ marginBottom: '40px' }}>
          <h2 style={{ fontSize: '1.8rem', color: '#004aad', marginBottom: '20px' }}>8. Contacto</h2>
          <p style={{ lineHeight: '1.8', color: '#555', marginBottom: '15px' }}>
            Si tiene preguntas sobre esta política de privacidad, puede contactarnos en:
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

export default Privacy;

