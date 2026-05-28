import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Inicio() {
  return (
    <div className="home-page">
      <div className="hero-card">
        <img src={logo} alt="Logo ProFerr" className="hero-logo" />
        <h1>Bienvenido a ProFerr</h1>
        <p>Encuentra materiales, herramientas y soluciones para todos tus proyectos.</p>
        <div className="home-actions">
          <Link to="/productos" className="btn">
            Ver productos
          </Link>
          <Link to="/carrito" className="btn secondary">
            Ir al carrito
          </Link>
        </div>
      </div>
    </div>
  );
}
