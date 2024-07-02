// visite_sites.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databases");

const VisiteSite = sequelize.define(
	"visite_sites",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		page: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
			field: "createdAt", // Assurez-vous que le nom du champ correspond à votre base de données
		},
	},
	{
		tableName: "visite_sites", // Assurez-vous que le nom de la table correspond à votre base de données
		timestamps: false, // Si vous ne souhaitez pas utiliser les timestamps
	}
);

module.exports = VisiteSite;
