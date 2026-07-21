import Event from "../models/Event.js";
import User from "../models/User.js";

export const createEventService = async (eventData, organizerId) => {
  return await Event.create({
    ...eventData,
    organizerId,
  });
};

export const getAllEventsService = async () => {
  return await Event.findAll({
    include: [
      {
        model: User,
        attributes: ["id", "fullName", "email"],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const getEventByIdService = async (id) => {
  return await Event.findByPk(id, {
    include: [
      {
        model: User,
        attributes: ["id", "fullName", "email"],
      },
    ],
  });
};


export const updateEventService = async (
  eventId,
  organizerId,
  data
) => {
  const event = await Event.findByPk(eventId);

  if (!event) {
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You can only update your own events");
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
    throw new Error("Event not found");
  }

  if (event.organizerId !== organizerId) {
    throw new Error("You can only delete your own events");
  }

  await event.destroy();

  return true;
};