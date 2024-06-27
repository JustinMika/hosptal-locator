const express = require("express");
const router = express.Router();
const Messagerie = require("../../models/Messagerie");
const { Op } = require("sequelize");

router.post("/", async (req, res) => {
	const { fromUserId, toUserId, message } = req.body;
	const data = {
		fromUserId,
		toUserId,
		message,
	};
	try {
		const message = await Messagerie.create(data);
		res.json({ message: "message saved successfully", message });
	} catch (error) {
		res.status(500).json({ message: "Error recording visit", error });
	}
});

router.get("/", async (req, res) => {
	try {
		const message = await Messagerie.findAll();
		res.json(message);
	} catch (error) {
		res.status(500).json({ message: "Error fetching messages", error });
	}
});

// get message by user
router.get("/:user/:user_rev", async (req, res) => {
	try {
		const { user, user_rev } = req.params;
		const messages = await Messagerie.findAll({
			where: {
				[Op.or]: [
					{ fromUserId: user, toUserId: user_rev },
					{ fromUserId: user_rev, toUserId: user },
				],
			},
		});
		res.json(messages);
	} catch (error) {
		res.status(500).json({ message: "Error fetching messages", error });
	}
});

module.exports = router;
