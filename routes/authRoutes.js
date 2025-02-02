// authRoutes.js

import express from 'express';
import { body } from 'express-validator';
import { 
    registerUser, 
    loginUser, 
    requestPasswordReset, 
    resetPassword 
} from '../controllers/authController.js'; // Asegúrate de tener las extensiones .js
import protect from '../middlewares/authMiddleware.js'; // Igualmente, asegurarse de que la extensión sea .js

const router = express.Router();

// Ruta para registrar usuario con validaciones
router.post(
    '/register',
    [
        body('name').notEmpty().withMessage('El nombre es requerido'),
        body('email').isEmail().withMessage('Correo inválido'),
        body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    ],
    registerUser
);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener el perfil de usuario protegido (requiere autenticación)
router.get('/profile', protect, (req, res) => {
    res.status(200).json({
        message: 'Perfil de usuario protegido',
        user: req.user,  // El middleware "protect" adjunta la información del usuario
    });
});

// Ruta para solicitar la recuperación de la contraseña
router.post('/request-password-reset', requestPasswordReset);

// Ruta para restablecer la contraseña
router.post('/reset-password/:resetToken', resetPassword);

export default router;