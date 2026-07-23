import asyncHandler from "../utils/asyncHandler.js";

import {
  processPaymentService,
} from "../services/payment.service.js";

export const processPayment = asyncHandler(async (req, res) => {

  const payment = await processPaymentService(
    req.user.id,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Payment processed successfully",
    payment,
  });

});