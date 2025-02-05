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
import { createCanvas } from 'canvas';
import morgan from 'morgan';

process.stdout.write('\uFEFF');
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

app.enable('trust proxy');

// 🔐 Middleware para redirigir de HTTP a HTTPS si no está detrás de un proxy
app.use((req, res, next) => {
  if (process.env.FORCE_HTTPS === 'true' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// 🛡️ Middleware de seguridad
app.use(helmet());

// 🌐 Encabezados de seguridad adicionales (comentado para evitar conflictos)
/*
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});
*/

// Configuración de CORS
const corsOptions = {
  origin: ['https://el-huequito.netlify.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(morgan('combined'));
app.use(express.json());
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
app.use('/api/clientes', clientesRoutes);
app.use('/api/ideas', ideasRoutes);
app.use('/api/mensajes', mensajesRoutes);
app.use('/api/preguntas', preguntasRoutes);
app.use('/api/promociones', promocionesRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/productos', productoRoutes);
app.use('/api/marcas', marcaRoutes);
app.use('/api/tipo-productos', tipoProductoRoutes);

// Middleware para rutas no encontradas
app.use((req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Middleware global para manejar errores
app.use((err, req, res, next) => {
  console.error("🔥 ERROR:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Algo salió mal en el servidor',
  });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Mi Backend está funcionando 🔥🎉🦾`);
  console.log(`http://localhost:${port}/`);
});