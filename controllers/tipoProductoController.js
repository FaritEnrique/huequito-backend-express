import { 
  crearTipoProducto, 
  obtenerTiposProducto, 
  obtenerTipoProductoPorId, 
  actualizarTipoProducto, 
  eliminarTipoProducto 
} from '../services/tipoProductoService.js';

export const crearTipoProductoController = async (req, res) => {
  try {
    const { nombre } = req.body;
    const tipoProducto = await crearTipoProducto({ nombre });
    res.status(201).json(tipoProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerTiposProductoController = async (req, res) => {
  try {
    const tipoProductos = await obtenerTiposProducto();
    res.status(200).json(tipoProductos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const obtenerTipoProductoPorIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProducto = await obtenerTipoProductoPorId(id);
    if (!tipoProducto) return res.status(404).json({ message: 'Tipo de producto no encontrado' });
    res.status(200).json(tipoProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const actualizarTipoProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const tipoProducto = await actualizarTipoProducto(id, { nombre });
    if (!tipoProducto) return res.status(404).json({ message: 'Tipo de producto no encontrado' });
    res.status(200).json(tipoProducto);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const eliminarTipoProductoController = async (req, res) => {
  try {
    const { id } = req.params;
    const tipoProducto = await eliminarTipoProducto(id);
    if (!tipoProducto) return res.status(404).json({ message: 'Tipo de producto no encontrado' });
    res.status(200).json({ message: 'Tipo de producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};