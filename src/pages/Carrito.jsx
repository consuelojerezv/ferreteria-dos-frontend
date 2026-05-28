import { useNavigate } from "react-router-dom";

const formatPrice = (value) => new Intl.NumberFormat("es-CL").format(value);

export default function Carrito({ carrito, eliminar, limpiar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  return (
    <div className="container">
      <h1>Carrito</h1>
      {carrito.length === 0 ? (
        <p className="empty-message">No hay productos en el carrito.</p>
      ) : (
        carrito.map((item) => (
          <div key={item.id} className="carrito-item">
            <div>
              <strong>{item.nombre}</strong>
              <p>Precio unidad: ${formatPrice(item.precio)}</p>
              <p>Cantidad: {item.cantidad}</p>
            </div>
            <div className="carrito-actions">
              <span>${formatPrice(item.precio * item.cantidad)}</span>
              <button className="btn secondary" onClick={() => eliminar(item.id)}>
                Eliminar
              </button>
            </div>
          </div>
        ))
      )}
      <h2>Total: ${formatPrice(total)}</h2>
      <div className="carrito-footer">
        <button className="btn secondary" onClick={limpiar}>
          Vaciar
        </button>
        <button className="btn pay" onClick={() => navigate("/confirmacion") }>
          Pagar
        </button>
      </div>
    </div>
  );
}