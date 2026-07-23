import { body } from "express-validator";

export const processPaymentValidator = [
  body("reservationId")
    .isUUID()
    .withMessage("Invalid reservation ID"),

  body("paymentMethod")
    .trim()
    .toUpperCase()
    .isIn([
      "CARD",
      "BANK_TRANSFER",
      "USSD",
    ])
    .withMessage("Invalid payment method"),
];