import express from "express";
import path from 'path';
import cors from 'cors';
import session from 'express-session';
import flash from 'express-flash';
import passport from 'passport';
import { PrismaClient } from '@prisma/client'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';

import initializePassport from './config/passportConfig.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js';
import commentRoutes from './routes/commentRoutes.js';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 4000;

initializePassport(passport);

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
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

app.use('/users', authRoutes);  
app.use('/profile', userRoutes); 
app.use('/posts', postRoutes); 
app.use('/comments', commentRoutes); 

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../front-end/dist', 'index.html')); 
});

app.listen(PORT, () => {
    console.log(`Server rodando no Port ${PORT}`);
});
