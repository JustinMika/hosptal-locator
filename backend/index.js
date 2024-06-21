const app = require("./app");

const port = process.env.PORT || 2000;

// Handling uncaught Exception
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`shutting down the server for handling uncaught exception`);
});

serveur = app.listen(port, () => {
	console.log(
		`Serveur runnging on : http://${process.env.HOST}:${process.env.PORT}`
	);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
	console.log(`Shutting down the server for : ${err}`);
	server.close(() => {
		process.exit(1);
	});
});
