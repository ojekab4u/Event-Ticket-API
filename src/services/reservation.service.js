import sequelize from "../config/database.js"
import Event from "../models/Event.js";
import User from "../models/User.js";
import Reservation from "../models/Reservation.js";
import AppError from "../utils/AppError.js";
export const createReservationService = async (
  userId,
  { eventId, ticketQuantity }
) => {
  // Start transaction
  const transaction = await sequelize.transaction();

  try {
    // Find event
    const event = await Event.findByPk(eventId, { transaction });

    if (!event) {
      throw new AppError("Event not found", 404);
    }

    // Check ticket availability
    if (event.availableTickets < ticketQuantity) {
      throw new AppError("Not enough tickets available", 400);
    }

    // Calculate total amount
    const totalAmount = Number(event.ticketPrice) * ticketQuantity;

    // Create reservation
    const reservation = await Reservation.create(
      {
        userId,
        eventId,
        ticketQuantity,
        totalAmount,
      },
      { transaction }
    );

    // Reduce available tickets
    event.availableTickets -= ticketQuantity;

    await event.save({ transaction });

    // Commit transaction
    await transaction.commit();

    return reservation;

  } catch (error) {

    // Rollback everything
    await transaction.rollback();

    throw error;
  }
};

export const getMyReservationsService = async (userId) => {
  return await Reservation.findAll({
    where: {
      userId,
    },
    include: [
      {
        model: Event,
        as: "event",
        attributes: [
          "id",
          "title",
          "venue",
          "date",
          "time",
          "ticketPrice",
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

export const getReservationByIdService = async (
  reservationId,
  userId
) => {
  const reservation = await Reservation.findByPk(reservationId, {
    include: [
      {
        model: Event,
        as: "event",
        attributes: [
          "id",
          "title",
          "venue",
          "date",
          "time",
          "ticketPrice",
        ],
      },
      {
        model: User,
        as: "user",
        attributes: [
          "id",
          "fullName",
          "email",
        ],
      },
    ],
  });

  if (!reservation) {
    throw new AppError("Reservation not found", 404);
  }

  // Ensure users can only access their own reservation
  if (reservation.userId !== userId) {
    throw new AppError(
      "You are not authorized to view this reservation",
      403
    );
  }

  return reservation;
};

export const cancelReservationService = async (
  reservationId,
  userId
) => {

  const transaction = await sequelize.transaction();

  try {

    const reservation = await Reservation.findByPk(
      reservationId,
      { transaction }
    );

    if (!reservation) {
      throw new AppError("Reservation not found", 404);
    }

    if (reservation.userId !== userId) {
      throw new AppError(
        "You are not authorized to cancel this reservation",
        403
      );
    }

    if (reservation.status === "CANCELLED") {
      throw new AppError(
        "Reservation has already been cancelled",
        400
      );
    }

    const event = await Event.findByPk(
      reservation.eventId,
      { transaction }
    );

    if (!event) {
      throw new AppError("Associated event not found", 404);
    }

    // Restore tickets
    event.availableTickets += reservation.ticketQuantity;

    await event.save({ transaction });

    // Update reservation status
    reservation.status = "CANCELLED";

    await reservation.save({ transaction });

    await transaction.commit();

    return reservation;

  } catch (error) {

    await transaction.rollback();

    throw error;

  }

};