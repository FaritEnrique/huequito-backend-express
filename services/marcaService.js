// services/marcaService.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const crearMarca = async (datosMarca) => {
  try {
    const marca = await prisma.marca.create({
      data: datosMarca,
    });
    return marca;
  } catch (error) {
    throw new Error('Error al crear la marca: ' + error.message);
  }
};

export const obtenerMarcas = async () => {
  try {
    const marcas = await prisma.marca.findMany();
    return marcas;
  } catch (error) {
    throw new Error('Error al obtener marcas: ' + error.message);
  }
};

export const obtenerMarcaPorId = async (id) => {
  try {
    const marca = await prisma.marca.findUnique({
      where: { id: Number(id) },
    });
    if (!marca) {
      throw new Error('Marca no encontrada');
    }
    return marca;
  } catch (error) {
    throw new Error('Error al obtener la marca: ' + error.message);
  }
};

export const actualizarMarca = async (id, datosMarca) => {
  try {
    const marca = await prisma.marca.update({
      where: { id: Number(id) },
      data: datosMarca,
    });
    return marca;
  } catch (error) {
    throw new Error('Error al actualizar la marca: ' + error.message);
  }
};

export const eliminarMarca = async (id) => {
  try {
    const marca = await prisma.marca.delete({
      where: { id: Number(id) },
    });
    return marca;
  } catch (error) {
    throw new Error('Error al eliminar la marca: ' + error.message);
  }
};