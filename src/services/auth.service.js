import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import AppError from "../utils/AppError.js";

export const registerService = async ({
  fullName,
  email,
  password,
  role,
}) => {
  const normalizedRole = (role || "USER").toUpperCase();

  const existingUser = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (existingUser) {
    throw new AppError("Email already exists", 400);
  }

  const allowedRoles = ["USER", "ORGANIZER"];

  if (!allowedRoles.includes(normalizedRole)) {
    throw new AppError("Role must be USER or ORGANIZER", 400);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    fullName,
    email: email.toLowerCase().trim(),
    password: hashedPassword,
    role: normalizedRole,
  });

  const { password: _, ...userWithoutPassword } = user.toJSON();

  return userWithoutPassword;
};

export const loginService = async ({ email, password }) => {
  const user = await User.findOne({
    where: {
      email: email.toLowerCase().trim(),
    },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );

  const { password: _, ...userData } = user.toJSON();

  return {
    token,
    user: userData,
  };
};