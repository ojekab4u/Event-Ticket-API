import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;
    const normalizedRole = role.toUpperCase();

    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const allowedRoles = ["USER", "ORGANIZER"];

if (!allowedRoles.includes(normalizedRole)) {
  return res.status(400).json({
    success: false,
    message: "Role must be USER or ORGANIZER",
  });
}

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      role: normalizedRole,
    });

    const { password: _, ...userWithoutPassword } = user.toJSON();

    res.status(201).json({
      success: true,
      message: "Registration successful",
      user:userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
      });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // Generate token
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

    return res.status(200).json({
      success: true,
      token,
      user: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};