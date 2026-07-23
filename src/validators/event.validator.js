import { body } from "express-validator";

export const createEventValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required"),

  body("category")
    .trim()
    .notEmpty()
    .withMessage("Category is required"),

  body("venue")
    .trim()
    .notEmpty()
    .withMessage("Venue is required"),

  body("date")
    .isISO8601()
    .withMessage("Valid date is required"),

  body("time")
    .notEmpty()
    .withMessage("Time is required"),

  body("ticketPrice")
    .isFloat({ min: 0 })
    .withMessage("Ticket price must be greater than or equal to 0"),

  body("capacity")
    .isInt({ min: 1 })
    .withMessage("Capacity must be at least 1"),
];