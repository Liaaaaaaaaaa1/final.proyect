import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import "../styles/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Error en el registro"}`);
        return;
      }

      alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
      navigate("/login"); // Redirigir al login
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Registro</h1>

        <InputField
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <InputField
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <Button type="submit" text="Crear cuenta" />

        <FormFooter
          text="¿Ya tienes una cuenta?"
          linkText="Inicia sesión"
          linkTo="/login"
        />
      </form>
    </div>
  );
}

export default Register;

