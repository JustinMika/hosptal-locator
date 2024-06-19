// backend/models/Alerte.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Utilisateur = require("./Utilisateur");

const Alerte = sequelize.define(
	"Alerte",
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
		message: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM("pending", "resolved"),
			defaultValue: "pending",
		},
	},
	{
		tableName: "alertes",
	}
);

Alerte.belongsTo(Utilisateur, { foreignKey: "userId" });

module.exports = Alerte;
