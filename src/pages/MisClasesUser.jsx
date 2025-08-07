import React from 'react';
import { useNavigate } from 'react-router-dom';
import ClasesUsuarios from '../components/ClasesUsuarios';

const MisClasesUser = () => {
  const navigate = useNavigate();

  const volverInicio = () => {
    navigate('/');
  };

  return (
    <>
      <div className='mb-5'>
        <video
          autoPlay
          loop
          muted
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            zIndex: 1,
            pointerEvents: 'none',
          }}
        >
          <source src="/videos/GYM_BK.mp4" type="video/mp4" />
          Tu navegador no soporta el video.
        </video>
      </div>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          padding: '2rem',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(8px)',
        }}
      >
        <ClasesUsuarios />
      </div>

      <div
        className="d-grid mt-5"
        style={{
          position: 'relative',
          zIndex: 3,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <button className="btn btn-warning" onClick={volverInicio}>
          Volver al Inicio
        </button>
      </div>
    </>
  );
};

export default MisClasesUser;
