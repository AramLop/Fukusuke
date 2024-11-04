import PropTypes from 'prop-types';

const CarritoCompras = ({ carrito, eliminarItem, calcularTotal, toggleCarrito }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-orange-600 text-center">Carrito de Compras</h2>
        {carrito.length === 0 ? (
          <p className="text-gray-600 text-center">Tu carrito está vacío.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {carrito.map((item) => (
                <li key={item.id} className="flex justify-between items-center py-4">
                  <div className="flex items-center">
                    <img 
                      src={item.imagen} 
                      alt={item.nombre} 
                      className="w-16 h-16 object-cover rounded" 
                    />
                    <div className="ml-4">
                      <p className="text-lg font-semibold text-gray-800">{item.nombre}</p>
                      <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                      <p className="text-gray-600">${(item.precio * item.cantidad).toFixed(2)}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => eliminarItem(item.id)}
                    className="text-red-500 hover:text-red-700 transition duration-300"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800">Total: ${calcularTotal()}</h3>
            </div>
          </div>
        )}
        <div className="mt-4 flex justify-between">
          <button
            onClick={toggleCarrito} // Botón para salir del carrito
            className="flex-1 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition duration-300 mr-2"
          >
            Salir del Carrito
          </button>
          <button
            onClick={() => {/* Aquí puedes manejar el checkout */}}
            className="flex-1 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition duration-300 ml-2"
          >
            Continuar a Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

CarritoCompras.propTypes = {
  carrito: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      nombre: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      cantidad: PropTypes.number.isRequired,
      imagen: PropTypes.string.isRequired,
    })
  ).isRequired,
  eliminarItem: PropTypes.func.isRequired,
  calcularTotal: PropTypes.func.isRequired,
  toggleCarrito: PropTypes.func.isRequired,
};

export default CarritoCompras;
