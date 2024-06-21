// alertes.js
const { DataTypes, Sequelize } = require("sequelize");
const sequelize = require("../config/databases");
const Utilisateur = require("./Utilisateur");

const Alerte = sequelize.define(
	"alertes",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Utilisateur,
				key: "id",
			},
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		status: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
		},
	},
	{
		timestamps: true,
		underscored: true,
		tableName: "alertes",
	}
);

Alerte.belongsTo(Utilisateur, { foreignKey: "userId" });
module.exports = Alerte;
