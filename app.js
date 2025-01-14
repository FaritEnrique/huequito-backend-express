import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import clientesRoutes from './routes/clientesRoutes.js';
import ideasRoutes from './routes/ideasRoutes.js';
import mensajesRoutes from './routes/mensajesRoutes.js';
import preguntasRoutes from './routes/preguntasRoutes.js'; // Importa las rutas de preguntas
import promocionesRoutes from './routes/promocionesRoutes.js'; // Importa las rutas de promociones

// Carga las variables de entorno desde el archivo .env
dotenv.config();

// Inicializa la aplicación de Express
const app = express();

// Puerto del servidor
const port = process.env.PORT || 3000;

// Middleware de seguridad
app.use(helmet()); // Añade headers de seguridad
app.use(cors()); // Permite solicitudes de origen cruzado
app.use(express.json()); // Parseo de JSON

// Rutas de la API
app.use('/api/clientes', clientesRoutes);   // Rutas de clientes
app.use('/api/ideas', ideasRoutes);         // Rutas de ideas
app.use('/api/mensajes', mensajesRoutes);   // Rutas de mensajes
app.use('/api/preguntas', preguntasRoutes); // Rutas de preguntas
app.use('/api/promociones', promocionesRoutes); // Rutas de promociones

// Middleware global para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack); // Loguea el error en la consola
  res.status(err.status || 500).json({
    message: err.message || 'Algo salió mal en el servidor',
  });
});

// Inicializa el servidor
app.listen(port, () => {
  console.log(`Mi Backend está funcionando 🔥🎉🦾`);
  console.log(`http://localhost:${port}/`);
});