import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pago.css';

function Pago() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombreC: '',
    apellidoC: '',
    numeroC: '',
    CVVC: '',
    mesC: '',
    añoC: '',
    nombreD: '',
    apellidoD: '',
    numeroD: '',
    CVVD: '',
    mesD: '',
    añoD: '',
  });
  const confirmarPago = (e) => {
    e.preventDefault();

      navigate('OrdenDespacho');
  };

  const cancelarPago = (e) => {
    e.preventDefault();
    if (window.confirm('¿Está seguro de que desea cancelar el pedido?')) {
      navigate('AnulacionCompra');
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };


  return (
    <div className="contenedor-centro">
      <form className="form-marco">
          <h2>Método de pago</h2>
          <label className="radio-label">
            Tarjeta de crédito
            <input type="radio" name="metodoPago" value="Tarjeta de crédito" />
            Tarjeta de débito
            <input type="radio" name="metodoPago" value="Tarjeta de débito" />
            Efectivo
            <input
              type="radio"
              name="metodoPago"
              value="Efectivo"
              onChange={handleChange}
            />
          </label>
        </form>
  
        <form className="form-marco">
          <h2>Detalles de Pago con Tarjeta</h2>
          <div className="fila">
            <label htmlFor="nombreD">Nombre Completo:</label>
            <input
              type="text"
              id="nombreD"
              name="nombreD"
              value={form.nombreD}
              onChange={handleChange}
            />
            <label htmlFor="apellidoD">Apellido Completo:</label>
            <input
              type="text"
              id="apellidoD"
              name="apellidoD"
              value={form.apellidoD}
              onChange={handleChange}
            />
          </div>
          <div className="fila">
            <label htmlFor="numeroD">Número de tarjeta:</label>
            <input
              type="text"
              id="numeroD"
              name="numeroD"
              maxLength="16"
              value={form.numeroD}
              onChange={handleChange}
            />
            <label htmlFor="CVVD">CVV:</label>
            <input
              type="text"
              id="CVVD"
              name="CVVD"
              minLength="3"
              maxLength="3"
              value={form.CVVD}
              onChange={handleChange}
            />
          </div>
          <p>Fecha de vencimiento:</p>
          <div className="vencimiento">
            <input
              type="text"
              id="mesD"
              minLength="2"
              maxLength="2"
              placeholder="MM"
              value={form.mesD}
              onChange={handleChange}
            />
            <span>/</span>
            <input
              type="text"
              id="añoD"
              minLength="4"
              maxLength="4"
              placeholder="YYYY"
              value={form.añoD}
              onChange={handleChange}
            />
          </div>
        </form>
        <div className="fila">
            <button className="boton-confirmarPago" onClick={confirmarPago}>
              Confirmar Pago
            </button>
            <button className="boton-cancelarPago" onClick={cancelarPago}>
              Cancelar Pago
            </button>
          </div>
      </div>
  );}
export default Pago;
