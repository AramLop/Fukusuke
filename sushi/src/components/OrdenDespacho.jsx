import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrdenDespacho.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import paypal from './assets/paypal.webp';
import visa from './assets/visa.webp';
import mastercard from './assets/mastercard.png';

function OrdenDespacho() {
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
      navigate('AnulacionCompra');
    }
  };

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
    
      <div className="contenedor-centro">
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
        </div>


      )
}
export default OrdenDespacho;
