import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Pago from './components/Pago.jsx';
import OrdenDespacho from './components/OrdenDespacho.jsx';
import AnulacionCompra from './components/AnulacionCompra.jsx';
import BaseLayout from './components/BaseLoyout.jsx';

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
        <Route path="/" element={<Pago />} />
        <Route path="/OrdenDespacho" element={<OrdenDespacho />} />
        <Route path="/AnulacionCompra" element={<AnulacionCompra />} />
      </Routes>
      </BaseLayout>
    </Router>
    
  );
};

export default App;

