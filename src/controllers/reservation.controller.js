import asyncHandler from "../utils/asyncHandler.js";
import {createReservationService,    
    getMyReservationsService,
    getReservationByIdService,
    cancelReservationService
} from "../services/reservation.service.js"


export const createReservation = asyncHandler(async (req, res) => {

    const reservation = await createReservationService(
        req.user.id,
        req.body
    );

    res.status(201).json({
        success: true,
        message: "Reservation created successfully",
        reservation,
    });

});

export const getMyReservations = asyncHandler(async (req, res) => {

    const reservations = await getMyReservationsService(req.user.id);

    res.status(200).json({
        success: true,
        count: reservations.length,
        reservations,
    });

});

export const getReservationById = asyncHandler(async (req, res) => {

  const reservation = await getReservationByIdService(
    req.params.id,
    req.user.id
  );

  res.status(200).json({
    success: true,
    reservation,
  });

});



export const cancelReservation = asyncHandler(async (req, res) => {

    const reservation = await cancelReservationService(
        req.params.id,
        req.user.id
    );

    res.status(200).json({
        success: true,
        message: "Reservation cancelled successfully",
        reservation,
    });

});