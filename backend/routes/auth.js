import express from "express";
import {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

const router = express.Router();

// 🔹 Registro
router.post("/register", registerUser);

// 🔹 Login
router.post("/login", loginUser);

// 🔹 Olvidar contraseña (envía correo)
router.post("/forgot-password", forgotPassword);

// 🔹 Restablecer contraseña (desde enlace)
router.post("/reset-password", resetPassword);

export default router;
