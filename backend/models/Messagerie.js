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
		},
		toUserId: {
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
		sentAt: {
			type: DataTypes.DATE,
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
		tableName: "messageries",
	}
);

Messagerie.belongsTo(Utilisateur, { as: "fromUser", foreignKey: "fromUserId" });
Messagerie.belongsTo(Utilisateur, { as: "toUser", foreignKey: "toUserId" });

module.exports = Messagerie;
