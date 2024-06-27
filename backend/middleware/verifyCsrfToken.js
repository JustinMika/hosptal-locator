// const csrf = require('csurf')

// Créer une instance de csrfProtection
// const csrfProtection = csrf({ cookie: true })
const csrfProtection = null;

// Middleware de vérification du token anti-CSRF
const verifyCsrfToken = (req, res, next) => {
	// Vérifier le token inclus dans la requête
	if (req.body.csrfToken === req.session.csrfToken) {
		next(); // Token valide, continuer vers la prochaine étape de traitement
	} else {
		res.status(403).json({ message: "Invalid CSRF token" }); // Token invalide, accès refusé
	}
};

const verifyUser = (req, res, next) => {
	const jeton = req.headers.authorization?.split(" ")[1];
	if (!jeton) {
		return res.status(401).json({ message: "Token missing" });
	}

	jwt.verify(jeton, process.env.JWT_TOKEN, (err, user) => {
		if (err) {
			return res.status(500).json({
				message: "Server error",
			});
		}
		req.user = user;
		next();
	});
};

module.exports = {
	csrfProtection,
	verifyCsrfToken,
	verifyUser,
};
