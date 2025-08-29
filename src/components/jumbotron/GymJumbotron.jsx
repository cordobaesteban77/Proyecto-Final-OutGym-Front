import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./GymJumbotron.css";

const GymJumbotron = () => {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef(null);

  const openVideoModal = () => {
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    // Pausar el video al cerrar el modal
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  return (
    <>
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
            <h1 className="jumbotron-title">
              Nuestro Espacio de Entrenamiento
            </h1>
            <p className="jumbotron-description">
              Bienvenido a nuestro gimnasio premium, diseñado para ofrecerte la
              mejor experiencia de entrenamiento. Contamos con equipos de última
              generación, áreas especializadas y un ambiente motivador para
              ayudarte a alcanzar tus metas fitness. Nuestras instalaciones de
              200m² incluyen zona de cardio, pesas libres, máquinas de
              resistencia y área funcional.
            </p>
            <button className="jumbotron-button" onClick={openVideoModal}>
              Conoce más
            </button>
          </div>
        </div>
      </div>

      {/* Modal para el video */}
      {isVideoModalOpen && (
        <div className="video-modal-overlay">
          <div className="video-modal-content">
            <button className="video-modal-close-btn" onClick={closeVideoModal}>
              ×
            </button>

            <div className="video-container">
              <video
                ref={videoRef}
                autoPlay
                muted={isMuted}
                loop
                className="video-player"
              >
                <source
                  src="/videos/energia_que_te_transforma.mp4"
                  type="video/mp4"
                />
                <source
                  src="/videos/energia_que_te_transforma.webm"
                  type="video/webm"
                />
                Tu navegador no soporta el elemento de video.
              </video>

              <div className="video-controls">
                <button className="mute-toggle-btn" onClick={toggleMute}>
                  {isMuted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="24"
                      height="24"
                    >
                      <path
                        fill="currentColor"
                        d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button className="video-modal-back-btn" onClick={closeVideoModal}>
              Volver
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default GymJumbotron;
