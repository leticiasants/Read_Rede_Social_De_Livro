import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const canEditComment = async (req, res, next) => {
    const { commentId } = req.params;
    const userId = req.user.id;
    console.log("USERID DO REQ: ", userId);
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
            include: { post: true },
        });
        console.log("\n \n DENTRO DO TRY COMMENT: ", comment);
        if (!comment) {
            return res.status(404).json({ message: "Comentário não encontrado." });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({ message: "Você não tem permissão para editar este comentário." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao verificar permissão de edição." });
    }
};

export const canDeleteComment = async (req, res, next) => {
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

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao verificar permissão de deleção." });
    }
};


export const canEditBio = async (req, res, next) => {
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
        
        if (comment.userId !== userId && comment.post.userId !== userId) { //usuário é o autor do comentário ou o autor da postagem?
            return res.status(403).json({ message: "Você não tem permissão para deletar este comentário." });
        }

        next();
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao verificar permissão." });
    }
};

