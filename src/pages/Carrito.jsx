import { useNavigate } from "react-router-dom";

const formatPrice = (value) =>
  new Intl.NumberFormat("es-CL", {
    maximumFractionDigits: 0,
  }).format(Number(value || 0));

export default function Carrito({ carrito, eliminar, limpiar }) {
  const navigate = useNavigate();

  const obtenerProductoFerreteria = (item) => {
    return (
      item.productoEncontrado ||
      item.productoFerreteria ||
      item.nombreProducto ||
      item.nombre ||
      "Producto no informado"
    );
  };

  const obtenerMaterialSolicitado = (item) => {
    return (
      item.materialSolicitado ||
      item.nombreMaterial ||
      item.material ||
      item.nombre ||
      "Material no informado"
    );
  };

  const obtenerUnidad = (item) => {
    if (item.unidadVenta) return item.unidadVenta;
    if (item.unidad) return item.unidad;

    const nombre = `${obtenerProductoFerreteria(item)} ${obtenerMaterialSolicitado(
      item
    )}`.toLowerCase();

    if (nombre.includes("cemento")) return "sacos";
    if (nombre.includes("arena")) return "m³";
    if (nombre.includes("grava")) return "m³";
    if (nombre.includes("malla")) return "unidades";
    if (nombre.includes("tornillo")) return "unidades";
    if (nombre.includes("zinc")) return "planchas";
    if (nombre.includes("costanera")) return "unidades";
    if (nombre.includes("perfil")) return "unidades";
    if (nombre.includes("canal")) return "unidades";
    if (nombre.includes("montante")) return "unidades";
    if (nombre.includes("yeso")) return "planchas";
    if (nombre.includes("osb")) return "unidades";
    if (nombre.includes("teja")) return "unidades";
    if (nombre.includes("fieltro")) return "rollos";
    if (nombre.includes("clavo")) return "unidades";
    if (nombre.includes("policarbonato")) return "unidades";
    if (nombre.includes("cinta")) return "rollos";
    if (nombre.includes("pino")) return "unidades";

    return "unidades";
  };

  const obtenerPrecio = (item) => {
    return Number(item.precio || item.precioUnitario || 0);
  };

  const obtenerCantidad = (item) => {
    return Number(item.cantidadParaCompra || item.cantidad || 0);
  };

  const obtenerSubtotal = (item) => {
    if (item.subtotal) return Number(item.subtotal);

    const precio = obtenerPrecio(item);
    const cantidad = obtenerCantidad(item);

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
            Materiales cotizados desde ConstruFácil en{" "}
            <strong>ProFerr</strong>.
          </p>

          <p>
            <strong>Productos en carrito:</strong> {carrito.length}
          </p>

          {carrito.map((item, index) => {
            const productoFerreteria = obtenerProductoFerreteria(item);
            const materialSolicitado = obtenerMaterialSolicitado(item);
            const precio = obtenerPrecio(item);
            const cantidad = obtenerCantidad(item);
            const subtotal = obtenerSubtotal(item);
            const unidad = obtenerUnidad(item);

            const mostrarProductoFerreteria =
              productoFerreteria.toLowerCase() !==
              materialSolicitado.toLowerCase();

            return (
              <div
                key={item.id || `${productoFerreteria}-${index}`}
                className="carrito-item"
              >
                <div>
                  <strong>{materialSolicitado}</strong>

                  {mostrarProductoFerreteria && (
                    <p>
                      Producto ferretería:{" "}
                      <strong>{productoFerreteria}</strong>
                    </p>
                  )}

                  <p>Precio unitario: ${formatPrice(precio)}</p>

                  <p>
                    Cantidad para compra: {cantidad} {unidad}
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