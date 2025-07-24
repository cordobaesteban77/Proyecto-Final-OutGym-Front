import React, { useEffect } from 'react'
import {useForm} from "react-hook-form"
// import {useNavigate, Link} from "react-router-dom"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const LoginScreen = () => {
  const MySwal = withReactContent(Swal)
//   const navigate = useNavigate()
  const {register, handleSubmit, reset, setFocus, formState: {errors}} = useForm()
  useEffect(() => {
    localStorage.removeItem("user")
  }, [])
  
  const logIn = (datos) => {
    const usuario = (JSON.parse(localStorage.getItem("usuarios")) || []).find((user) => user.email === datos.correo && user.password === datos.password
    )
        if (usuario) {
          const {username, email} = usuario
          localStorage.setItem("user", JSON.stringify({username, email}))
          navigate("/")
        }
        else {
            MySwal.fire({
            title: "OOPS!",
            text: "Correo o contraseña incorrectos",
            icon: "error"
          });
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
                <label className="form-label text-light">Correo electrónico</label>
                <input type="email" className="form-control form-control-lg ps-4" {...register("correo", {required: true})} placeholder="nombre@ejemplo.com"/>
                {
                  errors.correo && (
                    <p role='alert' className='text-danger'>
                      Este campo es obligatorio
                    </p>
                  )
                }
                <i className="bi bi-envelope-fill input-icon"></i>
              </div>
              <div className="mb-4 position-relative">
                <label className="form-label text-light">Contraseña</label>
                <input type="password" className="form-control form-control-lg ps-4" {...register("password", {required: true})} placeholder="••••••••"/>
                {
                  errors.password && (
                    <p role='alert' className='text-danger'>
                      Este campo es obligatorio
                    </p>
                  )
                }
                <i className="bi bi-lock-fill input-icon"></i>
              </div>
              <button type="submit" className="btn btn-custom btn-lg w-100 mb-3 text-light custom-boton">
                Iniciar sesión
              </button>
              <div className="text-center mt-4">
                <span className="text-light">¿No tienes cuenta? </span>
                <a href="/registro" className="text-decoration-none text-purple fw-bold">Regístrate</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginScreen