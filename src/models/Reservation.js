import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Reservation = sequelize.define(
  "Reservation",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    ticketQuantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },

    totalAmount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM(
        "PENDING",
        "CONFIRMED",
        "CANCELLED"
      ),
      defaultValue: "PENDING",
    },

    paymentStatus: {
      type: DataTypes.ENUM(
        "PENDING",
        "PAID",
        "FAILED",
        "REFUNDED"
      ),
      defaultValue: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

export default Reservation;