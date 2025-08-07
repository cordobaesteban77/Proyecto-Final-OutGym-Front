import React from "react";
import "./Parallaxbk.css";

const Parallaxbk = () => {
  return (
    <div className="parallax-container">
      <video autoPlay loop muted className="background-video">
        <source src="/videos/GYM_BK.mp4" type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div className="contenido">
        <h1 className="titulo">OUT GYM</h1>
        <p className="subtitulo text-center">Energía que te transforma</p>
      </div>
    </div>
  );
};

export default Parallaxbk;
