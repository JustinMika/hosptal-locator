const syncErrorMiddleware = (req, res, next) => {
    try {
        // Exécutez les opérations synchrones ici
        // ...
        // Si une erreur se produit, elle sera capturée par le bloc catch
        next()
    } catch (error) {
        console.error('Erreur de synchronisation :', error)
        res.status(500).json({
            error: {
                message: 'Erreur de synchronisation',
                statusCode: 500
            }
        })
    }
}

module.exports = syncErrorMiddleware
