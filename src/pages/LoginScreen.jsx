import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
// import {useNavigate, Link} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LoginScreen = () => {
  const MySwal = withReactContent(Swal)
//   const navigate = useNavigate()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()
  const { register: registerRegister, handleSubmit: handleSubmitRegister, reset: resetRegister, formState: { errors: errorsRegister } } = useForm()

  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    localStorage.removeItem("user")
  }, [])

  const logIn = (datos) => {
    const usuario = (JSON.parse(localStorage.getItem("usuarios")) || []).find(
      (user) => user.email === datos.correo && user.password === datos.password
    )
    if (usuario) {
      const { username, email } = usuario
      localStorage.setItem("user", JSON.stringify({ username, email }))
      // navigate("/") // descomentar cuando use react-router
    } else {
      MySwal.fire({
        title: "OOPS!",
        text: "Correo o contraseña incorrectos",
        icon: "error"
      })
    }
  }

  const registrarUsuario = (datos) => {
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || []
    const yaExiste = usuarios.some((u) => u.email === datos.email)

    if (yaExiste) {
      MySwal.fire({
        icon: 'warning',
        title: 'Correo ya registrado',
        text: 'Intenta iniciar sesión o usa otro correo.'
      })
      return
    }

    usuarios.push({
      username: datos.username,
      email: datos.email,
      password: datos.password
    })
    localStorage.setItem("usuarios", JSON.stringify(usuarios))
    resetRegister()
    setShowModal(false)
    MySwal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: '¡Ahora puedes iniciar sesión!'
    })
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
                <label className="form-label text-light">Correo electrónico</label>
                <input type="email" className="form-control form-control-lg ps-4" {...register("correo", { required: true })} placeholder="nombre@ejemplo.com" />
                {errors.correo && <p className='text-danger'>Este campo es obligatorio</p>}
              </div>
              <div className="mb-4 position-relative">
                <label className="form-label text-light">Contraseña</label>
                <input type="password" className="form-control form-control-lg ps-4" {...register("password", { required: true })} placeholder="••••••••" />
                {errors.password && <p className='text-danger'>Este campo es obligatorio</p>}
              </div>
              <button type="submit" className="btn btn-custom btn-lg w-100 mb-3 text-light custom-boton">
                Iniciar sesión
              </button>
              <div className="text-center mt-4">
                <span className="text-light">¿No tienes cuenta? </span>
                <button type="button" onClick={() => setShowModal(true)} className="btn btn-link text-purple fw-bold text-decoration-none p-0">
                  Regístrate
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Registro */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <form onSubmit={handleSubmitRegister(registrarUsuario)}>
                <div className="modal-header">
                  <h5 className="modal-title">Registro</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <div className="mb-3">
                    <label className="form-label">Nombre de usuario</label>
                    <input type="text" className="form-control" {...registerRegister("username", { required: true })} />
                    {errorsRegister.username && <p className='text-danger'>Este campo es obligatorio</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input type="email" className="form-control" {...registerRegister("email", { required: true })} />
                    {errorsRegister.email && <p className='text-danger'>Este campo es obligatorio</p>}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input type="password" className="form-control" {...registerRegister("password", { required: true })} />
                    {errorsRegister.password && <p className='text-danger'>Este campo es obligatorio</p>}
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                  <button type="submit" className="btn btn-primary">Registrarse</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoginScreen