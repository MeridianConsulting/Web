import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import '../styles/styles.css';



const Thanks = () => {
  return (
    <div className="thanks-page">
      <div className="thanks-card">
        <CheckCircle className="thanks-icon" />
        <h1>¡Gracias por tu mensaje!</h1>
        <p>Hemos recibido tu información y te contactaremos lo más pronto posible.</p>
        <Link to="/" className="thanks-button">Volver al inicio</Link>
      </div>
    </div>
  );
};

export default Thanks;
