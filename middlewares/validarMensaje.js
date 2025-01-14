import mensajeSchema from '../schemas/mensajesSchema.js';

// Middleware de validación para mensajes
const validarMensaje = (req, res, next) => {
    // Añadir automáticamente el prefijo +51 si el número no lo tiene
    if (req.body.celular && !req.body.celular.startsWith("+51")) {
        req.body.celular = `+51${req.body.celular}`;
    }

    const { error } = mensajeSchema.validate(req.body, { abortEarly: false });
    if (error) {
        return res.status(400).json({
            errors: error.details.map(err => ({
                message: err.message,
                path: err.path,
            })),
        });
    }
    next();
};

export default validarMensaje;