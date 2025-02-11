// controllers/clienteController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Función para validar que el DNI tenga exactamente 8 dígitos numéricos
const validarDNI = (dni) => /^\d{8}$/.test(dni);

// Crear un nuevo cliente
export const crearCliente = async (req, res) => {
    console.log("Datos recibidos en el backend:", req.body);
    try {
        let { nombre, dni, direccion, celular, correo, condicion } = req.body;

        if (!validarDNI(dni)) {
            return res.status(400).json({ error: 'El DNI debe tener exactamente 8 dígitos numéricos.' });
        }

        // Verificar si el celular ya tiene el prefijo +51, si no, lo agregamos
        if (celular && !celular.startsWith('+51')) {
            celular = `+51${celular}`;
        }

        const cliente = await prisma.clientes.create({
            data: { nombre, dni, direccion, celular, correo, condicion },
        });

        return res.status(201).json(cliente);
    } catch (error) {
        console.error("Error en crearCliente:", error);
        if (error.code === "P2002") {
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
    const { id } = req.params;
    try {
        const cliente = await prisma.clientes.findUnique({
            where: { id: parseInt(id) },
        });
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
    const { id } = req.params;
    let { nombre, dni, direccion, celular, correo, condicion } = req.body;

    try {
        const clienteExistente = await prisma.clientes.findUnique({
            where: { id: parseInt(id) },
        });

        if (!clienteExistente) {
            return res.status(404).json({ error: 'Cliente no encontrado.' });
        }

        if (dni && !validarDNI(dni)) {
            return res.status(400).json({ error: 'El DNI debe tener exactamente 8 dígitos numéricos.' });
        }

        // Verificar si el celular ya tiene el prefijo +51, si no, lo agregamos
        if (celular && !celular.startsWith('+51')) {
            celular = `+51${celular}`;
        }

        // Verificamos si los valores únicos (DNI y correo) han cambiado antes de actualizar
        const dataActualizacion = { nombre, direccion, celular, condicion };

        if (dni !== clienteExistente.dni) dataActualizacion.dni = dni;
        if (correo !== clienteExistente.correo) dataActualizacion.correo = correo;

        const clienteActualizado = await prisma.clientes.update({
            where: { id: parseInt(id) },
            data: dataActualizacion,
        });

        return res.status(200).json(clienteActualizado);
    } catch (error) {
        console.error("Error en actualizarCliente:", error);
        if (error.code === "P2002") {
            return res.status(400).json({ error: `El campo ${error.meta.target} ya está en uso.` });
        }
        return res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
};

// Eliminar un cliente por ID
export const eliminarCliente = async (req, res) => {
    const { id } = req.params;
    try {
        await prisma.clientes.delete({ where: { id: parseInt(id) } });
        return res.status(200).json({ message: 'Cliente eliminado correctamente' });
    } catch (error) {
        console.error("Error en eliminarCliente:", error);
        return res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
};