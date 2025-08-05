import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import "./PlanesC.css";

function PlanesC() {
  return (
    <div className="two-column-container">
      {/* Columna izquierda - Títulos */}
      <div className="titles-column">
        <h2 className="planes-title">NUESTROS PLANES</h2>
        <p className="planes-subtitle">
          Elige el que mejor se adapte a tus necesidades
        </p>
      </div>

      {/* Columna derecha - Acordeón */}
      <div className="accordion-column">
        <Accordion defaultActiveKey="0" flush>
          <Accordion.Item eventKey="0">
            <Accordion.Header>PLAN BLACK</Accordion.Header>
            <Accordion.Body>
              <div className="plan-content">
                <p>
                  ¡Entrena sin límites! Disfruta de acceso ilimitado al sector
                  de musculación y maquinas sin restricción de horario.
                </p>
                <Button variant="dark" className="subscribe-btn">
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
                  disponibilidad. Elige solo las actividades que más te gusten y
                  que se adapten a tu agenda.
                </p>
                <Button variant="primary" className="subscribe-btn">
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
                  gimnasio, sin restricciones de horario, incluyendo clases
                  ilimitadas según disponibilidad de cupo.
                </p>
                <Button variant="primary" className="subscribe-btn">
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
