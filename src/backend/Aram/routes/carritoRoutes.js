import express from 'express';
import { agregarProducto, obtenerProductos, eliminarProducto } from '../controllers/carritoControllers.js';

const router = express.Router();

// Ruta para agregar un producto al carrito
router.post('/', agregarProducto);

// Ruta para obtener todos los productos del carrito
router.get('/', obtenerProductos);

// Ruta para eliminar un producto del carrito
router.delete('/:id', eliminarProducto);

export default router;