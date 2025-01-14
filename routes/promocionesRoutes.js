import express from 'express';
import promocionesController from '../controllers/promocionesController.js';

const router = express.Router();

// Rutas para el modelo Promociones
router.post('/', promocionesController.crearPromocion);            // Crear una promoción
router.get('/', promocionesController.obtenerPromociones);         // Obtener todas las promociones
router.get('/:id', promocionesController.obtenerPromocionPorId);  // Obtener una promoción por ID
router.put('/:id', promocionesController.actualizarPromocion);     // Actualizar una promoción
router.delete('/:id', promocionesController.eliminarPromocion);    // Eliminar una promoción

export default router;