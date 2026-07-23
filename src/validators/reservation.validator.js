import { body } from "express-validator";

export const createReservationValidator = [
  body("eventId")
    .notEmpty()
    .withMessage("Event ID is required")
    .isUUID()
    .withMessage("Invalid Event ID"),

  body("ticketQuantity")
    .notEmpty()
    .withMessage("Ticket quantity is required")
    .isInt({ min: 1 })
    .withMessage("Ticket quantity must be at least 1"),
];