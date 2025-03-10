import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import morgan from "morgan"; 
import { createCanvas } from "canvas";

import clientesRoutes from "./routes/clientesRoutes.js";
import ideasRoutes from "./routes/ideasRoutes.js";
import mensajesRoutes from "./routes/mensajesRoutes.js";
import preguntasRoutes from "./routes/preguntasRoutes.js";
import promocionesRoutes from "./routes/promocionesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import productoRoutes from "./routes/productoRoutes.js";
import marcaRoutes from "./routes/marcaRoutes.js";
import tipoProductoRoutes from "./routes/tipoProductoRoutes.js";

// Fuerza UTF-8 en la consola
process.stdout.write("\uFEFF");

// Carga variables de entorno
dotenv.config();

// Verifica que las variables esenciales están definidas
/*const requiredEnvVars = ["DATABASE_URL", "FRONTEND_URL_PROD", "FRONTEND_URL_DEV", "PORT", "FORCE_HTTPS"];

requiredEnvVars.forEach(envVar => {
    if (!process.env[envVar]) {
        console.error(`❌ ERROR: La variable ${envVar} no está definida en el .env`);
        process.exit(1); // Detiene la ejecución si falta una variable clave
    }
});*/

// Inicializa Express
const app = express();
const port = process.env.PORT || 8080;
//const forceHttps = process.env.FORCE_HTTPS === "true"; // Convierte el string a booleano

// Confía en el proxy de AWS Elastic Beanstalk
app.enable("trust proxy");

// Redirección HTTP a HTTPS en producción
/*app.use((req, res, next) => {
    if (forceHttps && req.headers["x-forwarded-proto"] !== "https" && process.env.NODE_ENV === "production") {
        return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
});*/

// Middleware de seguridad
app.use(helmet());

// Configuración de CORS mejorada
const allowedOrigins = [
    process.env.FRONTEND_URL_PROD,
    process.env.FRONTEND_URL_DEV,
    "http://localhost:5173" // Permitir en desarrollo
].filter(Boolean); // Elimina valores `undefined` por si acaso

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            console.error("CORS bloqueado para:", origin);
            callback(new Error("No permitido por CORS"));
        }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
}));

// Middleware de logging con Morgan
app.use(morgan("combined"));

// Middleware para parsear JSON y datos en formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para generar una imagen con canvas
app.get("/api/generar-imagen", (req, res) => {
    const canvas = createCanvas(500, 500);
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = "blue";
    ctx.fillRect(10, 10, 100, 100);

    res.setHeader("Content-Type", "image/png");
    res.send(canvas.toBuffer("image/png"));
});

// Rutas de la API
app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

app.use("/api/clientes", clientesRoutes);
app.use("/api/ideas", ideasRoutes);
app.use("/api/mensajes", mensajesRoutes);
app.use("/api/preguntas", preguntasRoutes);
app.use("/api/promociones", promocionesRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/productos", productoRoutes);
app.use("/api/marcas", marcaRoutes);
app.use("/api/tipos-producto", tipoProductoRoutes);

// Middleware para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ message: "Ruta no encontrada" });
});

// Middleware global para manejar errores
/*app.use((err, req, res, next) => {
    console.error("ERROR:", err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Algo salió mal en el servidor"
            : err.message, // Muestra el error real en desarrollo
    });
});*/

app.use((err, req, res, next) => {
    console.error("ERROR:", err.message); // Evita exponer el stack en prod
    res.status(err.status || 500).json({
        success: false,
        message: process.env.NODE_ENV === "production"
            ? "Error interno en el servidor"
            : err.message,
    });
});

// Inicia el servidor
app.listen(port, "0.0.0.0", () => {
    console.log(`✅ Servidor corriendo en http://localhost:${port}/`);
});