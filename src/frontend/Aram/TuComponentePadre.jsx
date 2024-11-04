import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom"; // Importar useLocation para detectar cambios de ruta
import CarritoCompras from "./CarritoCompras";

const TuComponentePadre = () => {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const location = useLocation(); // Obtener la ubicación actual

  // Función para alternar el estado del carrito
  const toggleCarrito = () => {
    setMostrarCarrito((prev) => !prev);
  };

  // Función para eliminar un item del carrito
  const eliminarItem = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  // Función para calcular el total
  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  };

  // Efecto para cerrar el carrito al cambiar de ruta
  useEffect(() => {
    setMostrarCarrito(false); // Cerrar el carrito
  }, [location]); // Dependencia en location

  return (
    <div>
      <button onClick={toggleCarrito}>Mostrar Carrito</button>
      
      {mostrarCarrito && (
        <CarritoCompras
          carrito={carrito}
          eliminarItem={eliminarItem}
          calcularTotal={calcularTotal}
          toggleCarrito={toggleCarrito}
        />
      )}
    </div>
  );
};

export default TuComponentePadre;
