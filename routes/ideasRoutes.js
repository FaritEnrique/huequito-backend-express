import express from 'express';
import { 
    crearIdea, 
    obtenerIdeas, 
    obtenerIdeaPorId, 
    actualizarIdea, 
    eliminarIdea 
} from '../controllers/ideasController.js';
import validarIdea from '../middlewares/validarIdea.js';

const router = express.Router();

router.post('/', validarIdea, crearIdea);
router.get('/', obtenerIdeas);
router.get('/:id', obtenerIdeaPorId);
router.put('/:id', validarIdea, actualizarIdea);
router.delete('/:id', eliminarIdea);

export default router;