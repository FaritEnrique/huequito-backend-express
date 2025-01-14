import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear una nueva pregunta
const crearPregunta = async (req, res) => {
  try {
    const { pregunta, respuesta } = req.body;
    const nuevaPregunta = await prisma.preguntas.create({
      data: { pregunta, respuesta },
    });
    return res.status(201).json(nuevaPregunta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al crear la pregunta' });
  }
};

// Obtener todas las preguntas
const obtenerPreguntas = async (req, res) => {
  try {
    const preguntas = await prisma.preguntas.findMany();
    return res.status(200).json(preguntas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las preguntas' });
  }
};

// Obtener una pregunta por ID
const obtenerPreguntaPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const pregunta = await prisma.preguntas.findUnique({
      where: { id: parseInt(id) },
    });
    if (!pregunta) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }
    return res.status(200).json(pregunta);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener la pregunta' });
  }
};

// Actualizar una pregunta
const actualizarPregunta = async (req, res) => {
  try {
    const { id } = req.params;
    const { pregunta, respuesta } = req.body;

    const preguntaExistente = await prisma.preguntas.findUnique({
      where: { id: parseInt(id) },
    });
    if (!preguntaExistente) {
      return res.status(404).json({ error: 'Pregunta no encontrada' });
    }

    const preguntaActualizada = await prisma.preguntas.update({
      where: { id: parseInt(id) },
      data: { pregunta, respuesta },
    });

    return res.status(200).json(preguntaActualizada);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al actualizar la pregunta' });
  }
};

// Eliminar una pregunta
const eliminarPregunta = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.preguntas.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Pregunta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al eliminar la pregunta' });
  }
};

export default {
  crearPregunta,
  obtenerPreguntas,
  obtenerPreguntaPorId,
  actualizarPregunta,
  eliminarPregunta,
};
