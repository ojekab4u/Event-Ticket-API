import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { processPayment } from "../controllers/payment.controller.js";
import { processPaymentValidator } from "../validators/payment.validator.js";

const router = express.Router();

router.use(protect);

router.post(
  "/",
  processPaymentValidator,
  validate,
  processPayment
);

export default router;