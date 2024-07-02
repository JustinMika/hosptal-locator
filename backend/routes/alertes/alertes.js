const express = require("express");
const router = express.Router();
const Alerte = require("../../models/Alerte");
const { Sequelize } = require("sequelize");

router.post("/", async (req, res) => {
	const { userId } = req.body;
	try {
		const visite = await Alerte.create({ userId });
		res.json({ message: "Visit recorded successfully", visite });
	} catch (error) {
		res.status(500).json({ message: "Error recording visit", error });
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

// Route pour récupérer les visites par mois
router.get("/visits-per-month", async (req, res) => {
	try {
		const visitsByMonth = await Alerte.findAll({
			attributes: [
				[
					Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%m"),
					"month",
				],
				[Sequelize.fn("COUNT", Sequelize.col("id")), "count"],
			],
			group: [Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%m")],
			order: Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%m"),
		});

		res.status(200).json(visitsByMonth);
	} catch (error) {
		console.error("Error fetching visits per month:", error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = router;
