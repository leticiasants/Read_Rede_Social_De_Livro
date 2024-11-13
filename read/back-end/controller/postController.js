// controlador de tudo que envolve a postagem
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const createPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.user.id; 
    try {
        const newPost = await prisma.post.create({
            data: {
                content: content,
                userId: userId,
            },
        });

        res.status(201).json({ message: "Postagem criada com sucesso!", post: newPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao criar postagem." });
    }
};

export const deletePost = async (req, res) => {
    const { postId } = req.params;

    try {
        await prisma.post.delete({
            where: { id: parseInt(postId) },
        });

        res.status(200).json({ message: "Postagem deletada com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao deletar postagem." });
    }
};

export const editPost = async (req, res) => {
    const { postId } = req.params;
    const { content } = req.body;
    const userId = req.user.id;

    try {
        const post = await prisma.post.findUnique({
            where: { id: parseInt(postId) },
        });

        if (!post) {
            return res.status(404).json({ message: "Postagem não encontrada." });
        }

        if (post.userId !== userId) {
            return res.status(403).json({ message: "Você não tem permissão para editar essa postagem." });
        }

        const updatedPost = await prisma.post.update({
            where: { id: parseInt(postId) },
            data: { content: content },
        });

        res.status(200).json({ message: "Postagem atualizada com sucesso!", post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao editar postagem." });
    }
};