import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";
import nodemailer from "nodemailer";
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Para hashear la nueva contraseña
import dotenv from "dotenv"; 

dotenv.config();

const router = express.Router();

// Ruta para registrar usuario
router.post("/register", registerUser);

// Ruta para iniciar sesión
router.post("/login", loginUser);

// Ruta para solicitar restablecimiento de contraseña
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Correo no encontrado" });
    }

    // Enlace de recuperación, apunta a tu frontend en GitHub Pages
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?email=${email}`;

    // Configuración del transporte de correo usando variables de entorno
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    // Enviar el correo
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: email,
      subject: "Recuperar contraseña",
      html: `
        <h3>Recuperación de contraseña</h3>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}" target="_blank">${resetLink}</a>
      `,
    });

    res.json({ msg: "Correo de recuperación enviado" });
  } catch (error) {
    console.error("Error enviando correo:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

// ✅ Ruta para restablecer contraseña con hashing
router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "Usuario no encontrado" });
    }

    // 🔒 Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (error) {
    console.error("Error cambiando contraseña:", error);
    res.status(500).json({ msg: "Error al cambiar la contraseña" });
  }
});

export default router;
