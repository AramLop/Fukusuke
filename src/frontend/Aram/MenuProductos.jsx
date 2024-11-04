import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import CarritoCompras from "./CarritoCompras";

// Importa tus imágenes
import sushiSalmón from "./imagenes/sushi_Salmón.jpg";
import sushiAtún from "./imagenes/sushi_Atún.jpg";
import tempuraVerduras from "./imagenes/tempura_Verduras.jpg";
import sushiLangosta from "./imagenes/sushi_langosta.jpg";

const productos = [
  {
    id: 1,
    nombre: "Sushi de Salmón",
    precio: 8000,
    tipo: "sushi",
    imagen: sushiSalmón,
  },
  {
    id: 2,
    nombre: "Sushi de Atún",
    precio: 8500,
    tipo: "sushi",
    imagen: sushiAtún,
  },
  {
    id: 3,
    nombre: "Tempura de Verduras",
    precio: 7000,
    tipo: "tempura",
    imagen: tempuraVerduras,
  },
  {
    id: 4,
    nombre: "Sushi de Langosta",
    precio: 12000,
    tipo: "sushi",
    imagen: sushiLangosta,
  },
];

const MenuProductos = () => {
  const [filtro, setFiltro] = useState("");
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const productoExistente = prevCarrito.find(
        (item) => item.id === producto.id
      );
      if (productoExistente) {
        return prevCarrito.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      } else {
        return [...prevCarrito, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarItem = (id) => {
    setCarrito(carrito.filter((item) => item.id !== id));
  };

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const toggleCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <div className="flex flex-col md:flex-row relative bg-gray-100 min-h-screen">
      <div className="md:w-1/4 p-6 border-r border-gray-200 bg-white">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600">Filtrar Productos</h2>
        <input
          type="text"
          placeholder="Buscar..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border border-gray-300 p-2 w-full rounded-md shadow-sm focus:outline-none focus:ring focus:ring-orange-400"
        />
      </div>

      <div className="md:w-3/4 p-6 bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-orange-600">Menú de Productos</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {productosFiltrados.length > 0 ? (
            productosFiltrados.map((producto) => (
              <div
                key={producto.id}
                className="border border-gray-200 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 bg-white"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">{producto.nombre}</h2>
                  <p className="text-gray-600">${producto.precio}</p>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-200"
                  >
                    Agregar al Carrito
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No hay productos que coincidan con tu búsqueda.</p>
          )}
        </div>

        {mostrarCarrito && (
          <CarritoCompras
            carrito={carrito}
            eliminarItem={eliminarItem}
            calcularTotal={calcularTotal}
            toggleCarrito={toggleCarrito}
          />
        )}
      </div>

      {/* Ícono del carrito en la esquina inferior derecha */}
      <button
        onClick={toggleCarrito}
        className="fixed bottom-4 right-4 bg-orange-500 text-white rounded-full p-3 shadow-lg hover:bg-orange-600 transition duration-200 flex items-center justify-center"
      >
        <FaShoppingCart size={24} />
        {carrito.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
            {carrito.reduce((total, item) => total + item.cantidad, 0)}
          </span>
        )}
      </button>
    </div>
  );
};

export default MenuProductos;
