import "dotenv/config";
import { Sequelize } from "sequelize";

const sequelize = new Sequelize(process.env.PG_URL, {
	dialect: "postgres",
	define: {
		timestamps: false,
		
	},
});

// Test de connexion (pour vérifier si tout se passe bien)
try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

export default sequelize;