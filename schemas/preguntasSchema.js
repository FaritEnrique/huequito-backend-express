import Joi from 'joi';

// Esquema de validación para el modelo preguntas
const preguntaSchema = Joi.object({
  pregunta: Joi.string().required().messages({
    'string.base': 'La pregunta debe ser una cadena de texto.',
    'any.required': 'La pregunta es obligatoria.',
  }),
  respuesta: Joi.string().required().messages({
    'string.base': 'La respuesta debe ser una cadena de texto.',
    'any.required': 'La respuesta es obligatoria.',
  }),
});

export default preguntaSchema;