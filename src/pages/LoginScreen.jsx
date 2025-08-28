import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const LoginScreen = () => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)
  const [showModal, setShowModal] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const {
    register: registerReg,
    handleSubmit: handleSubmitReg,
    formState: { errors: errorsReg },
    reset: resetReg,
    watch
  } = useForm()

  
  const passwordValue = watch("password") 

  const logIn = async (datos) => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_URL_SERVER}/usuarios/login`, {
        nombreUsuario: datos.nombreUsuario,
        password: datos.password
      })
      localStorage.setItem("token", data.token)
      window.dispatchEvent(new Event("authChanged"));
      MySwal.fire({
        title: "¡Bienvenido!",
        text: data.msg,
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
      navigate("/")
      reset()
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error?.response?.data?.msg || "Error al iniciar sesión",
        icon: "error"
      })
    }
  }

  const registerUser = async (datos) => {
    try {
      await axios.post(`${import.meta.env.VITE_URL_SERVER}/usuarios/`, {
        nombreUsuario: datos.nombreUsuario,
        emailUsuario: datos.emailUsuario,
        password: datos.password
      })
      MySwal.fire({
        title: "¡Registro exitoso!",
        text: "Ahora podés iniciar sesión",
        icon: "success"
      })
      setShowModal(false)
      resetReg()
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error?.response?.data?.error || "No se pudo registrar",
        icon: "error"
      })
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center pt-5">
        <div className="col-md-8 col-lg-6">
          <div className="login-container p-5">
            <div className="text-center mb-5">
              <h2 className="fw-bold mb-3 text-light">Bienvenido de nuevo a OutGym</h2>
              <p className="text-light">Inicia sesión para continuar</p>
            </div>
            <form onSubmit={handleSubmit(logIn)}>
              <div className="mb-4 position-relative">
                <label className="form-label text-light">Nombre de usuario</label>
                 <i className="bi bi-person-fill input-icon mx-1" style={{ filter: "invert(1)" }}></i>
                <input
                  type="text"
                  className="form-control form-control-lg ps-4"
                  {...register("nombreUsuario", { required: true })}
                  placeholder="nombreUsuario"
                />
                {errors.nombreUsuario && (
                  <p role='alert' className='text-danger'>Este campo es obligatorio</p>
                )}
               

              </div>
              <div className="mb-4 position-relative">
                <label className="form-label text-light">Contraseña</label>
                 <i className="bi bi-lock-fill input-icon mx-1" style={{ filter: "invert(1)" }}></i>
                <input
                  type="password"
                  className="form-control form-control-lg ps-4"
                  {...register("password", { required: true })}
                  placeholder="••••••••"
                />
                {errors.password && (
                  <p role='alert' className='text-danger'>Este campo es obligatorio</p>
                )}
               
              </div>
              <button type="submit" className="btn btn-custom btn-lg w-100 mb-3 text-light custom-boton">
                Iniciar sesión
              </button>
              <div className="text-center mt-4">
                <span className="text-light">¿No tienes cuenta? </span>
                <button
                  type="button"
                  className="btn btn-link text-purple fw-bold text-decoration-none"
                  onClick={() => setShowModal(true)}
                >
                  Regístrate
                </button>
              </div>
              <div className="text-center mt-3">
  <button
    type="button"
    className="btn btn-link text-purple fw-bold text-decoration-none"
    onClick={() => navigate("/forgot-password")}
  >
    ¿Olvidaste tu contraseña?
  </button>
</div>

            </form>
          </div>
        </div>
      </div>

      {}
       {showModal && (
        <div className="modal d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}>
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <div className="modal-header">
                <h5 className="modal-title">Registro</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmitReg(registerUser)}>
                  <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input
                      type="text"
                      className="form-control"
                      {...registerReg("nombreUsuario", { required: true, minLength: 5 })}
                    />
                    {errorsReg.nombreUsuario && (
                      <p className='text-danger'>Mínimo 5 caracteres</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control"
                      {...registerReg("emailUsuario", { required: true })}
                    />
                    {errorsReg.emailUsuario && (
                      <p className='text-danger'>Email obligatorio</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerReg("password", { required: true, minLength: 8 })}
                    />
                    {errorsReg.password && (
                      <p className='text-danger'>Contraseña mínima de 8 caracteres</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Repetir contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerReg("repetirPassword", {
                        required: true,
                        validate: value => value === passwordValue || "Las contraseñas no coinciden"
                      })}
                    />
                    {errorsReg.repetirPassword && (
                      <p className='text-danger'>{errorsReg.repetirPassword.message}</p>
                    )}
                  </div>
                  <button type="submit" className="btn btn-primary w-100">Registrarse</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginScreen