// src/App.jsx
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BaseLayout from "./components/BaseLayout";
import MenuProductos from "./frontend/Aram/MenuProductos";
import CarritoCompras from "./frontend/Aram/CarritoCompras";

function App() {
  return (
    <Router>
      <BaseLayout>
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
          <Route path="/menu" element={<MenuProductos />} />
          <Route path="/carrito" element={<CarritoCompras/>} />
        </Routes>
      </BaseLayout>
    </Router>
  );
}

export default App;
