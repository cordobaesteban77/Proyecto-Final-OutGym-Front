
import AdminPanel from '../components/AdminPanel';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AdministrarUsuariosApp from '../components/AdministrarUsuariosApp';


const AdminPage = () => {

  const [nombreUsuario, setNombreUsuario] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const idUsuario = decoded.idUsuario;
        console.log('ID de usuario:', idUsuario);


       
        fetch(`http://localhost:3001/usuario/${idUsuario}`)
  .then(res => res.json())
  .then(data => {
    if (data && data.nombreUsuario) {
      setNombreUsuario(data.nombreUsuario);
    } else {
      setNombreUsuario('Administrador');
    }
  })
  .catch(err => {
    console.error('Error al obtener usuario:', err);
    setNombreUsuario('Administrador');
  });
      } catch (err) {
        console.error('Token inválido:', err);
        setNombreUsuario('Administrador');
      }
    }
  }, []);

  return (
    <div>
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

      <div
  style={{
    position: 'relative',
    zIndex: 2,
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(8px)',
    minHeight: '100vh',
  }}
>
  <h1 className="text-center mb-4" style={{ color: '#06283D' }}>
        Bienvenido{nombreUsuario ? `, ${nombreUsuario}` : ''}
      </h1>
  <AdminPanel />
  <AdministrarUsuariosApp/>
</div>

    </div>
  );
};

export default AdminPage;
