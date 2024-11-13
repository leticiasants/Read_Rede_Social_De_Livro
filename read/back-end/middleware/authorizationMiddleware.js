import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const canEditOrDeleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;  //Assume que o usuário está autenticado

    try {
        const comment = await prisma.comment.findUnique({ // traz o comentário e a postagem
            where: { id: parseInt(commentId) },
            include: { post: true },
        });

        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }
        
        if (comment.userId !== userId && comment.post.userId !== userId) { //usuário é o autor do comentário ou o autor da postagem?
            return res.status(403).json({ message: "Você não tem permissão para deletar este comentário." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao verificar permissão." });
    }
};