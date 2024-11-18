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
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("Nombre", { required: "El nombre es obligatorio" })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.Nombre && (
            <p className="text-red-500">{errors.Nombre.message}</p>
          )}

          <input
            type="text"
            {...register("Numero", {
              required: "El número de tarjeta es obligatorio",
              pattern: {
                value: /^[0-9]{16}$/,
                message: "El número de tarjeta debe tener 16 dígitos",
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Número de Tarjeta"
          />
          {errors.Numero && (
            <p className="text-red-500">{errors.Numero.message}</p>
          )}

          <input
            type="text"
            {...register("CVV", {
              required: "El CVV es obligatorio",
              pattern: {
                value: /^[0-9]{3}$/,
                message: "El CVV debe tener 3 dígitos",
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="CVV"
          />
          {errors.CVV && <p className="text-red-500">{errors.CVV.message}</p>}

          <input
            type="text"
            {...register("Fecha", {
              required: "La fecha de expiración es obligatoria",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/, // Validación MM/AA
                message: "Formato de fecha inválido (MM/AA)",
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Fecha de Expiración (MM/AA)"
          />
          {errors.Fecha && (
            <p className="text-red-500">{errors.Fecha.message}</p>
          )}

          <button
            onClick={() => navigate("/despacho")} // Redirigir al hacer clic
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Confirmar pago
          </button>
          <button
            onClick={() => navigate("/anulacion")} // Redirigir al hacer clic
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Cancelar pago
          </button>
        </form>
      </div>
    </div>
  );
}

export default Pago;
