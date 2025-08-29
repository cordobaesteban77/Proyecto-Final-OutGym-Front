import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const API_URL = `${import.meta.env.VITE_URL_SERVER}`;

const AdministrarUsuariosApp = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [formData, setFormData] = useState({
    nombreUsuario: "",
    emailUsuario: "",
    rolUsuario: "usuario",
  });

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = () => {
    axios
      .get(`${API_URL}/usuarios`)
      .then((res) => setUsuarios(res.data.usuarios || []))
      .catch(() => Swal.fire("Error", "Error al cargar usuarios", "error"));
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuarioSeleccionado) return;

    try {
      await axios.put(`${API_URL}/usuarios/${usuarioSeleccionado._id}`, formData);
      await Swal.fire("Éxito", "Usuario actualizado correctamente", "success");
      obtenerUsuarios();
      setUsuarioSeleccionado(null);
      setFormData({ nombreUsuario: "", emailUsuario: "", rolUsuario: "usuario" });
    } catch (err) {
      Swal.fire("Error", "Error al actualizar el usuario", "error");
    }
  };

  const handleEditar = (user) => {
    setUsuarioSeleccionado(user);
    setFormData({
      nombreUsuario: user.nombreUsuario,
      emailUsuario: user.emailUsuario,
      rolUsuario: user.rolUsuario || "usuario",
    });
  };

  const handleEliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "No podrás revertir esta acción",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_URL}/usuarios/${id}`);
        await Swal.fire("Eliminado", "Usuario eliminado correctamente", "success");
        obtenerUsuarios();
      } catch {
        Swal.fire("Error", "Error al eliminar el usuario", "error");
      }
    }
  };

  return (
    <div className="container mt-4 text-light">
      <h2 className="text-center" style={{ color: '#06283D' }}>Panel de Usuarios</h2>

      {usuarioSeleccionado ? (
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
          <div className="mb-3">
            <label className="form-label">Rol del Usuario</label>
            {
              formData.rolUsuario === "admin" ? <h3 className="text-danger">No es posible cambiarle el rol a un admin</h3> :
              <select
              className="form-select"
              name="rolUsuario"
              value={formData.rolUsuario}
              onChange={handleChange}
              required
            >
              <option value="usuario">usuario</option>
              <option value="admin">admin</option>
            </select>
            }
          </div>
          <button type="submit" className="btn btn-success">Actualizar</button>
          <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => {
              setUsuarioSeleccionado(null);
              setFormData({ nombreUsuario: "", emailUsuario: "", rolUsuario: "usuario" });
            }}
          >
            Cancelar
          </button>
        </form>
      ) : (
        <p className="text-center mb-4" style={{ color: '#06283D' }}>Selecciona un usuario para editar</p>
      )}

      <h3 className="text-center" style={{ color: '#06283D' }}>Usuarios registrados</h3>
      <ul className="list-group">
        {usuarios.map((user) => (
          <li key={user._id} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{user.nombreUsuario}</strong> - {user.emailUsuario}
              {/* <div className="text-muted">Plan: {user.plan || "Ninguno"}</div> */}
              <div className="text-muted">Rol: {user.rolUsuario || "usuario"}</div>
            </div>
            <div>
              <button className="btn btn-sm btn-primary me-2" onClick={() => handleEditar(user)}>Editar</button>
              {
                user.rolUsuario === "admin" ? <button className="btn btn-sm btn-danger disabled" onClick={() => handleEliminar(user._id)}>Eliminar</button>
                : <button className="btn btn-sm btn-danger" onClick={() => handleEliminar(user._id)}>Eliminar</button>
              }
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdministrarUsuariosApp;


