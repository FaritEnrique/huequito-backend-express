// controllers/clienteController.js
import { PrismaClient } from '@prisma/client';
import esquemaCliente from '../schemas/clientesSchema.js';

const prisma = new PrismaClient();

// Función para validar que el DNI tenga exactamente 8 dígitos numéricos
const validarDNI = (dni) => /^\d{8}$/.test(dni);

// Función para normalizar el número de celular con el prefijo +51
const normalizarCelular = (celular) => {
    if (celular && celular.length === 9 && /^\d{9}$/.test(celular)) {
        return `+51${celular}`;
    }
    return celular;
};

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);
    let { nombre, dni, direccion, celular, correo, condicion } = req.body;

    if (!validarDNI(dni)) {
        return res.status(400).json({ error: 'El DNI debe tener exactamente 8 dígitos numéricos.' });
    }

    celular = normalizarCelular(celular);

    const { error } = esquemaCliente.validate({ nombre, dni, direccion, celular, correo, condicion });
    if (error) {
        console.log("Error de validación:", error.details[0].message);
        return res.status(400).json({ mensaje: error.details[0].message });
    }

    try {
        const cliente = await prisma.clientes.create({
            data: { nombre, dni, direccion, celular, correo, condicion },
        });

        return res.status(201).json(cliente);
    } catch (error) {
        console.error("Error en crearCliente:", error);
        if (error.code === "P2002" && error.meta) {
            return res.status(400).json({ error: `El campo ${error.meta.target} ya está en uso.` });
        }
        return res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await prisma.clientes.findMany();
        return res.status(200).json(clientes);
    } catch (error) {
        console.error("Error en obtenerClientes:", error);
        return res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Obtener un cliente por su ID
export const obtenerClientePorId = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID de cliente inválido.' });
    }

    try {
        const cliente = await prisma.clientes.findUnique({ where: { id } });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.status(200).json(cliente);
    } catch (error) {
        console.error("Error en obtenerClientePorId:", error);
        return res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Actualizar un cliente por ID
export const actualizarCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID de cliente inválido.' });
    }

    let { nombre, dni, direccion, celular, correo, condicion } = req.body;

    try {
        const clienteExistente = await prisma.clientes.findUnique({ where: { id } });
        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }

        if (dni && !validarDNI(dni)) {
            return res.status(400).json({ error: 'El DNI debe tener exactamente 8 dígitos numéricos.' });
        }

        celular = normalizarCelular(celular);

        const dataActualizacion = { nombre, direccion, celular, condicion };
        if (dni && dni !== clienteExistente.dni) dataActualizacion.dni = dni;
        if (correo && correo !== clienteExistente.correo) dataActualizacion.correo = correo;

        const clienteActualizado = await prisma.clientes.update({
            where: { id },
            data: dataActualizacion,
        });

        return res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error("Error en actualizarCliente:", error);
        if (error.code === "P2002" && error.meta) {
            return res.status(400).json({ error: `El campo ${error.meta.target} ya está en uso.` });
        }
        return res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente por ID
export const eliminarCliente = async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({ error: 'ID de cliente inválido.' });
    }

    try {
        await prisma.clientes.delete({ where: { id } });
        return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error("Error en eliminarCliente:", error);
        return res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};