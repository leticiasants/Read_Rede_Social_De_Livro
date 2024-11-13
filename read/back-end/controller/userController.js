//Aqui é o controlador do usuario uma vez logado!
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const updateUserBiography = async (req, res) => {
    const { biography } = req.body;

    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        if (!biography) {
            return res.status(400).json({ message: "Por favor, escreva uma biografia." });
        }

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: { biography },
        });

        res.status(200).json({ message: "Biografia atualizada com sucesso!", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar a biografia." });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        await prisma.user.delete({
            where: { id: req.user.id },
        });

        res.status(200).json({ message: "Usuário excluído com sucesso!" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao excluir o usuário." });
    }
};
