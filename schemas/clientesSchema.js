// schemas/clientesSchema.js

import Joi from 'joi';

// Definición de las validaciones para el cliente
const clienteSchema = Joi.object({
    nombre: Joi.string().required().custom((value, helper) => {
        const partes = value.split(' '); // Separar por espacio
        if (partes.length < 3) {
            return helper.message('El nombre completo debe contener al menos un nombre y dos apellidos.');
        }
        return value; // Si pasa la validación, retornar el valor
    }).messages({
        'any.required': 'El nombre es obligatorio.',
        'string.base': 'El nombre debe ser una cadena de texto.',
    }),

    dni: Joi.string().length(8).pattern(/^\d{8}$/).required().messages({
        'string.base': 'El DNI debe ser una cadena de texto.',
        'string.length': 'El DNI debe tener exactamente 8 dígitos.',
        'string.pattern.base': 'El DNI debe contener solo números.',
        'any.required': 'El DNI es obligatorio.',
    }),

    direccion: Joi.string().required().pattern(/^[\p{L}0-9\s°.,#-]+$/u).messages({
        'string.base': 'La dirección debe ser una cadena de texto.',
        'string.pattern.base': 'La dirección solo puede contener letras, números y los caracteres ° , . # -',
        'any.required': 'La dirección es obligatoria.',
    }),

    celular: Joi.string().pattern(/^\+?51?\d{9}$/).required().messages({
    'string.pattern.base': 'El celular debe ser un número de 9 dígitos, con o sin prefijo +51.',
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