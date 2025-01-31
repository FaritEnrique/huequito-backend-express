//authController.js

import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import generateToken from '../utils/generateToken.js';
import { validationResult } from 'express-validator';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

const prisma = new PrismaClient();

// Función para registrar un nuevo usuario
const registerUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        const userExists = await prisma.user.findUnique({ where: { email } });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });

        const token = generateToken(user.id);

        res.status(201).json({
            message: 'Usuario registrado con éxito',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Función para iniciar sesión
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Función para refrescar el token de acceso
const refreshToken = async (req, res) => {
    const { refreshToken } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { refreshToken },
        });
        if (!user) {
            return res.status(401).json({ message: 'Token inválido' });
        }

        const newToken = generateToken(user.id);

        res.status(200).json({
            message: 'Token refrescado con éxito',
            token: newToken,
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Función para cerrar sesión
const logoutUser = async (req, res) => {
    const { token } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { token } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        // Limpiar el token en la base de datos
        await prisma.user.update({
            where: { token },
            data: { token: null },
        });

        res.status(200).json({
            message: 'Usuario desconectado con éxito',
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Solicitar restablecimiento de contraseña
const requestPasswordReset = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(400).json({ message: 'Correo electrónico no encontrado' });
        }

        // Generar un token de restablecimiento
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiration = Date.now() + 3600000; // 1 hora de validez

        // Guardar el token en la base de datos
        await prisma.user.update({
            where: { email },
            data: {
                resetToken,
                resetTokenExpiration,
            },
        });

        // Enviar un correo con el enlace de recuperación
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'tu_correo@gmail.com',
                pass: 'tu_contraseña',
            },
        });

        const resetUrl = `http://localhost:5000/api/auth/reset-password/${resetToken}`;

        await transporter.sendMail({
            to: email,
            subject: 'Recuperación de contraseña',
            text: `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetUrl}`,
        });

        res.status(200).json({ message: 'Enlace de recuperación enviado' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

// Restablecer la contraseña
const resetPassword = async (req, res) => {
    const { resetToken, newPassword } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { resetToken } });
        if (!user) {
            return res.status(400).json({ message: 'Token inválido o expirado' });
        }

        if (user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: 'Token expirado' });
        }

        // Hashear la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Actualizar la contraseña y limpiar el token
        await prisma.user.update({
            where: { resetToken },
            data: {
                password: hashedPassword,
                resetToken: null,
                resetTokenExpiration: null,
            },
        });

        res.status(200).json({ message: 'Contraseña actualizada con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export { registerUser, loginUser, refreshToken, logoutUser, requestPasswordReset, resetPassword };