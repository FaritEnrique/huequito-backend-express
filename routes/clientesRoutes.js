// routes/clientesRoutes.js
import { Router } from 'express';
import { crearCliente, obtenerClientes, obtenerClientePorId, actualizarCliente, eliminarCliente } from '../controllers/clienteController.js';
import validarCliente from '../middlewares/validarCliente.js';  // Middleware de validación

const router = Router();

// Ruta para crear un cliente (POST)
router.post('/', validarCliente, crearCliente);

// Ruta para obtener todos los clientes (GET)
router.get('/', obtenerClientes);

// Ruta para obtener un cliente por ID (GET)
router.get('/:id', obtenerClientePorId);

// Ruta para actualizar un cliente (PUT)
router.put('/:id', validarCliente, actualizarCliente);

// Ruta para eliminar un cliente (DELETE)
router.delete('/:id', eliminarCliente);

export default router;