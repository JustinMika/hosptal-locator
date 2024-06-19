const jwt = require('jsonwebtoken')

const authenticateToken = (req, res, next) => {
    // Récupérer le JWT depuis le cookie, le header ou le corps de la requête
    const token = req.cookies.jwt || req.headers.authorization || req.body.token

    if (token) {
        // Vérifier le JWT
        jwt.verify(token, 'secret_key', (error, decoded) => {
            if (error) {
                // Le JWT est invalide
                return res.status(401).json({ message: 'Token JWT invalide' })
            } else {
                // Le JWT est valide
                req.user = decoded // Ajouter les informations de l'utilisateur au req.user
                next()
            }
        })
    } else {
        // Aucun JWT fourni
        res.status(401).json({ message: 'Aucun token JWT fourni' })
    }
}

module.exports = authenticateToken
