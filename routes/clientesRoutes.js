// routes/clientesRoutes.js
import express from 'express';
import * as clienteController from '../controllers/clienteController.js';
import validarCliente from '../middlewares/validarCliente.js';

const router = express.Router();

// Rutas para clientes
router.get('/', clienteController.obtenerClientes);
router.get('/:id', clienteController.obtenerClientePorId);
router.post('/', validarCliente, clienteController.crearCliente);
router.put('/:id', validarCliente, clienteController.actualizarCliente);
router.delete('/:id', clienteController.eliminarCliente);

export default router;