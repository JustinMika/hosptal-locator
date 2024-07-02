const sequelize = require("./config/databases");
// const Utilisateur = require("./models/Utilisateur");
// const Messagerie = require("./models/Messagerie");
const Alerte = require("./models/Alerte");
// const VisiteSite = require("./models/VisiteSite");

const syncDatabase = async () => {
	try {
		await sequelize.sync({ force: true });
		console.log("Database synchronized");
	} catch (error) {
		console.error("Error synchronizing database:", error);
	}
};

syncDatabase();
