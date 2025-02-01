//marcaController.js

import * as MarcaService from '../services/marcaService.js';

// Crear una nueva marca
export const crearMarcaController = async (req, res) => {
  try {
    const nuevaMarca = await MarcaService.crearMarca(req.body);
    res.status(201).json(nuevaMarca);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener todas las marcas
export const obtenerMarcasController = async (req, res) => {
  try {
    const marcas = await MarcaService.obtenerMarcas();
    res.status(200).json(marcas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtener una marca por ID
export const obtenerMarcaPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const marca = await MarcaService.obtenerMarcaPorId(id);
    res.status(200).json(marca);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// Actualizar una marca existente
export const actualizarMarcaController = async (req, res) => {
  try {
    const { id } = req.params;
    const marcaActualizada = await MarcaService.actualizarMarca(id, req.body);
    res.status(200).json(marcaActualizada);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar una marca
export const eliminarMarcaController = async (req, res) => {
  try {
    const { id } = req.params;
    await MarcaService.eliminarMarca(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};