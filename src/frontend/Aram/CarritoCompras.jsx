import { useEffect, useState } from 'react';

const CarritoCompras = () => {
  const [productos, setProductos ] = useState([]);

  const obtenerProductosDelCarrito = async () => {
    try {
      const response = await fetch('/api/carrito');
      const data = await response.json();
      setProductos(data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const eliminarProductoDelCarrito = async (id) => {
    try {
      await fetch(`/api/carrito/${id}`, {
        method: 'DELETE',
      });
      obtenerProductosDelCarrito(); // Actualiza la lista después de eliminar
    } catch (error) {
      console.error('Error al eliminar producto:', error);
    }
  };

  useEffect(() => {
    obtenerProductosDelCarrito();
  }, []);

  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto._id}>
            <img src={producto.imagen} alt={producto.nombre} />
            <h3>{producto.nombre}</h3>
            <p>Precio: ${producto.precio}</p>
            <p>Cantidad: {producto.cantidad}</p>
            <button onClick={() => eliminarProductoDelCarrito(producto._id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarritoCompras;