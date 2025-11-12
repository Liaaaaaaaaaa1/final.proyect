import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import InputField from "../components/InputField";
import PasswordInput from "../components/PasswordInput"; 
import Button from "../components/Button";
import FormFooter from "../components/FormFooter";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const navigate = useNavigate();

  // Recuperar email guardado si existe
  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(`❌ ${data.message || "Error en login"}`);
        return;
      }

      alert(`✅ Bienvenido, ${data.username}!`);

      if (remember) localStorage.setItem("savedEmail", email);
      else localStorage.removeItem("savedEmail");

      navigate("/home");
    } catch (err) {
      console.error(err);
      alert("❌ Error de conexión con el servidor");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleLogin}>
        <h1>Ingreso</h1>

         {/*Email*/}
        <InputField
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

         {/*Contraseña con opción de mostrar/ocultar */}
        <PasswordInput
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="remember-forgot">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
            />
            Recuérdame
          </label>

          <Link to="/forgot-password" className="forgot-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

        <Button type="submit" text="Ingresar" />

        <FormFooter
          text="¿No tienes una cuenta?"
          linkText="Regístrate"
          linkTo="/register"
        />
      </form>
    </div>
  );
}

export default Login;
