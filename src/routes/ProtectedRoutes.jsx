import React from 'react'
import { jwtDecode } from "jwt-decode";
import { Navigate } from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
    const token = localStorage.getItem("token");
    let usuario = null;

    if (token) {
      try {
        usuario = jwtDecode(token)
      } catch (error) {
        console.error("Token inválido", error)
      }
    }

    if (usuario && usuario.rolUsuario === "admin") {
        return children
    }
    else {
        return <Navigate to="/" />
    }
}

export default ProtectedRoutes