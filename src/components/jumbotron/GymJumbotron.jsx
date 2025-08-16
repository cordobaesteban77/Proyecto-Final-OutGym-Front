import React from "react";
import {Link} from "react-router-dom"
import "./GymJumbotron.css";

const GymJumbotron = () => {
  return (
    <div className="gym-jumbotron">
      <div className="jumbotron-grid">
        {/* Columna izquierda - Imagen */}
        <div className="jumbotron-image-container">
          <img
            src="/images/entorno.jpg"
            alt="Gimnasio moderno con equipos de ejercicio"
            className="jumbotron-image"
          />
        </div>

        {/* Columna derecha - Texto */}
        <div className="jumbotron-content">
          <h1 className="jumbotron-title">Nuestro Espacio de Entrenamiento</h1>
          <p className="jumbotron-description">
            Bienvenido a nuestro gimnasio premium, diseñado para ofrecerte la
            mejor experiencia de entrenamiento. Contamos con equipos de última
            generación, áreas especializadas y un ambiente motivador para
            ayudarte a alcanzar tus metas fitness. Nuestras instalaciones de
            1000m² incluyen zona de cardio, pesas libres, máquinas de
            resistencia y área funcional.
          </p>
          <Link to="/*" className="membresia-boton"><button className="jumbotron-button">Conoce más</button></Link>
        </div>
      </div>
    </div>
  );
};

export default GymJumbotron;
