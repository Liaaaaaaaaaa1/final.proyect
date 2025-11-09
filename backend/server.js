import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // importa tus rutas de autenticación

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000; // Render asigna automáticamente el puerto

// Middleware
app.use(cors());
app.use(express.json());

// Rutas principales
app.use("/api/auth", authRoutes); // /api/auth/login, /api/auth/register, /api/auth/forgot-password, etc.

// Ruta de prueba rápida
app.get("/", (req, res) => {
  res.send("Backend corriendo ✅");
});

// Conexión a MongoDB Atlas desde .env
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

// Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
