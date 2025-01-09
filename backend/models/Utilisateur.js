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
		pseudo: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		telephone: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		latitude: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		longitude: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		userType: {
			type: DataTypes.ENUM("user", "admin", "hospital"),
			allowNull: false,
			field: "userType",
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
		tableName: "utilisateurs",
	}
);

module.exports = Utilisateur;
