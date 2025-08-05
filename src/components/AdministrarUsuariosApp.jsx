import React, { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

const AdministrarUsuariosApp = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formData, setFormData] = useState({ nombreUsuario: "", emailUsuario: "" });
  const [modoEdicion, setModoEdicion] = useState(false);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    axios.get(`${API_URL}/usuarios`)
      .then(res => setUsuarios(res.data.usuarios || []))
      .catch(() => alert("Error al cargar usuarios"));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (modoEdicion && usuarioSeleccionado) {
        // Editar
        await axios.put(`${API_URL}/usuarios/${usuarioSeleccionado._id}`, formData);
        alert("Usuario actualizado correctamente");
      } else {
        // Crear
        await axios.post(`${API_URL}/usuarios`, formData);
        alert("Usuario creado correctamente");
      }

      obtenerUsuarios();
      setFormData({ nombreUsuario: "", emailUsuario: "" });
      setModoEdicion(false);
      setUsuarioSeleccionado(null);
    } catch (err) {
      alert("Error al guardar el usuario");
    }
  };

  const handleEditar = (user) => {
    setUsuarioSeleccionado(user);
    setFormData({
      nombreUsuario: user.nombreUsuario,
      emailUsuario: user.emailUsuario
    });
    setModoEdicion(true);
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Estás seguro de que querés eliminar este usuario?")) return;
    try {
      await axios.delete(`${API_URL}/usuarios/${id}`);
      alert("Usuario eliminado correctamente");
      obtenerUsuarios();
    } catch {
      alert("Error al eliminar el usuario");
    }
  };

  return (
    <div className="container mt-4 text-light">
      <h2>{modoEdicion ? "Editar Usuario" : "Agregar Usuario"}</h2>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label className="form-label">Nombre de Usuario</label>
          <input
            type="text"
            className="form-control"
            name="nombreUsuario"
            value={formData.nombreUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Correo Electrónico</label>
          <input
            type="email"
            className="form-control"
            name="emailUsuario"
            value={formData.emailUsuario}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          {modoEdicion ? "Actualizar" : "Crear"}
        </button>
        {modoEdicion && (
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setModoEdicion(false);
              setUsuarioSeleccionado(null);
              setFormData({ nombreUsuario: "", emailUsuario: "" });
            }}
          >
            Cancelar
          </button>
        )}
      </form>

      <h3>Usuarios registrados</h3>
      <ul className="list-group">
        {usuarios.map((user) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.nombreUsuario}</strong> - {user.emailUsuario}
              <div className="text-muted">Plan: {user.planContratado || "Ninguno"}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(user)}>Editar</button>
              <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(user._id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarUsuariosApp;
