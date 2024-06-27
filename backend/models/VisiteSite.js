// visite_sites.js
const { DataTypes, Sequelize } = require("sequelize");
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
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: Utilisateur,
				key: "id",
			},
		},
		visitedAt: {
			type: DataTypes.DATE,
			allowNull: true,
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
		tableName: "visite_sites",
	}
);

VisiteSite.belongsTo(Utilisateur, { foreignKey: "userId" });
module.exports = VisiteSite;
