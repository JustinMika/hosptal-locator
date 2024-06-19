const csrf = require('csurf')

// Créer une instance de csrfProtection
const csrfProtection = csrf({ cookie: true })

// Middleware de vérification du token anti-CSRF
const verifyCsrfToken = (req, res, next) => {
    // Vérifier le token inclus dans la requête
    if (req.body.csrfToken === req.session.csrfToken) {
        next() // Token valide, continuer vers la prochaine étape de traitement
    } else {
        res.status(403).json({ message: 'Invalid CSRF token' }) // Token invalide, accès refusé
    }
}

module.exports = {
    csrfProtection,
    verifyCsrfToken
}
