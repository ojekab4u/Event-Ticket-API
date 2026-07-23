import asyncHandler from "../utils/asyncHandler.js";
import {
  registerService,
  loginService,
} from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await registerService(req.body);

  res.status(201).json({
    success: true,
    message: "Registration successful",
    user,
  });
});

export const login = asyncHandler(async (req, res) => {
  const result = await loginService(req.body);

  res.status(200).json({
    success: true,
    ...result,
  });
});