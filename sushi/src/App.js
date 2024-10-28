import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './components/IniciarSesion';
import Pago from './components/Pago';
import CajaVirtual from './components/CajaVirtual';
function App () {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IniciarSesion />} />
        <Route path="/Pago" element={<Pago />} />
        <Route path="/CajaVirtual" element={<CajaVirtual />} />

      </Routes>
    </Router>
  );
};

export default App;
