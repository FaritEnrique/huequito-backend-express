//Controllers/productoController.js

import * as productoService from '../services/productoService.js';

export const createProducto = async (req, res) => {
  try {
    const producto = await productoService.createProducto(req.body);
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductos = async (req, res) => {
  try {
    const productos = await productoService.getProductos();
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductoById = async (req, res) => {
  try {
    const producto = await productoService.getProductoById(Number(req.params.id));
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProducto = async (req, res) => {
  try {
    const producto = await productoService.updateProducto(Number(req.params.id), req.body);
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(producto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProducto = async (req, res) => {
  try {
    const producto = await productoService.deleteProducto(Number(req.params.id));
    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};