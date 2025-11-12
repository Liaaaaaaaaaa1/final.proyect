import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import "../styles/resetPassword.css";

function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  // 📩 Extrae el correo del enlace (de la URL)
  const email = new URLSearchParams(location.search).get("email");

  const handleReset = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      alert("❌ Por favor, ingresa una nueva contraseña.");
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

        <InputField
          type="password"
          placeholder="Nueva contraseña"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <Button type="submit" text="Actualizar contraseña" />
      </form>
    </div>
  );
}

export default ResetPassword;
