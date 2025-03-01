import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const crearIdea = async (req, res) => {
    try {
        const { foto } = req.body;
        const idea = await prisma.ideas.create({
            data: { foto },
        });
        res.status(201).json(idea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la idea' });
    }
};

export const obtenerIdeas = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;
        const ideas = await prisma.ideas.findMany({
            take: limit,
            skip: offset,
        });
        res.status(200).json(ideas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las ideas' });
    }
};

export const obtenerIdeaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const idea = await prisma.ideas.findUnique({ where: { id: parseInt(id) } });
        if (!idea) return res.status(404).json({ error: 'Idea no encontrada' });
        res.status(200).json(idea);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la idea' });
    }
};

export const actualizarIdea = async (req, res) => {
    try {
        const { id } = req.params;
        const { foto } = req.body;
        const ideaActualizada = await prisma.ideas.update({
            where: { id: parseInt(id) },
            data: { foto },
        });
        res.status(200).json(ideaActualizada);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la idea' });
    }
};

export const eliminarIdea = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.ideas.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Idea eliminada correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la idea' });
    }
};