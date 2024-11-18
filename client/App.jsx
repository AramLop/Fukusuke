import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import Pago from "./pages/Pago";
import AnulacionCompra from "./pages/AnulacionCompra";
import Despacho from "./pages/Despacho";

function App() {
  return (
    <BrowserRouter>
      {/* Estructura general */}
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
                    `text-white hover:text-orange-200 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  Inicio
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/menu"
                  className={({ isActive }) =>
                    `text-white hover:text-orange-200 ${
                      isActive ? "underline" : ""
                    }`
                  }
                >
                  Menú
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contacto"
                  className={({ isActive }) =>
                    `text-white hover:text-orange-200 ${
                      isActive ? "underline" : ""
                    }`
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
            {/* Rutas principales */}
            <Route path="/" element={<h1>Home Page</h1>} />
            <Route path="/anulacion" element={<AnulacionCompra />} />
            <Route path="/pago" element={<Pago />} />
            <Route path="/despacho" element={<Despacho />} />

            {/* Ruta adicional para Inicio */}
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
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
