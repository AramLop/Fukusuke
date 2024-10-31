const CarritoCompras = () => {
  const carrito = [
    { id: 1, nombre: "Sushi de Salmón", precio: 8000, cantidad: 2 },
    { id: 2, nombre: "Sushi de Atún", precio: 8500, cantidad: 1 },
    // Ejemplo de productos en el carrito
  ];

  const calcularTotal = () =>
    carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <div className="bg-white p-6 min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-orange-500">
        Carrito de Compras
      </h1>
      <div className="grid gap-4">
        {carrito.map((item) => (
          <div key={item.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{item.nombre}</h2>
            <p className="text-gray-700">Precio: ${item.precio}</p>
            <p className="text-gray-700">Cantidad: {item.cantidad}</p>
            <button className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
              Eliminar
            </button>
          </div>
        ))}
      </div>
      <h3 className="text-lg font-semibold mt-6">Total: ${calcularTotal()}</h3>
      <button href="/" className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        Confirmar Pedido
      </button>
    </div>
  );
};

export default CarritoCompras;
