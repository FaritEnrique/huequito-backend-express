import Joi from 'joi';

const ideaSchema = Joi.object({
    foto: Joi.string().uri().required().messages({
        'any.required': 'La foto es obligatoria.',
        'string.uri': 'La foto debe ser una URL válida.',
        'string.base': 'La foto debe ser una cadena de texto.',
    }),
});

export default ideaSchema;