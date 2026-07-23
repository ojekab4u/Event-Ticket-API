import User from "./User.js";
import Event from "./Event.js";
import Reservation from "./Reservation.js";

// User → Event
User.hasMany(Event, {
  foreignKey: "organizerId",
  as: "events",
});

Event.belongsTo(User, {
  foreignKey: "organizerId",
  as: "organizer",
});

// User → Reservation
User.hasMany(Reservation, {
  foreignKey: "userId",
  as: "reservations",
});

Reservation.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

// Event → Reservation
Event.hasMany(Reservation, {
  foreignKey: "eventId",
  as: "reservations",
});

Reservation.belongsTo(Event, {
  foreignKey: "eventId",
  as: "event",
});

export { User, Event, Reservation };