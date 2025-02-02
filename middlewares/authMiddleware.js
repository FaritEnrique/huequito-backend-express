// authMiddleware.js

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';  // Correcta importación del JWT_SECRET

const protect = (req, res, next) => {
    // Verifica si el encabezado 'Authorization' contiene el token
    let token;

    // Verifica que el encabezado 'Authorization' comience con 'Bearer' y extrae el token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // Si no se encuentra el token, retorna un error de acceso no autorizado
    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }

    try {
        // Verifica la validez del token usando JWT_SECRET
        const decoded = jwt.verify(token, JWT_SECRET);
        
        // Adjunta la información del usuario decodificada al objeto request
        req.user = decoded;

        // Continúa con la siguiente función de middleware
        next();
    } catch (error) {
        // Si el token no es válido, retorna un error de acceso no autorizado
        return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
};

export default protect;