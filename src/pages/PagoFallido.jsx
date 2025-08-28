import React from "react";
import "../styles/PagoFallido.css";

const PagoFallido = () => {
  return (
    <div className="pago-container fallo">
      <div className="emoji">❌</div>
      <h1>¡Pago Fallido!</h1>
      <p>
        Algo salió mal 😔 <br />
        Intentá nuevamente o probá con otro método de pago.
      </p>
      <a href="/planes" className="btn-volver">
        Reintentar pago
      </a>
    </div>
  );
};

export default PagoFallido;




