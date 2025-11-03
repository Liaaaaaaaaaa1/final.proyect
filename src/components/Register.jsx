import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden ❌");
      return;
    }

    // Guardar usuario temporalmente en localStorage
    const user = { username, email, password };
    localStorage.setItem("registeredUser", JSON.stringify(user));

    alert("✅ Registro exitoso. Ahora puedes iniciar sesión.");
    
    // Aquí se conectaría al backend con fetch/axios
    // fetch("/api/register", { method: "POST", body: JSON.stringify(user) })

    window.location.href = "/login";
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleRegister}>
        <h1>Registro</h1>
        <div className="input-box">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn">Crear cuenta</button>

        <div className="register-link">
          <p>
            ¿Ya tienes una cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
