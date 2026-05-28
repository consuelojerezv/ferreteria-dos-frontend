import { useState } from "react";

const formatPrice = (value) => new Intl.NumberFormat("es-CL").format(value);

export default function ProductoCard({ producto, agregar }) {
  const [cantidad, setCantidad] = useState(1);

  return (
    <div className="card">
      <div className="product-info">
        <h3>{producto.nombre}</h3>
        <span className="price-badge">${formatPrice(producto.precio)}</span>
        <p>Material y calidad listos para tu próxima obra o mejora.</p>
      </div>

      <div className="quantity-control">
        <button className="quantity-btn" onClick={() => setCantidad((value) => Math.max(1, value - 1))}>
          -
        </button>
        <input
          type="number"
          min="1"
          className="quantity-input"
          value={cantidad}
          onChange={(event) => {
            const rawValue = event.target.value;
            if (rawValue === "") {
              return;
            }
            const value = Number(rawValue);
            setCantidad(Number.isNaN(value) ? 1 : Math.max(1, value));
          }}
          onBlur={() => setCantidad((value) => Math.max(1, value))}
        />
        <button className="quantity-btn" onClick={() => setCantidad((value) => value + 1)}>
          +
        </button>
      </div>

      <button className="btn" onClick={() => agregar(producto, cantidad)}>
        Agregar
      </button>
    </div>
  );
}