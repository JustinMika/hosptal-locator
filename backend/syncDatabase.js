const sequelize = require("./config/databases");

const syncDatabase = async () => {
	try {
		await sequelize.sync({ force: true });
		console.log("Database synchronized");
	} catch (error) {
		console.error("Error synchronizing database:", error);
	}
};

syncDatabase();
