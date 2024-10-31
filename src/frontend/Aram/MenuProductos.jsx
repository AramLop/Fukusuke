// src/components/MenuProductos.jsx
import { useState } from 'react';

// Importa imágenes de productos desde la nueva ruta
import sushiSalmón from './imagenes/sushi_Salmón.jpg';
import sushiAtún from './imagenes/sushi_Atún.jpg';
import tempuraVerduras from './imagenes/tempura_Verduras.jpg';
import sushiLangosta from './imagenes/sushi_langosta.jpg';

const productos = [
  { id: 1, nombre: "Sushi de Salmón", precio: 8000, tipo: "sushi", imagen: sushiSalmón },
  { id: 2, nombre: "Sushi de Atún", precio: 8500, tipo: "sushi", imagen: sushiAtún },
  { id: 3, nombre: "Tempura de Verduras", precio: 7000, tipo: "tempura", imagen: tempuraVerduras },
  { id: 4, nombre: "Sushi de Langosta", precio: 12000, tipo: "sushi", imagen: sushiLangosta },
  // Agrega más productos según sea necesario
];

const MenuProductos = () => {
  const [filtro, setFiltro] = useState("");

  const productosFiltrados = productos.filter(producto =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="flex flex-col md:flex-row">
      {/* Panel de filtro */}
      <div className="md:w-1/4 p-4 border-r border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-orange-600">Filtrar Productos</h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        />
      </div>

      {/* Lista de productos */}
      <div className="md:w-3/4 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Menú de Productos</h1>

        {/* Cuadros de productos filtrados */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.map((producto) => (
            <div key={producto.id} className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105">
              <img 
                src={producto.imagen} 
                alt={producto.nombre} 
                className="w-full h-48 object-cover" 
              />
              <div className="bg-white p-4">
                <h2 className="text-xl font-semibold text-gray-800">{producto.nombre}</h2>
                <p className="text-gray-600">Precio: <span className="font-bold">${producto.precio}</span></p>
                <button className="w-full py-2 text-white font-semibold bg-orange-500 rounded hover:bg-orange-600 transition duration-200">
                  Agregar al Carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuProductos;
