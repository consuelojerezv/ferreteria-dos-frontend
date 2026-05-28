import { useNavigate } from "react-router-dom";

const formatPrice = (value) => new Intl.NumberFormat("es-CL").format(value);

export default function Confirmacion({ carrito, limpiar }) {
  const navigate = useNavigate();
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

  const confirmarPago = () => {
    limpiar();
    alert("Compra confirmada. ¡Gracias por su preferencia!");
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Confirmación de compra</h1>
      {carrito.length === 0 ? (
        <p className="empty-message">No hay productos en el carrito.</p>
      ) : (
        <div className="confirmacion-list">
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <div>
                <strong>{item.nombre}</strong>
                <p>Precio unidad: ${formatPrice(item.precio)}</p>
                <p>Cantidad: {item.cantidad}</p>
              </div>
              <span>${formatPrice(item.precio * item.cantidad)}</span>
            </div>
          ))}
        </div>
      )}
      <h2>Total a pagar: ${formatPrice(total)}</h2>
      <div className="carrito-footer">
        <button className="btn secondary" onClick={() => navigate(-1)}>
          Volver al carrito
        </button>
        <button className="btn pay" onClick={confirmarPago}>
          Confirmar pago
        </button>
      </div>
    </div>
  );
}
