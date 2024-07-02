const express = require("express");
const router = express.Router();
const Utilisateur = require("../../models/Utilisateur");
const bcrypt = require("bcrypt");
const { Sequelize } = require("sequelize");

const User = Utilisateur;

router.post("/", async (req, res) => {
	const { userId, message } = req.body;
	try {
		const alerte = await Alerte.create({ userId, message });
		res.json({ message: "Alert created successfully", alerte });
	} catch (error) {
		res.status(500).json({ message: "Error creating alert", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const user = await User.findAll();
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching alerts", error });
	}
});

router.get("/:type", async (req, res) => {
	try {
		const { type } = req.params;
		const user = await User.findAll({
			where: {
				UserType: type,
			},
		});
		res.json(user);
	} catch (error) {
		res.status(500).json({ message: "Error fetching alerts", error });
	}
});

// create-account-admin-users
router.post("/create-admin-users/", async (req, res) => {
	const { name, email } = req.body;

	if (name && email) {
		const userType = "admin";
		const hashedPassword = await bcrypt.hash("password", 10);

		const data = {
			pseudo: name,
			email: email,
			password: hashedPassword,
			userType: userType,
		};
		try {
			const user = await Utilisateur.create(data);
			res.json({
				message: "user added successful",
				userType: user.userType,
				user: user,
			});
		} catch (error) {
			res.status(500).json({ message: "Erreur : " + error.message });
		}
	} else {
		res.status(500).json({
			message: "Erreur : Veuillez remplir tous les champs.",
		});
	}
});

router.delete("delete/{id}", async (req, res) => {
	const { id } = req.params;
	try {
		const userDeleted = User.findByPk(id);
		userDeleted.delete();
		res.status(201).json({ message: "utilisateur supprime.", userDeleted });
	} catch (error) {
		res.status(500).json({ message: "Erreur" });
	}
});

// stat users
router.get("/user-stats/users", async (req, res) => {
	try {
		const userCounts = await Utilisateur.findAll({
			attributes: [
				"userType",
				[Sequelize.fn("COUNT", Sequelize.col("userType")), "count"],
			],
			group: "userType",
		});

		res.status(200).json(userCounts);
	} catch (error) {
		res.status(500).json({ error: "Internal server error : " + error });
	}
});

module.exports = router;
