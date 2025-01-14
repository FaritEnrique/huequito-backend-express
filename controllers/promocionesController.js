import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { ValidationError } from 'sequelize'; // Para lanzar errores

// Crear una nueva promoción
const crearPromocion = async (req, res) => {
  const { titulo, descripcion, fecha_inicio, fecha_termino, imagen_url, creado_por, is_active } = req.body;

  try {
    // Validaciones personalizadas
    if (new Date(fecha_termino) < new Date(fecha_inicio)) {
      throw new ValidationError('La fecha de término no puede ser anterior a la fecha de inicio.');
    }
    
    if (new Date(fecha_inicio) < new Date()) {
      throw new ValidationError('La fecha de inicio no puede estar en el pasado.');
    }

    // Convertir el valor de is_active en un valor booleano
    const activeStatus = is_active === 'true' || is_active === true; // Convierte a booleano

    const promocion = await prisma.promociones.create({
      data: {
        titulo,
        descripcion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_termino: new Date(fecha_termino),
        imagen_url,
        creado_por,
        is_active: activeStatus, // Usar el valor booleano
      },
    });

    return res.status(201).json(promocion);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al crear la promoción' });
  }
};

// Obtener todas las promociones
const obtenerPromociones = async (req, res) => {
  try {
    const promociones = await prisma.promociones.findMany();
    return res.status(200).json(promociones);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener las promociones' });
  }
};

// Obtener promoción por ID
const obtenerPromocionPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const promocion = await prisma.promociones.findUnique({
      where: { id: parseInt(id) },
    });
    if (!promocion) {
      return res.status(404).json({ error: 'Promoción no encontrada' });
    }
    return res.status(200).json(promocion);
  } catch (error) {
    return res.status(500).json({ error: 'Error al obtener la promoción' });
  }
};

// Actualizar promoción
const actualizarPromocion = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_inicio, fecha_termino, imagen_url, is_active } = req.body;

  try {
    // Validaciones personalizadas
    if (new Date(fecha_termino) < new Date(fecha_inicio)) {
      throw new ValidationError('La fecha de término no puede ser anterior a la fecha de inicio.');
    }
    
    if (new Date(fecha_inicio) < new Date()) {
      throw new ValidationError('La fecha de inicio no puede estar en el pasado.');
    }

    // Convertir el valor de is_active en un valor booleano
    const activeStatus = is_active === 'true' || is_active === true; // Convierte a booleano

    const promocion = await prisma.promociones.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        fecha_inicio: new Date(fecha_inicio),
        fecha_termino: new Date(fecha_termino),
        imagen_url,
        is_active: activeStatus, // Usar el valor booleano
      },
    });

    return res.status(200).json(promocion);
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(500).json({ error: 'Error al actualizar la promoción' });
  }
};

// Eliminar promoción
const eliminarPromocion = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.promociones.delete({
      where: { id: parseInt(id) },
    });
    return res.status(200).json({ message: 'Promoción eliminada correctamente' });
  } catch (error) {
    return res.status(500).json({ error: 'Error al eliminar la promoción' });
  }
};

export default {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion,
};