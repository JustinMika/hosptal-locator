const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const util = require("util");
require("dotenv").config();
const useragent = require("useragent");
const path = require("path");
const pool = require("./config/databases");

const app = express();
app.disable("x-powered-by");
app.use(bodyParser.json({ limit: "30mb" }));
app.use(
	bodyParser.urlencoded({
		extended: true,
		limit: "10mb",
		parameterLimit: 50000,
	})
);

const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());
app.use(
	session({
		secret: process.env.SESSION_TOKEN,
		resave: false,
		saveUninitialized: false,
	})
);

const uploadsDirectory = path.join(__dirname, "uploads");
app.use("/uploads", express.static(uploadsDirectory));

app.use(express.urlencoded({ extended: true }));

// Spécifier les origines autorisées
const allowedOrigins = ["http://localhost:5173"];

app.use(
	cors({
		origin: function (origin, callback) {
			if (allowedOrigins.includes(origin) || !origin) {
				callback(null, true);
			} else {
				console.log("Accès non autorisé par CORS");
			}
		},
		allowedHeaders: ["Authorization", "Content-Type"],
		exposedHeaders: ["X-Custom-Header"],
		methods: ["POST", "GET", "OPTIONS", "PUT", "DELETE"],
		credentials: true,
	})
);

// ============ les routes =============================
app.get("/", async (req, res) => {
	// Utiliser useragent pour obtenir le nom du navigateur
	const userAgentString = req.headers["user-agent"];
	let browserName = userAgentString;

	try {
		const userAgent = useragent.lookup(userAgentString);
		browserName = userAgent.family; // Obtenir le nom du navigateur
		res.status(200).json({
			message: "API from Hospital Location",
			ip: req.ip,
			browserName: browserName === "Other" ? userAgentString : browserName,
			os: userAgent?.os?.family,
			device: userAgent?.device?.family,
		});
	} catch (error) {
		res.statusCode(500);
	}
});

app.use("/api/v1/users/", require("./routes/users/Users"));
app.use("/api/v1/hospitals/", require("./routes/hospitals/Hospitals"));
app.use("/api/v1/admin/", require("./routes/admin/Admin"));

module.exports = app;
