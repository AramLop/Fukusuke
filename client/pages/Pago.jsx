import { useForm } from "react-hook-form";
import { pagoRequest } from "../api/auth"; // Cambiado a pagoRequest
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Pago() {
  const [error, setError] = useState(null); // Estado para errores del servidor
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await pagoRequest(values);
      console.log("Pago exitoso:", response.data);
      alert("Pago completado exitosamente");
    } catch (error) {
      console.error("Error en el pago:", error.response?.data || error.message);
      setError(error.response?.data?.message || "Error al procesar el pago");
    }
  });

  return (
    <div class="font-[sans-serif] bg-white p-4">
      <div class="md:max-w-5xl max-w-xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="lg:col-span-2 max-md:order-1">
            <h2 class="text-3xl font-extrabold text-gray-800">
              Pagina de pago
            </h2>

            <form class="mt-8 max-w-lg">
              <div class="grid gap-4">
                <div>
                  <input
                    type="text"
                    {...register("Nombre", {
                      required: "El nombre es obligatorio",
                    })}
                    placeholder="Nombre"
                    class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                  />
                </div>
                {errors.Nombre && (
                  <p className="text-red-500">{errors.Nombre.message}</p>
                )}

                <div class="flex bg-gray-100 border rounded-md focus-within:border-purple-500 focus-within:bg-transparent overflow-hidden">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="w-6 ml-3"
                    viewBox="0 0 32 20"
                  >
                    <circle
                      cx="10"
                      cy="10"
                      r="10"
                      fill="#f93232"
                      data-original="#f93232"
                    />
                    <path
                      fill="#fed049"
                      d="M22 0c-2.246 0-4.312.75-5.98 2H16v.014c-.396.298-.76.634-1.107.986h2.214c.308.313.592.648.855 1H14.03a9.932 9.932 0 0 0-.667 1h5.264c.188.324.365.654.518 1h-6.291a9.833 9.833 0 0 0-.377 1h7.044c.104.326.186.661.258 1h-7.563c-.067.328-.123.66-.157 1h7.881c.039.328.06.661.06 1h-8c0 .339.027.67.06 1h7.882c-.038.339-.093.672-.162 1h-7.563c.069.341.158.673.261 1h7.044a9.833 9.833 0 0 1-.377 1h-6.291c.151.344.321.678.509 1h5.264a9.783 9.783 0 0 1-.669 1H14.03c.266.352.553.687.862 1h2.215a10.05 10.05 0 0 1-1.107.986A9.937 9.937 0 0 0 22 20c5.523 0 10-4.478 10-10S27.523 0 22 0z"
                      class="hovered-path"
                      data-original="#fed049"
                    />
                  </svg>
                  <input
                    type="text"
                    {...register("Numero", {
                      required: "El número de tarjeta es obligatorio",
                      pattern: {
                        value: /^[0-9]{16}$/,
                        message: "El número de tarjeta debe tener 16 dígitos",
                      },
                    })}
                    placeholder="Numero de tarjeta"
                    class="px-4 py-3.5 text-gray-800 w-full text-sm outline-none bg-transparent"
                  />
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      type="text"
                      {...register("Fecha", {
                        required: "La fecha de expiración es obligatoria",
                        pattern: {
                          value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // Validación MM/AA
                          message: "Formato de fecha inválido (MM/AA)",
                        },
                      })}
                      placeholder="EXP."
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      {...register("CVV", {
                        required: "El CVV es obligatorio",
                        pattern: {
                          value: /^[0-9]{3}$/,
                          message: "El CVV debe tener 3 dígitos",
                        },
                      })}
                      placeholder="CVV"
                      class="px-4 py-3.5 bg-gray-100 text-gray-800 w-full text-sm border rounded-md focus:border-purple-500 focus:bg-transparent outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate("/despacho")}
                type="button"
                class="mt-8 w-40 py-3.5 text-sm bg-green-500 text-white rounded-md hover:bg-purple-600 tracking-wide"
              >
                Confirmar{" "}
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

export default Pago;
