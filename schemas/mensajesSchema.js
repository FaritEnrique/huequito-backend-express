import Joi from 'joi';

// Esquema de validación para el modelo de mensajes
const mensajeSchema = Joi.object({
    nombre: Joi.string().max(150).required().messages({
        'any.required': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),

    celular: Joi.string()
        .pattern(/^\+51\d{9}$/)
        .required()
        .messages({
            'string.pattern.base': 'El celular debe tener el formato +51 seguido de 9 dígitos.',
            'any.required': 'El celular es obligatorio.',
        }),

    correo: Joi.string().email().required().messages({
        'string.email': 'Ingrese un correo electrónico válido.',
        'any.required': 'El correo es obligatorio.',
    }),

    comunicacion: Joi.string().max(30).required().messages({
        'any.required': 'La comunicación es obligatoria.',
        'string.base': 'La comunicación debe ser una cadena de texto.',
    }),

    mensaje: Joi.string().required().messages({
        'any.required': 'El mensaje es obligatorio.',
        'string.base': 'El mensaje debe ser una cadena de texto.',
    }),
});

export default mensajeSchema;