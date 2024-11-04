import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";
import { useState } from "react";
import MenuProductos from "./frontend/Aram/MenuProductos";
import CarritoCompras from "./frontend/Aram/CarritoCompras";

function App() {
  const [carrito, setCarrito] = useState([]);
  const [mostrarCarrito, setMostrarCarrito] = useState(false); // Estado para mostrar el carrito en pantalla completa

  const agregarAlCarrito = (producto) => {
    setCarrito((prevCarrito) => {
      const existingProduct = prevCarrito.find(item => item.id === producto.id);
      if (existingProduct) {
        return prevCarrito.map(item =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prevCarrito, { ...producto, cantidad: 1 }];
    });
  };

  const eliminarItem = (id) => {
    setCarrito((prevCarrito) => prevCarrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((total, item) => total + item.precio * item.cantidad, 0).toFixed(2);
  };

  const cerrarCarrito = () => {
    setMostrarCarrito(false); // Cerrar el carrito
  };

  return (
    <Router>
      <div className="bg-white min-h-screen flex flex-col">
        {/* Navbar */}
        <nav className="bg-orange-500 p-4 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            <NavLink
              to="/inicio"
              className="text-white font-bold text-2xl hover:text-orange-200"
            >
              Fukusuke Sushi
            </NavLink>
            <ul className="flex space-x-4">
              <li>
                <NavLink
                  to="/inicio"
                  className={({ isActive }) =>
                    `text-white hover:text-orange-200 ${isActive ? "underline" : ""}`
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `text-white hover:text-orange-200 ${isActive ? "underline" : ""}`
                  }
                >
                  Menú
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacto"
                  className={({ isActive }) =>
                    `text-white hover:text-orange-200 ${isActive ? "underline" : ""}`
                  }
                >
                  Contacto
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
        {/* Contenido principal */}
        <main className="flex-grow container mx-auto p-6">
          <Routes>
            <Route
              path="/inicio"
              element={
                <>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Bienvenido a Fukusuke Sushi
                  </h2>
                  <p className="text-gray-600 mt-4">
                    Disfruta de nuestros deliciosos platillos.
                  </p>
                </>
              }
            />
            <Route 
              path="/menu" 
              element={<MenuProductos agregarAlCarrito={agregarAlCarrito} />} 
            />
            <Route 
              path="/carrito" 
              element={
                <CarritoCompras 
                  carrito={carrito} 
                  eliminarItem={eliminarItem} 
                  calcularTotal={calcularTotal} 
                  toggleCarrito={cerrarCarrito} 
                />
              } 
            />
          </Routes>
        </main>
        
        {/* Componente CarritoCompras en pantalla completa si se ha confirmado */}
        {mostrarCarrito && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
            <CarritoCompras 
              carrito={carrito} 
              eliminarItem={eliminarItem} 
              calcularTotal={calcularTotal} 
              toggleCarrito={cerrarCarrito} 
            />
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
