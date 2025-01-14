import express from 'express';
import mensajeController from '../controllers/mensajeController.js';
import validarMensaje from '../middlewares/validarMensaje.js'; // Importa el middleware de validación

const router = express.Router();

// Rutas para el modelo Mensajes con validación
router.post('/', validarMensaje, mensajeController.crearMensaje);            // Crear un mensaje
router.get('/', mensajeController.obtenerMensajes);                          // Obtener todos los mensajes
router.get('/:id', mensajeController.obtenerMensajePorId);                  // Obtener un mensaje por ID
router.put('/:id', validarMensaje, mensajeController.actualizarMensaje);    // Actualizar un mensaje
router.delete('/:id', mensajeController.eliminarMensaje);                   // Eliminar un mensaje

export default router;