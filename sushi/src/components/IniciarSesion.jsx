import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './IniciarSesion.css';
import Usuario from './assets/Usuario.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

function IniciarSesion() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [shown, setShown] = useState(false);
  const [guardarDatos, setGuardarDatos] = useState(false);

  const switchShown = () => setShown(!shown);

  const manejarCambioCheckbox = (e) => {
    setGuardarDatos(e.target.checked);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === 'ejemplo@gmail.com' && password === '1234') {
      navigate('./Pago');
    } else {
      alert('Credenciales incorrectas');
    }
  };

  const cajaVirtual = (e) => {
    e.preventDefault();
    navigate('./CajaVirtual');
  };

  return (
    <div>
      <header>
        <h1>Fukusuke Sushi-Delivery</h1>
        <h3>Iniciar Sesion</h3>
      </header>
      <body>
        <div className="contenedorSesion">
          <form className="Iniciomarco" onSubmit={handleSubmit}>
            <img src={Usuario} width="100" alt="Usuario" />
            <input
              type="email"
              placeholder="Correo de Usuario"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="password-container">
              <input
                type={shown ? 'text' : 'password'}
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="show-button"
                onClick={switchShown}
              >
                {shown ? <VisibilityOff /> : <Visibility />}
              </button>
            </div>

            <p>¿Olvidaste Contraseña?</p>
            <div className="password-container">
              <label className="checkbox-label">
                <p>Recuérdame</p>
                <input
                  type="checkbox"
                  className="checkbox"
                  name="opcion1"
                  onChange={manejarCambioCheckbox}
                  checked={guardarDatos}
                />
              </label>
            </div>

            <button className="buttonIngresar" type="submit">
              Ingresar
            </button>
          </form>
        </div>
      </body>

      <header>
        <button className="buttonVirtual" onClick={cajaVirtual}>
          Caja Virtual
        </button>
      </header>
      <footer>
        <p>© 2024 Fukusuke Sushi-Delivery – All Rights Reserved.</p>
        <button className="buttonVirtual" onClick={cajaVirtual}>
          Caja Virtual
        </button>
      </footer>
    </div>
  );
}

export default IniciarSesion;
