import Producto from '../models/Producto.js';

// Agregar un producto al carrito
export const agregarProducto = async (req, res) => {
  const { nombre, precio, imagen, cantidad } = req.body;

  const nuevoProducto = new Producto({ nombre, precio, imagen, cantidad });
  try {
    await nuevoProducto.save();
    res.status(201).json({ message: 'Producto agregado al carrito', producto: nuevoProducto });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Obtener todos los productos del carrito
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find();
    res.status(200).json(productos);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Eliminar un producto del carrito
export const eliminarProducto = async (req, res) => {
  const { id } = req.params;

  try {
    await Producto.findByIdAndDelete(id);
    res.status(200).json({ message: 'Producto eliminado del carrito' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};