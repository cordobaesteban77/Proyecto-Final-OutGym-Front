import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./PlanesC.css";

function PlanesC() {
  const pagarPlan = async (nombre, precio) => {
    try {
      const res = await fetch("http://localhost:3001/api/carrito/pagarCarritoMp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, precio }) // Se envía al backend
      });

      const data = await res.json();

      if (data.init_point) {
        // Redirige a Mercado Pago
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
        
          <Accordion.Item eventKey="0">
            <Accordion.Header>PLAN BLACK</Accordion.Header>
            <Accordion.Body>
              <div className="plan-content">
                <p>
                  ¡Entrena sin límites! Disfruta de acceso ilimitado al sector
                  de musculación y máquinas sin restricción de horario.
                </p>
                <Button
                  variant="dark"
                  className="subscribe-btn"
                  onClick={() => pagarPlan("Plan Black", 5000)}
                >
                  Quiero el Plan Black!
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

  
          <Accordion.Item eventKey="1">
            <Accordion.Header>PLAN CLASS</Accordion.Header>
            <Accordion.Body>
              <div className="plan-content">
                <p>
                  ¡Entrena a tu ritmo! Reserva tus clases favoritas según tu
                  disponibilidad.
                </p>
                <Button
                  variant="primary"
                  className="subscribe-btn"
                  onClick={() => pagarPlan("Plan Class", 3000)}
                >
                  Quiero el Plan Class!
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>

    
          <Accordion.Item eventKey="2">
            <Accordion.Header>PLAN GOLD</Accordion.Header>
            <Accordion.Body>
              <div className="plan-content">
                <p>
                  Acceso ilimitado a todas las instalaciones y servicios del
                  gimnasio, incluyendo clases ilimitadas.
                </p>
                <Button
                  variant="warning"
                  className="subscribe-btn"
                  onClick={() => pagarPlan("Plan Gold", 7000)}
                >
                  Quiero el Plan Gold!
                </Button>
              </div>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </div>
  );
}

export default PlanesC;

