import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const dayMap = {
  Lunes: 1,
  Martes: 2,
  Miércoles: 3,
  Jueves: 4,
  Viernes: 5,
  Sábado: 6,
  Domingo: 0
};

const classSchedule = {
  Fitness: { days: ['Lunes', 'Jueves'], times: ['10:00', '18:00'] },
  Spinning: { days: ['Martes', 'Viernes'], times: ['10:00', '18:00'] },
  Zumba: { days: ['Miércoles'], times: ['20:00'] },
};

const ClassBooking = () => {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingCount, setBookingCount] = useState(0);
  const [nombreUsuario, setNombreUsuario] = useState(null);
  const [emailUsuario, setEmailUsuario] = useState(null);
  const [idUsuario, setIdUsuario] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setIdUsuario(decoded.idUsuario);

        axios
          .get(`${import.meta.env.VITE_URL_SERVER}/usuarios/${decoded.idUsuario}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            const usuario = response.data;
            setNombreUsuario(usuario.nombreUsuario || "Administrador");
            setEmailUsuario(usuario.emailUsuario || "sin@email.com");
          })
          .catch((error) => {
            console.error("Error al obtener usuario:", error);
            setNombreUsuario("Administrador");
            setEmailUsuario("sin@email.com");
          })
          .finally(() => {
            setLoadingUser(false);
          });

      } catch (err) {
        console.error('Token inválido:', err);
        setNombreUsuario("Administrador");
        setEmailUsuario("sin@email.com");
        setLoadingUser(false);
      }
    } else {
      setLoadingUser(false);
    }
  }, []);

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
    setSelectedDay('');
    setSelectedDate(null);
    setSelectedTime('');
    setBookingCount(0);
  };

  const isDayEnabled = (date) => {
    if (!selectedClass) return false;
    const allowedDays = classSchedule[selectedClass].days.map(d => dayMap[d]);
    return allowedDays.includes(date.getDay());
  };

  useEffect(() => {
    const fetchCount = async () => {
      if (selectedClass && selectedDate && selectedTime) {
        try {
          const dateStr = selectedDate.toISOString().split('T')[0];
          const res = await axios.get(`${import.meta.env.VITE_URL_SERVER}/bookings/count`, {
            params: {
              classType: selectedClass,
              date: dateStr,
              time: selectedTime
            }
          });
          setBookingCount(res.data.count);
        } catch (err) {
          console.error('Error al obtener cantidad:', err);
        }
      }
    };
    fetchCount();
  }, [selectedClass, selectedDate, selectedTime]);

  const handleReserve = async () => {
    if (loadingUser) {
      Swal.fire('Espere', 'Cargando datos del usuario...', 'info');
      return;
    }
    if (!nombreUsuario || !emailUsuario) {
      Swal.fire('Error', 'Datos de usuario incompletos.', 'error');
      return;
    }
    if (selectedDate && selectedTime) {
      try {
        const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/bookings`, {
          classType: selectedClass,
          date: selectedDate.toISOString().split('T')[0],
          time: selectedTime,
          name: nombreUsuario,
          email: emailUsuario,
          userId: idUsuario 
        });
        Swal.fire('¡Éxito!', response.data.message || 'Reserva registrada con éxito', 'success');
        setBookingCount(prev => prev + 1);
      } catch (error) {
        Swal.fire('Error', error.response?.data?.message || 'Error al registrar reserva', 'error');
      }
    }
  };

  

  return (
    <div className="container my-5" style={{ maxWidth: '500px', color: '#06283D' }}>
      <h2 className="mb-4 text-center">Reservar Clase</h2>

      <div className="mb-3">
        <label className="form-label">Clase:</label>
        <select
          className="form-select"
          value={selectedClass}
          onChange={handleClassChange}
          disabled={loadingUser}
        >
          <option value="">Seleccioná una clase</option>
          {Object.keys(classSchedule).map(c => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>

      {selectedClass && (
        <>
          <div className="mb-5 p-5">
            <label className="form-label me-2">Fecha:</label>
            <DatePicker
              key={selectedClass}
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
                const weekday = Object.keys(dayMap).find(key => dayMap[key] === date.getDay());
                setSelectedDay(weekday);
              }}
              filterDate={isDayEnabled}
              placeholderText="Seleccioná una fecha disponible"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="form-control"
              disabled={loadingUser}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Horario:</label>
            <select
              className="form-select"
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              disabled={loadingUser}
            >
              <option value="">Seleccioná un horario</option>
              {classSchedule[selectedClass].times.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {selectedDate && selectedTime && (
            <div className="mb-3 text-center">
              <p>
                Clases Reservadas: <strong>{bookingCount}</strong> / 20
              </p>
            </div>
          )}

          <div className="d-grid mb-3">
            <button
              className="btn btn-success"
              onClick={handleReserve}
              disabled={loadingUser}
            >
              Reservar
            </button>
          </div>

          
        </>
      )}
    </div>
  );
};

export default ClassBooking;
