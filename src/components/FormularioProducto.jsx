import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import {
  crearProducto,
  editarProducto,
  subirImagenProducto,
} from "../api/productos";

const FormularioProducto = ({ producto, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    precio: "",
    descripcion: "",
    imagen: null,
  });
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || "",
        precio: producto.precio || "",
        descripcion: producto.descripcion || "",
        imagen: null,
      });
    }
  }, [producto]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "imagen") {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    try {
      let idProducto;

      if (producto) {
        await editarProducto(producto._id, {
          nombre: formData.nombre,
          precio: formData.precio,
          descripcion: formData.descripcion,
        });
        idProducto = producto._id;
      } else {
        const { idProducto: nuevoId } = await crearProducto({
          nombre: formData.nombre,
          precio: formData.precio,
          descripcion: formData.descripcion,
        });
        idProducto = nuevoId;
      }

      if (formData.imagen) {
        await subirImagenProducto(idProducto, formData.imagen);
      }

      await Swal.fire({
        icon: "success",
        title: "Éxito",
        text: `Producto ${producto ? "actualizado" : "creado"} exitosamente`,
        confirmButtonColor: "#3085d6"
      });

      onClose();
      onSuccess();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un error al guardar el producto",
        confirmButtonColor: "#d33"
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center",
        zIndex: 1000,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: 30,
          borderRadius: 10,
          minWidth: 320,
          maxWidth: 450,
          width: "100%",
          boxShadow: "0 0 12px rgba(0,0,0,0.2)",
          color: "#06283D",
        }}
      >
        <h4 className="mb-4" style={{ color: "#06283D" }}>
          {producto ? "Editar producto" : "Agregar nuevo producto"}
        </h4>

        <div className="mb-3">
          <input
            type="text"
            name="nombre"
            className="form-control"
            placeholder="Nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
            style={{ color: "#06283D" }}
          />
        </div>

        <div className="mb-3">
          <input
            type="number"
            name="precio"
            className="form-control"
            placeholder="Precio"
            value={formData.precio}
            onChange={handleChange}
            required
            style={{ color: "#06283D" }}
          />
        </div>

        <div className="mb-3">
          <textarea
            name="descripcion"
            className="form-control"
            placeholder="Descripción"
            value={formData.descripcion}
            onChange={handleChange}
            required
            rows={3}
            style={{ color: "#06283D" }}
          />
        </div>

        <div className="mb-3">
          <input
            type="file"
            name="imagen"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
          />
        </div>

        <div className="d-flex justify-content-between mt-4">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={cargando}
          >
            {cargando ? "Guardando..." : "Guardar"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onClose}
            disabled={cargando}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormularioProducto;
