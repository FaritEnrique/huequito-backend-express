import preguntaSchema from '../schemas/preguntasSchema.js'; // Esquema de validación (opcional)

export const validarPregunta = (req, res, next) => {
    try {
        const { pregunta, respuesta } = req.body;

        // Validación utilizando un esquema, si está definido
        if (preguntaSchema) {
            const { error } = preguntaSchema.validate(req.body);
            if (error) {
                return res.status(400).json({ message: error.details[0].message });
            }
        } else {
            // Validación manual si no se usa un esquema
            if (!pregunta || typeof pregunta !== 'string' || pregunta.trim() === '') {
                return res
                    .status(400)
                    .json({ message: "La pregunta es obligatoria y debe ser una cadena no vacía" });
            }

            if (!respuesta || typeof respuesta !== 'string' || respuesta.trim() === '') {
                return res
                    .status(400)
                    .json({ message: "La respuesta es obligatoria y debe ser una cadena no vacía" });
            }
        }

        next(); // Procede al siguiente middleware si pasa la validación
    } catch (error) {
        console.error("Error en la validación de pregunta:", error);
        res.status(500).json({ message: "Ocurrió un error al validar la pregunta" });
    }
};