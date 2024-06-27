const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const Utilisateur = require("../../models/Utilisateur");

router.get("/", async (req, res) => {
	try {
		const data = await Utilisateur.findAll({
			where: {
				userType: "hopital",
			},
		});
		res.json(data);
	} catch (error) {
		console.error("Error fetching data:", error);
		res.status(500).json({ error: "An error occurred while fetching data." });
	}
});

router.post("/add-hopital/", async (req, res) => {
	try {
		const { pseudo, email, latitude, longitude } = req.body;
		if (pseudo && email && latitude && longitude) {
			const userType = "hopital";
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
