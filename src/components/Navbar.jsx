import { Link } from "react-router-dom";

export default function Navbar({ cantidad }) {
  return (
    <nav className="nav">
      <h2>ProFerr 🏗️</h2>

      <div>
        <Link to="/">Inicio</Link>
        <Link to="/productos">Productos</Link>
        <Link to="/carrito">Carrito ({cantidad})</Link>
      </div>
    </nav>
  );
}