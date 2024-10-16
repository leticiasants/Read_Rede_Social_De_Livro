import { Strategy as LocalStrategy } from 'passport-local'; // Importando a estratégia local
import { PrismaClient } from '@prisma/client'; // Importando o Prisma Client
import bcrypt from 'bcrypt'; // Importando o bcrypt

const prisma = new PrismaClient();

export default function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });

            if (user) {
                const isMatch = await bcrypt.compare(password, user.password);
                if (isMatch) {
                    return done(null, user);
                } else {
                    return done(null, false, { message: "Senha não está correta" });
                }
            } else {
                return done(null, false, { message: "Email não registrado" });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, authenticateUser));

    passport.serializeUser((user, done) => done(null, user.id));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
            });
            return done(null, user);
        } catch (err) {
            return done(err);
        }
    });
}
