//routes/productoRoutes.js

import express from 'express';
import {
  createProducto,
  getProductos,
  getProductoById,
  updateProducto,
  deleteProducto,
} from '../controllers/productoController.js';

const router = express.Router();

router.post('/', createProducto);
router.get('/', getProductos);
router.get('/:id', getProductoById);
router.put('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;