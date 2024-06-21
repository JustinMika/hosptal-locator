const express = require("express");
const router = express.Router();
const VisiteSite = require("../../models/VisiteSite");

router.post("/", async (req, res) => {
	const { userId } = req.body;
	try {
		const visite = await VisiteSite.create({ userId });
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

module.exports = router;
