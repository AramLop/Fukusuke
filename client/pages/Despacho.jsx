import { useForm } from "react-hook-form";
import { despachoRequest } from "../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jsPDF } from "jspdf"; // Importar jspdf

function Despacho() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const generarNumeroAleatorio = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const numeroAleatorio = generarNumeroAleatorio();

  const obtenerHoraActual = () => {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, "0");
    const minutos = ahora.getMinutes().toString().padStart(2, "0");
    const segundos = ahora.getSeconds().toString().padStart(2, "0");
    return `${horas}:${minutos}:${segundos}`;
  };

  const horaActual = obtenerHoraActual();

  const generarPDF = (data) => {
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text("Datos de Despacho", 10, 10);

    // Agregar contenido
    doc.setFontSize(12);
    doc.text("Av. Pajaritos 3195, Maipú, Santiago", 40, 20);
    doc.text("Boleta de pago", 10, 30);
    doc.text(`Cliente: ${data.Nombre} ${data.Apellido}`, 10, 40);
    doc.text(`Dirección: ${data.Direccion}`, 10, 50);
    doc.text(`Número de Dirección: ${data.NumeroD}`, 10, 60);
    doc.text(`Número de Teléfono: ${data.NumeroT}`, 10, 70);
    doc.text(`Código Postal: ${data.CodigoPostal}`, 10, 80);
    doc.text(`Fecha de emision: ${fechaActual}`, 120, 40);
    doc.text(`Hora de emision: ${horaActual}`, 120, 50);
    doc.text(`Numero de boleta:${numeroAleatorio}`, 120, 60);

    doc.save("Despacho.pdf");
  };

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await despachoRequest(values);
      console.log("Despacho exitoso:", response.data);
      alert("Despacho completado exitosamente");

      // Generar el PDF después de un despacho exitoso
      generarPDF(values);
    } catch (error) {
      console.error(
        "Error en el despacho:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Error al procesar los datos del despacho"
      );
    }
  });

  return (
    <div class="font-[sans-serif] bg-white p-4">
      <div class="md:max-w-5xl max-w-xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 max-md:order-1">
            <h2 class="text-3xl font-extrabold text-gray-800">
              Pagina de despacho
            </h2>

            <form class="mt-8 max-w-lg" onSubmit={onSubmit}>
              <div class="grid gap-4">
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("Nombre", {
                        required: "El nombre tiene que ser completo",
                      })}
                      placeholder="Nombre"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("Apellido", {
                        required: "El apellido tiene que ser completo",
                      })}
                      placeholder="Apellido"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("Direccion")}
                      placeholder="Direccion"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("NumeroD")}
                      placeholder="Numero de direccion"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                </div>

                <div class="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  <input
                    type="text"
                    {...register("NumeroT", {
                      pattern: {
                        value: /^[0-9]{8}$/,
                      },
                    })}
                    placeholder="Numero de telefono"
                    class="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                  />
                </div>
                <div class="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  <input
                    type="text"
                    {...register("CodigoPostal", {
                      pattern: {
                        value: /^[0-9]{7}$/,
                      },
                    })}
                    placeholder="Codigo Postal"
                    class="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                class="mt-8 w-40 py-3.5 text-sm bg-green-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
              >
                Confirmar
              </button>
              <button
                onClick={() => navigate("/anulacion")}
                type="button"
                class="mt-8 w-40 py-3.5 text-sm bg-red-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
              >
                Rechazar{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Despacho;
