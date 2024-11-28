
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
    console.log('Parâmetros:', req.params);
    console.log('Corpo da requisição:', req.body);
    
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
    const { postId, commentId } = req.params;  // IDs de post e comentário
    const { content } = req.body;               

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        // Verifica se o comentário pertence ao post e se o usuário tem permissão
        if (comment.postId !== parseInt(postId)) {
            return res.status(400).json({ error: 'Comentário não pertence ao post especificado.' });
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

// Função para deletar um comentário específico de um post
export const deleteComment = async (req, res) => {
    const { postId, commentId } = req.params;

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        if (comment.postId !== parseInt(postId)) {
            return res.status(400).json({ error: 'Comentário não pertence ao post especificado.' });
        }

        await prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });

        res.status(200).json({ message: 'Comentário deletado com sucesso.' });
    } catch (error) {
        res.status(500).json({ error: 'Erro ao excluir comentário.' });
    }
};