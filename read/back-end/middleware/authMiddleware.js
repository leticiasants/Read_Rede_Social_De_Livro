export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();  // Usuário está autenticado vai para frente
    }
    return res.status(401).json({ message: "Usuário não autenticado." });  // Não autenticado
};
