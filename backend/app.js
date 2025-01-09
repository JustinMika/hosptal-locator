const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
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

const corsOptions = {
	origin: [
		"https://localhost:5173",
		"http://localhost:5173",
		"https://miciiivix:5173",
		"https://miciiivix:5173",
		"https://192.168.1.100:5173",
		"http://192.168.1.100:5173",
		"https://192.168.1.101:5173",
		"http://192.168.1.101:5173",
		"https://192.168.1.100:5173",
	], // Permettre l'accès depuis n'importe quel domaine
	methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
	allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
};

app.use(
	cors({
		origin: corsOptions,
		credentials: true,
	})
);

// ============================== les routes =============================
app.get("/", async (req, res) => {
	const userAgentString = req.headers["user-agent"];
	let browserName = userAgentString;

	try {
		const userAgent = useragent.lookup(userAgentString);
		browserName = userAgent.family;
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

app.use("/api/v1/auth/", require("./routes/auth/Auth"));
app.use("/api/v1/users/", require("./routes/users/Users"));
app.use("/api/v1/hospitals/", require("./routes/hospitals/Hospitals"));
app.use("/api/v1/visite-site/", require("./routes/visites/visiteSites"));
app.use("/api/v1/admin/", require("./routes/admin/Admin"));
app.use("/api/v1/messages/", require("./routes/messages/message"));
app.use("/api/v1/alerts/", require("./routes/alertes/alertes"));

module.exports = app;
