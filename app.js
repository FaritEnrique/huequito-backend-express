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
import { createCanvas } from 'canvas';  // Importa la librería canvas
import morgan from 'morgan';  // Importa morgan para el logging

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la aplicación de Express
const app = express();

// Puerto del servidor
const port = process.env.PORT || 3000;

// 🔐 Middleware para redirigir de HTTP a HTTPS
app.use((req, res, next) => {
  if (process.env.FORCE_HTTPS === 'true' && req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

// 🛡️ Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: false, // Desactiva CSP si es necesario para React
  crossOriginEmbedderPolicy: false, // Evita problemas con recursos externos
}));

// 🌐 Encabezados de seguridad adicionales
app.use((req, res, next) => {
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  next();
});

// Configuración de CORS para restringir accesos
const corsOptions = {
  origin: ['https://el-huequito.netlify.app'], // Dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'], // Headers permitidos
  credentials: true, // Permitir cookies o credenciales
};

app.use(cors(corsOptions)); // Aplica la configuración de CORS

// Middleware de logging con morgan
app.use(morgan('combined')); // Usa 'combined' para un log detallado

app.use(express.json()); // Parseo de JSON
app.use(express.urlencoded({ extended: true }));

// Ruta para generar una imagen dinámica con canvas
app.get('/api/generar-imagen', (req, res) => {
  // Crea un canvas de 500x500 píxeles
  const canvas = createCanvas(500, 500);
  const ctx = canvas.getContext('2d');

  // Dibuja un rectángulo azul en el canvas
  ctx.fillStyle = 'blue';
  ctx.fillRect(10, 10, 100, 100);

  // Establece los encabezados para la imagen en formato PNG
  res.setHeader('Content-Type', 'image/png');
  res.send(canvas.toBuffer('image/png')); // Devuelve la imagen como buffer PNG
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
  console.error("🔥 ERROR:", err.stack); // Loguea el error en la consola
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Algo salió mal en el servidor',
  });
});

// Inicializa el servidor
app.listen(port, () => {
  console.log(`Mi Backend está funcionando 🔥🎉🦾`);
  console.log(`http://localhost:${port}/`);
});