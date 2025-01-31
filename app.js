// app.js

import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import clientesRoutes from './routes/clientesRoutes.js'; // Importa las rutas de clientes
import ideasRoutes from './routes/ideasRoutes.js'; // Importa las rutas de ideas
import mensajesRoutes from './routes/mensajesRoutes.js'; // Importa las rutas de mensajes
import preguntasRoutes from './routes/preguntasRoutes.js'; // Importa las rutas de preguntas
import promocionesRoutes from './routes/promocionesRoutes.js'; // Importa las rutas de promociones
import authRoutes from './routes/authRoutes.js';

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la aplicación de Express
const app = express();

// Puerto del servidor
const port = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet({
  contentSecurityPolicy: false, // Desactiva CSP si es necesario para React
  crossOriginEmbedderPolicy: false, // Evita problemas con recursos externos
})); // Añade headers de seguridad

// Configuración de CORS para restringir accesos
const corsOptions = {
  origin: ['https://el-huequito.netlify.app', 'http://localhost:3000'], // Lista de dominios permitidos
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Headers permitidos
  credentials: true, // Permitir envío de cookies u otras credenciales
};

app.use(cors(corsOptions)); // Aplica la configuración de CORS

app.use(express.json()); // Parseo de JSON

app.use(express.urlencoded({ extended: true }));

// Rutas de la API
app.use('/api/clientes', clientesRoutes);   // Rutas de clientes
app.use('/api/ideas', ideasRoutes);         // Rutas de ideas
app.use('/api/mensajes', mensajesRoutes);   // Rutas de mensajes
app.use('/api/preguntas', preguntasRoutes); // Rutas de preguntas
app.use('/api/promociones', promocionesRoutes); // Rutas de promociones
app.use('/api/auth', authRoutes); // Rutas de autenticación

// Middleware global para manejar errores
app.use((err, req, res, next) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
  console.error("🔥 ERROR:", err.stack); // Loguea el error en la consola
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Algo salió mal en el servidor',
  });
});

// Inicializa el servidormigrza
app.listen(port, () => {
  console.log(`Mi Backend está funcionando 🔥🎉🦾`);
  console.log(`http://localhost:${port}/`);
});