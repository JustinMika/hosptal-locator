// utilisateurs.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databases");

const Utilisateur = sequelize.define(
	"utilisateurs",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.DECIMAL(10, 8),
			allowNull: true,
		},
		longitude: {
			type: DataTypes.DECIMAL(11, 8),
			allowNull: true,
		},
		userType: {
			type: DataTypes.ENUM("user", "admin", "hospital"),
			allowNull: false,
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
		},
		updatedAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
		},
	},
	{
		timestamps: true,
		underscored: true,
		tableName: "utilisateurs",
	}
);

module.exports = Utilisateur;
