import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

const AdministrarUsuariosApp = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);

  useEffect(() => {
    axios.get(`${API_URL}/usuarios`)
      .then(res => setUsuarios(res.data.usuarios || []))
      .catch(() => alert("Error al cargar usuarios"));
  }, []);

  return (
    <div className="container mt-4">
      <h2>Usuarios</h2>
      <ul className="list-group">
        {usuarios.map((user) => (
          <li
            key={user._id}
            className="list-group-item"
            onClick={() => setUsuarioSeleccionado(user)}
          >
            {user.nombreUsuario} - {user.emailUsuario}
          </li>
        ))}
      </ul>

      {usuarioSeleccionado && (
        <div className="mt-4">
          <h4>Detalles</h4>
          <p><strong>Nombre:</strong> {usuarioSeleccionado.nombreUsuario}</p>
          <p><strong>Email:</strong> {usuarioSeleccionado.emailUsuario}</p>
          <p><strong>Plan:</strong> {usuarioSeleccionado.rolUsuario}</p>
        </div>
      )}
    </div>
  );
};

export default AdministrarUsuariosApp;