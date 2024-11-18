import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AnulacionCompra() {
  const [error, setError] = useState(null); // Corregido
  const {
    register,
    handleSubmit,
    formState: { errors }, // Extraer errores
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await registerRequest(values);
      console.log("Anulación exitosa:", response.data);
      alert("Despacho anulado exitosamente");
    } catch (error) {
      console.error(
        "Error en la anulación:",
        error.response?.data || error.message
      );
      setError(
        error.response?.data?.message ||
          "Error al procesar los datos de anulación"
      );
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-500 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Página de anulación</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        <form onSubmit={onSubmit}>
          {/* Campo Opción */}
          <input
            type="text"
            {...register("Opcion", {
              required: "La opción es obligatoria",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Opción"
          />
          {errors.Opcion && (
            <p className="text-red-500">{errors.Opcion.message}</p>
          )}

          {/* Campo Razón */}
          <input
            type="text"
            {...register("Razon", {
              required: "La razón es obligatoria",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Razón"
          />
          {errors.Razon && (
            <p className="text-red-500">{errors.Razon.message}</p>
          )}

          {/* Botón de envío */}
          <button
            onClick={() => navigate("/")} // Redirigir al hacer clic
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Cancelar pedido
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnulacionCompra;
