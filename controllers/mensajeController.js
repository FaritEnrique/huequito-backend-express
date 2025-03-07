import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Crear un nuevo mensaje
const crearMensaje = async (req, res) => {
  try {
    let { nombre, celular, correo, comunicacion, mensaje } = req.body;

    if (!nombre || !celular || !correo || !comunicacion || !mensaje) {
      return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }

    // Verificar si el celular tiene el prefijo +51, si no lo tiene, agregarlo
    if (!celular.startsWith('+51')) {
      celular = '+51' + celular.replace(/^(\+51)?/, '');
    }

    const mensajeCreado = await prisma.mensajes.create({
      data: {
        nombre,
        celular,
        correo,
        comunicacion,
        mensaje,
      },
    });

    return res.status(201).json(mensajeCreado);
  } catch (error) {
    console.error('❌ Error al crear el mensaje:', error);
    return res.status(500).json({ error: 'Error al crear el mensaje' });
  }
};

// Obtener todos los mensajes
const obtenerMensajes = async (req, res) => {
  try {
    const mensajes = await prisma.mensajes.findMany();
    
    return res.status(200).json(mensajes);
  } catch (error) {
    console.error('❌ Error al obtener los mensajes:', error);
    return res.status(500).json({ error: 'Error al obtener los mensajes' });
  }
};

// Obtener un mensaje por su ID
const obtenerMensajePorId = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    const mensaje = await prisma.mensajes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    return res.status(200).json(mensaje);
  } catch (error) {
    console.error('❌ Error al obtener el mensaje:', error);
    return res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
};

// Actualizar un mensaje por ID
const actualizarMensaje = async (req, res) => {
  const { id } = req.params;
  let { nombre, celular, correo, comunicacion, mensaje } = req.body;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Verificar si el mensaje existe
    const mensajeExistente = await prisma.mensajes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!mensajeExistente) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    // Verificar si el celular tiene el prefijo +51, si no lo tiene, agregarlo
    if (!celular.startsWith('+51')) {
      celular = '+51' + celular.replace(/^(\+51)?/, '');
    }

    const mensajeActualizado = await prisma.mensajes.update({
      where: { id: parseInt(id) },
      data: {
        nombre,
        celular,
        correo,
        comunicacion,
        mensaje,
      },
    });

    return res.status(200).json(mensajeActualizado);
  } catch (error) {
    console.error('❌ Error al actualizar el mensaje:', error);
    return res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
};

// Eliminar un mensaje por ID
const eliminarMensaje = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ error: 'ID inválido' });
  }

  try {
    // Verificar si el mensaje existe
    const mensaje = await prisma.mensajes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!mensaje) {
      return res.status(404).json({ error: 'Mensaje no encontrado' });
    }

    // Eliminar el mensaje
    await prisma.mensajes.delete({
      where: { id: parseInt(id) },
    });

    return res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (error) {
    console.error('❌ Error al eliminar el mensaje:', error);
    return res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
};

export default {
  crearMensaje,
  obtenerMensajes,
  obtenerMensajePorId,
  actualizarMensaje,
  eliminarMensaje,
};
