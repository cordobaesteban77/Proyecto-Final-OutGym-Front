import { Link, NavLink, useNavigate } from "react-router-dom";
import "../styles/Footer.css";
import logo_outgym from "../assets/logo_outgym.png";

const Footer = () => {
  return (
    <footer className="footer d-flex align-items-center mt-5" style={{ zIndex: 2, position: 'relative' }}>
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-col">
            <img src={logo_outgym} alt="Outgym Logo" className="footer-logo" />
            <p>
              Gral. Paz 56 | Piso 9<br />
              San Miguel de Tucumán
            </p>
            <p>
              <Link to="/about">Sobre nosotros</Link>
            </p>
          </div>

          <div className="footer-col">
            <ul className="footer-contact ">
              <li>
                <Link to="*"><i className="bi bi-whatsapp"></i> 54 381 5 568 459</Link>
              </li>
              <li>
                <Link to="*"><i className="bi bi-instagram"></i> @outgymtuc</Link>
              </li>
              <li>
                <Link to="*"><i className="bi bi-globe"></i> www.outgymtuc.com.ar</Link>
              </li>
            </ul>
          </div>

          <h5>Dónde Estamos</h5>
          <div className="map-responsive">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3560.1178814871746!2d-65.2070777!3d-26.836202699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94225c0e8d0271b7%3A0x7946062ac490db30!2sGral.%20Jos%C3%A9%20Mar%C3%ADa%20Paz%20576%2C%20T4000%20San%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1sen!2sar!4v1754150426151!5m2!1sen!2sar"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación Outgym"
            ></iframe>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
