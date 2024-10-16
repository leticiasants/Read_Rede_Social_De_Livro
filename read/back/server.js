const express = require("express")
const app = express()
const { pool } = require("./dbConfig");
const path = require('path');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const cors = require('cors');

const initializePassport = require('./passportConfig')

initializePassport(passport);


const PORT = process.env.PORT || 4000

app.use(cors());


// Configuração do middleware para arquivos estáticos
app.use(express.static(path.join(__dirname, '/dist')));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "secret", 

    resave: false,

    saveUninitialized: false
})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.get('/', (req, res) => {
    console.log("aqui renderizando tlg")
    res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

app.get('/users/register', checkAuthenticated, (req, res)=> {
    res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

app.get('/users/login', checkAuthenticated, (req, res)=> {
    console.log("vindo pro login")
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

app.get('/users/dashboard', checkNotAuthenticated, (req, res)=> {
    res.sendFile(path.join(__dirname, '/dist', '/index.html'));
});

app.get('/users/logout', (req, result)=>{
    req.logOut();
    req.flash('sucess_msg', "voce deslogou!");
    res.redirect('/users/login');
});


app.post('/users/register', async (req, res)=>{
    
    let {email, password, password2} = req.body;

    console.log("AQUI2__________", { 
        email,
        password,
        password2
    });

    let errors = [];

    if (!email || !password || !password2){
        errors.push({message: "Por favor insira todos os campos"});
    }

    if (password.length < 6){
        errors.push({message: "A senha deve ter pelomenos 6 caracteres"}); 
    }

    if (password !== password2){
        errors.push({message: "As senhas devem ser iguais"});
    }

    if(errors.length > 0){
        return res.status(400).json({ errors });
    } else {
        let hashedPassword = await bcrypt.hash(password, 10); 
        console.log(hashedPassword);

        pool.query(
            `SELECT * FROM users
            WHERE email = $1`, [email], (err, results)=>{
                if (err){
                    console.error(err.stack);
                    return res.status(500).json({ message: "Erro ao consultar o banco de dados." });
                }              
                console.log(results.rows);

                if(results.rows.length > 0){
                    errors.push({message: "Email já registrado"})
                    return res.status(400).json({ errors });
                } else {
                    pool.query(
                        `INSERT INTO users (email, password)
                        VALUES ($1, $2)
                        RETURNING id, password`, [email, hashedPassword], 
                        (err, results)=>{
                            if (err){
                                return res.status(500).json({ message: "Erro ao registrar o usuário." });
                            }
                            console.log(results.rows);
                            req.flash('sucess_msg', "Voce é registrado agora, por favor logue");
                            return res.status(201).json({ message: "Usuário registrado com sucesso!" });
                        }
                    )
                }
            }
        );
    }
});

app.post('/users/login', passport.authenticate('local', {
    successRedirect: '/users/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true
}));

function checkAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return res.redirect('/users/dashboard');
    }
    next();
}

function checkNotAuthenticated(req, res, next){
    if (req.isAuthenticated()){
        return next()
    }

    res.redirect('/users/login');
}

app.listen(PORT, ()=>{
    console.log(`Server rodando no Port ${PORT}`);
});