import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

//usuário tem permissão para editar o comentário?
export const canEditComment = async (req, res, next) => {
    const { commentId } = req.params;
    
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        if (comment.userId !== req.user.id) {
            return res.status(403).json({ error: 'Você não tem permissão para editar este comentário.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar permissão para editar comentário.' });
    }
};

//usuário tem permissão para deletar o comentário?
export const canDeleteComment = async (req, res, next) => {
    const { commentId } = req.params;
    
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: parseInt(commentId) },
        });

        if (!comment) {
            return res.status(404).json({ error: 'Comentário não encontrado.' });
        }

        if (comment.userId !== req.user.id) {
            return res.status(403).json({ error: 'Você não tem permissão para deletar este comentário.' });
        }

        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar permissão para excluir comentário.' });
    }
};

//usuario pode editar a biografia?
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

