import { useState } from 'react';

const TuComponentePadre = () => {
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: 0, imagen: '', cantidad: 1 });

  const agregarProductoAlCarrito = async () => {
    try {
      const response = await fetch('/api/carrito', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nuevoProducto),
      });
      const data = await response.json();
      console.log(data);
      // Reiniciar el formulario
      setNuevoProducto({ nombre: '', precio: 0, imagen: '', cantidad: 1 });
    } catch (error) {
      console.error('Error al agregar producto:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Nombre"
        value={nuevoProducto.nombre}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
      />
      <input
        type="number"
        placeholder="Precio"
        value={nuevoProducto.precio}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: Number(e.target.value) })}
      />
      <input
        type="text"
        placeholder="Imagen URL"
        value={nuevoProducto.imagen}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, imagen: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cantidad"
        value={nuevoProducto.cantidad}
        onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: Number(e.target.value) })}
      />
      <button onClick={agregarProductoAlCarrito}>Agregar al Carrito</button>
    </div>
  );
};

export default TuComponentePadre;