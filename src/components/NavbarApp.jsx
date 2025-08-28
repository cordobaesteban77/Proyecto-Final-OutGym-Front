import React from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const NavbarApp = () => {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const token = localStorage.getItem("token");
  let usuario = null;

  if (token) {
    try {
      usuario = jwtDecode(token);
    } catch (error) {
      console.error("Token inválido", error);
    }
  }
  
  const location = useLocation();
  const isHome = location.pathname === '/';


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.dispatchEvent(new Event("authChanged"))
    navigate("/");
    MySwal.fire({
      title: "¡Adios!",
      text: "Sesión cerrada correctamente.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
    });
  };
  return (
    <nav className="navbar navbar-expand-lg nav" style={{ zIndex: 2 }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to="/">
          <img
            className="logo"
            src="/images/ICONOOUTGYMTRANSPARENTE.png"
            alt="logo"
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ filter: "invert(1)" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link color-activo" : "nav-link text-light"
                }
                aria-current="page"
                to="/"
              >
                Inicio
              </NavLink>
            </li>
           {
            isHome ?  <li className="nav-item">
              <a href="#planes" className="nav-link text-light">
                Planes
              </a>
            </li> : ""
           }
            
            {usuario && usuario.rolUsuario === "usuario" ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link color-activo" : "nav-link text-light"
                  }
                  aria-current="page"
                  to="/misclases"
                >
                  Mis Clases
                </NavLink>
              </li>
            ) : "" 
            }
            <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link color-activo" : "nav-link text-light"
                }
                aria-current="page"
                to="/contact"
              >
                Contacto
              </NavLink>
            </li>
            {usuario && usuario.rolUsuario === "usuario" ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link color-activo" : "nav-link text-light"
                  }
                  aria-current="page"
                  to="/solicitarclase"
                >
                  SolicitarClase
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
              <NavLink
                className={({ isActive }) =>
                  isActive ? "nav-link color-activo" : "nav-link text-light"
                }
                aria-current="page"
                to="/about"
              >
                Sobre nosotros
              </NavLink>
            </li>
            )}
            {usuario && usuario.rolUsuario === "admin" ? (
              <li className="nav-item">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? "nav-link color-activo" : "nav-link text-light"
                  }
                  aria-current="page"
                  to="/adminpage"
                >
                  Admin
                </NavLink>
              </li>
            ) : (
              ""
            )}
          </ul>
          {usuario ? (
            <li className="nav-item ms-auto ms-0">
              <button
                className="btn btn-link nav-link color-activo ps-0"
                onClick={handleLogout}
              >
                {" "}
                Cerrar sesión{" "}
              </button>
            </li>
          ) : (
            <li className="nav-item ms-auto ms-0">
              <NavLink className="nav-link color-activo ps-0" to="/login">
                Iniciar sesión
              </NavLink>
            </li>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarApp;
