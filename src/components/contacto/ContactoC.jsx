import React, { useState } from "react";
import emailjs from "emailjs-com";
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que el formulario tenga todos los campos requeridos
    if (!formData.name || !formData.email || !formData.message) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos obligatorios marcados con *",
        icon: "warning",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1363df",
      });
      return;
    }

    setIsSubmitting(true);

    // Configuración de EmailJS
    const serviceID = "service_fjey5xd";
    const adminTemplateID = "template_a5n4b14"; // Plantilla para el administrador
    const userTemplateID = "template_oq7sn3a"; // Plantilla para confirmación al usuario
    const userID = "Ztw1LnEDQVzA8KStx";

    try {
      // Primero enviar el correo al administrador
      const adminResponse = await emailjs.send(
        serviceID,
        adminTemplateID,
        {
          to_email: "danisuarze@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject || "Consulta desde OUTGYM",
          message: formData.message,
          reply_to: formData.email, // Añadir esta línea
        },
        userID
      );

      console.log("Correo al administrador enviado con éxito!", adminResponse);

      // Luego enviar el correo de confirmación al usuario
      // Usar las variables exactas que espera la plantilla
      const userResponse = await emailjs.send(
        serviceID,
        userTemplateID,
        {
          to_email: formData.email,
          to_name: formData.name,
          subject: "Confirmación de contacto - OUTGYM",
          message: `Hola ${formData.name}, hemos recibido tu mensaje y nos pondremos en contacto contigo pronto. Gracias por contactarte con OUTGYM.`,
          // Asegúrate de usar las variables exactas que espera tu plantilla
          // Si tu plantilla usa {{user_email}} en lugar de {{to_email}}, debes cambiar esto
        },
        userID
      );

      console.log("Correo de confirmación enviado con éxito!", userResponse);

      // Mostrar SweetAlert de éxito
      Swal.fire({
        title: "¡Mensaje enviado!",
        text: "Gracias por contactarte con OUTGYM. Te hemos enviado un correo de confirmación.",
        icon: "success",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1363df",
      });

      // Resetear el formulario después del envío
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error("Error completo al enviar correo:", error);

      // Mostrar SweetAlert de error con más detalles
      Swal.fire({
        title: "Error",
        html: `
          <p>Hubo un problema al enviar tu mensaje.</p>
          <p><small>Código de error: ${
            error.status || "Desconocido"
          }</small></p>
          <p><small>${
            error.text || "Por favor, inténtalo de nuevo más tarde."
          }</small></p>
        `,
        icon: "error",
        confirmButtonText: "Aceptar",
        confirmButtonColor: "#1363df",
      });
    } finally {
      setIsSubmitting(false);
    }
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
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
                disabled={isSubmitting}
              ></textarea>
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactoC;
