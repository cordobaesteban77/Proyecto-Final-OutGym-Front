import React from 'react'
import {Link, NavLink} from "react-router-dom"

const NavbarApp = () => {
  // const usuario = JSON.parse(localStorage.getItem("user")) || null
  console.log(usuario)
  return (
    <nav className="navbar navbar-expand-lg nav">
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
          usuario.rol === "admin" ? <li className="nav-item">
          <NavLink className={({isActive}) => isActive ? "nav-link color-avtivo" : "nav-link text-light"} aria-current="page" to="/">Admin</NavLink>
        </li> : ""
        }
      </ul>
        {
            usuario ? <li className="nav-item ms-auto ms-0">
            <NavLink className="nav-link color-avtivo ps-0" to="#">Cerrar sesión</NavLink>
            </li> : 
            <li className="nav-item ms-auto ms-0">
            <NavLink className="nav-link color-avtivo ps-0" to="#">Iniciar sesión</NavLink>
            </li>
        }
    </div>
  </div>
</nav>
  )
}

export default NavbarApp