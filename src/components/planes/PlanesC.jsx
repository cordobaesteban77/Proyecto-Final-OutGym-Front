import { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./PlanesC.css";

function PlanesC() {
  const [planes, setPlanes] = useState([]);

  // 🔹 Traer los productos desde el backend
  useEffect(() => {
    const fetchPlanes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_URL_SERVER}/api/productos`);
        const data = await res.json();
        setPlanes(data.productos || []);
      } catch (error) {
        console.error("Error al cargar los planes:", error);
      }
    };

    fetchPlanes();
  }, []);

  // 🔹 Función para pagar
  const pagarPlan = async (nombre, precio) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_URL_SERVER}/api/carrito/pagarPlanMp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }),
      });

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
                  <p><strong>Precio: ${plan.precio}</strong></p>
                  <Button
                    variant="dark"
                    className="subscribe-btn"
                    onClick={() => pagarPlan(plan.nombre, plan.precio)}
                  >
                    ¡Quiero este plan!
                  </Button>
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


