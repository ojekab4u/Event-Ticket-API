import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database.js";

import Payment from "../models/Payment.js";
import Reservation from "../models/Reservation.js";

import AppError from "../utils/AppError.js";

export const processPaymentService = async (
  userId,
  { reservationId, paymentMethod }
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
        "You are not authorized to pay for this reservation",
        403
      );
    }

    if (reservation.paymentStatus === "PAID") {
      throw new AppError(
        "Reservation has already been paid for",
        400
      );
    }

    const payment = await Payment.create(
      {
        reservationId,
        amount: reservation.totalAmount,
        paymentMethod,
        reference: `PAY-${uuidv4()}`,
        status: "SUCCESS",
      },
      { transaction }
    );

    reservation.paymentStatus = "PAID";
    reservation.status = "CONFIRMED";

    await reservation.save({ transaction });

    await transaction.commit();

    return payment;

  } catch (error) {

    await transaction.rollback();

    throw error;

  }

};