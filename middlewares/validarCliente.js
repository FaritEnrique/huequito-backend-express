// middlewares/validarCliente.js
import clienteSchema from '../schemas/clientesSchema.js';

const validarCliente = (req, res, next) => {
    const { error } = clienteSchema.validate(req.body, { abortEarly: false });
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

export default validarCliente;