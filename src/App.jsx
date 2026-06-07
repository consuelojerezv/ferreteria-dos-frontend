import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Ferreteria from "./pages/Ferreteria";
import Carrito from "./pages/Carrito";
import Confirmacion from "./pages/Confirmacion";
import Inicio from "./pages/Inicio";

function AppContent() {
  const [carrito, setCarrito] = useState([]);
  const navigate = useNavigate();

  const saveCart = (items) => {
    localStorage.setItem("carrito", JSON.stringify(items));
    setCarrito(items);
  };

  const decodificarCarritoDesdeUrl = (itemsParam) => {
    try {
      const textoDecodificado = decodeURIComponent(
        escape(atob(decodeURIComponent(itemsParam)))
      );

      return JSON.parse(textoDecodificado);
    } catch (error) {
      console.error("Error al decodificar carrito desde URL:", error);
      return null;
    }
  };

  const normalizarProductosRecibidos = (productos = []) => {
    return productos.map((producto, index) => ({
      id:
        producto.id ||
        producto.codigo ||
        `${producto.nombre || producto.material || "producto"}-${index}`,

      nombre:
        producto.nombre ||
        producto.productoEncontrado ||
        producto.material ||
        "Producto sin nombre",

      material: producto.material || producto.materialSolicitado || "",

      cantidad: Number(producto.cantidad || 1),

      precio:
        Number(producto.precio || producto.precioUnitario || 0),

      precioUnitario:
        Number(producto.precioUnitario || producto.precio || 0),

      subtotal:
        Number(producto.subtotal || 0),

      unidadVenta: producto.unidadVenta || "",

      stockSuficiente:
        producto.stockSuficiente !== undefined
          ? producto.stockSuficiente
          : true,
    }));
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const itemsParam = params.get("items");

    if (itemsParam) {
      const carritoRecibido = decodificarCarritoDesdeUrl(itemsParam);

      if (carritoRecibido && Array.isArray(carritoRecibido.productos)) {
        const productosNormalizados = normalizarProductosRecibidos(
          carritoRecibido.productos
        );

        saveCart(productosNormalizados);

        window.history.replaceState({}, document.title, "/carrito");
        navigate("/carrito", { replace: true });

        return;
      }
    }

    const saved = JSON.parse(localStorage.getItem("carrito")) || [];

    const normalized = saved.map((item) => ({
      ...item,
      cantidad: Number(item.cantidad || 1),
      precio: Number(item.precio || item.precioUnitario || 0),
      precioUnitario: Number(item.precioUnitario || item.precio || 0),
    }));

    setCarrito(normalized);
  }, [navigate]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    const existing = carrito.find((item) => item.id === producto.id);

    const updated = existing
      ? carrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: Number(item.cantidad || 0) + cantidad }
            : item
        )
      : [
          ...carrito,
          {
            ...producto,
            cantidad,
            precio: Number(producto.precio || producto.precioUnitario || 0),
            precioUnitario: Number(
              producto.precioUnitario || producto.precio || 0
            ),
          },
        ];

    saveCart(updated);
  };

  const eliminarDelCarrito = (id) => {
    const updated = carrito.filter((item) => item.id !== id);
    saveCart(updated);
  };

  const limpiarCarrito = () => {
    saveCart([]);
  };

  const cantidadTotal = carrito.length;

  return (
    <>
      <Navbar cantidad={cantidadTotal} />

      <Routes>
        <Route path="/" element={<Inicio />} />

        <Route
          path="/productos"
          element={<Ferreteria agregar={agregarAlCarrito} />}
        />

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
          element={
            <Confirmacion carrito={carrito} limpiar={limpiarCarrito} />
          }
        />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}