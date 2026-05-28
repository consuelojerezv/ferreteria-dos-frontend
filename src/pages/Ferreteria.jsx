import { productos } from "../data/productos";
import ProductoCard from "../components/ProductoCard";

export default function Ferreteria({ agregar }) {
  return (
    <div className="container">
      <div className="store-header">
        <span className="section-tag">Ferretería</span>
        <div>
          <h1>Todo para tu obra y mejoramiento</h1>
          <p>Materiales, herramientas y soluciones para proyectos grandes y pequeños.</p>
        </div>
      </div>

      <div className="grid">
        {productos.map((p) => (
          <ProductoCard key={p.id} producto={p} agregar={agregar} />
        ))}
      </div>
    </div>
  );
}