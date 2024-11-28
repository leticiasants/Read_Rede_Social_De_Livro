export const isAuthenticated = (req, res, next) => {
    console.log('Sessão do MIDDLEWARE:', req.session);
    console.log('\n \n Usuário autenticado:', req.isAuthenticated());
    //console.log('Usuário autenticado:', req.isAuthenticated());
    
    if (req.user) {
        return next();  
    }
    return res.status(401).json({ message: "Usuário não autenticado." });
};
