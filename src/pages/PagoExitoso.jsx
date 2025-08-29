import React from "react";
import "../styles/PagoExitoso.css";

const PagoExitoso = () => {
  return (
    <div className="pago-container exito">
      <div className="emoji">✅</div>
      <h1>¡Pago Exitoso!</h1>
      <p>
        Gracias por tu confianza 💪 <br />
        Ya tenés tu plan activado en <span>OUT GYM</span>.
      </p>
      <a href="/" className="btn-volver">
        Volver al inicio
      </a>
    </div>
  );
};

export default PagoExitoso;



