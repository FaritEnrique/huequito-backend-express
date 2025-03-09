// app.js

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import clientesRoutes from './routes/clientesRoutes.js';
import ideasRoutes from './routes/ideasRoutes.js';
import mensajesRoutes from './routes/mensajesRoutes.js';
import preguntasRoutes from './routes/preguntasRoutes.js';
import promocionesRoutes from './routes/promocionesRoutes.js';
import authRoutes from './routes/authRoutes.js';
import productoRoutes from './routes/productoRoutes.js';
import marcaRoutes from './routes/marcaRoutes.js';
import tipoProductoRoutes from './routes/tipoProductoRoutes.js';
import { createCanvas } from 'canvas'; // Importa la librería canvas
import morgan from 'morgan'; // Importa morgan para el logging

// Fuerza UTF-8 para la consola
process.stdout.write('\uFEFF');

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la aplicación de Express
const app = express();

// Puerto del servidor
const PORTS = [8080, 3000, 4000]; // Lista de puertos disponibles
const port = process.env.PORT || PORTS.find(p => p); // Toma el primero disponible

// Confía en el proxy de AWS Elastic Beanstalk
app.enable('trust proxy');

//  Middleware para redirigir de HTTP a HTTPS
app.use((req, res, next) => {
    if (process.env.FORCE_HTTPS === 'true' && req.headers['x-forwarded-proto'] !== 'https') {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});

// ️ Middleware de seguridad
app.use(helmet()); // Reactivado tras revisión

// Configuración de CORS mejorada
const allowedOrigins = process.env.NODE_ENV === 'production' ? [
    'https://el-huequito.netlify.app', // Origen de producción
    'https://www.el-huequito.netlify.app' // Con www
] : ['*'];

app.use(cors({
    origin: function (origin, callback) {
        console.log("Solicitando desde origin:", origin);
        if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
            callback(null, true);
        } else {
            console.error("CORS Error: Origin not allowed:", origin);
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'], // Añadido OPTIONS y PATCH
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Headers permitidos
}));

// Middleware de logging con morgan
app.use(morgan('combined'));

app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: true }));

// Ruta para generar una imagen dinámica con canvas
app.get('/api/generar-imagen', (req, res) => {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'blue';
    ctx.fillRect(10, 10, 100, 100);

    res.setHeader('Content-Type', 'image/png');
    res.send(canvas.toBuffer('image/png'));
});

// Rutas de la API
app.get('/', (req, res) => {
    res.send('Backend funcionando');
});

app.use('/api/clientes', clientesRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/promociones', promocionesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/tipos-producto', tipoProductoRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
    res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware global para manejar errores
app.use((err, req, res, next) => {
    console.error("ERROR:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Algo salió mal en el servidor',
    });
});

// Inicializa el servidor
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}/`);
});