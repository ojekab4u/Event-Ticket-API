import express from "express";

import {
  createReservation,
  getMyReservations,
  getReservationById,
  cancelReservation,
} from "../controllers/reservation.controller.js";

import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";

import {
  createReservationValidator,
} from "../validators/reservation.validator.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  createReservationValidator,
  validate,
  createReservation
);

router.get("/", getMyReservations);

router.get("/:id", getReservationById);

router.patch("/:id/cancel", cancelReservation);

export default router;