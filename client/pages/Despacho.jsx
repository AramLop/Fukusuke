import { useForm } from "react-hook-form";
import { despachoRequest } from "../api/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Despacho() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = handleSubmit(async (values) => {
    try {
      const response = await despachoRequest(values);
      console.log("Despacho exitoso:", response.data);
      alert("Despacho completado exitosamente");
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
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-500 max-w-md w-full p-10 rounded-md">
        <h1 className="text-2xl font-bold mb-4">Página de Pago</h1>
        {error && <p className="text-red-500">{error}</p>} {/* Mostrar error */}
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("Nombre", {
              required: "El nombre completo es obligatorio",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Nombre"
          />
          {errors.Nombre && (
            <p className="text-red-500">{errors.Nombre.message}</p>
          )}

          <input
            type="text"
            {...register("Apellido", {
              required: "El apellido completo es obligatorio",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Apellido"
          />
          {errors.Numero && (
            <p className="text-red-500">{errors.Apellido.message}</p>
          )}

          <input
            type="text"
            {...register("Direccion", {
              required: "La direccion es obligatorio",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Direccion"
          />
          {errors.Numero && (
            <p className="text-red-500">{errors.Direccion.message}</p>
          )}

          <input
            type="text"
            {...register("NumeroD", {
              required: "El numero de direccion es obligatorio",
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Numero de direccion"
          />
          {errors.Numero && (
            <p className="text-red-500">{errors.NumeroD.message}</p>
          )}

          <input
            type="text"
            {...register("NumeroT", {
              required: "El número de telefono es obligatorio",
              pattern: {
                value: /^[0-9]{8}$/,
                message: "El número de tarjeta debe tener 16 dígitos",
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Numero de telefono"
          />
          {errors.Fecha && (
            <p className="text-red-500">{errors.NumeroT.message}</p>
          )}
          <input
            type="text"
            {...register("CodigoPostal", {
              required: "El número del codigo postal es obligatorio",
              pattern: {
                value: /^[0-9]{7}$/,
              },
            })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Codigo postal"
          />
          {errors.Fecha && (
            <p className="text-red-500">{errors.NumeroT.message}</p>
          )}

          <button
            onClick={() => navigate("/")} // Redirigir al hacer clic
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Confirmar despacho
          </button>
          <button
            onClick={() => navigate("/anulacion")} // Redirigir al hacer clic
            className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md w-full hover:bg-green-700"
          >
            Cancelar despacho
          </button>
        </form>
      </div>
    </div>
  );
}
export default Despacho;
