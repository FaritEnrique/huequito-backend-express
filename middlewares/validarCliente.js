// middlewares/validarCliente.js
/*import clienteSchema from '../schemas/clientesSchema.js';

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

export default validarCliente;*/

import clientesSchema from '../schemas/clientesSchema.js';

const validarCliente = (req, res, next) => {
  const { error } = clientesSchema.validate(req.body, { abortEarly: false });
  if (error) {
    console.error("Errores de validación:", error.details);
    return res.status(400).json({ errores: error.details.map(e => e.message) });
  }
  next();
};

export default validarCliente;
