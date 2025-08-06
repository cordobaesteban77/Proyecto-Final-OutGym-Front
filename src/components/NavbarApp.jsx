import React from 'react'
import {Link, NavLink, useNavigate} from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const NavbarApp = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)
  const token = localStorage.getItem("token");
  let usuario = null;

if (token) {
  try {
    usuario = jwtDecode(token)
  } catch (error) {
    console.error("Token inválido", error)
  }
}

const handleLogout = () => {
    localStorage.removeItem("token")
    navigate("/")
    MySwal.fire({
        title: "¡Adios!",
        text: "Sesión cerrada correctamente.",
        icon: "success",
        timer: 2000,
        showConfirmButton: false
      })
  }
  return (
    <nav className="navbar navbar-expand-lg nav" style={{zIndex: 2}}>
  <div className="container-fluid">
    <Link className="navbar-brand text-light" to="/">Logo</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link color-avtivo" : "nav-link text-light"} aria-current="page" to="/">Planes</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link color-avtivo" : "nav-link text-light"} aria-current="page" to="/">Donde estamos</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link color-avtivo" : "nav-link text-light"} aria-current="page" to="/">Planes</NavLink>
        </li>
        {
          usuario && usuario.rolUsuario === "admin" ? <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link color-avtivo" : "nav-link text-light"} aria-current="page" to="/adminpage">Admin</NavLink>
        </li> : ""
        }
      </ul>
        {
            usuario ? <li className="nav-item ms-auto ms-0">
             <button className="btn btn-link nav-link color-avtivo ps-0" onClick={handleLogout}> Cerrar sesión </button>
            </li> : 
            <li className="nav-item ms-auto ms-0">
            <NavLink className="nav-link color-avtivo ps-0" to="/login">Iniciar sesión</NavLink>
            </li>
        }
    </div>
  </div>
</nav>
  )
}

export default NavbarApp