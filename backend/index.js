process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const app = require("./app");

const https = require("https");
const fs = require("fs");

const PORT = process.env.PORT || 2000;

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`shutting down the server for handling uncaught exception`);
});

// Lire les certificats SSL
const options = {
	key: fs.readFileSync("localhost-key.pem"),
	cert: fs.readFileSync("localhost-cert.pem"),
};

// Créer le serveur HTTPS
https.createServer(options, app).listen(PORT, () => {
	console.log(
		`Server is running on https://${process.env.HOST}:${process.env.PORT}`
	);
});
