const express = require("express");
const router = express.Router();
const Alerte = require("../../models/Alerte");
const Utilisateur = require("../../models/Utilisateur");
const { Sequelize } = require("sequelize");

router.post("/", async (req, res) => {
	const { myId, myLat, myLog, latH, lohH, idH } = req.body;
	const data = {
		userId: myId,
		userIdHostpital: idH,
		message: "Alerte",
		status: "pendung",
		latitude: myLat,
		longitude: myLog,
	};

	try {
		const alertes = await Alerte.create(data);
		res.json({ message: "Alerte enregistrée avec succès.", alertes });
	} catch (error) {
		res.status(500).json({ message: "Error recording alert", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const alert = await Alerte.findAll();
		res.json(alert);
	} catch (error) {
		res.status(500).json({ message: "Error fetching visits", error });
	}
});

// recuperer les alertes par hopital
router.get("/all-my-alertes/:id", async (req, res) => {
	try {
		const { id } = req.params;
		const alertes = await Alerte.findAll({
			where: {
				userIdHostpital: id,
			},
			include: [
				{
					model: Utilisateur,
					as: "user", // Utilisez l'alias défini dans la définition de la relation
				},
			],
		});
		res.json(alertes);
	} catch (error) {
		res.status(500).json({ message: "Error fetching alertes", error });
	}
});

// Route pour récupérer les visites par mois
router.get("/visits-per-month", async (req, res) => {
	try {
		const visitsByMonth = await Alerte.findAll({
			attributes: [
				[
					Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m"),
					"month",
				],
				[Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
			],
			group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m")],
			order: Sequelize.fn("DATE_FORMAT", Sequelize.col("created_at"), "%m"),
		});

		res.status(200).json(visitsByMonth);
	} catch (error) {
		console.error("Error fetching visits per month:", error);
		res.status(500).json({ error: "Internal server error :: "+error });
	}
});

module.exports = router;
