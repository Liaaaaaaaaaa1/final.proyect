import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput";
import PasswordRules from "../components/PasswordRules"; 
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import "../styles/register.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 12;
    const hasNumber = /\d/.test(password);
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      return `La contraseña debe tener entre ${minLength} y ${maxLength} caracteres.`;
    }
    if (!hasNumber) return "La contraseña debe incluir al menos un número.";
    if (!hasUppercase) return "La contraseña debe incluir al menos una letra mayúscula.";
    if (!hasLowercase) return "La contraseña debe incluir al menos una letra minúscula.";
    return null;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden");
      return;
    }

    const passwordError = validatePassword(password);
    if (passwordError) {
      alert(`❌ ${passwordError}`);
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
      navigate("/login");
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

        <PasswordInput
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <PasswordInput
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/*Reglas de validación de contraseña*/}
        <PasswordRules password={password} />

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
