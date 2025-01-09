const express = require("express");
const router = express.Router();
const VisiteSite = require("../../models/VisiteSite");
const { Sequelize } = require("sequelize");

router.post("/", async (req, res) => {
	const { page } = req.body;

	const data = {
		page: page,
	};
	try {
		const visite = await VisiteSite.create(data);
		res.json({ message: "Visit recorded successfully", visite });
	} catch (error) {
		res.status(500).json({ message: "Error recording visit", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const visites = await VisiteSite.findAll();
		res.json(visites);
	} catch (error) {
		res.status(500).json({ message: "Error fetching visits", error });
	}
});

// Route pour récupérer les visites par mois
// Route pour récupérer les visites par mois
router.get("/visits-per-month", async (req, res) => {
	try {
		const visitsByMonth = await VisiteSite.findAll({
			attributes: [
				[
					Sequelize.fn("DATE_FORMAT", Sequelize.col("createdAt"), "%m"),
					"month",
				],
				[Sequelize.fn("COUNT", Sequelize.col("*")), "count"],
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

// visistes par page
router.get("/visits-per-page", async (req, res) => {
	try {
		const visiteCount = await VisiteSite.findAll({
			attributes: [
				"page",
				[Sequelize.fn("COUNT", Sequelize.col("page")), "count"],
			],
			group: "page",
		});

		res.status(200).json(visiteCount);
	} catch (error) {
		res.status(500).json({ error: "Internal server error : " + error });
	}
});
module.exports = router;
