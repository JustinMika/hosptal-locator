// backend/models/VisiteSite.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Utilisateur = require("./Utilisateur");

const VisiteSite = sequelize.define(
	"VisiteSite",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: Utilisateur,
				key: "id",
			},
			allowNull: false,
		},
		visitedAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "visite_sites",
	}
);

VisiteSite.belongsTo(Utilisateur, { foreignKey: "userId" });

module.exports = VisiteSite;
