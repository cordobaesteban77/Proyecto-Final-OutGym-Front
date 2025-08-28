import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

import { Table, Container, Button, Form, Row, Col } from 'react-bootstrap';

const AdminPanel = () => {
  const [bookings, setBookings] = useState([]);
  const [filterClass, setFilterClass] = useState('all');
  const [filterDate, setFilterDate] = useState('all');
  const [filterTime, setFilterTime] = useState('all');
  

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_SERVER}/bookings`)
      .then((res) => res.json())
      .then((data) => setBookings(data))
      .catch((err) => console.error('Error al obtener turnos:', err));
  }, []);

  const handleCancel = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción cancelará el turno. No se puede deshacer.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, cancelar',
    cancelButtonText: 'No',
  });

  if (result.isConfirmed) {
    try {
      await fetch(`${import.meta.env.VITE_URL_SERVER}/bookings/${id}`, {
        method: 'DELETE',
      });
      setBookings(bookings.filter((booking) => booking._id !== id));
      Swal.fire('Cancelado', 'El turno fue cancelado correctamente.', 'success');
    } catch (error) {
      console.error('Error al cancelar turno:', error);
      Swal.fire('Error', 'Hubo un problema al cancelar el turno.', 'error');
    }
  }
};


  const uniqueDates = [...new Set(bookings.map(b => b.date))];
  const uniqueTimes = [...new Set(bookings.map(b => b.time))];

  const filteredBookings = bookings.filter((booking) => {
    const matchClass = filterClass === 'all' || booking.classType === filterClass;
    const matchDate = filterDate === 'all' || booking.date === filterDate;
    const matchTime = filterTime === 'all' || booking.time === filterTime;
    return matchClass && matchDate && matchTime;
  });

  return (
    <Container className="py-5">
      <h2 className="mb-4 text-center" style={{ color: '#06283D' }}>
        Clases reservadas
      </h2>

      <Row className="justify-content-center mb-4">
        <Col md="auto">
          <Form.Select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            style={{ color: '#06283D' }}
          >
            <option value="all">Todas las clases</option>
            <option value="Fitness">Fitness</option>
            <option value="Spinning">Spinning</option>
            <option value="Zumba">Zumba</option>
          </Form.Select>
        </Col>
        <Col md="auto">
          <Form.Select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            style={{ color: '#06283D' }}
          >
            <option value="all">Todas las fechas</option>
            {uniqueDates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md="auto">
          <Form.Select
            value={filterTime}
            onChange={(e) => setFilterTime(e.target.value)}
            style={{ color: '#06283D' }}
          >
            <option value="all">Todas las horas</option>
            {uniqueTimes.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </Form.Select>
        </Col>
      </Row>

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
              {filteredBookings.map((booking, index) => (
                <tr key={booking._id} className="text-center">
                  <td>{index + 1}</td>
                  <td>{booking.classType}</td>
                  <td>{booking.date}</td>
                  <td>{booking.time}</td>
                  <td>{booking.name}</td>
                  <td>{booking.email}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(booking._id)}
                    >
                      Cancelar
                    </Button>
                  </td>
                </tr>
              ))}
              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan="7" className="text-center text-muted py-3">
                    No hay turnos registrados con estos filtros.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default AdminPanel;
