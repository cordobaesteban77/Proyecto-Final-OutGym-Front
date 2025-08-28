import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import axios from "axios";
import "./PlanesC.css";

function PlanesC() {
  const [planes, setPlanes] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const location = useLocation();
  const navigate = useNavigate();

  const actualizarUsuario = () => {
    const tokenActual = localStorage.getItem("token");
    setToken(tokenActual);
    if (tokenActual) {
      try {
        const decoded = jwtDecode(tokenActual);
        setUsuario(decoded);
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  };
  useEffect(() => {
    window.addEventListener("authChanged", actualizarUsuario);
    return () => window.removeEventListener("authChanged", actualizarUsuario);
  }, []);
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsuario(decoded);
      } catch {
        setUsuario(null);
      }
    } else {
      setUsuario(null);
    }
  }, [token]);

  // Traer planes al montar
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_URL_SERVER}/api/productos`
        );
        const data = await res.json();
        setPlanes(data.productos || []);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      }
    };
    fetchPlanes();
  }, []);
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const planIdComprado = params.get("planId");

    const actualizarPlanUsuario = async () => {
      if (!usuario || !usuario.id || !planIdComprado) return;

      try {
        await axios.put(
          `${import.meta.env.VITE_URL_SERVER}/usuarios/comprarPlan`,
          {
            idUsuario: usuario.id,
            nombre: planIdComprado,
          }
        );
        params.delete("planId");
        navigate({ search: params.toString() }, { replace: true });
      } catch (error) {
        console.error("Error actualizando plan en usuario:", error);
      }
    };

    actualizarPlanUsuario();
  }, [location.search, usuario, navigate]);
  const pagarPlan = async (nombre, precio, idPlan) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_URL_SERVER}/carritos/pagarPlanMp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nombre,
            precio,
            back_urls: {
              success: `https://localhost:3001/planes?planId=${idPlan}`,
              failure: "http://localhost:3000/pago-fallido",
              pending: "http://localhost:3000/pago-pendiente",
            },
          }),
        }
      );

      const data = await res.json();

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        console.error("Error al generar pago:", data);
        alert("Hubo un problema al generar el pago.");
      }
    } catch (error) {
      console.error("Error al pagar:", error);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="two-column-container" id="planes">
      <div className="titles-column">
        <h2 className="planes-title">NUESTROS PLANES</h2>
        <p className="planes-subtitle">
          Elige el que mejor se adapte a tus necesidades
        </p>
      </div>

      <div className="accordion-column">
        <Accordion defaultActiveKey="0" flush>
          {planes.map((plan, index) => (
            <Accordion.Item eventKey={index.toString()} key={plan._id}>
              <Accordion.Header>{plan.nombre}</Accordion.Header>
              <Accordion.Body>
                <div className="plan-content">
                  <p>{plan.descripcion}</p>
                  <p>
                    <strong>Precio: ${plan.precio}</strong>
                  </p>
                  {usuario ? (
                    <Button
                      variant="dark"
                      className="subscribe-btn"
                      onClick={() =>
                        pagarPlan(plan.nombre, plan.precio, plan._id)
                      }
                    >
                      ¡Quiero este plan!
                    </Button>
                  ) : (
                    <NavLink
                      className="nav-link subscribe-btn text-light"
                      to="/login"
                    >
                      Iniciar sesión para elegir plan
                    </NavLink>
                  )}
                </div>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </div>
    </div>
  );
}

export default PlanesC;
