import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MembresiaModal.css";

const MembresiaModal = () => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="membership-jumbotron">
      <div className="jumbotron-grid">
        {/* Columna izquierda - Título MEMBRESÍA */}
        <div className="membership-title-container">
          <h3 className="membership-subtitle">Sumate a nuestra</h3>
          <h1 className="membership-title">MEMBRESIA</h1>
        </div>

        {/* Columna derecha - Contenido */}
        <div className="jumbotron-content">
          <p className="jumbotron-description">
            Acceso ilimitado a todas las instalaciones, aparatos y clases sin
            necesidad de reservas previas. Disfruta de la libertad de entrenar
            cuando quieras y participar en todas las actividades que ofrecemos y
            un bonus extra de un 20% de descuento en todas nuestros productos.
          </p>
          <div className="jumbotron-buttons-container">
            <button className="jumbotron-button" onClick={handleOpenModal}>
              ¿Qué incluye?
            </button>
            <Link to="/*" className="membresia-boton"><button className="jumbotron-button inverse-button">¡Quiero la Membresía!</button></Link>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="membership-modal-overlay" onClick={handleCloseModal}>
          <div
            className="membership-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src="/images/logoblancotransparente.png"
              alt="Logo del gimnasio"
              className="modal-logo"
            />
            <h2 className="modal-title">MEMBRESIA PREMIUM</h2>
            <p className="modal-description">
              Es el pase libre al uso de todas las instalaciones sin turnos
              previos y con acceso a tomar todas las clases que quieras. Además
              un 20% de descuento en todos los productos de venta en OUTGYM.
            </p>
            <button className="modal-close-button" onClick={handleCloseModal}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MembresiaModal;
