import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PasswordInput from "../components/PasswordInput";
import PasswordRules from "../components/PasswordRules"; 
import Button from "../components/Button";
import "../styles/resetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // Extrae el correo del enlace (URL) 
  const email = new URLSearchParams(location.search).get("email");

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

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      alert("❌ Por favor, completa ambos campos.");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("❌ Las contraseñas no coinciden.");
      return;
    }

    const passwordError = validatePassword(newPassword);
    if (passwordError) {
      alert(`❌ ${passwordError}`);
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.msg || "Error al restablecer la contraseña"}`);
        return;
      }

      alert("✅ Contraseña actualizada correctamente.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleReset}>
        <h1>Restablecer contraseña</h1>
        <p>Correo: {email}</p>

        {/*Nueva contraseña*/}
        <PasswordInput
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        {/*Confirmar nueva contraseña*/}
        <PasswordInput
          placeholder="Confirmar nueva contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/*Reglas de validación de contraseña*/}
        <PasswordRules password={newPassword} />

        <Button type="submit" text="Actualizar contraseña" />
      </form>
    </div>
  );
}

export default ResetPassword;
