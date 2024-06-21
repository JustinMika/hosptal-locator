const express = require("express");
const router = express.Router();
const Alerte = require("../../models/Alerte");

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
		const alertes = await Alerte.findAll();
		res.json(alertes);
	} catch (error) {
		res.status(500).json({ message: "Error fetching alerts", error });
	}
});

module.exports = router;
