import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Pago.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import paypal from './assets/paypal.webp';
import visa from './assets/visa.webp';
import mastercard from './assets/mastercard.png';

function Pago() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    direccion1: '',
    comuna: '',
    postal: '',
    metodoEnvio: '',
  });

  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };
  const validarFormulario = () => {
    const {
      nombre,
      apellido,
      telefono,
      direccion1,
      comuna,
      postal,
      metodoEnvio,
    } = form;
    if (
      !nombre ||
      !apellido ||
      !telefono ||
      !direccion1 ||
      !comuna ||
      !postal ||
      !metodoEnvio
    ) {
      alert('Por favor, complete todos los campos obligatorios.');
      return false;
    }

    return true;
  };

  const confirmarPedido = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      generarPDF();
      alert(
        '¡Pedido confirmado con éxito!, la boleta se enviará al correo designado'
      );
      navigate('/');
    }
  };

  const cancelarPedido = (e) => {
    e.preventDefault();
    if (window.confirm('¿Está seguro de que desea cancelar el pedido?')) {
      navigate('/');
    }
  };

  const abrirModal1 = () => setIsModal1Open(true);
  const cerrarModal1 = () => setIsModal1Open(false);
  const abrirModal2 = () => setIsModal2Open(true);
  const cerrarModal2 = () => setIsModal2Open(false);

  const hoy = new Date();
  const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
  const fechaActual = hoy.toLocaleDateString('es-ES', opciones); 

  const generarNumeroAleatorio = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const numeroAleatorio = generarNumeroAleatorio();

  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
  };

  const horaActual = obtenerHoraActual();

  const generarPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(35);
    doc.text('Fukusuke Sushi-Delivery', 10, 10);

    doc.setFontSize(10);
    doc.text('Av. Pajaritos 3195, Maipú, Santiago', 40, 20);
    doc.text('Boleta de pago', 10, 30);
    doc.text(`Cliente:  ${form.nombre} ${form.apellido}`, 10, 40);
    doc.text(`Direccion: ${form.direccion1} ${form.comuna}`, 10, 50);
    doc.text(`Codigo Postal: ${form.postal}`, 10, 60);
    doc.text(`Telefono: ${form.telefono}`, 10, 70);
    doc.text(`Fecha de emision: ${fechaActual}`, 130, 40);
    doc.text(`Hora de emision: ${horaActual}`, 130, 50);
    doc.text(`Numero de boleta:${numeroAleatorio}`, 130, 60);
    doc.autoTable({
      head: [['Cantidad', 'Descripcion', 'Precio', 'Precio total']],
      body: [
        ['2', 'Nigiri', '3000', '6000'],
        ['4', 'Maki', '2000', '8000'],
        ['5', 'Uramaki', '5000', '25000'],
      ],
      foot: [
        ['Cantidad total: 11', null, null, 'Total del pedido: 34000'],
        [null, null, null, 'Total del envio: 5000'],
        [null, null, null, 'Descuento: 380 (%2)'],
        [null, null, null, 'Total: 38200'],
      ],
      startY: 90, 
      margin: { left: 10 },
      headStyles: {
        fillColor: [0, 0, 0],
      },
      footStyles: {
        fillColor: [82, 78, 84], 
        textColor: [243, 240, 245], 
        lineWidth: 0.5, 
        lineColor: [0, 0, 0], 
      },
      didDrawCell: function (data) {
        if (data.section === 'foot' && data.row.index === 2) {
          doc.setLineWidth(0.5); 
          doc.line(
            data.cell.x,
            data.cell.y + data.cell.height,
            data.cell.x + data.cell.width,
            data.cell.y + data.cell.height
          ); 
        }
      },
    });

    doc.save(`Boleta_${'Fukusuke Sushi-Delivery'} ${numeroAleatorio}.pdf`);
  };

  return (
    <div>
      <section className="contenedor">
        <form className="form-marco" onSubmit={confirmarPedido}>
          <h4>&lt;-Orden</h4>
          <h1>Detalles del pago</h1>
          <div className="fila">
            <div className="nombres">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
              />
            </div>
            <div className="nombres">
              <label htmlFor="apellido">Apellido:</label>
              <input
                type="text"
                id="apellido"
                name="apellido"
                value={form.apellido}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="nombres">
            <label htmlFor="telefono">Telefono:</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              placeholder="+56912345678"
              minlength="12"
              maxLength="12"
              value={form.telefono}
              onChange={handleChange}
            />
          </div>
          <div className="nombres">
            <label htmlFor="direccion1">Direccion 1:</label>
            <input
              type="text"
              id="direccionc1"
              name="direccion1"
              placeholder="Direccion/Numero de la residencia"
              value={form.direccion1}
              onChange={handleChange}
            />
          </div>
          <div className="nombres">
            <label htmlFor="direccion2">Direccion 2:</label>
            <input
              type="text"
              id="direccionc2"
              name="direccion2"
              placeholder="Apartamento/casa/unidad(opcional)"
              value={form.direccion2}
              onChange={handleChange}
            />
          </div>
          <div className="fila">
            <div className="comuna">
              <label htmlFor="Comuna">Comuna:</label>
              <input
                type="text"
                id="comuna"
                name="comuna"
                value={form.comuna}
                onChange={handleChange}
              />
            </div>
            <div className="postal">
              <label htmlFor="postal">Codigo postal:</label>
              <input
                type="text"
                id="postal"
                name="postal"
                value={form.postal}
                onChange={handleChange}
              />
            </div>
          </div>
          <h3>Tipo de envio</h3>
          <div className="radio-label">
            Retiro
            <input
              type="radio"
              name="metodoEnvio"
              value="Retiro"
              onChange={handleChange}
            />
            Envio
            <input
              type="radio"
              name="metodoEnvio"
              value="Envio"
              onChange={handleChange}
            />
          </div>
          <div className="radio">
            <h3>Metodo de pago</h3>
            <label className="radio-label">
              Tarjeta de crédito
              <input
                type="radio"
                name="metodoPago"
                value="Tarjeta de crédito"
                onChange={abrirModal1}
              />
              Tarjeta de débito
              <input
                type="radio"
                name="metodoPago"
                value="Tarjeta de débito"
                onChange={abrirModal2}
              />
              Efectivo
              <input
                type="radio"
                name="metodoPago"
                value="Efectivo"
                onChange={handleChange}
              />
            </label>
          </div>

          <div className="fila">
            <button className="boton-confirmar" onClick={confirmarPedido}>
              Confirmar Pedido
            </button>
            <button className="boton-cancelar" onClick={cancelarPedido}>
              Cancelar Pedido
            </button>
          </div>
        </form>
        <form className="form-marco">
          <h1>Resumen</h1>
          <div class="section-divider"></div>
          <h3>Nigiri</h3>
          <p>Cantidad 2 * $3000 cada uno = $6000</p>
          <h3>Maki</h3>
          <p>Cantidad 4 * $2000 cada uno = $8000</p>
          <h3>Uramaki</h3>
          <p>Cantidad 5 * $5000 cada uno = $25000</p>
          <h3>Total del pedido</h3>
          <p>$39000</p>
          <h4>Envio:</h4>
          <p>Total de envio: $5000</p>
          <h4>Descuento:</h4>
          <p>Descuento aplicado: -$380(%2)</p>
          <div class="total-divider"></div>
          <h1>Total: $38300</h1>
          <img src={paypal} width="100" alt="paypal" />
          <img src={visa} width="50" alt="visa" />
          <img src={mastercard} width="30" alt="mastercard" />
        </form>
      </section>

      {isModal1Open && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Detalles de Pago con Tarjeta de Crédito</h2>
            <div className="fila">
              <label htmlFor="nombreC">Nombre Completo:</label>
              <input
                type="text"
                id="nombreC"
                name="nombreC"
                value={form.nombreC}
                onChange={handleChange}
              />
              <label htmlFor="apellidoC">Apellido Completo:</label>
              <input
                type="text"
                id="apellidoC"
                name="apellidoC"
                value={form.apellidoC}
                onChange={handleChange}
              />
            </div>
            <div className="fila">
              <label htmlFor="numeroC">Numero de tarjeta:</label>
              <input
                type="text"
                id="numeroC"
                name="numeroC"
                minlength="16"
                maxlength="16"
                value={form.numeroC}
                onChange={handleChange}
              />
              <label htmlFor="CVVC">CVV:</label>
              <input
                type="text"
                id="CVVC"
                name="CVVC"
                minlength="3"
                maxlength="3"
                value={form.CVVC}
                onChange={handleChange}
              />
            </div>
            <p>Fecha de vencimiento:</p>
            <div class="vencimiento">
              <input
                type="text"
                id="mesC"
                minlength="2"
                maxlength="2"
                placeholder="MM"
                value={form.mesC}
                onChange={handleChange}
              />
              <span>/</span>
              <input
                type="text"
                id="añoC"
                minlength="4"
                maxlength="4"
                placeholder="YYYY"
                value={form.añoC}
                onChange={handleChange}
              />
            </div>
            <button
              className="boton-confi"
              onClick={cerrarModal1}
              onChange={handleChange}
            >
              Confirmar
            </button>
            <button
              className="boton-cancel"
              onClick={cerrarModal1}
              onChange={handleChange}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {isModal2Open && (
        <div className="modal">
          <div className="modal-contenido">
            <h2>Detalles de Pago con Tarjeta de Debito</h2>
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
              <label htmlFor="numeroD">Numero de tarjeta:</label>
              <input
                type="text"
                id="numeroD"
                name="numeroD"
                maxlength="16"
                value={form.numeroT}
                onChange={handleChange}
              />
              <label htmlFor="CVVD">CVV:</label>
              <input
                type="text"
                id="CVVD"
                name="CVVD"
                minlength="3"
                maxlength="3"
                value={form.CVVD}
                onChange={handleChange}
              />
            </div>
            <p>Fecha de vencimiento:</p>
            <div class="vencimiento">
              <input
                type="text"
                id="mesD"
                minlength="2"
                maxlength="2"
                placeholder="MM"
                value={form.mesD}
                onChange={handleChange}
              />
              <span>/</span>
              <input
                type="text"
                id="añoD"
                minlength="4"
                maxlength="4"
                placeholder="YYYY"
                value={form.añoD}
                onChange={handleChange}
              />
            </div>
            <button className="boton-confi" onClick={cerrarModal2}>
              Confirmar
            </button>
            <button className="boton-cancel" onClick={cerrarModal2}>
              Cerrar
            </button>
          </div>
          <footer>
            <p>© 2024 Sofascore – All Rights Reserved.</p>
          </footer>
        </div>
      )}
    </div>
  );
}
export default Pago;
