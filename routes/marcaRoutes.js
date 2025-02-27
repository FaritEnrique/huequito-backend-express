// routes/marcaRoutes.js

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
router.post('/', crearMarcaController);

// Ruta para obtener todas las marcas
router.get('/', obtenerMarcasController);

// Ruta para obtener una marca por ID
router.get('/:id', obtenerMarcaPorIdController);

// Ruta para actualizar una marca
router.put('/:id', actualizarMarcaController);

// Ruta para eliminar una marca
router.delete('/:id', eliminarMarcaController);

export default router;