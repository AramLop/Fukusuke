import React, { useState } from 'react';
import './AnulacionCompra.css';
import { useNavigate } from 'react-router-dom';

function AnulacionCompra() {
  const [selectedOption, setSelectedOption] = useState('');
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState('');

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const confirmarAnulacion = (e) => {
    e.preventDefault();

      navigate('inicio');
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="selector-container">
      <label htmlFor="selector">Anulacion de compra</label>
      <select id="selector" value={selectedOption} onChange={handleChange}>
        <option value="">Selecciona una opción</option>
        <option value="ErrorDeSeleccion">Error de seleccion</option>
        <option value="FaltaDeFondo">Falta de fondo</option>
        <option value="ProblemasTercero">Problemas de terceros</option>
        <option value="Otro">Otro:</option>
      </select>

      {selectedOption === "Otro" && (
        <div>
          <label htmlFor="extraInput">Ingresa más detalles:</label>
          <input
            type="text"
            id="extraInput"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Escribe aquí..."
            className="input-field"
          />
        </div>
      )}

<div className="fila">
            <button className="boton-anulacion" onClick={confirmarAnulacion}>
              Confirmar Anulacion
            </button>
          </div>

    </div>
  );
}

export default AnulacionCompra;