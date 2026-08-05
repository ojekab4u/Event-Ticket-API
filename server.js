import dotenv from "dotenv";
import app from "./src/app.js";
import { connectDB } from "./src/config/database.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await connectDB();

        app.listen(PORT, () => {
           
        });

    } catch (error) {
       
    }
}

startServer();