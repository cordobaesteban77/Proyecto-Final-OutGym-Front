import React from "react";
import "../styles/PagoPendiente.css";

const PagoPendiente = () => {
  return (
    <div className="pago-container pendiente">
      <div className="emoji">⏳</div>
      <h1>¡Pago Pendiente!</h1>
      <p>
        Tu pago está siendo procesado ⚡ <br />
      </p>
      <a href="/planes" className="btn-volver">
        Volver a los planes
      </a>
    </div>
  );
};

export default PagoPendiente;
