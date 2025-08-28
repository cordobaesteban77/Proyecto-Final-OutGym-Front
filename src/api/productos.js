import axios from "axios";

const API_URL = `${import.meta.env.VITE_URL_SERVER}/api/productos`;

export const fetchProductos = async () => {
  const { data } = await axios.get(API_URL + "/");
  return data.productos;
};

export const fetchProductoPorId = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data.producto;
};

export const crearProducto = async (nuevoProducto) => {
  const { data } = await axios.post(API_URL, nuevoProducto);
  console.log("Respuesta al crear producto:", data); 
  return data; 
};

export const subirImagenProducto = async (idProducto, file) => {
  const formData = new FormData();
  formData.append("imagen", file);

  const { data } = await axios.put(`${API_URL}/addEditImage/${idProducto}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
};

export const editarProducto = async (id, producto) => {
  const { data } = await axios.put(`${API_URL}/${id}`, producto);
  return data;
};

export const eliminarProducto = async (id) => {
  const { data } = await axios.delete(`${API_URL}/${id}`);
  return data;
};

export const toggleEstadoProducto = async (idProducto) => {
  const { data } = await axios.put(`${API_URL}/changeState/${idProducto}`);
  return data;
};
