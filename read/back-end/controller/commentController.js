
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
export const createComment = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId: parseInt(postId),
                userId: req.user.id,
            },
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar comentário.' });
    }
};

export const editComment = async (req, res) => {
    const { commentId } = req.params; 
    const { content } = req.body;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { content },
        });

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao editar comentário.' });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        await prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });

        res.status(200).json({ message: 'Comentário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir comentário.' });
    }
};