import { Op } from "sequelize";
import Event from "../models/Event.js";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const createEventService = async (eventData, organizerId) => {
  return await Event.create({
    ...eventData,
    organizerId,
  });
};

export const getAllEventsService = async (query) => {
  const {
    title,
    category,
    venue,
    date,
    page = 1,
    limit = 10,
    sortBy = "createdAt",
    order = "DESC",
  } = query;

  const where = {};

  if (title) {
    where.title = {
      [Op.iLike]: `%${title}%`,
    };
  }

  if (category) {
    where.category = {
      [Op.iLike]: `%${category}%`,
    };
  }

  if (venue) {
    where.venue = {
      [Op.iLike]: `%${venue}%`,
    };
  }

  if (date) {
    where.date = date;
  }

  const offset = (page - 1) * limit;

  const { rows, count } = await Event.findAndCountAll({
    where,
    include: [
      {
        model: User,
        as: "organizer",
        attributes: ["id", "fullName", "email"],
      },
    ],
    limit: Number(limit),
    offset: Number(offset),
    order: [[sortBy, order.toUpperCase()]],
  });

  return {
    totalEvents: count,
    totalPages: Math.ceil(count / limit),
    currentPage: Number(page),
    events: rows,
  };
};

export const getEventByIdService = async (id) => {
  const event = await Event.findByPk(id, {
    include: [
      {
        model: User,
        as: "organizer",
        attributes: ["id", "fullName", "email"],
      },
    ],
  });

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  return event;
};

export const updateEventService = async (
  eventId,
  organizerId,
  data
) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.organizerId !== organizerId) {
    throw new AppError(
      "You can only update your own events",
      403
    );
  }

  await event.update(data);

  return event;
};

export const deleteEventService = async (
  eventId,
  organizerId
) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new AppError("Event not found", 404);
  }

  if (event.organizerId !== organizerId) {
    throw new AppError(
      "You can only delete your own events",
      403
    );
  }

  await event.destroy();

  return true;
};