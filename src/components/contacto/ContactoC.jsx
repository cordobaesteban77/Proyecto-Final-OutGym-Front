import React, { useState } from "react";
import "./ContactoC.css";
import gymImage from "/images/contacto_gym.png";
import Swal from "sweetalert2";

const ContactoC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Mostrar SweetAlert de éxito
    Swal.fire({
      title: "¡Mensaje enviado!",
      text: "Gracias por contactarte con OUTGYM. Nos pondremos en contacto contigo pronto.",
      icon: "success",
      confirmButtonText: "Aceptar",
      confirmButtonColor: "#1363df",
      customClass: {
        popup: "sweetalert-popup",
        title: "sweetalert-title",
        text: "sweetalert-text",
        confirmButton: "sweetalert-confirm-button",
      },
    });

    // Resetear el formulario después del envío
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="contact-page-wrapper">
      <div className="contact-grid-container">
        {/* Columna izquierda - Información de contacto */}
        <div className="contact-info-column">
          <h2>OUTGYM</h2>
          <div className="contact-info">
            <h3>Información de contacto</h3>
            <div className="info-item">
              <h4>Dirección</h4>
              <p>
                Gral. Paz 576 - 9no. Piso
                <br />
                San Miguel de Tucumán | CP 4000
                <br />
                República Argentina
              </p>
            </div>
            <div className="info-item">
              <h4>Teléfono</h4>
              <p>+34 123 456 789</p>
            </div>
            <div className="info-item">
              <h4>Email</h4>
              <p>info@outgym.com</p>
            </div>
            <div className="info-item">
              <h4>Horario</h4>
              <p>
                Lunes a Viernes: 6:00 - 23:00
                <br />
                Sábados: 8:00 - 20:00
                <br />
                Domingos: 9:00 - 14:00
              </p>
            </div>
          </div>
        </div>

        {/* Columna central - Imagen del gimnasio */}
        <div className="gym-image-column">
          <img
            src={gymImage}
            alt="Interior del gimnasio OUTGYM"
            className="gym-image"
          />
        </div>

        {/* Columna derecha - Formulario de contacto */}
        <div className="contact-form-column">
          <h2>Contáctanos</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Nombre completo*</label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                required
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email*</label>
              <input
                type="email"
                id="email"
                placeholder="tu@email.com"
                required
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="subject">Asunto</label>
              <input
                type="text"
                id="subject"
                placeholder="Motivo de tu consulta"
                value={formData.subject}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Mensaje*</label>
              <textarea
                id="message"
                placeholder="Escribe tu mensaje aquí..."
                rows="6"
                required
                value={formData.message}
                onChange={handleChange}
              ></textarea>
            </div>

            <button type="submit" className="submit-btn">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoC;
