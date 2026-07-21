import dotenv from "dotenv";
import app from "./src/app.js";
import sequelize from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await sequelize.authenticate();

        console.log("Database connected successfully.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Unable to connect to database:");
        console.error(error.message);
    }
}

startServer();