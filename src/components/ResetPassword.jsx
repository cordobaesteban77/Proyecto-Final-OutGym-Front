import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_SERVER}/usuarios/reset-password/${token}`, {
        password: data.password,
      });

      Swal.fire("Éxito", "Tu contraseña ha sido actualizada", "success");
      navigate("/login");
    } catch (error) {
      Swal.fire("Error", error?.response?.data?.msg || "No se pudo restablecer la contraseña", "error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="fw-bold mb-3 text-light">Restablecer contraseña</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="mb-3 text-light">Nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            {...register("password", { required: true, minLength: 8 })}
          />
          {errors.password && <p className="text-danger">Mínimo 8 caracteres</p>}
        </div>

        <div className="mb-3">
          <label className="mb-3 text-light">Repetir nueva contraseña</label>
          <input
            type="password"
            className="form-control"
            {...register("confirmPassword", {
              required: true,
              validate: (value) => value === watch("password") || "Las contraseñas no coinciden",
            })}
          />
          {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Guardar nueva contraseña
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
