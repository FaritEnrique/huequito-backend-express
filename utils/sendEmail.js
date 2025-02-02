// sendEmail.js

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Cargar las variables de entorno desde el archivo .env
dotenv.config();

const sendEmail = async (to, subject, htmlContent) => {
    // Crear el transportador para Nodemailer
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    // Enviar el correo electrónico
    await transporter.sendMail({
        from: `"Huequito Backend" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html: htmlContent,
    });
};

export default sendEmail;