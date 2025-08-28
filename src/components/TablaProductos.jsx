import React from "react";
import Swal from "sweetalert2";

const TablaProductos = ({
  productos,
  onAgregar,
  onEditar,
  onEliminar,
  onToggleEstado,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '24px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        overflowX: 'auto',
        maxWidth: '1000%',
        margin: '0 auto',
      }}
    >
      <table
        border="1"
        cellPadding="8"
        cellSpacing="0"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "#06283D",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#f2f2f2", textAlign: "center" }}>
            <th>#</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Descripción</th>
            <th>Imagen</th>
            <th>Habilitado</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((prod, index) => (
            <tr key={prod._id} style={{ textAlign: "center" }}>
              <td>{index + 1}</td>
              <td>{prod.nombre}</td>
              <td>${prod.precio.toFixed(2)}</td>
              <td>
                <div
                  style={{
                    maxHeight: "80px",
                    maxWidth: "100%",
                    overflowY: "auto",
                    overflowX: "hidden",
                    textAlign: "left",
                    padding: "4px",
                    border: "1px solid #ddd",
                    borderRadius: "6px",
                  }}
                >
                  {prod.descripcion}
                </div>
              </td>
              <td>
                <img
                  src={`${import.meta.env.VITE_URL_SERVER}/uploads/${prod.imagen}`}
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "6px",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
                  }}
                  alt="Producto"
                />
              </td>
              <td>
                <button
                  onClick={() => {
                    Swal.fire({
                      title: prod.habilitado ? '¿Deshabilitar producto?' : '¿Habilitar producto?',
                      icon: 'question',
                      showCancelButton: true,
                      confirmButtonText: 'Sí',
                      cancelButtonText: 'Cancelar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onToggleEstado(prod._id);
                        Swal.fire({
                          title: 'Listo',
                          text: prod.habilitado ? 'Producto deshabilitado' : 'Producto habilitado',
                          icon: 'success',
                          timer: 1500,
                          showConfirmButton: false
                        });
                      }
                    });
                  }}
                  style={{
                    padding: "6px 12px",
                    backgroundColor: prod.habilitado ? "#28a745" : "#dc3545",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  {prod.habilitado ? "Sí" : "No"}
                </button>
              </td>
              <td>{new Date(prod.fechaReg).toLocaleDateString()}</td>
              <td>
                <button className="m-3 w-50"
                  onClick={() => {
                    Swal.fire({
                      title: 'Editar producto',
                      text: '¿Deseas editar este producto?',
                      icon: 'info',
                      showCancelButton: true,
                      confirmButtonText: 'Sí',
                      cancelButtonText: 'Cancelar'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onEditar(prod);
                      }
                    });
                  }}
                  style={{
                    marginRight: "8px",
                    padding: "6px 12px",
                    backgroundColor: "#ffc107",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontWeight: "bold"
                  }}
                >
                  Editar
                </button>
                <button className="w-50"
                type="button"
  onClick={() => {
    Swal.fire({
      title: '¿Estás seguro de eliminar clase?',
      text: "¡Esta acción no se puede deshacer!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      cancelButtonColor: '#6c757d',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No,cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        onEliminar(prod._id);
        Swal.fire(
          'Eliminado',
          'El producto fue eliminado correctamente.',
          'success'
        );
      }
    });
  }}
  style={{
    padding: "6px 12px",
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }}
>
  Eliminar
</button>

              </td>
            </tr>
          ))}
          {productos.length === 0 && (
            <tr>
              <td colSpan="8" style={{ textAlign: "center", padding: "16px", color: "#888" }}>
                No hay productos cargados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TablaProductos;
