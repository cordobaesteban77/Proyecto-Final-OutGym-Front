import React from 'react';
import logo from '../assets/logo3.jpg';
import img1 from '../assets/img1.jpg';
import img2 from '../assets/img2.jpg';
import img3 from '../assets/img3.jpg';
import img4 from '../assets/img4.jpg';
import img5 from '../assets/img5.jpg';
import '../styles/sobrenosotros.css';

const SobreNosotros = () => {
  return (
    <div className="sobre-wrapper">
      <div className="sobre-container">
        <img src={logo} alt="OUT GYM logo" className="logo-top" />
        <h1 className="titulo-sobre">Sobre Nosotros</h1>
        <p className="texto-sobre">
          En <b>OUT GYM</b> nos enfocamos en transformar vidas con entrenamiento personalizado,
          motivación constante y un ambiente único. Nuestro equipo profesional está listo
          para ayudarte a alcanzar tus objetivos.
        </p>
        <div className="equipo-grid">
          <div className="card-nosotros">
            <img src={img1} alt="Mariana" />
            <p>Mariana Estofan Ceballos</p>
          </div>
          <div className="card-nosotros">
            <img src={img2} alt="Esteban" />
            <p>Esteban Córdoba</p>
          </div>
          <div className="card-nosotros">
            <img src={img3} alt="Cristian" />
            <p>Cristian Cabrera</p>
          </div>
          <div className="card-nosotros">
            <img src={img4} alt="Daniel" />
            <p>Daniel Osvaldo Suarez</p>
          </div>
          <div className="card-nosotros">
            <img src={img5} alt="Maria" />
            <p>Maria Laura</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SobreNosotros;




