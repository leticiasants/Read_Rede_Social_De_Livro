import express from "express";
import path from 'path';
import bcrypt from 'bcrypt';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'; 
import initializePassport from './passportConfig.js'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { env } from "process";

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

initializePassport(passport);

app.use(cors());

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../front-end/dist')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front-end/dist', 'index.html')); 
});

app.get('/users/register', checkAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front-end/dist', 'index.html')); 
});

app.post('/users/login', (req, res, next) => {
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
});

app.get('/users/dashboard', checkNotAuthenticated, (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front-end/dist', 'index.html'));o
});

app.get('/users/logout', (req, res) => {
    req.logOut();
    req.flash('success_msg', "Você deslogou!");
    res.redirect('/users/login');
});

app.post('/users/register', async (req, res) => {
    let { email, password, password2, username } = req.body;

    console.log("Senha antes de criptografar", {
        password,
        password2,
    });

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
    } else {
        let hashedPassword = await bcrypt.hash(password, 10);
        console.log("Senha depois de criptografar", {
            hashedPassword,
        });
        console.log("Senha depois de criptografar", {
            env,
        });
        const existingUser = await prisma.user.findUnique({
            where: { email: email },
        });

        if (existingUser) {
            errors.push({ message: "Email já registrado" });
            return res.status(400).json({ errors });
        } else {
            const newUser = await prisma.user.create({
                data: {
                    email: email,
                    username: username,
                    password: hashedPassword,
                },
            });
            req.flash('success_msg', "Você está registrado agora, por favor logue");
            return res.status(201).json({ message: "Usuário registrado com sucesso!" });
        }
    }
});

app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/users/login');
}

app.listen(PORT, () => {
    console.log(`Server rodando no Port ${PORT}`);
});
