// controlador de tudo que envolve o comentario de uma postagem

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createComment = async (req, res) => {
    const { content, postId } = req.body;
    const userId = req.user.id; 

    try {
        const newComment = await prisma.comment.create({
            data: {
                content: content,
                postId: postId,
                userId: userId,
            },
        });

        res.status(201).json({ message: "Comentário criado com sucesso!", comment: newComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar comentário." });
    }
};

export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const userId = req.user.id; 

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
            include: { post: true },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }

        if (comment.userId !== userId && comment.post.userId !== userId) {
            return res.status(403).json({ message: "Você não tem permissão para deletar este comentário." });
        }

        await prisma.comment.delete({
            where: { id: parseInt(commentId) },
        });

        res.status(200).json({ message: "Comentário deletado com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar comentário." });
    }
};

export const editComment = async (req, res) => {
    const { commentId } = req.params; 
    const { content } = req.body;  
    const userId = req.user.id;  

    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "Você não tem permissão para editar este comentário." });
        }

        const updatedComment = await prisma.comment.update({
            where: { id: parseInt(commentId) },
            data: { content: content },  
        });

        res.status(200).json({ message: "Comentário atualizado com sucesso!", comment: updatedComment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao editar comentário." });
    }
};