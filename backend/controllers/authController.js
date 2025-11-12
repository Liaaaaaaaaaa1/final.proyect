import User from "../models/User.js";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";

// 📧 Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "gexstudioteam01@gmail.com", // 👈 pon aquí el correo remitente
    pass: "osfhvxocjaobxwzd" // 👈 aquí la app password de Gmail
  },
});

// 🔹 Registrar usuario
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verificar si ya existe el usuario
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: "Usuario ya registrado" });

    // Hashear contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Crear usuario
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ msg: "Usuario registrado correctamente" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 🔹 Login de usuario
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuario
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Usuario no encontrado" });

    // Validar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Contraseña incorrecta" });

    res.status(200).json({
      msg: "Login exitoso",
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📩 Olvidar contraseña — envía correo real
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    if (!email) return res.status(400).json({ msg: "Por favor ingresa tu correo" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Generar enlace de restablecimiento
    const resetLink = `http://localhost:5173/reset-password?email=${email}`;

    // Contenido del correo
    const mailOptions = {
      from: "gexstudioteam01@gmail.com",
      to: email,
      subject: "Recuperación de contraseña 🔐",
      html: `
        <h2>Recuperar tu contraseña</h2>
        <p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
        <a href="${resetLink}">${resetLink}</a>
        <br><br>
        <small>Si tú no solicitaste este cambio, ignora este mensaje.</small>
      `,
    };

    // Enviar correo
    await transporter.sendMail(mailOptions);

    console.log(`📧 Correo de recuperación enviado a ${email}`);
    res.json({ msg: "Correo de recuperación enviado correctamente" });
  } catch (err) {
    console.error("❌ Error al enviar correo:", err);
    res.status(500).json({ msg: "Error al enviar el correo" });
  }
};

// 🔐 Restablecer contraseña real
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    if (!email || !newPassword)
      return res.status(400).json({ msg: "Datos incompletos" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "Usuario no encontrado" });

    // Hashear la nueva contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Actualizar contraseña
    user.password = hashedPassword;
    await user.save();

    console.log(`🔄 Contraseña actualizada para ${email}`);
    res.json({ msg: "Contraseña actualizada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error en el servidor" });
  }
};

