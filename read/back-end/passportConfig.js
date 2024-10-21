const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

function initialize(passport) {
    const authenticateUser = async (email, password, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { email: email },
            });

            if (!user) {
                return done(null, false, { message: "Email não registrado" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: "Senha não está correta" });
            }
        } catch (err) {
            return done(err);
        }
    };

    passport.use(new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
    }, authenticateUser));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await prisma.user.findUnique({
                where: { id: id },
            });
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initialize;