import express from 'express';
import preguntaController from '../controllers/preguntaController.js';
import { validarPregunta } from '../middlewares/validarPregunta.js';


const router = express.Router();

// Rutas para el modelo Preguntas
router.post('/', validarPregunta, preguntaController.crearPregunta); // Crear
router.get('/', preguntaController.obtenerPreguntas);                // Obtener todas
router.get('/:id', preguntaController.obtenerPreguntaPorId);        // Obtener por ID
router.put('/:id', validarPregunta, preguntaController.actualizarPregunta); // Actualizar
router.delete('/:id', preguntaController.eliminarPregunta);         // Eliminar

export default router;