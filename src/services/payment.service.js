import { v4 as uuidv4 } from "uuid";
import sequelize from "../config/database.js";

import Payment from "../models/Payment.js";
import Reservation from "../models/Reservation.js";
import User from "../models/User.js";
import Event from "../models/Event.js";

import { sendEmail } from "./email.service.js";

import {
  reservationConfirmationTemplate,
} from "../utils/emailTemplate.js";
import AppError from "../utils/AppError.js";

export const processPaymentService = async (
  userId,
  { reservationId, paymentMethod }
) => {
  const normalizedPaymentMethod = paymentMethod.toUpperCase();  
  const transaction = await sequelize.transaction();

  try {
    const reservation = await Reservation.findByPk(
      reservationId,
    {
      include: [
        {model: User, as: "user",},
        { model: Event, as: "event",},
      ],
      transaction,
    }
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
      const allowedMethods = [
          "CARD",
          "BANK_TRANSFER",
          "USSD",
        ];

        if (!allowedMethods.includes(normalizedPaymentMethod)) {
          throw new AppError("Invalid payment method", 400);
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
          paymentMethod: normalizedPaymentMethod,
          reference: `PAY-${uuidv4()}`,
          status: "SUCCESS",
        },
        { transaction }
      );

    reservation.paymentStatus = "PAID";
    reservation.status = "CONFIRMED";

    await reservation.save({ transaction });
    await transaction.commit();
    await sendEmail({
      to: reservation.user.email,
      subject: "Reservation Confirmed",
      html: reservationConfirmationTemplate({
        fullName: reservation.user.fullName,
        eventTitle: reservation.event.title,
        venue: reservation.event.venue,
        date: reservation.event.date,
        time: reservation.event.time,
        ticketQuantity: reservation.ticketQuantity,
        totalAmount: reservation.totalAmount,
        paymentReference: payment.reference,
  }),
});

    return payment;
    
  } catch (error) {
    await transaction.rollback();

    throw error;

  }

};