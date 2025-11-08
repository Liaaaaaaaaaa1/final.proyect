import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // importa tus rutas de autenticación

const app = express();
const PORT = 5000; // puedes cambiarlo si lo necesitas

// 🧩 Middleware
app.use(cors());
app.use(express.json());

// 🧩 Rutas principales
app.use("/api/auth", authRoutes); // /api/auth/login, /api/auth/register, /api/auth/forgot-password, etc.

// 🧩 Ruta de prueba rápida
app.get("/", (req, res) => {
  res.send("Backend corriendo ✅");
});

// 🧩 Conexión directa a MongoDB Atlas
const mongoURI = "mongodb+srv://liagr0207_db_user:G8qLc9Dth2KzKOqW@cluster0.cbasltb.mongodb.net/?appName=Cluster0";

mongoose.connect(mongoURI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((err) => console.error("Error al conectar MongoDB:", err));

// 🧩 Levantar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT} 🚀`);
});
