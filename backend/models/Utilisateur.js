// backend/models/Utilisateur.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Utilisateur = sequelize.define(
	"Utilisateur",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		phone: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		userType: {
			type: DataTypes.ENUM("user", "admin", "hospital"),
			allowNull: false,
		},
	},
	{
		tableName: "utilisateurs",
	}
);

module.exports = Utilisateur;
