// routes/tipoProductoRoutes.js

import express from 'express';
import {
  crearTipoProductoController,
  obtenerTiposProductoController,
  obtenerTipoProductoPorIdController,
  actualizarTipoProductoController,
  eliminarTipoProductoController
} from '../controllers/tipoProductoController.js';

const router = express.Router();

router.post('/', crearTipoProductoController);
router.get('/', obtenerTiposProductoController);
router.get('/:id', obtenerTipoProductoPorIdController);
router.put('/:id', actualizarTipoProductoController);
router.delete('/:id', eliminarTipoProductoController);

export default router;