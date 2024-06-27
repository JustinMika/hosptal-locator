// messageries.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/databases");
const Utilisateur = require("./Utilisateur");

const Messagerie = sequelize.define(
	"messageries",
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		fromUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Utilisateur,
				key: "id",
			},
			field: "fromUserId",
		},
		toUserId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Utilisateur,
				key: "id",
			},
			field: "toUserId",
		},
		message: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		sentAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			allowNull: true,
			field: "sentAt",
		},
		createdAt: {
			type: DataTypes.DATE,
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			field: "CreatedAt",
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
		tableName: "messageries",
	}
);

Messagerie.belongsTo(Utilisateur, { as: "fromUser", foreignKey: "fromUserId" });
Messagerie.belongsTo(Utilisateur, { as: "toUser", foreignKey: "toUserId" });

module.exports = Messagerie;
