export const reservationConfirmationTemplate = ({
  fullName,
  eventTitle,
  venue,
  date,
  time,
  ticketQuantity,
  totalAmount,
  paymentReference,
}) => {
  return `
    <div style="font-family: Arial, sans-serif; line-height:1.6">
      <h2>Reservation Confirmed 🎉</h2>

      <p>Hello <strong>${fullName}</strong>,</p>

      <p>Your reservation has been confirmed successfully.</p>

      <hr>

      <h3>Event Details</h3>

      <p><strong>Event:</strong> ${eventTitle}</p>
      <p><strong>Venue:</strong> ${venue}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p><strong>Time:</strong> ${time}</p>

      <hr>

      <h3>Booking Details</h3>

      <p><strong>Tickets:</strong> ${ticketQuantity}</p>
      <p><strong>Total Paid:</strong> ₦${totalAmount}</p>
      <p><strong>Payment Reference:</strong> ${paymentReference}</p>

      <hr>

      <p>Thank you for choosing our platform.</p>
    </div>
  `;
};