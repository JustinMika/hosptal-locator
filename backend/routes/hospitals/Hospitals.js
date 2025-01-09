const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Utilisateur = require("../../models/Utilisateur");
const User = require("../../models/Utilisateur");

router.get("/", async (req, res) => {
	try {
		const data = await Utilisateur.findAll({
			where: {
				userType: "hospital",
			},
		});
		res.json(data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "An error occurred while fetching data." });
	}
});

router.get("/:type", async (req, res) => {
	try {
		const { type } = req.params;
		const users = await User.findAll({
			where: {
				UserType: type,
			},
			attributes: ["id", "pseudo", "latitude", "longitude"], // Spécifiez les colonnes à sélectionner ici
		});
		res.json(users);
	} catch (error) {
		res.status(500).json({ message: "Error fetching users", error });
	}
});

router.post("/add-hopital/", async (req, res) => {
	try {
		const { pseudo, email, latitude, longitude } = req.body;
		if (pseudo && email && latitude && longitude) {
			const userType = "hospital";
			const hashedPassword = await bcrypt.hash("password", 10);

			const data = {
				pseudo: pseudo,
				email: email,
				password: hashedPassword,
				latitude: latitude,
				longitude: longitude,
				userType: userType,
			};

			const user = await Utilisateur.create(data);
			res.json({
				message: "hospital added successful",
				userType: user.userType,
				user: user,
			});
		} else {
			res.status(403).json({
				message: "Veuillez completer tous les champs.",
			});
		}
	} catch (error) {
		console.log("Erreur : " + error);
		res.json({ message: error });
	}
});

module.exports = router;
