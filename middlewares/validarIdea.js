import Joi from 'joi';

const ideaSchema = Joi.object({
    foto: Joi.string().uri().required().messages({
        "string.empty": "La foto no puede estar vacía",
        "string.uri": "La foto debe ser una URL válida",
        "any.required": "La foto es obligatoria"
    })
});

const validarIdea = (req, res, next) => {
    const { error } = ideaSchema.validate(req.body, { abortEarly: false });

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

export default validarIdea;