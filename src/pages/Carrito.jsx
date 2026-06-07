import { useNavigate } from "react-router-dom";

const formatPrice = (value) =>
  new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Carrito({ carrito, eliminar, limpiar }) {
  const navigate = useNavigate();

  const obtenerUnidad = (item) => {
    if (item.unidadVenta) return item.unidadVenta;

    const nombre = (item.nombre || "").toLowerCase();

    if (nombre.includes("cemento")) return "sacos";
    if (nombre.includes("arena")) return "m³";
    if (nombre.includes("grava")) return "m³";
    if (nombre.includes("malla")) return "unidades";
    if (nombre.includes("tornillo")) return "unidades";
    if (nombre.includes("zinc")) return "planchas";
    if (nombre.includes("costanera")) return "unidades";
    if (nombre.includes("perfil")) return "unidades";
    if (nombre.includes("yeso")) return "planchas";

    return "unidades";
  };

  const obtenerPrecio = (item) => {
    return Number(item.precio || item.precioUnitario || 0);
  };

  const obtenerSubtotal = (item) => {
    const precio = obtenerPrecio(item);
    const cantidad = Number(item.cantidad || 0);

    return precio * cantidad;
  };

  const total = carrito.reduce((sum, item) => {
    return sum + obtenerSubtotal(item);
  }, 0);

  return (
    <div className="container">
      <h1>Carrito</h1>

      {carrito.length === 0 ? (
        <p className="empty-message">No hay productos en el carrito.</p>
      ) : (
        <>
          <p>
            Productos seleccionados desde la cotización de <strong>ProFerr</strong>.
          </p>

          {carrito.map((item) => {
            const precio = obtenerPrecio(item);
            const subtotal = obtenerSubtotal(item);
            const unidad = obtenerUnidad(item);

            return (
              <div key={item.id} className="carrito-item">
                <div>
                  <strong>{item.nombre}</strong>

                  <p>Precio unitario: ${formatPrice(precio)}</p>

                  <p>
                    Cantidad para compra: {Number(item.cantidad || 0)} {unidad}
                  </p>
                </div>

                <div className="carrito-actions">
                  <span>${formatPrice(subtotal)}</span>

                  <button
                    className="btn secondary"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            );
          })}

          <h2>Total: ${formatPrice(total)}</h2>

          <div className="carrito-footer">
            <button className="btn secondary" onClick={limpiar}>
              Vaciar carrito
            </button>

            <button className="btn pay" onClick={() => navigate("/confirmacion")}>
              Pagar
            </button>
          </div>
        </>
      )}
    </div>
  );
}