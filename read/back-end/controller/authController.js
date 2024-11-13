// aqui é o controlador de login e registro

import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import passport from 'passport';

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    const { email, password, password2, username } = req.body;
    console.log({ username, email, password, password2 });
    let errors = [];

    if (!email || !password || !password2) {
        errors.push({ message: "Por favor insira todos os campos" });
    }

    if (password.length < 6) {
        errors.push({ message: "A senha deve ter pelo menos 6 caracteres" });
    }

    if (password !== password2) {
        errors.push({ message: "As senhas devem ser iguais" });
    }

    if (errors.length > 0) {
        return res.status(400).json({ errors });
    }

    try {
        let hashedPassword = await bcrypt.hash(password, 10);

        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            errors.push({ message: "Email já registrado" });
            return res.status(400).json({ errors });
        }

        const newUser = await prisma.user.create({
            data: {
                email: email,
                username: username,
                password: hashedPassword,
            },
        });

        req.flash('success_msg', "Você está registrado agora, por favor logue");
        return res.status(201).json({ message: "Usuário registrado com sucesso!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao registrar usuário" });
    }
};

export const loginUser = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ message: "Erro ao autenticar." });
        }
        if (!user) {
            return res.status(401).json({ message: "Email ou senha incorretos." });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ message: "Erro ao fazer login." });
            }
            return res.status(200).json({ message: "Login realizado com sucesso!" });
        });
    })(req, res, next);
};

export const logoutUser = (req, res) => {
    req.logOut();
    req.flash('success_msg', "Você deslogou!");
    res.redirect('/users/login');
};