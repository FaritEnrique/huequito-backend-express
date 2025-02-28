// services/productoService.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createProducto = async (data) => {
  try {
    const producto = await prisma.producto.create({
      data,
    });
    return producto;
  } catch (error) {
    throw new Error('Error creating product: ' + error.message);
  }
};

export const getProductos = async () => {
  try {
    const productos = await prisma.producto.findMany({
      include: {
        marca: true,
        tipoProducto: true,
      },
    });
    return productos;
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

export const getProductoById = async (id) => {
  try {
    const producto = await prisma.producto.findUnique({
      where: { id },
      include: {
        marca: true,
        tipoProducto: true,
      },
    });
    return producto;
  } catch (error) {
    throw new Error('Error fetching product by ID: ' + error.message);
  }
};

export const updateProducto = async (id, data) => {
  try {
    const producto = await prisma.producto.update({
      where: { id },
      data,
      include: {
        marca: true,
        tipoProducto: true,
      },
    });
    return producto;
  } catch (error) {
    throw new Error('Error updating product: ' + error.message);
  }
};

export const deleteProducto = async (id) => {
  try {
    const producto = await prisma.producto.delete({
      where: { id },
    });
    return producto;
  } catch (error) {
    throw new Error('Error deleting product: ' + error.message);
  }
};