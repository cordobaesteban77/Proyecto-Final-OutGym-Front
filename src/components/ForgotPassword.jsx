import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_SERVER}/usuarios/forgot-password`, {
        emailUsuario: data.emailUsuario,
      });
      Swal.fire("Éxito", "Te enviamos un correo para recuperar tu contraseña", "success");
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.msg || "No se pudo enviar el correo", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-3 text-light">Recuperar contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="text-light my-1">Email registrado</label>
          <input
            type="email"
            className="form-control"
            {...register("emailUsuario", { required: true })}
          />
        </div>
        <button type="submit" className="btn btn-primary w-100 mb-2">
          Enviar enlace
        </button>
        <button
          type="button"
          className="btn btn-secondary w-100"
          onClick={() => navigate("/login")}
        >
          Volver
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
