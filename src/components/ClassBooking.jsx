import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Mapeo de días a índices de JS: 0=Domingo, 1=Lunes, ..., 6=Sábado
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
        const dateStr = selectedDate.toISOString().split('T')[0];
        try {
          const res = await fetch(`http://localhost:3001/bookings/count?classType=${selectedClass}&date=${dateStr}&time=${selectedTime}`);
          const data = await res.json();
          setBookingCount(data.count);
        } catch (err) {
          console.error('Error al obtener cantidad:', err);
        }
      }
    };
    fetchCount();
  }, [selectedClass, selectedDate, selectedTime]);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Reservar clase</h2>

      <select value={selectedClass} onChange={handleClassChange}>
        <option value="">Clase</option>
        {Object.keys(classSchedule).map(c => <option key={c}>{c}</option>)}
      </select>

      {selectedClass && (
        <>
          <div style={{ marginTop: 10 }}>
            <label>Fecha:</label>
            <DatePicker
              selected={selectedDate}
              onChange={date => {
                setSelectedDate(date);
                const weekday = Object.keys(dayMap).find(key => dayMap[key] === date.getDay());
                setSelectedDay(weekday);
              }}
              filterDate={isDayEnabled}
              placeholderText="Seleccioná una fecha disponible"
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
              className="p-2 border rounded"
            />
          </div>

          <div style={{ marginTop: 10 }}>
            <label>Horario:</label>
            <select value={selectedTime} onChange={e => setSelectedTime(e.target.value)}>
              <option value="">Seleccioná horario</option>
              {classSchedule[selectedClass].times.map(t => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          {selectedDate && selectedTime && (
            <p style={{ marginTop: 10 }}>
              Clases Reservadas: <strong>{bookingCount}</strong>/20
            </p>
          )}

          <button
            style={{ marginTop: 20 }}
            onClick={async () => {
              if (selectedDate && selectedTime) {
                const response = await fetch('http://localhost:3001/bookings', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    classType: selectedClass,
                    date: selectedDate.toISOString().split('T')[0],
                    time: selectedTime,
                    name: "Nombre de prueba", // Reemplazar si tenés login
                    email: "demo@email.com"
                  })
                });

                const data = await response.json();
                if (response.ok) {
                  alert(data.message || 'Reserva registrada con éxito');
                  setBookingCount(prev => prev + 1);
                } else {
                  alert(data.message || 'Error al registrar reserva');
                }
              }
            }}
          >
            Reservar
          </button>
        </>
      )}
    </div>
  );
};

export default ClassBooking;
