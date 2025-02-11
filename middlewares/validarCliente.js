// middlewares/validarCliente.js
import clienteSchema from '../schemas/clientesSchema.js';

const validarCliente = (req, res, next) => {
    const { error } = clienteSchema.validate(req.body, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            mensaje: 'Error en la validación de los datos.',
            errores: error.details.map(err => err.message),
        });
    }

    next();
};

export default validarCliente;
