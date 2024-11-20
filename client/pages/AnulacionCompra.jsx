import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerRequest } from "../api/auth";
import { useNavigate } from "react-router-dom";

function AnulacionCompra() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
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
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={onSubmit}>
          {/* Lista desplegable para Opción */}
          <select
            {...register("Opcion", {
              required: "La opción es obligatoria",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          >
            <option value="">Seleccione una opción</option>
            <option value="Error en el pedido">Error en el pedido</option>
            <option value="Producto dañado">Producto dañado</option>
            <option value="Otro">Otro</option>
          </select>
          {errors.Opcion && (
            <p className="text-red-500">{errors.Opcion.message}</p>
          )}

          {/* Campo Razón */}
          <textarea
            {...register("Razon", {
              required: "La razón es obligatoria",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2 resize-none"
            placeholder="Escribe aquí la razón"
            rows="4" // Altura fija en líneas
          />
          {errors.Razon && (
            <p className="text-red-500">{errors.Razon.message}</p>
          )}

          {/* Botón de envío */}
          <button
            type="submit"
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}

export default AnulacionCompra;
