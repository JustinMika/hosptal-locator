// backend/routes/auth.js
const express = require("express");
const router = express.Router();
const Utilisateur = require("../../models/Utilisateur");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register", async (req, res) => {
	const { email, password, userType } = req.body;
	const hashedPassword = await bcrypt.hash(password, 10);
	try {
		const user = await Utilisateur.create({
			email,
			password: hashedPassword,
			userType,
		});
		res.json({ message: "Registration successful", user });
	} catch (error) {
		res.status(500).json({ message: "Error registering user", error });
	}
});

router.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await Utilisateur.findOne({ where: { email } });
		if (!user) {
			return res.status(400).json({ message: "Invalid email or password" });
		}
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ message: "Invalid email or password" });
		}
		const token = jwt.sign(
			{ userId: user.id, userType: user.userType },
			process.env.JWT_TOKEN
		);
		res.json({ token, userType: user.userType });
	} catch (error) {
		res.status(500).json({ message: "Error logging in", error });
	}
});

module.exports = router;
