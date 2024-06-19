// errorMiddleware.js

const errorMiddleware = (err, req, res, next) => {
    // Log de l'erreur pour le débogage (facultatif)
    // console.error(err)

    // Définir le code d'erreur et le message d'erreur appropriés
    const statusCode = err.statusCode || 500
    const errorMessage = err.message || 'Erreur Interne du Serveur'

    // Renvoyer la réponse avec le code d'erreur et le message d'erreur
    res.status(statusCode).json({
        error: {
            message: errorMessage,
            statusCode: statusCode
        }
    })
    next()
}

module.exports = errorMiddleware
