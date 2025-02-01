// services/tipoProductoService.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const crearTipoProducto = async (datosTipoProducto) => {
  try {
    const tipoProducto = await prisma.tipoProducto.create({
      data: datosTipoProducto,
    });
    return tipoProducto;
  } catch (error) {
    throw new Error('Error al crear el tipo de producto: ' + error.message);
  }
};

export const obtenerTiposProducto = async () => {
  try {
    const tiposProducto = await prisma.tipoProducto.findMany();
    return tiposProducto;
  } catch (error) {
    throw new Error('Error al obtener los tipos de productos: ' + error.message);
  }
};

export const obtenerTipoProductoPorId = async (id) => {
  try {
    const tipoProducto = await prisma.tipoProducto.findUnique({
      where: { id },
    });
    if (!tipoProducto) {
      throw new Error('Tipo de producto no encontrado');
    }
    return tipoProducto;
  } catch (error) {
    throw new Error('Error al obtener el tipo de producto: ' + error.message);
  }
};

export const actualizarTipoProducto = async (id, datosTipoProducto) => {
  try {
    const tipoProducto = await prisma.tipoProducto.update({
      where: { id },
      data: datosTipoProducto,
    });
    return tipoProducto;
  } catch (error) {
    throw new Error('Error al actualizar el tipo de producto: ' + error.message);
  }
};

export const eliminarTipoProducto = async (id) => {
  try {
    const tipoProducto = await prisma.tipoProducto.delete({
      where: { id },
    });
    return tipoProducto;
  } catch (error) {
    throw new Error('Error al eliminar el tipo de producto: ' + error.message);
  }
};
