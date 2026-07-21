import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import User from "./User.js";

const Event = sequelize.define(
  "Event",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    venue: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },

    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },

    ticketPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },

    capacity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    availableTickets: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    bannerImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

User.hasMany(Event, {
  foreignKey: "organizerId",
});

Event.belongsTo(User, {
  foreignKey: "organizerId",
});

export default Event;