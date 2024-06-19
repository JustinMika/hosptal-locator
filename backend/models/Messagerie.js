// backend/models/Messagerie.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databases");
const Utilisateur = require("./Utilisateur");

const Messagerie = sequelize.define(
	"Messagerie",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		fromUserId: {
			type: DataTypes.INTEGER,
			references: {
				model: Utilisateur,
				key: "id",
			},
			allowNull: false,
		},
		toUserId: {
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
		sentAt: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW,
		},
	},
	{
		tableName: "messageries",
	}
);

Messagerie.belongsTo(Utilisateur, { as: "fromUser", foreignKey: "fromUserId" });
Messagerie.belongsTo(Utilisateur, { as: "toUser", foreignKey: "toUserId" });

module.exports = Messagerie;
