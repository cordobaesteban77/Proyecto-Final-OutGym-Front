import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Container, Table, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';

const ClasesUsuarios = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserBookings = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No hay token, por favor inicia sesión.');
      setLoading(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const userId = decoded.idUsuario || decoded.userId;

      const res = await axios.get(`${import.meta.env.VITE_URL_SERVER}/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setBookings(res.data.bookings || res.data);
    } catch (err) {
      setError('Error al cargar las reservas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
  }, []);

  const eliminarClase = async (bookingId) => {
    const confirm = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (confirm.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`${import.meta.env.VITE_URL_SERVER}/bookings/${bookingId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        Swal.fire('Eliminado', 'La clase ha sido eliminada.', 'success');
        
        fetchUserBookings();
      } catch (err) {
        console.error(err);
        Swal.fire('Error', 'No se pudo eliminar la clase.', 'error');
      }
    }
  };

  if (loading) return <p className="text-center mt-5">Cargando reservas...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center" style={{ color: '#06283D' }}>
        Mis Clases
      </h2>

      <div className="d-flex justify-content-center">
        <div
          className="w-100"
          style={{
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
            overflowX: 'auto',
          }}
        >
          <Table bordered hover responsive className="mb-0">
            <thead>
              <tr className="text-center" style={{ color: '#06283D' }}>
                <th>#</th>
                <th>Clase</th>
                <th>Fecha</th>
                <th>Hora</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody style={{ color: '#06283D' }}>
              {bookings.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No tienes reservas realizadas.
                  </td>
                </tr>
              ) : (
                bookings.map((b, index) => (
                  <tr key={b._id || b.id} className="text-center">
                    <td>{index + 1}</td>
                    <td>{b.classType}</td>
                    <td>{b.date}</td>
                    <td>{b.time}</td>
                    <td>{b.name}</td>
                    <td>{b.email}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => eliminarClase(b._id)}
                      >
                        Eliminar
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default ClasesUsuarios;
