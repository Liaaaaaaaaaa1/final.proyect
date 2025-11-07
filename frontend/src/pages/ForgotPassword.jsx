import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import "../styles/forgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleForgot = async (e) => {
    e.preventDefault();
    if (!email) {
      alert("❌ Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Error al enviar correo"}`);
        return;
      }

      alert(`📧 Se ha enviado un correo con instrucciones a: ${email}`);
      navigate("/login"); // Redirigir al login
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleForgot}>
        <h1>Recuperar contraseña</h1>

        <InputField
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Button type="submit" text="Enviar correo" />

        <FormFooter
          text=""
          linkText="Volver al inicio de sesión"
          linkTo="/login"
        />
      </form>
    </div>
  );
}

export default ForgotPassword;
