// visite_sites.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databases");
const Utilisateur = require("./Utilisateur");

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
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			field: "createdAt",
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			field: "updatedAt",
		},
	},
	{
		timestamps: true,
		underscored: true,
		tableName: "visite_sites",
	}
);

module.exports = VisiteSite;
