// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const Utilisateur = require("../../models/Utilisateur");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Middleware pour vérifier le token JWT
const verifyToken = (req, res, next) => {
	const token = req.cookies.token; // Supposons que le token est stocké dans un cookie nommé 'token'

	if (!token) {
		return res.status(401).json({ message: "Vous n'êtes pas authentifié." });
	}

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.user = decoded.user;
		next();
	} catch (err) {
		return res.status(401).json({ message: "Token non valide." });
	}
};

router.post("/register", async (req, res) => {
	const { name, email, password } = req.body;
	const userType = "user";
	const hashedPassword = await bcrypt.hash(password, 10);

	const data = {
		pseudo: name,
		email: email,
		password: hashedPassword,
		userType: userType,
		user_type: userType,
	};
	try {
		const user = await Utilisateur.create(data);

		const token = jwt.sign(
			{
				userId: user.id,
				userType: user.userType,
			},
			process.env.JWT_TOKEN
		);
		res.json({
			message: "Registration successful",
			token,
			userType: user.userType,
		});
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Utilisateur.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Utilisateur non trouvé." });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Email oet/ou mot de passe invalide." });
		}
		const token = jwt.sign(
			{
				userId: user.id,
				userType: user.userType,
				userInfo: user,
			},
			process.env.JWT_TOKEN
		);
		res.json({
			token,
			userType: user.userType,
			message: "Authentification reussi avec succès.",
		});
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error });
	}
});

module.exports = router;
