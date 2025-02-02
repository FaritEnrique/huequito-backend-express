// config.js

import dotenv from 'dotenv';
dotenv.config();

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRATION = process.env.JWT_EXPIRATION;

export const EMAIL_USER = process.env.EMAIL_USER;
export const EMAIL_PASS = process.env.EMAIL_PASS;

// Configuración de la base de datos
export const DATABASE_URL = process.env.DATABASE_URL;

// Configuración del puerto
export const PORT = process.env.PORT || 3000; // Usa el puerto definido en el .env o 3000 por defecto

// URL del frontend
export const FRONTEND_URL = process.env.FRONTEND_URL;