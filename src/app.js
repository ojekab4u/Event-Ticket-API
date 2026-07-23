import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import eventRoutes from "./routes/event.routes.js";
import errorHandler from "./middlewares/error.middleware.js";
import reservationRoutes from "./routes/reservation.routes.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/reservations", reservationRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Event Ticket Booking API"
    });
});

app.use(errorHandler)

export default app;