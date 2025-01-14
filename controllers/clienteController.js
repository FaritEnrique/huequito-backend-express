// controllers/clienteController.js
import { PrismaClient } from '@prisma/client';

// Inicializa Prisma Client
const prismaClient = new PrismaClient();

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
    try {
        const { nombre, dni, direccion, celular, correo, condicion } = req.body;
        const cliente = await prismaClient.clientes.create({
            data: {
                nombre,
                dni,
                direccion,
                celular,
                correo,
                condicion,
            },
        });
        return res.status(201).json(cliente); // Respuesta con el cliente creado
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al crear el cliente' });
    }
};

// Obtener todos los clientes
export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await prismaClient.clientes.findMany();
        return res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener los clientes' });
    }
};

// Obtener un cliente por su ID
export const obtenerClientePorId = async (req, res) => {
    const { id } = req.params;
    try {
        const cliente = await prismaClient.clientes.findUnique({
            where: {
                id: parseInt(id),
            },
        });
        if (!cliente) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        return res.status(200).json(cliente);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al obtener el cliente' });
    }
};

// Actualizar un cliente por ID
export const actualizarCliente = async (req, res) => {
    const { id } = req.params;
    const { nombre, dni, direccion, celular, correo, condicion } = req.body;

    try {
        // Verificar si el cliente con el ID dado existe
        const clienteExistente = await prismaClient.clientes.findUnique({
            where: { id: parseInt(id) },
        });

        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }

        // Actualizar el cliente sin verificar el celular duplicado
        const clienteActualizado = await prismaClient.clientes.update({
            where: { id: parseInt(id) },
            data: { nombre, dni, direccion, celular, correo, condicion },
        });

        return res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error("Error en actualizarCliente:", error);
        return res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente por ID
export const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await prismaClient.clientes.delete({
            where: { id: parseInt(id) },
        });
        return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};