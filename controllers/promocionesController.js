// controllers/promocionesController.js

import moment from 'moment';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Crear una nueva promoción
const crearPromocion = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  const { titulo, descripcion, fecha_inicio, fecha_termino, imagen_url, creado_por, is_active } = req.body;

  try {

    //const inicio = moment(fecha_inicio, 'YYYY-MM-DD');
    //const termino = moment(fecha_termino, 'YYYY-MM-DD')
    // Verificar que todos los campos requeridos estén presentes
    if (!titulo || !descripcion || !fecha_inicio || !fecha_termino || !imagen_url || !creado_por) {
      console.log("Validación fallida: campos obligatorios faltantes");
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Validar formato de fechas
    const inicio = new Date(fecha_inicio);
    const termino = new Date(fecha_termino);

    if (isNaN(inicio.getTime()) || isNaN(termino.getTime())) {
      console.log("Validación fallida: formato de fecha inválido");
      return res.status(400).json({ error: 'Formato de fecha inválido' });
    }

    if (termino < inicio) {
      console.log("Validación fallida: fecha de término anterior a fecha de inicio");
      return res.status(400).json({ error: 'La fecha de término no puede ser anterior a la fecha de inicio.' });
    }

    if (inicio < new Date()) {
      console.log("Validación fallida: fecha de inicio en el pasado");
      return res.status(400).json({ error: 'La fecha de inicio no puede estar en el pasado.' });
    }

    // Verificar si el título ya existe
    const existePromocion = await prisma.promociones.findUnique({
      where: { titulo }
    });

    if (existePromocion) {
      console.log("Validación fallida: título duplicado");
      return res.status(400).json({ error: 'Ya existe una promoción con ese título.' });
    }

    // Convertir `is_active` a booleano con un valor por defecto
    const activeStatus = is_active === 'true' || is_active === true ? true : false;

    const promocion = await prisma.promociones.create({
      data: {
        titulo,
        descripcion,
        fecha_inicio: inicio,
        fecha_termino: termino,
        imagen_url,
        creado_por,
        is_active: activeStatus
      },
    });

    return res.status(201).json(promocion);
  } catch (error) {
    console.error('Error en crearPromocion:', error);
    return res.status(500).json({ error: 'Error al crear la promoción', detalle: error.message });
  }
};

// Obtener todas las promociones
const obtenerPromociones = async (req, res) => {
  try {
    const promociones = await prisma.promociones.findMany();
    return res.status(200).json(promociones);
  } catch (error) {
    console.error('Error en obtenerPromociones:', error);
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
    console.error('Error en obtenerPromocionPorId:', error);
    return res.status(500).json({ error: 'Error al obtener la promoción' });
  }
};

// Actualizar promoción
const actualizarPromocion = async (req, res) => {
  const { id } = req.params;
  const { titulo, descripcion, fecha_inicio, fecha_termino, imagen_url, is_active } = req.body;

  try {
    if (!titulo || !descripcion || !fecha_inicio || !fecha_termino || !imagen_url) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const inicio = new Date(fecha_inicio);
    const termino = new Date(fecha_termino);

    if (termino < inicio) {
      return res.status(400).json({ error: 'La fecha de término no puede ser anterior a la fecha de inicio.' });
    }

    // Convertir `is_active` a booleano
    const activeStatus = is_active === 'true' || is_active === true ? true : false;

    const promocion = await prisma.promociones.update({
      where: { id: parseInt(id) },
      data: {
        titulo,
        descripcion,
        fecha_inicio: inicio,
        fecha_termino: termino,
        imagen_url,
        is_active: activeStatus
      },
    });

    return res.status(200).json(promocion);
  } catch (error) {
    console.error('Error en actualizarPromocion:', error);
    return res.status(500).json({ error: 'Error al actualizar la promoción', detalle: error.message });
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
    console.error('Error en eliminarPromocion:', error);
    return res.status(500).json({ error: 'Error al eliminar la promoción', detalle: error.message });
  }
};

export default {
  crearPromocion,
  obtenerPromociones,
  obtenerPromocionPorId,
  actualizarPromocion,
  eliminarPromocion,
};