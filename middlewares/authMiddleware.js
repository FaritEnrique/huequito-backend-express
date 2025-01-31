// authMiddleware.js

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/config.js';  // Cambiar la extensión .js

const protect = (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, no hay token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'No autorizado, token inválido' });
    }
};

export default protect;