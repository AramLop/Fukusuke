import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './components/IniciarSesion.jsx';
import Pago from './components/Pago.jsx';
import CajaVirtual from './components/CajaVirtual.jsx';

function App() {
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

