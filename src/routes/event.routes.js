import express from "express";
import { createEvent, 
    getAllEvents, 
    getEventById, 
    updateEvent,
    deleteEvent
} from "../controllers/event.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/role.middleware.js";
import validate from "../middlewares/validate.middleware.js";
import { createEventValidator } from "../validators/event.validator.js";


const router = express.Router();

router.post(
  "/",
  protect,
  authorize("ORGANIZER"),
  createEventValidator,
  validate,
  createEvent
);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put(
  "/:id",
  protect,
  authorize("ORGANIZER"),
  updateEvent
);

router.delete(
  "/:id",
  protect,
  authorize("ORGANIZER"),
  deleteEvent
);
export default router;