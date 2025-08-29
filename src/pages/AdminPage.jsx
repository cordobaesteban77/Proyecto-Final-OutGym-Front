
import AdminPanel from '../components/AdminPanel';
import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import AdministrarUsuariosApp from '../components/AdministrarUsuariosApp';
import axios from 'axios';
import TablaProductos from "../components/TablaProductos";
import FormularioProducto from "../components/FormularioProducto";
import { fetchProductos, eliminarProducto, toggleEstadoProducto } from "../api/productos";

const AdminPage = () => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoEditando, setProductoEditando] = useState(null); 

  const cargarProductos = async () => {
    const lista = await fetchProductos();
    setProductos(lista);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleAgregar = () => {
    setProductoEditando(null); 
    setMostrarFormulario(true);
  };

  const handleEliminar = async (id) => {
  await eliminarProducto(id);
  cargarProductos();
};

  const handleToggleEstado = async (id) => {
    await toggleEstadoProducto(id);
    cargarProductos();
  };

  const handleEditar = (producto) => {
    setProductoEditando(producto);
    setMostrarFormulario(true);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const idUsuario = decoded.idUsuario;

        axios
          .get(`${import.meta.env.VITE_URL_SERVER}/usuarios/${idUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const usuario = response.data;
            setNombreUsuario(usuario.nombreUsuario || "Administrador");
          })
          .catch((error) => {
            console.error("Error al obtener usuario:", error);
            setNombreUsuario("Administrador");
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
        <AdministrarUsuariosApp />

        <div className='my-5 text-center'>
          <h1>Administrar Planes</h1>

          <button onClick={handleAgregar}className='btn btn-sm btn-primary my-3'>Agregar nuevo plan</button>

          <TablaProductos
            productos={productos}
            onEliminar={handleEliminar}
            onToggleEstado={handleToggleEstado}
            onEditar={handleEditar}
          />

          {mostrarFormulario && (
            <FormularioProducto
              producto={productoEditando} 
              onClose={() => {
                setMostrarFormulario(false);
                setProductoEditando(null);
              }}
              onSuccess={() => {
                cargarProductos();
                setMostrarFormulario(false);
                setProductoEditando(null);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;

