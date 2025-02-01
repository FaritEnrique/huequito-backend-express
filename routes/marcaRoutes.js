import express from 'express';
import {
  crearMarcaController,
  obtenerMarcasController,
  obtenerMarcaPorIdController,
  actualizarMarcaController,
  eliminarMarcaController,
} from '../controllers/marcaController.js';

const router = express.Router();

// Ruta para crear una marca
router.post('/marcas', crearMarcaController);

// Ruta para obtener todas las marcas
router.get('/marcas', obtenerMarcasController);

// Ruta para obtener una marca por ID
router.get('/marcas/:id', obtenerMarcaPorIdController);

// Ruta para actualizar una marca
router.put('/marcas/:id', actualizarMarcaController);

// Ruta para eliminar una marca
router.delete('/marcas/:id', eliminarMarcaController);

export default router;