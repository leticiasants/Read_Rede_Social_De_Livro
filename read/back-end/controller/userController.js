import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const updateUserBiography = async (req, res) => {
    const { username, email, password, biography } = req.body;
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }
  
        if (!username && !email && !password && !biography) {
            return res.status(400).json({ message: "Por favor, forneça ao menos um dado para atualizar." });
        }

        const updatedData = {};

        if (username !== undefined) updatedData.username = username;
        if (email !== undefined) updatedData.email = email;
        if (password !== undefined) updatedData.password = await bcrypt.hash(password, 10); 
        if (biography !== undefined) updatedData.biography = biography;

        const updatedUser = await prisma.user.update({
            where: { id: req.user.id },
            data: updatedData,
        });

        res.status(200).json({ message: "Perfil atualizada com sucesso!", user: updatedUser });
        console.log(req.body); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao atualizar o perfil." });
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

export const getUserProfile = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Usuário não autenticado." });
        }

        const user = await prisma.user.findUnique({
            where: { id: req.user.id },
            select: {
                username: true,
                biography: true,
                email: true, 
            },
        });

        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado." });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erro ao carregar perfil." });
    }
};
