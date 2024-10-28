import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IniciarSesion from './components/IniciarSesion';
import Pago from './components/Pago';
import CajaVirtual from './components/CajaVirtual';
import express from "express"
function App () {
  const app=express()
  app.listen(4000)
  console.log("Servidor en el puerto 4000")
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
