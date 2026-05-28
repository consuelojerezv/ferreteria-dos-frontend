import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ferreteria from "./pages/Ferreteria";
import Carrito from "./pages/Carrito";
import Confirmacion from "./pages/Confirmacion";
import Inicio from "./pages/Inicio";

export default function App() {
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("carrito")) || [];
    const normalized = saved.map((item) => ({
      ...item,
      cantidad: item.cantidad || 1,
    }));
    setCarrito(normalized);
  }, []);

  const saveCart = (items) => {
    localStorage.setItem("carrito", JSON.stringify(items));
    setCarrito(items);
  };

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const existing = carrito.find((item) => item.id === producto.id);

    const updated = existing
      ? carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      : [...carrito, { ...producto, cantidad }];

    saveCart(updated);
  };

  const eliminarDelCarrito = (id) => {
    const updated = carrito.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const limpiarCarrito = () => {
    saveCart([]);
  };

  const cantidadTotal = carrito.reduce((sum, item) => sum + item.cantidad, 0);

  return (
    <BrowserRouter>
      <Navbar cantidad={cantidadTotal} />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Ferreteria agregar={agregarAlCarrito} />} />
        <Route
          path="/carrito"
          element={
            <Carrito
              carrito={carrito}
              eliminar={eliminarDelCarrito}
              limpiar={limpiarCarrito}
            />
          }
        />
        <Route
          path="/confirmacion"
          element={<Confirmacion carrito={carrito} limpiar={limpiarCarrito} />}
        />
      </Routes>
    </BrowserRouter>
  );
}