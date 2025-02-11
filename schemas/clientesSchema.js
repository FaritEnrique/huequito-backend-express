// schemas/clientesSchema.js

import Joi from 'joi';

// Definición de las validaciones para el cliente
const clienteSchema = Joi.object({
    nombre: Joi.string().required().pattern(/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s'-]+$/).messages({
        'any.required': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser una cadena de texto.',
        'string.pattern.base': 'El nombre solo puede contener letras, espacios y algunos caracteres especiales.',
    }),

    dni: Joi.string().length(8).pattern(/^\d{8}$/).required().messages({
        'string.base': 'El DNI debe ser una cadena de texto.',
        'string.length': 'El DNI debe tener exactamente 8 dígitos.',
        'string.pattern.base': 'El DNI debe contener solo números.',
        'any.required': 'El DNI es obligatorio.',
    }),

    direccion: Joi.string().required().max(100).pattern(/^[\p{L}0-9\s°.,#-]+$/u).messages({
        'string.base': 'La dirección debe ser una cadena de texto.',
        'string.pattern.base': 'La dirección solo puede contener letras, números y los caracteres ° , . # -',
        'string.max': 'La dirección no puede exceder los 100 caracteres.',
        'any.required': 'La dirección es obligatoria.',
    }),

    celular: Joi.string().length(9).pattern(/^\d{9}$/).required().messages({
        'string.base': 'El celular debe ser una cadena de texto.',
        'string.length': 'El celular debe tener exactamente 9 dígitos.',
        'string.pattern.base': 'El celular debe contener solo números.',
        'any.required': 'El celular es obligatorio.',
    }),

    correo: Joi.string().email().required().messages({
        'string.email': 'Ingrese un correo electrónico válido.',
        'any.required': 'El correo es obligatorio.',
    }),

    condicion: Joi.string().valid('Maestro de Obra', 'Dueño de Obra', 'Pintor', 'Otro').required().messages({
        'any.only': 'La condición debe ser una de las siguientes: Maestro de Obra, Dueño de Obra, Pintor, Otro.',
        'any.required': 'La condición es obligatoria.',
    }),
});

export default clienteSchema;